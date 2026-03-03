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
import { parseStringPromise } from 'xml2js';
import { createRequire } from 'module';

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

interface IconData {
  name: string;
  componentName: string;
  pathData: string;
  viewBox: string;
  isFilled: boolean;
}

interface SvgAttributes {
  d: string;
  viewBox?: string;
}

interface PathElement {
  $: SvgAttributes;
}

interface SvgElement {
  $: { viewBox?: string };
  path?: PathElement[];
}

interface ParsedSvg {
  svg: SvgElement;
}

/**
 * Extract path data and viewBox from SVG content
 */
async function extractPathData(
  svgContent: string,
): Promise<{ path: string; viewBox: string }> {
  try {
    const parsed = (await parseStringPromise(svgContent)) as ParsedSvg;
    const svgElement = parsed.svg;

    if (!svgElement?.path?.[0]) {
      throw new Error('Invalid SVG structure: missing path element');
    }

    const pathElement = svgElement.path[0];
    const pathData = pathElement.$.d;
    const viewBox = svgElement.$.viewBox ?? '0 -960 960 960';

    return { path: pathData, viewBox };
  } catch (error) {
    throw new Error(
      `Failed to parse SVG: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Convert snake_case icon name to PascalCase component name
 * Handles icon names that start with numbers by prepending "Icon"
 * Adds "Fill" suffix for filled variants to avoid naming conflicts
 */
function toComponentName(iconName: string, isFilled = false): string {
  const pascalCase = iconName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const startsWithNumber = /^\d/.test(pascalCase);

  if (startsWithNumber) {
    // For icons starting with numbers: Icon10k or Icon10kFill
    return isFilled ? `Icon${pascalCase}Fill` : `Icon${pascalCase}`;
  } else {
    // For regular icons: HomeIcon or HomeFillIcon
    return isFilled ? `${pascalCase}FillIcon` : `${pascalCase}Icon`;
  }
}

/**
 * Generate React component TSX content
 */
function generateComponentContent(iconData: IconData): string {
  return `// Auto-generated from @material-symbols/svg-300
export const ${iconData.componentName} = () => (
  <svg
    viewBox="${iconData.viewBox}"
    width="100%"
    height="100%"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="${iconData.pathData}" />
  </svg>
);

export default ${iconData.componentName};
`;
}

/**
 * Read all SVG files from the source directory
 */
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
  const exports = iconDataList
    .map((icon) => {
      const fileName = icon.isFilled ? `${icon.name}-fill` : icon.name;
      return `export { ${icon.componentName} } from './${fileName}';`;
    })
    .join('\n');

  const indexContent = `// Auto-generated index file for icon components
// This file is used for type checking only
${exports}
`;

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

  // Process all SVG files
  console.log('\n⚙️  Processing SVG files...');
  const iconDataList: IconData[] = [];
  let processedCount = 0;
  const totalCount = svgFiles.length;

  for (const file of svgFiles) {
    try {
      const iconData = await processSVGFile(file);
      await writeComponentFile(iconData, file);
      iconDataList.push(iconData);
      processedCount++;

      // Log progress every 500 files
      if (processedCount % 500 === 0) {
        console.log(`  Progress: ${processedCount}/${totalCount} files...`);
      }
    } catch (error) {
      console.error(
        `⚠️  Failed to process ${file}: ${error instanceof Error ? error.message : String(error)}`,
      );
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
