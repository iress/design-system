#!/usr/bin/env tsx

/**
 * Dev Watcher — watches guidelines content, stories, and tokens for changes,
 * then runs translate to keep .ai/ in sync.
 *
 * Usage: npx tsx scripts/dev-watcher.ts
 */

import { watch } from 'chokidar';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── Config ──────────────────────────────────────────────────

const WATCH_PATHS = [
  path.join(ROOT, 'apps/guidelines/content'),
  path.join(ROOT, 'packages/components/src'),
  path.join(ROOT, 'packages/tokens/src'),
];

const DEBOUNCE_MS = 2000;

let timeout: ReturnType<typeof setTimeout> | null = null;
let pending = new Set<string>();
let ignoreChanges = false;

// ─── Helpers ─────────────────────────────────────────────────

function processChanges() {
  if (pending.size === 0) return;

  const files = [...pending];
  pending.clear();

  const contentFiles = files.filter((f) => f.includes('apps/guidelines/content'));
  const storyFiles = files.filter((f) => f.includes('.stories.tsx'));
  const tokenFiles = files.filter((f) => f.includes('packages/tokens/src'));

  try {
    ignoreChanges = true;

    if (tokenFiles.length > 0) {
      console.log(`\n🎨 Token source changed — regenerating token reference...`);
      execSync('npx tsx scripts/translate.ts --tokens --components', {
        cwd: ROOT,
        stdio: 'inherit',
      });
    } else if (contentFiles.length > 0) {
      console.log(`\n📄 Deriving .ai/ for ${contentFiles.length} file(s)...`);
      execSync(`npx tsx scripts/translate.ts --components`, {
        cwd: ROOT,
        stdio: 'inherit',
      });
    } else if (storyFiles.length > 0) {
      console.log(`\n📄 Story changed — deriving all .ai/ docs...`);
      execSync('npx tsx scripts/translate.ts --components', { cwd: ROOT, stdio: 'inherit' });
    }

    setTimeout(() => { ignoreChanges = false; }, 1000);
  } catch (e: any) {
    console.error('❌ Error:', e.message);
    ignoreChanges = false;
  }
}

// ─── Main ────────────────────────────────────────────────────

console.log('👀 Watching for content, story, and token changes...');
console.log('   Paths: apps/guidelines/content/, packages/components/src/, packages/tokens/src/\n');

const watcher = watch(WATCH_PATHS, { ignoreInitial: true });

function isRelevant(filePath: string): boolean {
  return filePath.endsWith('.mdx') || filePath.endsWith('.stories.tsx') || filePath.includes('packages/tokens/src');
}

watcher.on('change', (filePath) => {
  if (!isRelevant(filePath) || ignoreChanges) return;
  pending.add(filePath);
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(processChanges, DEBOUNCE_MS);
});

watcher.on('add', (filePath) => {
  if (!isRelevant(filePath) || ignoreChanges) return;
  pending.add(filePath);
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(processChanges, DEBOUNCE_MS);
});
