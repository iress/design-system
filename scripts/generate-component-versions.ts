#!/usr/bin/env tsx

/**
 * Generates a JSON map of component/pattern → last released version using git history.
 *
 * For each directory under packages/components/src/{components,patterns}/,
 * it finds the last commit that touched that directory, then finds the earliest
 * @iress-oss/ids-components release tag containing that commit.
 *
 * Output: packages/components/.storybook/component-versions.json
 *
 * Usage: npx tsx scripts/generate-component-versions.ts
 */

import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'packages/components/src');
const OUTPUT = path.join(
  ROOT,
  'packages/components/.storybook/component-versions.json',
);
const TAG_PREFIX = '@iress-oss/ids-components@';
const SCAN_DIRS = ['components', 'patterns'] as const;

function exec(cmd: string): string {
  return execSync(cmd, { cwd: ROOT, encoding: 'utf-8' }).trim();
}

function getVersion(relPath: string): string | undefined {
  try {
    const lastCommit = exec(`git log -1 --format=%H -- "${relPath}"`);
    if (!lastCommit) return undefined;

    const tag = exec(
      `git tag --contains ${lastCommit} --list '${TAG_PREFIX}*' --sort=version:refname`,
    )
      .split('\n')
      .filter(Boolean)[0];

    return tag ? tag.replace(TAG_PREFIX, '') : 'unknown';
  } catch {
    return undefined;
  }
}

async function main() {
  const versions: Record<string, string> = {};

  for (const scanDir of SCAN_DIRS) {
    const fullDir = path.join(SRC_DIR, scanDir);
    const entries = await fs.readdir(fullDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const relPath = `packages/components/src/${scanDir}/${entry.name}`;
      const version = getVersion(relPath);
      if (version) versions[entry.name] = version;
    }
  }

  await fs.writeFile(OUTPUT, JSON.stringify(versions, null, 2) + '\n');
  console.log(
    `Generated versions for ${Object.keys(versions).length} entries → ${OUTPUT}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
