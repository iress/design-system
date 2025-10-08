#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import JSON5 from 'json5';
import { designTokens } from '../src/schema/index';
import { createGeneratedDir } from './helpers/createGeneratedDir';
import { log } from './helpers/log';
import { mapTokensToCssVariables } from '../src/helpers/mapTokensToCssVariables';
import { crush } from 'radash';

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * This plugin generates a `css-vars.ts` file in the `src/generated` directory that contains the schema mapped to CSS variables.
 * This is used to map the schema to CSS variables for use in downstream applications.
 * @returns {Plugin} VitePlugin to be added to the `plugins` array in the Vite config
 */
const generateCssVars = () => ({
  name: 'generate-css-vars',
  enforce: 'pre',
  async buildStart() {
    // Generate CSS vars file synchronously before any other build steps
    await generateMapFile();
  },
});

const generateMapFile = async () => {
  // Ensure we're working from the correct directory
  const tokensDir = path.resolve(__dirname, '..');
  process.chdir(tokensDir);

  await createGeneratedDir();

  log.title('Generating CSS variables');

  const mapped = mapTokensToCssVariables(designTokens, {
    addCompositeTokens: true,
  });

  const cssVarsContent = [
    `export const cssVars = ${JSON5.stringify(mapped, null, 2)} as const;`,
    'export default cssVars;',
  ].join('\n');

  const outputPath = path.join('src', 'generated', 'css-vars.ts');
  await fs.promises.writeFile(outputPath, cssVarsContent);

  const cssStylesheet = Object.entries(crush(mapped))
    .map(([key, value]) => {
      return `  --${key.replaceAll('.', '-')}: ${value};`;
    })
    .join('\n');

  const cssOutputPath = path.join('build', 'css-vars.css');
  await fs.promises.rm(path.join('build'), {
    force: true,
    recursive: true,
  });
  await fs.promises.mkdir(path.join('build'));
  await fs.promises.writeFile(
    cssOutputPath,
    [':root {', cssStylesheet, '}'].join('\n'),
  );

  log.message(`CSS variables generated at ${outputPath}`);
  log.message(`CSS stylesheet created at ${cssOutputPath}\n`);
};

// Main execution function for standalone script
const main = async () => {
  try {
    await generateMapFile();
    process.exit(0);
  } catch (error) {
    console.error('Error generating CSS variables:', error);
    process.exit(1);
  }
};

// Export the original plugin function for Vite usage
export default generateCssVars;

// CLI execution - only runs when script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}
