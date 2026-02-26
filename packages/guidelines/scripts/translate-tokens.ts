/**
 * Tokens Translator: syncs tokens .ai/ manifest with current package version
 * and validates all referenced documentation files exist.
 *
 * The token documentation in .ai/tokens/*.md is hand-crafted reference material.
 * This script keeps the index.json manifest in sync (version, exports) and
 * validates file integrity.
 *
 * Usage: npx tsx packages/guidelines/scripts/translate-tokens.ts [--dry-run]
 */

import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// ─── Configuration ───────────────────────────────────────────

const TOKENS_PKG_DIR = path.resolve(
  import.meta.dirname,
  '../../../packages/tokens',
);
const AI_DIR = path.join(TOKENS_PKG_DIR, '.ai');
const MANIFEST_PATH = path.join(AI_DIR, 'index.json');
const DRY_RUN = process.argv.includes('--dry-run');

// ─── Main ────────────────────────────────────────────────────

async function main() {
  console.log('🔄 Tokens .ai/ sync starting...\n');

  // Read current package.json for version
  const pkgJson = JSON.parse(
    await fs.readFile(path.join(TOKENS_PKG_DIR, 'package.json'), 'utf-8'),
  );
  const version = pkgJson.version;

  // Read current manifest
  if (!existsSync(MANIFEST_PATH)) {
    console.error('❌ Missing index.json manifest at', MANIFEST_PATH);
    process.exit(1);
  }

  const manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf-8'));

  // Update version
  const oldVersion = manifest.version;
  manifest.version = version;

  // Validate all referenced files exist
  let errors = 0;
  const allDocs = manifest.documentation?.tokens ?? [];

  for (const doc of allDocs) {
    const docPath = path.join(AI_DIR, doc.path);
    if (!existsSync(docPath)) {
      console.error(`  ❌ Missing: ${doc.path} (${doc.name})`);
      errors++;
    } else {
      const stat = await fs.stat(docPath);
      if (stat.size === 0) {
        console.error(`  ❌ Empty: ${doc.path} (${doc.name})`);
        errors++;
      }
    }
  }

  // Validate .d.ts type declaration paths exist (if built)
  const distDir = path.join(TOKENS_PKG_DIR, 'dist');
  if (existsSync(distDir)) {
    for (const doc of allDocs) {
      if (doc.typeDeclPath) {
        const dtsPath = path.join(TOKENS_PKG_DIR, doc.typeDeclPath);
        if (!existsSync(dtsPath)) {
          console.warn(
            `  ⚠️  Type decl not found: ${doc.typeDeclPath} (run build first?)`,
          );
        }
      }
    }
  }

  // Write updated manifest
  if (!DRY_RUN) {
    await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  }

  // Summary
  console.log(`\n📦 Package version: ${oldVersion} → ${version}`);
  console.log(`📄 Documentation files: ${allDocs.length}`);
  console.log(`${errors === 0 ? '✅' : '❌'} Validation: ${errors} errors`);

  if (DRY_RUN) {
    console.log('\n(dry run — no files written)');
  }

  if (errors > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
