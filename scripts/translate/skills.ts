import { execSync } from 'child_process';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '../..');

export async function translateSkills() {
  execSync('tsx ./scripts/translate-skills.ts', { cwd: ROOT, stdio: 'inherit' });
}
