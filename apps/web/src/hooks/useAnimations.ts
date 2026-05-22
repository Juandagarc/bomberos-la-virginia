import { useEffect } from 'react';

type Tweaks = {
  accent: string;
  grain: boolean;
  embers: boolean;
  marqueeSpeed: number;
};

declare global {
  interface Window {
    __tweaks?: Tweaks;
    __applyTweaks?: (patch: Partial<Tweaks>) => void;
  }
}

const CHANNELS = ['CH 01 · OPER', 'CH 03 · RESC', 'CH 02 · MEDI', 'CH 07 · LOGI'];

const pad2 = (n: number): string => n.toString().padStart(2, '0');

export function useAnimations(): void {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // Curtain dismiss
    const curtain = document.querySelector<HTMLDivElement>('.curtain');
    if (curtain) {
      const t1 = window.setTimeout(() => {
        curtain.classList.add('gone');
        const t2 = window.setTimeout(() => {
          curtain.style.display = 'none';
        }, 1000);
        cleanups.push(() => window.clearTimeout(t2));
        document.body.dataset.entered = '1';
      }, 1500);
      cleanups.push(() => window.clearTimeout(t1));
    }

    // Live clock
    const clockEl = document.querySelector<HTMLElement>('[data-clock]');
    const tickClock = (): void => {
      if (!clockEl) return;
      const d = new Date();
      clockEl.innerHTML = `<b>${pad2(d.getHours())}:${pad2(d.getMinutes())}<span style="opacity:.5">:${pad2(d.getSeconds())}</span></b>`;
    };
    tickClock();
    const clockInterval = window.setInterval(tickClock, 1000);
    cleanups.push(() => window.clearInterval(clockInterval));

    // Nav compact on scroll
    const nav = document.querySelector<HTMLElement>('.nav');
    const onScrollNav = (): void => {
      if (!nav) return;
      if (window.scrollY > 60) nav.classList.add('compact');
      else nav.classList.remove('compact');
    };
    window.addEventListener('scroll', onScrollNav, { passive: true });
    onScrollNav();
    cleanups.push(() => window.removeEventListener('scroll', onScrollNav));

    // Embers
    const emberLayer = document.querySelector<HTMLElement>('.hero__embers');
    if (emberLayer && emberLayer.childElementCount === 0) {
      for (let i = 0; i < 55; i++) {
        const e = document.createElement('span');
        const bright = Math.random() < 0.3;
        e.className = 'ember' + (bright ? ' bright' : '');
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const dx = (Math.random() - 0.5) * 280;
        const size = 2 + Math.random() * (bright ? 6 : 4);
        const dur = 5 + Math.random() * 7;
        e.style.left = `${left}%`;
        e.style.animationDelay = `${delay}s`;
        e.style.setProperty('--dur', `${dur}s`);
        e.style.width = `${size}px`;
        e.style.height = `${size}px`;
        e.style.setProperty('--dx', `${dx}px`);
        emberLayer.appendChild(e);
      }
    }

    // Sparks near title
    const sparkLayer = document.querySelector<HTMLElement>('.hero__sparks');
    if (sparkLayer && sparkLayer.childElementCount === 0) {
      for (let i = 0; i < 28; i++) {
        const s = document.createElement('span');
        s.className = 'spark';
        s.style.left = `${10 + Math.random() * 65}%`;
        s.style.top = `${30 + Math.random() * 50}%`;
        s.style.setProperty('--sx', `${(Math.random() - 0.5) * 10}px`);
        s.style.setProperty('--sy', `${-2 - Math.random() * 8}px`);
        s.style.animationDelay = `${Math.random() * 3.4}s`;
        s.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;
        sparkLayer.appendChild(s);
      }
    }

    // Count up
    const animateCount = (el: HTMLElement): void => {
      const target = parseInt(el.dataset.count ?? '0', 10);
      const dur = parseInt(el.dataset.dur ?? '1600', 10);
      const start = performance.now();
      const fmt = el.dataset.fmt;
      const pad = parseInt(el.dataset.pad ?? '0', 10);
      const step = (now: number): void => {
        const t = Math.min(1, (now - start) / dur);
        const ease = 1 - Math.pow(1 - t, 3);
        const v = Math.floor(target * ease);
        el.textContent =
          fmt === 'thousands' ? v.toLocaleString('es-CO') : String(v).padStart(pad, '0');
        if (t < 1) requestAnimationFrame(step);
        else
          el.textContent =
            fmt === 'thousands'
              ? target.toLocaleString('es-CO')
              : String(target).padStart(pad, '0');
      };
      requestAnimationFrame(step);
    };

    // Intersection reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in-view');
            const target = en.target as HTMLElement;
            if (target.dataset.count) animateCount(target);
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    document
      .querySelectorAll('.reveal, .reveal-stagger, [data-count], .stat, .hose')
      .forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // Live emergency counter
    const live = document.querySelector<HTMLElement>('[data-live-count]');
    let liveInterval: number | undefined;
    if (live) {
      let base = parseInt(live.dataset.liveCount ?? '347', 10);
      const start = performance.now();
      const dur = 2200;
      const ramp = (now: number): void => {
        const t = Math.min(1, (now - start) / dur);
        const ease = 1 - Math.pow(1 - t, 3);
        live.textContent = String(Math.floor(base * ease));
        if (t < 1) requestAnimationFrame(ramp);
        else {
          live.textContent = String(base);
          liveInterval = window.setInterval(() => {
            if (Math.random() < 0.18) {
              base++;
              live.textContent = String(base);
              live.style.color = 'var(--rojo)';
              window.setTimeout(() => {
                live.style.color = '';
              }, 600);
            }
          }, 7000);
        }
      };
      const t = window.setTimeout(() => requestAnimationFrame(ramp), 1800);
      cleanups.push(() => window.clearTimeout(t));
    }
    cleanups.push(() => {
      if (liveInterval !== undefined) window.clearInterval(liveInterval);
    });

    // Hero parallax
    const heroPhoto = document.querySelector<HTMLElement>('.hero__photo');
    const heroTitle = document.querySelector<HTMLElement>('.hero__title');
    const heroRight = document.querySelector<HTMLElement>('.hero__right');
    const onScrollHero = (): void => {
      const y = window.scrollY;
      if (y > window.innerHeight) return;
      if (heroPhoto)
        heroPhoto.style.transform = `scale(${1.06 + y * 0.0003}) translateY(${y * 0.18}px)`;
      if (heroTitle) heroTitle.style.transform = `translateY(${y * 0.08}px)`;
      if (heroRight) heroRight.style.transform = `translateY(${y * -0.04}px)`;
    };
    window.addEventListener('scroll', onScrollHero, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', onScrollHero));

    // Cursor blob
    let blob: HTMLDivElement | null = null;
    let rafId: number | undefined;
    if (window.matchMedia('(pointer:fine)').matches) {
      blob = document.createElement('div');
      blob.className = 'cursor-blob';
      document.body.appendChild(blob);
      let tx = 0;
      let ty = 0;
      let cx = 0;
      let cy = 0;
      const onMove = (e: MouseEvent): void => {
        tx = e.clientX;
        ty = e.clientY;
        blob?.classList.add('active');
      };
      const onLeave = (): void => blob?.classList.remove('active');
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseleave', onLeave);
      const hoverEls = document.querySelectorAll<HTMLElement>(
        'a, button, .op-card, .cromo, .post, .polaroid',
      );
      const onEnter = (): void => blob?.classList.add('hover');
      const onOut = (): void => blob?.classList.remove('hover');
      hoverEls.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onOut);
      });
      const loop = (): void => {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        if (blob) blob.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
        rafId = requestAnimationFrame(loop);
      };
      loop();
      cleanups.push(() => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseleave', onLeave);
        hoverEls.forEach((el) => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onOut);
        });
        if (rafId !== undefined) cancelAnimationFrame(rafId);
        blob?.remove();
      });
    }

    // Magnetic buttons
    const magnets = document.querySelectorAll<HTMLElement>('[data-magnet]');
    const magnetHandlers: Array<{
      el: HTMLElement;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }> = [];
    magnets.forEach((btn) => {
      const move = (e: MouseEvent): void => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
      };
      const leave = (): void => {
        btn.style.transform = '';
      };
      btn.addEventListener('mousemove', move);
      btn.addEventListener('mouseleave', leave);
      magnetHandlers.push({ el: btn, move, leave });
    });
    cleanups.push(() => {
      magnetHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    });

    // Polaroid drag tilt
    const polaroids = document.querySelectorAll<HTMLElement>('.polaroid');
    const polaroidHandlers: Array<{
      el: HTMLElement;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }> = [];
    polaroids.forEach((p) => {
      const move = (e: MouseEvent): void => {
        const r = p.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        const baseRot = parseFloat(p.dataset.rot ?? '0');
        p.style.transform = `rotate(${baseRot}deg) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg) translateZ(0)`;
      };
      const leave = (): void => {
        p.style.transform = '';
      };
      p.addEventListener('mousemove', move);
      p.addEventListener('mouseleave', leave);
      polaroidHandlers.push({ el: p, move, leave });
    });
    cleanups.push(() => {
      polaroidHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    });

    // Channel rotation
    const chEl = document.querySelector<HTMLElement>('[data-channel]');
    let chInterval: number | undefined;
    if (chEl) {
      let i = 0;
      chInterval = window.setInterval(() => {
        i = (i + 1) % CHANNELS.length;
        chEl.style.opacity = '0';
        window.setTimeout(() => {
          chEl.textContent = CHANNELS[i] ?? '';
          chEl.style.opacity = '1';
        }, 200);
      }, 3500);
    }
    cleanups.push(() => {
      if (chInterval !== undefined) window.clearInterval(chInterval);
    });

    // Last incident time refresh
    const lastInc = document.querySelector<HTMLElement>('[data-last-incident]');
    let lastIncInterval: number | undefined;
    if (lastInc) {
      let minutesAgo = 27;
      const refresh = (): void => {
        const txt =
          minutesAgo === 0
            ? 'hace instantes'
            : minutesAgo < 60
              ? `hace ${minutesAgo} min`
              : `hace ${Math.floor(minutesAgo / 60)} h ${minutesAgo % 60} min`;
        lastInc.textContent = txt;
      };
      refresh();
      lastIncInterval = window.setInterval(() => {
        minutesAgo++;
        refresh();
      }, 60000);
    }
    cleanups.push(() => {
      if (lastIncInterval !== undefined) window.clearInterval(lastIncInterval);
    });

    // Tweaks (kept simple: just expose API; no panel for first cut)
    const tweaks: Tweaks = { accent: '#D32027', grain: true, embers: true, marqueeSpeed: 36 };
    const applyTweaks = (t: Tweaks): void => {
      document.documentElement.style.setProperty('--rojo', t.accent);
      document.body.classList.toggle('no-grain', !t.grain);
      document.body.classList.toggle('no-embers', !t.embers);
      document.querySelectorAll<HTMLElement>('.marquee__track').forEach((tr) => {
        tr.style.animationDuration = `${t.marqueeSpeed}s`;
      });
    };
    applyTweaks(tweaks);
    window.__tweaks = tweaks;
    window.__applyTweaks = (patch) => {
      Object.assign(tweaks, patch);
      applyTweaks(tweaks);
    };

    return () => {
      cleanups.forEach((c) => c());
    };
  }, []);
}
