#!/usr/bin/env tsx

/**
 * Dev Watcher — watches guidelines content and stories for changes,
 * then runs derive-ai-docs + ai-runner to keep .ai/ in sync.
 *
 * Usage: npx tsx scripts/dev-watcher.ts
 */

import { watch } from 'chokidar';
import { execSync, spawn, type ChildProcess } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const AI_LOG = path.join(ROOT, 'apps/guidelines/.ai-improve.log');

// ─── Config ──────────────────────────────────────────────────

const WATCH_PATHS = [
  path.join(ROOT, 'apps/guidelines/content'),
  path.join(ROOT, 'packages/components/src'),
];

const DEBOUNCE_MS = 2000;

// ─── State ───────────────────────────────────────────────────

let timeout: ReturnType<typeof setTimeout> | null = null;
let pending = new Set<string>();
let aiProcess: ChildProcess | null = null;
let ignoreChanges = false;

// ─── Helpers ─────────────────────────────────────────────────

function detectTarget(filePath: string): string {
  if (filePath.includes('styling-props')) return 'styling-props';
  if (filePath.includes('patterns')) return 'patterns';
  return 'guidelines';
}

function hasAiTool(): boolean {
  try {
    execSync('command -v kiro-cli', { stdio: 'ignore' });
    return true;
  } catch {
    try {
      execSync('command -v copilot', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }
}

function killAiProcess() {
  if (aiProcess) {
    console.log('⏹️  Killing previous AI improve (new changes detected)...');
    aiProcess.kill('SIGTERM');
    aiProcess = null;
  }
}

function processChanges() {
  if (pending.size === 0) return;

  // Kill any running AI process — new changes take priority
  killAiProcess();

  const files = [...pending];
  pending.clear();

  const contentFiles = files.filter((f) => f.includes('apps/guidelines/content'));
  const storyFiles = files.filter((f) => f.includes('.stories.tsx'));

  try {
    // Suppress watcher events caused by our own writes
    ignoreChanges = true;

    // Step 1: Derive .ai/ (synchronous, fast)
    if (contentFiles.length > 0) {
      console.log(`\n📄 Deriving .ai/ for ${contentFiles.length} file(s)...`);
      execSync(`npx tsx scripts/derive-ai-docs.ts --files ${contentFiles.join(' ')}`, {
        cwd: ROOT,
        stdio: 'inherit',
      });
    }

    if (storyFiles.length > 0) {
      console.log(`\n📄 Story changed — deriving all .ai/ docs...`);
      execSync('npx tsx scripts/derive-ai-docs.ts', { cwd: ROOT, stdio: 'inherit' });
    }

    // Step 2: AI improve (async, killable on next change)
    if (hasAiTool() && contentFiles.length > 0) {
      const target = detectTarget(contentFiles[0]);
      console.log(`\n🤖 Running AI improve (target: ${target})... (log: apps/guidelines/.ai-improve.log)`);

      ignoreChanges = true;
      const logStream = fs.createWriteStream(AI_LOG, { flags: 'w' });

      aiProcess = spawn(
        'npx',
        ['tsx', 'scripts/ai-runner.ts', '--target', target, '--files', ...contentFiles],
        { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], shell: true },
      );

      aiProcess.stdout?.pipe(logStream);
      aiProcess.stderr?.pipe(logStream);

      aiProcess.on('close', (code) => {
        logStream.end();
        aiProcess = null;
        // Re-enable watcher after a brief delay (let FS events settle)
        setTimeout(() => { ignoreChanges = false; }, 1000);
        if (code === 0) console.log('✅ AI improve done.');
        else if (code !== null && code !== 143) console.log(`⚠️  AI improve exited (${code})`);
        // Process any queued changes that arrived while AI was running
        if (pending.size > 0) processChanges();
      });
    }
    // If AI didn't run, re-enable watcher now
    if (!aiProcess) {
      setTimeout(() => { ignoreChanges = false; }, 1000);
    }
  } catch (e: any) {
    console.error('❌ Error:', e.message);
    ignoreChanges = false;
  }
}

// ─── Main ────────────────────────────────────────────────────

console.log('👀 Watching for content and story changes...');
if (!hasAiTool()) {
  console.log('   ⚠️  No AI tool found — will only run derive (no improvement step)');
}
console.log('   Paths: apps/guidelines/content/, packages/components/src/\n');

const watcher = watch(WATCH_PATHS, { ignoreInitial: true });

function isRelevant(filePath: string): boolean {
  return filePath.endsWith('.mdx') || filePath.endsWith('.stories.tsx');
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
