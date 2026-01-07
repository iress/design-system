/**
 * Utility functions for file operations and component mapping
 */
import * as fs from 'fs';
import { DOCS_DIR } from './config.js';

/**
 * Utility function to get all markdown files in the docs directory
 */
export function getMarkdownFiles(): string[] {
  try {
    if (!fs.existsSync(DOCS_DIR)) {
      return [];
    }

    const files = fs.readdirSync(DOCS_DIR, { recursive: true });
    return files
      .filter(
        (file: string | Buffer): file is string =>
          typeof file === 'string' && file.endsWith('.md'),
      )
      .map((file: string) => file);
  } catch (error) {
    console.error('Error reading docs directory:', error);
    return [];
  }
}

/**
 * Map Iress component names (e.g., IressButton) to their documentation files
 * Supports both components and patterns with hierarchical fallback:
 * 1. Exact component match
 * 2. Exact pattern match
 * 3. Partial component matching
 * 4. Partial pattern matching
 * 5. Fuzzy component matching
 * 6. Fuzzy pattern matching
 */
export function mapIressComponentToFile(componentName: string): string | null {
  // Remove 'Iress' prefix and convert to lowercase
  const baseComponentName = componentName.replace(/^Iress/, '').toLowerCase();

  const markdownFiles = getMarkdownFiles();

  // 1. Try exact component match first (maintain existing behavior)
  let matchingFile = markdownFiles.find(
    (file) => file === `components-${baseComponentName}-docs.md`,
  );

  // 2. Try exact pattern match
  matchingFile ??= markdownFiles.find(
    (file) => file === `patterns-${baseComponentName}-docs.md`,
  );

  // 3. Try partial component matching
  matchingFile ??= markdownFiles.find(
    (file) =>
      file.startsWith(`components-${baseComponentName}`) &&
      file.endsWith('-docs.md'),
  );

  // 4. Try partial pattern matching
  matchingFile ??= markdownFiles.find(
    (file) =>
      file.startsWith(`patterns-${baseComponentName}`) &&
      file.endsWith('-docs.md'),
  );

  // 5. Try fuzzy component matching
  matchingFile ??= markdownFiles.find(
    (file) =>
      file.includes(baseComponentName) && file.startsWith('components-'),
  );

  // 6. Try fuzzy pattern matching
  matchingFile ??= markdownFiles.find(
    (file) => file.includes(baseComponentName) && file.startsWith('patterns-'),
  );

  return matchingFile ?? null;
}

/**
 * Extract Iress component names from text (e.g., IressButton, IressInput)
 */
export function extractIressComponents(text: string): string[] {
  const iressComponentRegex = /Iress[A-Z][a-zA-Z]*/g;
  const matches = text.match(iressComponentRegex) ?? [];
  return [...new Set(matches)]; // Remove duplicates
}

/**
 * Read file content safely
 */
export function readFileContent(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Check if file exists
 */
export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}
