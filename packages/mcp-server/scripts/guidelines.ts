#!/usr/bin/env -S yarn tsx

import fs from 'fs';
import config from './config.js';
import { type DocItem } from './collect.js';
import path from 'path';

// Types
interface GuidelinesResult {
  successCount: number;
  failureCount: number;
}

// Utility functions for testing
export function checkDocItemsFileExists(docItemsFile: string): boolean {
  return fs.existsSync(docItemsFile);
}

export function readDocItems(docItemsFile: string): DocItem[] {
  return JSON.parse(fs.readFileSync(docItemsFile, 'utf-8')) as DocItem[];
}

export function filterGuidelinesItems(docItems: DocItem[]): DocItem[] {
  return docItems.filter(
    (item) =>
      item.status === 'completed' &&
      (item.id.startsWith('components_foundations-') ||
        item.id.startsWith('foundations-')),
  );
}

export function createSafeFileName(id: string): string {
  return id
    .replace(/[^a-z0-9-]/gi, '_') // Replace non-alphanumeric (excluding hyphens) with underscores
    .replace(/--+/g, '-') // Replace multiple hyphens with a single one
    .toLowerCase();
}

export function processGuidelineContent(content: string): string {
  return content
    .replace(/^# .+$/gm, '') // Remove h1 headers
    .replace(/^\n+/gm, '\n') // Clean up extra newlines
    .trim();
}

export function mergeGuidelines(
  guidelines: DocItem[],
  docsFolder: string,
): { mergedContent: string; result: GuidelinesResult } {
  let mergedContent = '# Design Guidelines\n\n';
  mergedContent +=
    'This document contains all design foundations and guidelines for the design system.\n\n';

  let successCount = 0;
  let failureCount = 0;

  for (const item of guidelines) {
    const safeFileName = createSafeFileName(item.id);

    try {
      const markdownContent = fs.readFileSync(
        path.join(docsFolder, `${safeFileName}.md`),
        'utf-8',
      );

      mergedContent += `## ${item.title}\n\n`;
      const processedContent = processGuidelineContent(markdownContent);
      mergedContent += processedContent + '\n\n';
      successCount++;
    } catch (error) {
      console.warn(`Warning: Error parsing ${item.title} (ID: ${item.id})`);
      console.log(error);
      failureCount++;
    }
  }

  return { mergedContent, result: { successCount, failureCount } };
}

export function writeGuidelinesFile(
  guidelinesFile: string,
  content: string,
): void {
  fs.mkdirSync(path.dirname(guidelinesFile), { recursive: true });
  fs.writeFileSync(guidelinesFile, content);
}

export function generateGuidelines(
  configOverride?: Partial<typeof config>,
): GuidelinesResult {
  const configObj = { ...config, ...configOverride };

  if (!checkDocItemsFileExists(configObj.docItemsFile)) {
    throw new Error(
      `Stories file not found: ${configObj.docItemsFile}. Please run "yarn collect" first.`,
    );
  }

  const docItems = readDocItems(configObj.docItemsFile);
  const guidelines = filterGuidelinesItems(docItems);

  if (guidelines.length === 0) {
    throw new Error(
      "No guidelines to process. Please run 'yarn generate' first.",
    );
  }

  console.log(
    `--- :file_folder:: Found ${guidelines.length} guidelines to process (out of ${docItems.length} total).`,
  );
  console.log(`--- :file_folder:: Output to: ${configObj.guidelinesFile}`);

  const { mergedContent, result } = mergeGuidelines(
    guidelines,
    configObj.docsFolder,
  );

  writeGuidelinesFile(configObj.guidelinesFile, mergedContent);

  console.log(
    `Successfully merged ${guidelines.length} foundations items into ${configObj.guidelinesFile}.`,
  );
  console.log(`--- :white_check_mark:: Guidelines creation complete.`);
  console.log(`✓ Success: ${result.successCount}`);
  console.log(`✗ Failures: ${result.failureCount}`);

  return result;
}

// CLI execution (only when run directly)
function main(): void {
  try {
    const result = generateGuidelines();
    process.exit(result.failureCount > 0 ? 1 : 0);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Only run main if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
