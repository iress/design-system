#!/usr/bin/env tsx
/**
 * Icon Generation Script
 *
 * Generates React component TSX files from Material Symbols SVGs.
 * Reads SVGs from @material-symbols/svg-300 package and creates
 * lazy-loadable icon components.
 *
 * Usage: yarn generate:icons
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import {
  extractPathData,
  toComponentName,
  generateComponentContent,
  generateIndexContent,
  type IconData,
} from './generate-icons.utils';

// Re-export pure functions and types for backwards compatibility
export {
  extractPathData,
  toComponentName,
  generateComponentContent,
  generateIndexContent,
  type IconData,
} from './generate-icons.utils';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use require.resolve to find the package location (works with yarn workspaces)
const require = createRequire(import.meta.url);
const svgPackagePath = path.dirname(
  require.resolve('@material-symbols/svg-300/package.json'),
);

// Configuration
const SVG_SOURCE_DIR = path.join(svgPackagePath, 'rounded');
const OUTPUT_DIR = path.resolve(__dirname, '../src/components/Icon/generated');
async function readSVGFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(SVG_SOURCE_DIR);
    return files.filter((file) => file.endsWith('.svg'));
  } catch (error) {
    throw new Error(
      `Failed to read SVG source directory: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Process a single SVG file and return icon data
 */
async function processSVGFile(fileName: string): Promise<IconData> {
  const filePath = path.join(SVG_SOURCE_DIR, fileName);
  const svgContent = await fs.readFile(filePath, 'utf-8');
  const { path: pathData, viewBox } = await extractPathData(svgContent);

  // Determine if this is a filled variant
  const isFilled = fileName.endsWith('-fill.svg');
  const baseName = fileName.replace(/-fill\.svg$/, '').replace(/\.svg$/, '');
  const componentName = toComponentName(baseName, isFilled);

  return {
    name: baseName,
    componentName,
    pathData,
    viewBox,
    isFilled,
  };
}

/**
 * Write generated component to file
 */
async function writeComponentFile(
  iconData: IconData,
  fileName: string,
): Promise<void> {
  const outputPath = path.join(OUTPUT_DIR, fileName.replace('.svg', '.tsx'));
  const content = generateComponentContent(iconData);
  await fs.writeFile(outputPath, content, 'utf-8');
}

/**
 * Generate index file with all exports (for type checking)
 */
async function generateIndexFile(iconDataList: IconData[]): Promise<void> {
  const indexContent = generateIndexContent(iconDataList);

  const indexPath = path.join(OUTPUT_DIR, 'index.ts');
  await fs.writeFile(indexPath, indexContent, 'utf-8');
}

/**
 * Main generation function
 */
async function generateIconModules(): Promise<void> {
  console.log('🎨 Starting icon generation...\n');

  try {
    // Verify source directory exists
    await fs.access(SVG_SOURCE_DIR);
    console.log(`✓ Found SVG source directory: ${SVG_SOURCE_DIR}`);
  } catch {
    throw new Error(
      `SVG source directory not found: ${SVG_SOURCE_DIR}\n` +
        'Make sure @material-symbols/svg-300 is installed',
    );
  }

  // Read all SVG files
  console.log('\n📂 Reading SVG files...');
  const svgFiles = await readSVGFiles();
  console.log(`✓ Found ${svgFiles.length} SVG files`);

  // Clear and recreate output directory
  console.log('\n🗑️  Clearing output directory...');
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  console.log(`✓ Output directory ready: ${OUTPUT_DIR}`);

  // Process all SVG files in parallel batches
  console.log('\n⚙️  Processing SVG files...');
  const iconDataList: IconData[] = [];
  let processedCount = 0;
  const totalCount = svgFiles.length;
  const BATCH_SIZE = 100;

  for (let i = 0; i < svgFiles.length; i += BATCH_SIZE) {
    const batch = svgFiles.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(async (file) => {
        try {
          const iconData = await processSVGFile(file);
          await writeComponentFile(iconData, file);
          return iconData;
        } catch (error) {
          console.error(
            `⚠️  Failed to process ${file}: ${error instanceof Error ? error.message : String(error)}`,
          );
          return null;
        }
      }),
    );

    for (const result of results) {
      if (result) {
        iconDataList.push(result);
        processedCount++;
      }
    }

    // Log progress every 500 files
    if (processedCount % 500 < BATCH_SIZE && processedCount >= 500) {
      console.log(`  Progress: ${processedCount}/${totalCount} files...`);
    }
  }

  // Generate index file
  console.log('\n📝 Generating index file...');
  await generateIndexFile(iconDataList);

  // Summary
  console.log('\n✅ Icon generation complete!');
  console.log(`   Generated: ${processedCount} icon components`);
  console.log(`   Output: ${OUTPUT_DIR}`);

  // Count variants
  const filledCount = iconDataList.filter((icon) => icon.isFilled).length;
  const outlineCount = iconDataList.length - filledCount;
  console.log(`   Outline: ${outlineCount} icons`);
  console.log(`   Filled: ${filledCount} icons`);
  console.log(`   Total unique icons: ${outlineCount}`);
}

// Run the generation
generateIconModules().catch((error) => {
  console.error('\n❌ Generation failed:', error);
  process.exit(1);
});
