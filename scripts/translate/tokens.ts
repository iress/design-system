import { execSync } from 'child_process';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '../..');

export async function translateTokens() {
  execSync('tsx ./scripts/generate-token-reference.ts', { cwd: ROOT, stdio: 'inherit' });
}
