import { execSync } from 'child_process';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '../..');

export async function generateLlmsTxt() {
  try {
    execSync('tsx ./scripts/generate-llms-txt.ts', { cwd: ROOT, stdio: 'inherit' });
  } catch {
    console.log('  \u26A0 llms.txt had errors (non-fatal)');
  }
}
