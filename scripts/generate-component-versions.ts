#!/usr/bin/env tsx

/**
 * Generates a JSON map of component → last released version using git history.
 *
 * For each component directory under packages/components/src/components/,
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
const COMPONENTS_DIR = path.join(
  ROOT,
  'packages/components/src/components',
);
const OUTPUT = path.join(
  ROOT,
  'packages/components/.storybook/component-versions.json',
);
const TAG_PREFIX = '@iress-oss/ids-components@';

function exec(cmd: string): string {
  return execSync(cmd, { cwd: ROOT, encoding: 'utf-8' }).trim();
}

async function main() {
  const entries = await fs.readdir(COMPONENTS_DIR, { withFileTypes: true });
  const dirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  const versions: Record<string, string> = {};

  for (const dir of dirs) {
    const relPath = `packages/components/src/components/${dir}`;

    try {
      const lastCommit = exec(
        `git log -1 --format=%H -- "${relPath}"`,
      );

      if (!lastCommit) continue;

      const tag = exec(
        `git tag --contains ${lastCommit} --list '${TAG_PREFIX}*' --sort=version:refname`,
      )
        .split('\n')
        .filter(Boolean)[0];

      if (tag) {
        // Strip the package scope prefix to get just the version
        versions[dir] = tag.replace(TAG_PREFIX, '');
      } else {
        versions[dir] = 'unknown';
      }
    } catch {
      // Component has no git history (new/untracked) — skip
    }
  }

  await fs.writeFile(OUTPUT, JSON.stringify(versions, null, 2) + '\n');
  console.log(
    `Generated component versions for ${Object.keys(versions).length} components → ${OUTPUT}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
