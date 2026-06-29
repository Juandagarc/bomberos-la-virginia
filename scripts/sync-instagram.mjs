#!/usr/bin/env node
/**
 * Sync Instagram feed for @cuerpodebomberoslavirginia.
 *
 * Strategies tried in order:
 *   1. Intercept GraphQL via Playwright (most reliable, needs chromium)
 *   2. Parse embedded JSON from the profile page HTML
 *   3. Extract <img> src attributes from the rendered DOM
 *
 * Outputs:
 *   apps/web/public/ig/*.jpg  — downloaded thumbnails
 *   apps/web/src/data/ig-feed.json — post metadata consumed by the React component
 *
 * Run: pnpm sync:ig
 * Run with visible browser for debugging: DEBUG_BROWSER=1 pnpm sync:ig
 */

import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync, createWriteStream } from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_IMG = path.join(ROOT, 'apps/web/public/ig');
const OUT_JSON = path.join(ROOT, 'apps/web/src/data/ig-feed.json');
const PROFILE = 'cuerpodebomberoslavirginia';
const PROFILE_URL = `https://www.instagram.com/${PROFILE}/`;
const MAX_POSTS = 12;

const MONTH_ES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

function fmtDate(ts) {
  const d = new Date(ts * 1000);
  return `${d.getDate()} ${MONTH_ES[d.getMonth()]}`;
}

function fmtMeta(likes, comments) {
  const parts = [];
  if (likes != null) parts.push(`♥ ${likes >= 1000 ? (likes / 1000).toFixed(1) + 'K' : likes}`);
  if (comments != null) parts.push(`💬 ${comments}`);
  return parts;
}

function photoClassFor(idx) {
  const classes = ['ph-fire', 'ph-team', 'ph-rescue', 'ph-day', 'ph-river', 'ph-truck', 'ph-warm', 'ph-night', 'ph-smoke', 'ph-helmet', 'ph-station', 'ph-bee'];
  return classes[idx % classes.length];
}

function sizeFor(idx) {
  if (idx === 0) return 'lg';
  if (idx === 3 || idx === 6) return 'w';
  return null;
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        downloadFile(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    });
    req.on('error', (e) => { file.close(); reject(e); });
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-CO,es;q=0.9,en-US;q=0.8',
        'Accept-Encoding': 'identity',
        'Cache-Control': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
      },
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchHtml(res.headers.location).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function extractNodesFromJson(obj, found = []) {
  if (!obj || typeof obj !== 'object') return found;
  if (found.length >= MAX_POSTS) return found;

  // Instagram GraphQL node shapes
  if (
    (obj.thumbnail_src || obj.display_url) &&
    (obj.shortcode || obj.code) &&
    obj.taken_at_timestamp != null
  ) {
    found.push(obj);
    return found;
  }

  for (const val of Object.values(obj)) {
    if (found.length >= MAX_POSTS) break;
    if (Array.isArray(val)) {
      for (const item of val) extractNodesFromJson(item, found);
    } else if (val && typeof val === 'object') {
      extractNodesFromJson(val, found);
    }
  }
  return found;
}

async function tryParseHtml(html) {
  // Look for JSON blobs embedded in script tags
  const scriptMatches = html.matchAll(/<script[^>]*type="application\/json"[^>]*>(\{.*?\})<\/script>/gs);
  const jsonBlobs = [...scriptMatches].map((m) => {
    try { return JSON.parse(m[1]); } catch { return null; }
  }).filter(Boolean);

  // Also try window._sharedData and window.__additionalDataLoaded style embeds
  const sharedDataMatch = html.match(/window\._sharedData\s*=\s*(\{.+?\});\s*<\/script>/s);
  if (sharedDataMatch) {
    try { jsonBlobs.push(JSON.parse(sharedDataMatch[1])); } catch { /* ignore */ }
  }

  const requireLazyMatch = html.match(/requireLazy\(\[.*?\],\s*function\s*\(\)\s*\{.*?"entry_data"\s*:\s*(\{.*?"ProfilePage".*?\})\s*\}/s);
  if (requireLazyMatch) {
    try { jsonBlobs.push(JSON.parse(requireLazyMatch[1])); } catch { /* ignore */ }
  }

  const nodes = [];
  for (const blob of jsonBlobs) {
    extractNodesFromJson(blob, nodes);
    if (nodes.length >= MAX_POSTS) break;
  }
  return nodes;
}

async function tryPlaywright(nodes) {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.log('  playwright not installed — skipping headless strategy');
    return nodes;
  }

  const headless = !process.env.DEBUG_BROWSER;
  console.log(`  launching ${headless ? 'headless' : 'visible'} chromium…`);

  const browser = await chromium.launch({ headless });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 },
    locale: 'es-CO',
    extraHTTPHeaders: { 'Accept-Language': 'es-CO,es;q=0.9' },
  });

  const page = await context.newPage();

  // Intercept GraphQL responses that carry feed data
  const captured = [];
  page.on('response', async (response) => {
    const url = response.url();
    if (!url.includes('graphql') && !url.includes('api/v1/feed')) return;
    try {
      const json = await response.json();
      extractNodesFromJson(json, captured);
    } catch { /* not JSON */ }
  });

  try {
    await page.goto(PROFILE_URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
    // Give React time to hydrate and load the feed
    await page.waitForTimeout(4000);

    // Try scrolling to trigger more posts
    await page.evaluate(() => window.scrollBy(0, 1500));
    await page.waitForTimeout(2000);

    // Check if we got data from network interception
    if (captured.length === 0) {
      // Extract post data from rendered DOM. Instagram renders post thumbnails in
      // <a href="/p/{shortcode}/"> links within the feed grid. The <img> inside
      // has alt text with the caption; a <time datetime="..."> carries the date.
      const domPosts = await page.evaluate(() => {
        const seen = new Set();
        const results = [];

        // Primary: links that point to /p/{shortcode}/
        const links = [...document.querySelectorAll('a[href*="/p/"]')];
        for (const a of links) {
          if (results.length >= 24) break;
          const m = a.href.match(/\/p\/([A-Za-z0-9_-]+)/);
          if (!m) continue;
          const shortcode = m[1];
          if (seen.has(shortcode)) continue;
          seen.add(shortcode);

          const img = a.querySelector('img');
          if (!img || !img.src.includes('cdninstagram') && !img.src.includes('instagram')) continue;

          const article = a.closest('article') ?? a.closest('div[role]') ?? a;
          const timeEl = article.querySelector('time[datetime]');
          const isVideo = !!article.querySelector('svg[aria-label*="Reel"], [aria-label*="Video"], [aria-label*="Clip"]');

          results.push({
            shortcode,
            href: `https://www.instagram.com/p/${shortcode}/`,
            imgSrc: img.src,
            alt: img.alt ?? '',
            datetime: timeEl?.getAttribute('datetime') ?? null,
            isVideo,
          });
        }

        // Fallback: any cdninstagram img not already captured
        if (results.length === 0) {
          const imgs = [...document.querySelectorAll('img[src*="cdninstagram"], img[src*="instagram.f"]')];
          for (const img of imgs) {
            if (results.length >= 24) break;
            if (img.src.includes('profile') || img.src.includes('150x150')) continue;
            results.push({
              shortcode: null,
              href: null,
              imgSrc: img.src,
              alt: img.alt ?? '',
              datetime: null,
              isVideo: false,
            });
          }
        }

        return results;
      });

      for (const item of domPosts) {
        captured.push({
          _domImg: item.imgSrc,
          _domAlt: item.alt,
          _domHref: item.href,
          shortcode: item.shortcode,
          taken_at_timestamp: item.datetime ? Math.floor(new Date(item.datetime).getTime() / 1000) : 0,
          thumbnail_src: item.imgSrc,
          is_video: item.isVideo,
          edge_media_to_caption: item.alt ? { edges: [{ node: { text: item.alt } }] } : undefined,
        });
      }
    }

    // Also try parsing embedded JSON from the page source
    const html = await page.content();
    const htmlNodes = await tryParseHtml(html);
    for (const n of htmlNodes) {
      if (!captured.find((c) => c.shortcode === n.shortcode)) captured.push(n);
    }
  } catch (err) {
    console.warn('  Playwright navigation error:', err.message);
  } finally {
    await browser.close();
  }

  return captured;
}

function buildPost(node, idx) {
  const code = node.shortcode || node.code || node.id || `post-${idx}`;
  const ts = node.taken_at_timestamp || node.taken_at || 0;
  const isVideo = !!(node.is_video || node.__typename === 'GraphVideo' || node.media_type === 2);
  const likeCount = node.edge_liked_by?.count ?? node.like_count ?? null;
  const commentCount = node.edge_media_to_comment?.count ?? node.comment_count ?? null;
  const rawCaption = node.edge_media_to_caption?.edges?.[0]?.node?.text
    || node.caption?.text
    || node.accessibility_caption
    || '';

  return {
    id: code,
    date: ts ? fmtDate(ts) : null,
    caption: rawCaption
      ? { plain: rawCaption.slice(0, 120) + (rawCaption.length > 120 ? '…' : '') }
      : { plain: null, em: null, tail: null },
    meta: fmtMeta(likeCount, commentCount),
    photoClass: photoClassFor(idx),
    img: null,
    href: code && !code.startsWith('post-') ? `https://www.instagram.com/p/${code}/` : PROFILE_URL,
    size: sizeFor(idx),
    video: isVideo,
    _rawImgUrl: node.thumbnail_src || node.display_url || node._domImg || null,
  };
}

async function downloadImages(posts) {
  await mkdir(OUT_IMG, { recursive: true });

  const results = await Promise.allSettled(
    posts.map(async (post, idx) => {
      if (!post._rawImgUrl) return;
      const ext = post.video ? 'jpg' : 'jpg';
      const filename = `${String(idx + 1).padStart(2, '0')}-${post.id.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 20)}.${ext}`;
      const dest = path.join(OUT_IMG, filename);

      try {
        await downloadFile(post._rawImgUrl, dest);
        post.img = `/ig/${filename}`;
        console.log(`  ✓ ${filename}`);
      } catch (err) {
        console.warn(`  ✗ ${filename}: ${err.message}`);
      }
    })
  );

  return results;
}

async function run() {
  console.log(`\n🔄 sync-instagram · @${PROFILE}\n`);

  let nodes = [];

  // Strategy 1: simple HTML fetch + JSON extraction
  console.log('→ Strategy 1: fetch profile HTML…');
  try {
    const html = await fetchHtml(PROFILE_URL);
    nodes = await tryParseHtml(html);
    console.log(`  found ${nodes.length} posts in embedded JSON`);
  } catch (err) {
    console.warn('  fetch failed:', err.message);
  }

  // Strategy 2: Playwright (if strategy 1 came up short)
  if (nodes.length < 3) {
    console.log('\n→ Strategy 2: Playwright headless browser…');
    nodes = await tryPlaywright(nodes);
    console.log(`  total nodes after Playwright: ${nodes.length}`);
  }

  if (nodes.length === 0) {
    console.log('\n⚠  No posts extracted — keeping existing ig-feed.json untouched.');
    process.exit(0);
  }

  // Build post objects
  const posts = nodes.slice(0, MAX_POSTS).map((node, idx) => buildPost(node, idx));

  // Download images
  console.log(`\n→ Downloading ${posts.filter((p) => p._rawImgUrl).length} images…`);
  await downloadImages(posts);

  // Strip internal _rawImgUrl before saving
  const clean = posts.map(({ _rawImgUrl: _, ...p }) => p);

  // Read existing to preserve follower/post counts if not scraped
  let existing = { followerCount: '14.2K', postCount: '847' };
  try {
    existing = JSON.parse(await readFile(OUT_JSON, 'utf8'));
  } catch { /* first run */ }

  const feed = {
    posts: clean,
    lastSync: new Date().toISOString(),
    followerCount: existing.followerCount,
    postCount: existing.postCount,
  };

  await writeFile(OUT_JSON, JSON.stringify(feed, null, 2) + '\n');
  console.log(`\n✅ ig-feed.json updated — ${clean.length} posts, ${clean.filter((p) => p.img).length} with real images.\n`);
}

run().catch((err) => {
  console.error('\n💥 sync-instagram failed:', err);
  process.exit(1);
});
