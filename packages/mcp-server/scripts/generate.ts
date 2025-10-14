#!/usr/bin/env -S yarn tsx

import { chromium, type Page } from 'playwright';
import fs from 'fs';
import config from './config.js';
import TurndownService from 'turndown';
import minimist from 'minimist';
import { type DocItem } from './collect.js';
import { gfm } from 'turndown-plugin-gfm';
import path from 'path';

// Types
export interface Args {
  force?: boolean;
}

export interface PageEvaluateParams {
  timeout: number;
  primarySelector: string;
}

export interface ProcessingResult {
  successCount: number;
  failureCount: number;
}

// Exported utility functions for testing
export function checkDocItemsFileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

export function readDocItems(filePath: string): DocItem[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as DocItem[];
}

export function filterItemsToProcess(
  items: DocItem[],
  forceFlag: boolean,
): DocItem[] {
  return forceFlag
    ? items
    : items.filter(
        (item) => item.status !== 'completed' || item.last_processed_error,
      );
}

export function createSafeFileName(id: string): string {
  return id
    .replace(/[^a-z0-9-]/gi, '_') // Replace non-alphanumeric (excluding hyphens) with underscores
    .replace(/--+/g, '-') // Replace multiple hyphens with a single one
    .toLowerCase();
}

export function setupTurndownService(): TurndownService {
  const turndownService = new TurndownService();
  turndownService.use(gfm);
  return turndownService;
}

export function updateDocItemStatus(
  docItemsFile: string,
  items: DocItem[],
  index: number,
  item: DocItem,
  error?: string,
): DocItem[] {
  console.log(`Update ${docItemsFile}`);
  const updatedItems = [...items];
  updatedItems[index] = {
    ...item,
    status: error ? 'error' : 'completed',
    last_processed_timestamp: new Date().toISOString(),
    ...(error && { last_processed_error: error }),
  };
  fs.writeFileSync(docItemsFile, JSON.stringify(updatedItems, null, 2));
  return updatedItems;
}

export async function handleShowCodeButtons(page: Page): Promise<void> {
  try {
    const showCodeSelector =
      'div.sbdocs.sbdocs-preview button.css-1fdphfk, div.sbdocs.sbdocs-preview button.docblock-code-toggle';
    const showCodeButtons = await page.$$(showCodeSelector);
    console.log(
      `Found ${showCodeButtons.length} 'Show code' buttons to click for docs view.`,
    );
    for (const button of showCodeButtons) {
      try {
        await button.click();
        console.log(`Clicked a 'Show code' button.`);
        await page.waitForTimeout(1000);
      } catch (clickError) {
        console.warn(
          `Could not click a 'Show code' button: ${clickError instanceof Error ? clickError.message : String(clickError)}`,
        );
      }
    }
  } catch (findError) {
    console.warn(
      `Could not find or process 'Show code' buttons for docs view: ${findError instanceof Error ? findError.message : String(findError)}`,
    );
  }
}

export async function extractPageContent(
  page: Page,
  timeout: number,
  primarySelector: string,
): Promise<string> {
  return page.evaluate(
    async ({
      timeout,
      primarySelector,
    }: PageEvaluateParams): Promise<string> => {
      const selectorsToTry: string[] = [];
      selectorsToTry.push(primarySelector); // #storybook-docs for docs view
      selectorsToTry.push('div.css-1xrl4hz'); // Common wrapper in docs
      selectorsToTry.push('#root'); // General fallback
      selectorsToTry.push('body'); // Ultimate fallback for docs

      for (const selector of selectorsToTry) {
        try {
          if (selector !== 'body' && !document.querySelector(selector)) {
            await new Promise<Element>((resolve, reject) => {
              const el = document.querySelector(selector);
              if (el) return resolve(el);
              const observer = new MutationObserver((_mutationsList, obs) => {
                const el = document.querySelector(selector);
                if (el) {
                  obs.disconnect();
                  resolve(el);
                }
              });
              observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
              });
              setTimeout(() => {
                observer.disconnect();
                reject(
                  new Error(
                    `Timeout waiting for selector ${selector} in page.evaluate`,
                  ),
                );
              }, timeout / selectorsToTry.length);
            });
          }
          const element = document.querySelector(selector);
          if (element?.innerHTML.trim()) {
            console.log(
              `[Page Evaluate] Found content using selector: ${selector} for docs view.`,
            );

            // Remove unwanted prop section elements before getting innerHTML
            const unwantedSelectors =
              'div[class^="ids-styles--props-"], .sbdocs-toc--custom, style';
            const unwantedElements =
              element.querySelectorAll(unwantedSelectors);
            unwantedElements.forEach((el) => {
              console.log(
                `[Page Evaluate] Ignoring element: ${el.outerHTML.substring(
                  0,
                  100,
                )}...`,
              );
              el.remove();
            });

            return element.innerHTML;
          } else if (element) {
            console.log(
              `[Page Evaluate] Selector ${selector} found but innerHTML is empty for docs view.`,
            );
          } else {
            console.log(
              `[Page Evaluate] Selector ${selector} not found for docs view.`,
            );
          }
        } catch (e) {
          console.log(
            `[Page Evaluate] Error or timeout with selector ${selector}: ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      }

      // For docs view, if no specific selectors worked, fall back to body.innerHTML
      const triedSelectorsMessage =
        selectorsToTry.length > 1 && selectorsToTry.length - 1 > 0
          ? selectorsToTry.slice(0, -1).join(', ')
          : 'the primary one(s)';
      console.log(
        `[Page Evaluate] For docs view, no content found with selectors [${triedSelectorsMessage}]. Falling back to document.body.innerHTML.`,
      );
      // Remove unwanted elements from body as well if it's the fallback
      const bodyUnwantedSelectors = 'div[class^="ids-styles--props-"]';
      const bodyUnwantedElements = document.body.querySelectorAll(
        bodyUnwantedSelectors,
      );
      bodyUnwantedElements.forEach((el) => {
        console.log(
          `[Page Evaluate] Ignoring element from body: ${el.outerHTML.substring(
            0,
            100,
          )}...`,
        );
        el.remove();
      });
      return document.body.innerHTML;
    },
    {
      timeout,
      primarySelector,
    },
  );
}

export async function processPageItem(
  page: Page,
  item: DocItem,
  configObj: typeof config,
): Promise<string> {
  console.log(`--- Processing: "${item.title}" (ID: ${item.id}) ---`);

  await page.goto(item.url, {
    waitUntil: 'networkidle',
    timeout: configObj.browserTimeout,
  });

  try {
    await page.waitForSelector(configObj.storybookContentSelector, {
      timeout: configObj.selectorTimeout,
    });
    console.log(
      `General root element '${configObj.storybookContentSelector}' found for "${item.title}".`,
    );

    await handleShowCodeButtons(page);
  } catch (e) {
    console.warn(
      `Timed out waiting for general root element '${configObj.storybookContentSelector}' on "${item.title}". Content might be missing or delayed. Error: ${e instanceof Error ? e.message : String(e)}`,
    );
  }

  return extractPageContent(
    page,
    configObj.selectorTimeout,
    configObj.storybookContentSelector,
  );
}

export function convertHtmlToMarkdown(
  html: string,
  turndownService: TurndownService,
  item: DocItem,
  docsFolder: string,
): boolean {
  if (!html?.trim()) {
    console.log(`✗ No content found for: "${item.title}" (ID: ${item.id})`);
    return false;
  }

  console.log(`✓ Successfully extracted markdown for: "${item.title}"`);
  let markdownContent = turndownService.turndown(html);

  markdownContent = `${markdownContent}\n`
    .replaceAll('Hide code\n', '```\n')
    .replaceAll('Copy\n', '```\n');

  const safeFileName = createSafeFileName(item.id);
  fs.writeFileSync(
    path.join(docsFolder, `${safeFileName}.md`),
    markdownContent,
  );

  return true;
}

export async function generateDocumentation(
  args: Args = {},
  configOverride?: Partial<typeof config>,
): Promise<ProcessingResult> {
  const configObj = { ...config, ...configOverride };
  const forceFlag = !!args.force;

  if (!checkDocItemsFileExists(configObj.docItemsFile)) {
    throw new Error(
      `Docs item file not found: ${configObj.docItemsFile}. Please run "yarn collect" first.`,
    );
  }

  const docItems = readDocItems(configObj.docItemsFile);
  const itemsToProcess = filterItemsToProcess(docItems, forceFlag);

  if (itemsToProcess.length === 0) {
    console.log(
      "No items to process. All items are marked as 'completed' or list is empty. Use --force to process all.",
    );
    return { successCount: 0, failureCount: 0 };
  }

  console.log(
    `--- :file_folder:: Found ${itemsToProcess.length} items to process (out of ${docItems.length} total).`,
  );
  console.log(`--- :file_folder:: Output folder: ${configObj.docsFolder}`);
  fs.mkdirSync(configObj.docsFolder, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const turndownService = setupTurndownService();

  let successCount = 0;
  let failureCount = 0;
  let processedItems: DocItem[] = [...docItems];

  for (const [index, item] of itemsToProcess.entries()) {
    let page: Page | undefined;

    try {
      page = await browser.newPage();
      const htmlContent = await processPageItem(page, item, configObj);

      if (
        convertHtmlToMarkdown(
          htmlContent,
          turndownService,
          item,
          configObj.docsFolder,
        )
      ) {
        processedItems = updateDocItemStatus(
          configObj.docItemsFile,
          processedItems,
          index,
          item,
        );
        successCount++;
      } else {
        processedItems = updateDocItemStatus(
          configObj.docItemsFile,
          processedItems,
          index,
          item,
          'No content found in specified containers',
        );
        failureCount++;
      }
    } catch (error) {
      console.log(`✗ Error when processing: "${item.title}" (ID: ${item.id})`);
      console.log(
        `Error details: ${error instanceof Error ? error.message : String(error)}`,
      );
      processedItems = updateDocItemStatus(
        configObj.docItemsFile,
        processedItems,
        index,
        item,
        error instanceof Error ? error.message : String(error),
      );
      failureCount++;
    } finally {
      await page?.close();
    }
  }

  try {
    await browser.close();
  } catch (closeError) {
    console.log(
      `Error closing browser: ${closeError instanceof Error ? closeError.message : String(closeError)}`,
    );
  }

  console.log(`--- :white_check_mark:: Documentation generation complete.`);
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failures: ${failureCount}`);

  return { successCount, failureCount };
}

// CLI execution (only when run directly)
async function main() {
  const args = minimist(process.argv.slice(2)) as Args;

  try {
    const result = await generateDocumentation(args);
    process.exit(result.failureCount > 0 ? 1 : 0);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Only run main if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
}
