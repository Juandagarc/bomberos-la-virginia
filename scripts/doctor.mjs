#!/usr/bin/env node
// React Doctor — gate for commits and pushes-to-main.
// Runs every required check in sequence and prints a clean report.
// Exits 0 on 0 issues, 1 otherwise. Designed to be the single source of truth
// for "is this branch shippable".

import { spawn } from 'node:child_process';
import { performance } from 'node:perf_hooks';

const CHECKS = [
  { id: 'format', label: 'Prettier (format check)', cmd: 'pnpm', args: ['format:check'] },
  { id: 'typecheck', label: 'TypeScript (type check)', cmd: 'pnpm', args: ['-r', 'typecheck'] },
  { id: 'lint', label: 'ESLint', cmd: 'pnpm', args: ['-r', 'lint'] },
  { id: 'build', label: 'Vite build', cmd: 'pnpm', args: ['-r', 'build'] },
];

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

function fmtMs(ms) {
  return ms > 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`;
}

function run({ cmd, args }) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => (stdout += d.toString()));
    child.stderr.on('data', (d) => (stderr += d.toString()));
    child.on('close', (code) => resolve({ code: code ?? 1, stdout, stderr }));
    child.on('error', (err) => resolve({ code: 1, stdout, stderr: String(err) }));
  });
}

const banner = `
${BOLD}${RED}┌─────────────────────────────────────┐${RESET}
${BOLD}${RED}│   REACT DOCTOR · BOMBEROS LV        │${RESET}
${BOLD}${RED}│   gate de commit / push a main      │${RESET}
${BOLD}${RED}└─────────────────────────────────────┘${RESET}`;

console.log(banner);

const results = [];
const overallStart = performance.now();

for (const check of CHECKS) {
  const start = performance.now();
  process.stdout.write(`${DIM}▸${RESET} ${check.label}… `);
  const r = await run(check);
  const elapsed = performance.now() - start;
  const ok = r.code === 0;
  process.stdout.write(
    ok
      ? `${GREEN}OK${RESET} ${DIM}${fmtMs(elapsed)}${RESET}\n`
      : `${RED}FAIL${RESET} ${DIM}${fmtMs(elapsed)}${RESET}\n`,
  );
  results.push({ ...check, ok, elapsed, output: ok ? '' : r.stdout + r.stderr });
}

const total = performance.now() - overallStart;
const failed = results.filter((r) => !r.ok);

console.log('');
if (failed.length === 0) {
  console.log(`${GREEN}${BOLD}✓ 0 issues${RESET} ${DIM}(${fmtMs(total)})${RESET}`);
  console.log(`${DIM}commit/push permitido.${RESET}`);
  process.exit(0);
}

console.log(
  `${RED}${BOLD}✗ ${failed.length} issue${failed.length === 1 ? '' : 's'}${RESET} ${DIM}(${fmtMs(total)})${RESET}`,
);
console.log(`${YELLOW}commit/push bloqueado.${RESET}`);
for (const f of failed) {
  console.log('');
  console.log(`${RED}── ${f.label} ──${RESET}`);
  console.log(f.output.trim().slice(0, 4000));
}
process.exit(1);
