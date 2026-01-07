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

  // 1. Try exact component match with namespace prefix (e.g., components_components-button-docs.md)
  let matchingFile = markdownFiles.find(
    (file) => file === `components_components-${baseComponentName}-docs.md`,
  );

  // 2. Try exact pattern match with namespace prefix (e.g., components_patterns-form-docs.md)
  matchingFile ??= markdownFiles.find(
    (file) => file === `components_patterns-${baseComponentName}-docs.md`,
  );

  // 3. Try exact component match without namespace (legacy support)
  matchingFile ??= markdownFiles.find(
    (file) => file === `components-${baseComponentName}-docs.md`,
  );

  // 4. Try exact pattern match without namespace (legacy support)
  matchingFile ??= markdownFiles.find(
    (file) => file === `patterns-${baseComponentName}-docs.md`,
  );

  // 5. Try partial component matching with namespace
  matchingFile ??= markdownFiles.find(
    (file) =>
      file.startsWith(`components_components-${baseComponentName}`) &&
      file.endsWith('-docs.md'),
  );

  // 6. Try partial pattern matching with namespace
  matchingFile ??= markdownFiles.find(
    (file) =>
      file.startsWith(`components_patterns-${baseComponentName}`) &&
      file.endsWith('-docs.md'),
  );

  // 7. Try partial component matching without namespace (legacy)
  matchingFile ??= markdownFiles.find(
    (file) =>
      file.startsWith(`components-${baseComponentName}`) &&
      file.endsWith('-docs.md'),
  );

  // 8. Try partial pattern matching without namespace (legacy)
  matchingFile ??= markdownFiles.find(
    (file) =>
      file.startsWith(`patterns-${baseComponentName}`) &&
      file.endsWith('-docs.md'),
  );

  // 9. Try fuzzy component matching (with namespace first)
  matchingFile ??= markdownFiles.find(
    (file) =>
      file.includes(baseComponentName) &&
      file.startsWith('components_components-'),
  );

  // 10. Try fuzzy pattern matching (with namespace first)
  matchingFile ??= markdownFiles.find(
    (file) =>
      file.includes(baseComponentName) &&
      file.startsWith('components_patterns-'),
  );

  // 11. Try fuzzy component matching (without namespace, legacy)
  matchingFile ??= markdownFiles.find(
    (file) =>
      file.includes(baseComponentName) && file.startsWith('components-'),
  );

  // 12. Try fuzzy pattern matching (without namespace, legacy)
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
 * Parse a query string to extract multiple component names
 * Supports both "IressForm IressSelect" and "Form Select" formats
 */
export function parseMultiComponentQuery(query: string): string[] {
  // First try to extract Iress-prefixed components
  const iressComponents = extractIressComponents(query);
  if (iressComponents.length > 1) {
    return iressComponents;
  }

  // Try splitting by whitespace for queries like "Form Select Button"
  const words = query
    .split(/\s+/)
    .map((word) => word.trim())
    // Remove punctuation from words
    .map((word) => word.replace(/[.,;!?]+$/g, ''))
    .filter((word) => word.length > 0);

  // Filter for potential component names
  // - Must be at least 3 characters
  // - Should start with capital letter (PascalCase)
  // - Exclude common words that aren't components
  const EXCLUDED_WORDS = new Set([
    'and',
    'or',
    'the',
    'with',
    'for',
    'from',
    'to',
    'in',
    'on',
    'a',
    'an',
    'is',
    'are',
    'was',
    'were',
    'has',
    'have',
  ]);

  const potentialComponents = words.filter((word) => {
    if (word.length < 3) return false;
    if (EXCLUDED_WORDS.has(word.toLowerCase())) return false;
    if (!/^[A-Z]/.test(word)) return false; // Must start with capital
    return true;
  });

  if (potentialComponents.length > 1) {
    // Add "Iress" prefix if not present
    return potentialComponents.map((name) =>
      name.startsWith('Iress') ? name : `Iress${name}`,
    );
  }

  // Return empty array to signal single-component search
  return [];
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
