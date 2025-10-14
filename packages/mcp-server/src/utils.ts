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
 */
export function mapIressComponentToFile(componentName: string): string | null {
  // Remove 'Iress' prefix and convert to lowercase
  const baseComponentName = componentName.replace(/^Iress/, '').toLowerCase();

  const markdownFiles = getMarkdownFiles();

  // Try to find exact match first
  let matchingFile = markdownFiles.find(
    (file) => file === `components-${baseComponentName}-docs.md`,
  );

  // If no exact match, try partial matching
  matchingFile ??= markdownFiles.find(
    (file) =>
      file.startsWith(`components-${baseComponentName}`) &&
      file.endsWith('-docs.md'),
  );

  // If still no match, try fuzzy matching
  matchingFile ??= markdownFiles.find(
    (file) =>
      file.includes(baseComponentName) && file.startsWith('components-'),
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
