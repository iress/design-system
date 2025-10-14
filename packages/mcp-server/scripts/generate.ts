// TODO: Refactor this file to be testable, and create tests for it
import { chromium, type Page } from 'playwright';
import fs from 'fs';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import path from 'path';
import { Command } from 'commander';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// --- Type Definitions ---
interface DocsItem {
  text: string;
  link: string;
  originalItemId: string;
  status: 'pending' | 'completed' | 'error';
  processed_url?: string;
  last_processed_error?: string | null;
  last_processed_timestamp?: string;
}

interface ProcessedContent {
  markdownContent: string;
  processedUrl: string;
  error?: string;
}

interface UpdateItemDetails {
  processed_url?: string;
  status?: 'pending' | 'completed' | 'error';
  last_processed_error?: string | null;
  last_processed_timestamp?: string;
}

interface PageEvaluateParams {
  timeout: number;
  primarySelector: string;
}

interface CommandOptions {
  id?: string;
  force?: boolean;
}

const program = new Command();

// --- Constants ---
const DOCS_ITEMS_FILE = 'generated/index.json';
const MARKDOWN_FOLDER = 'generated/docs';
const GUIDELINES_FILE = 'generated/docs/guidelines.md';
const STORYBOOK_BASE_URL = process.env.STORYBOOK_BASE_URL;
if (!STORYBOOK_BASE_URL) {
  console.error('Error: STORYBOOK_BASE_URL environment variable is required.');
  console.error(
    'Please create a .env file with STORYBOOK_BASE_URL=http://your-storybook-url:port/',
  );
  process.exit(1);
}
const STORYBOOK_MAIN_PAGE_URL = `${STORYBOOK_BASE_URL}?path=/docs/introduction--docs`;
const BROWSER_TIMEOUT = 0; // Reduced from 45000
const SELECTOR_TIMEOUT = 10000; // Reduced from 20000
const IFRAME_SELECTOR_TIMEOUT = 10000; // Reduced from 15000

// --- Helper Functions ---

function ensureMarkdownFolderExists(): void {
  if (!fs.existsSync(MARKDOWN_FOLDER)) {
    fs.mkdirSync(MARKDOWN_FOLDER, { recursive: true });
    console.log(`Created folder: ${MARKDOWN_FOLDER}`);
  }
}

function loadDocsItemsData(): DocsItem[] | null {
  if (!fs.existsSync(DOCS_ITEMS_FILE)) {
    console.error(
      `Error: ${DOCS_ITEMS_FILE} not found. Please run 'yarn generate list' command first.`,
    );
    process.exit(1);
  }
  try {
    const fileContent = fs.readFileSync(DOCS_ITEMS_FILE, 'utf8');
    return JSON.parse(fileContent) as DocsItem[];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `Error reading or parsing ${DOCS_ITEMS_FILE}: ${errorMessage}`,
    );
    return null;
  }
}

function findItemById(
  docsItemsData: DocsItem[],
  itemId: string,
): DocsItem | undefined {
  return docsItemsData.find((item) => item.originalItemId === itemId);
}

function saveMarkdownFile(
  itemId: string,
  markdownContent: string,
): string | null {
  const safeFileName = itemId
    .replace(/[^a-z0-9-]/gi, '_') // Replace non-alphanumeric (excluding hyphens) with underscores
    .replace(/--+/g, '-') // Replace multiple hyphens with a single one
    .toLowerCase();
  const markdownFilePath = path.join(MARKDOWN_FOLDER, `${safeFileName}.md`);
  try {
    fs.writeFileSync(markdownFilePath, markdownContent);
    console.log(`Saved markdown file: ${markdownFilePath}`);
    return markdownFilePath;
  } catch (error) {
    console.error(
      `Error saving markdown file ${markdownFilePath}: ${error instanceof Error ? error.message : String(error)}`,
    );
    return null;
  }
}

function updateDocsItem(
  itemIdToUpdate: string,
  updatedItemDetails: UpdateItemDetails,
): void {
  const docsItemsData = loadDocsItemsData();
  if (!docsItemsData) return;

  const itemIndex = docsItemsData.findIndex(
    (item) => item.originalItemId === itemIdToUpdate,
  );

  if (itemIndex === -1) {
    console.error(
      `Error: Item with ID ${itemIdToUpdate} not found in ${DOCS_ITEMS_FILE} for update.`,
    );
    return;
  }

  docsItemsData[itemIndex] = {
    ...docsItemsData[itemIndex],
    ...updatedItemDetails,
  };

  try {
    fs.writeFileSync(DOCS_ITEMS_FILE, JSON.stringify(docsItemsData, null, 2));
    console.log(`Updated ${DOCS_ITEMS_FILE} for item ${itemIdToUpdate}`);
  } catch (error) {
    console.error(
      `Error updating ${DOCS_ITEMS_FILE}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Core logic to fetch content from a storybook iframe for docs view, extract HTML, and convert to Markdown.
 */
async function fetchAndProcessDocsContent(
  page: Page,
  item: DocsItem,
  turndownService: TurndownService,
): Promise<ProcessedContent> {
  const contentUrl = new URL(
    `iframe.html?viewMode=docs&id=${item.originalItemId}`,
    STORYBOOK_BASE_URL,
  ).toString();
  const mainContentSelector = '#storybook-docs';

  console.log(
    `Processing docs item: "${item.text}" - URL: ${contentUrl} (ViewMode: docs)`,
  );

  let markdownContent = '';
  let htmlContentToConvert = '';

  try {
    await page.goto(contentUrl, {
      waitUntil: 'networkidle',
      timeout: BROWSER_TIMEOUT,
    });

    try {
      await page.waitForSelector(mainContentSelector, {
        timeout: SELECTOR_TIMEOUT,
      });
      console.log(
        `General root element '${mainContentSelector}' found for "${item.text}".`,
      );

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
    } catch (e) {
      console.warn(
        `Timed out waiting for general root element '${mainContentSelector}' on "${item.text}". Content might be missing or delayed. Error: ${e instanceof Error ? e.message : String(e)}`,
      );
    }

    htmlContentToConvert = await page.evaluate(
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
              const unwantedSelectors = 'div[class^="ids-styles--props-"]';
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
        timeout: IFRAME_SELECTOR_TIMEOUT,
        primarySelector: mainContentSelector,
      },
    );

    if (htmlContentToConvert?.trim()) {
      markdownContent = turndownService.turndown(htmlContentToConvert);
      console.log(`Successfully extracted markdown for: "${item.text}"`);
    } else {
      console.log(
        `Page for "${item.text}" had empty or no relevant content after trying all selectors.`,
      );
      markdownContent =
        '<!-- Page content was empty or not found in specified containers -->';
    }
    return { markdownContent, processedUrl: contentUrl };
  } catch (error) {
    console.error(
      `Error processing page ${contentUrl} for markdown (item: "${item.text}"): ${error instanceof Error ? error.message : String(error)}`,
    );
    return {
      markdownContent: `<!-- Error extracting markdown: ${error instanceof Error ? error.message.replace(/</g, '&lt;').replace(/>/g, '&gt;') : String(error).replace(/</g, '&lt;').replace(/>/g, '&gt;')} -->`,
      processedUrl: contentUrl,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Core logic to fetch content from a storybook iframe, extract HTML, and convert to Markdown.
 */
async function fetchAndProcessItemContent(
  page: Page,
  item: DocsItem,
  turndownService: TurndownService,
): Promise<ProcessedContent> {
  return fetchAndProcessDocsContent(page, item, turndownService);
}

// --- CLI Commands ---

program
  .command('list')
  .description(
    `Extracts sidebar links from Storybook and saves them to ${DOCS_ITEMS_FILE}.`,
  )
  .action(async (): Promise<void> => {
    console.log('Starting: Generate Documentation Items List');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const extractedItems: DocsItem[] = [];

    console.log(
      `Navigating to Storybook main page: ${STORYBOOK_MAIN_PAGE_URL}`,
    );
    try {
      await page.goto(STORYBOOK_MAIN_PAGE_URL, {
        waitUntil: 'networkidle',
        timeout: BROWSER_TIMEOUT,
      });

      // Wait for the main navigation/sidebar to be somewhat loaded
      await page.waitForSelector('nav', { timeout: SELECTOR_TIMEOUT });

      // Attempt to expand all collapsible sections in the sidebar
      console.log('Attempting to expand all collapsible sidebar sections...');
      let expandableButtons = await page
        .locator('nav button[aria-expanded="false"]')
        .all();
      let attempts = 0;
      const maxAttempts = 10; // Safeguard against infinite loops

      while (expandableButtons.length > 0 && attempts < maxAttempts) {
        console.log(
          `Found ${
            expandableButtons.length
          } collapsed sections to expand (attempt ${attempts + 1}).`,
        );
        for (const button of expandableButtons) {
          try {
            if (await button.isVisible()) {
              const buttonText = (
                ((await button.innerText()) ||
                  (await button.getAttribute('aria-label'))) ??
                'Unknown Button'
              )
                .trim()
                .substring(0, 50);
              console.log(`  Clicking to expand: "${buttonText}..."`);
              await button.click({ timeout: 3000 });
              await page.waitForTimeout(300); // Wait for DOM updates
            }
          } catch (e) {
            console.warn(
              `  Warning during expansion click: ${e instanceof Error ? e.message.split('\n')[0] : String(e).split('\n')[0]}`,
            );
            // If a button becomes stale, we break to re-fetch the list of buttons
            break;
          }
        }
        attempts++;
        // Re-query for expandable buttons
        expandableButtons = await page
          .locator('nav button[aria-expanded="false"]')
          .all();
      }
      if (attempts >= maxAttempts && expandableButtons.length > 0) {
        console.warn(
          'Reached max attempts trying to expand sidebar sections. Some sections might still be collapsed.',
        );
      }
      console.log('Finished attempting to expand sidebar sections.');
      await page.waitForTimeout(1000); // Final wait for DOM to fully settle

      // Wait for links to be loaded in the sidebar (re-check after expansion)
      await page.waitForSelector('a[href^="/?path="]', {
        timeout: SELECTOR_TIMEOUT,
      });

      // Get all links with href starting with "/?path"
      const links = await page.$$('a[href^="/?path="]');
      console.log(
        `Found ${links.length} links with href starting with "/?path" after expansion.`,
      );

      for (const link of links) {
        const href = await link.getAttribute('href');
        const textContent = await link.innerText();

        // Process links that strictly start with "/?path=/docs/"
        if (href?.startsWith('/?path=/docs/')) {
          console.log(`Processing docs link: ${href}, text: "${textContent}"`);
          const itemId = href.substring('/?path=/docs/'.length);

          // Ensure itemId is not empty and textContent is valid before pushing
          if (itemId) {
            extractedItems.push({
              text: typeof textContent === 'string' ? textContent.trim() : '',
              link: new URL(href, STORYBOOK_BASE_URL).toString(),
              originalItemId: itemId,
              status: 'pending',
            });
          } else {
            console.warn(
              `Skipping link with empty itemId: ${href}, text: "${textContent}"`,
            );
          }
        }
      }

      // Filter out specific items like "Sandbox"
      const itemsToExclude = ['sandbox']; // Add more item texts here later if needed (lowercase)
      const filteredItems = extractedItems.filter(
        (item) => !itemsToExclude.includes(item.text.toLowerCase()),
      );

      if (filteredItems.length > 0) {
        const filePath = path.dirname(DOCS_ITEMS_FILE);

        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
          console.log(`Created directory: ${filePath}`);
        }

        fs.writeFileSync(
          DOCS_ITEMS_FILE,
          JSON.stringify(filteredItems, null, 2), // Save filtered items
        );
        console.log(
          `Successfully extracted ${extractedItems.length} items, filtered down to ${filteredItems.length}, and saved to ${DOCS_ITEMS_FILE}`,
        );
      } else {
        console.log('No valid items found to extract after filtering.');
      }
    } catch (error) {
      console.error(
        `Error during list generation: ${error instanceof Error ? error.message : String(error)}`,
      );
      console.error(
        'Stack trace:',
        error instanceof Error ? error.stack : 'No stack trace available',
      );
    } finally {
      await browser.close();
      console.log('Finished: Generate Documentation Items List');
    }
  });

program
  .command('fetch-one')
  .description(
    `Fetches and processes a single item from ${DOCS_ITEMS_FILE} by its ID, saves markdown.`,
  )
  .requiredOption('--id <id>', 'The originalItemId of the item to fetch')
  .option(
    '--force',
    'Force reprocessing of all items, even if already completed.',
  )
  .action(async (options: CommandOptions): Promise<void> => {
    console.log(`Starting: Fetch One Item (ID: ${options.id})`);
    ensureMarkdownFolderExists();
    const docsItems = loadDocsItemsData();
    if (!docsItems) return;

    const itemToProcess = findItemById(docsItems, options.id!);
    if (!itemToProcess) {
      console.error(
        `Error: Item with ID "${options.id}" not found in ${DOCS_ITEMS_FILE}.`,
      );
      return;
    }

    if (
      !options.force &&
      itemToProcess.status === 'completed' &&
      !itemToProcess.last_processed_error
    ) {
      console.log(
        `Item "${itemToProcess.text}" (ID: ${options.id}) has already been processed successfully. Skipping.`,
      );
      return;
    }

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const turndownService = new TurndownService();
    turndownService.use(gfm);

    const { markdownContent, processedUrl, error } =
      await fetchAndProcessItemContent(page, itemToProcess, turndownService);

    if (markdownContent) {
      saveMarkdownFile(itemToProcess.originalItemId, markdownContent);
      updateDocsItem(itemToProcess.originalItemId, {
        processed_url: processedUrl,
        status: error ? 'error' : 'completed',
        last_processed_error: error ?? null,
        last_processed_timestamp: new Date().toISOString(),
      });
    } else {
      updateDocsItem(itemToProcess.originalItemId, {
        status: 'error',
        last_processed_error: 'No markdown content generated.',
        last_processed_timestamp: new Date().toISOString(),
      });
    }

    await browser.close();
    console.log('Finished: Fetch One Item');
  });

program
  .command('fetch-all')
  .description(
    `Fetches and processes all 'pending' or 'error' items from ${DOCS_ITEMS_FILE}, saves markdown.`,
  )
  .option(
    '--force',
    'Force reprocessing of all items, even if already completed.',
  )
  .action(async (options: CommandOptions): Promise<void> => {
    console.log('Starting: Fetch All Items');
    ensureMarkdownFolderExists();
    const docsItems = loadDocsItemsData();
    if (!docsItems) return;

    const itemsToProcess = options.force
      ? docsItems
      : docsItems.filter(
          (item) => item.status !== 'completed' || item.last_processed_error,
        );

    if (itemsToProcess.length === 0) {
      console.log(
        "No items to process. All items are marked as 'completed' or list is empty. Use --force to reprocess all.",
      );
      return;
    }

    console.log(
      `Found ${itemsToProcess.length} items to process (out of ${docsItems.length} total).`,
    );

    const browser = await chromium.launch({ headless: true });
    const turndownService = new TurndownService(); // Initialize once
    turndownService.use(gfm);

    for (const item of itemsToProcess) {
      let page: Page | undefined; // Declare page here to be accessible in finally
      try {
        page = await browser.newPage(); // Create a new page for each item
        console.log(
          `--- Processing: "${item.text}" (ID: ${item.originalItemId}) ---`,
        );
        const { markdownContent, processedUrl, error } =
          await fetchAndProcessItemContent(page, item, turndownService);

        if (markdownContent) {
          saveMarkdownFile(item.originalItemId, markdownContent);
          updateDocsItem(item.originalItemId, {
            processed_url: processedUrl,
            status: error ? 'error' : 'completed',
            last_processed_error: error ?? null,
            last_processed_timestamp: new Date().toISOString(),
          });
        } else {
          updateDocsItem(item.originalItemId, {
            status: 'error',
            last_processed_error:
              'No markdown content generated during fetch-all.',
            last_processed_timestamp: new Date().toISOString(),
          });
        }
      } catch (loopError) {
        console.error(
          `Error in fetch-all loop for item ${item.originalItemId}: ${loopError instanceof Error ? loopError.message : String(loopError)}`,
        );
        // Ensure item status is updated in case of unexpected errors within the loop
        updateDocsItem(item.originalItemId, {
          status: 'error',
          last_processed_error: `Critical error in fetch-all loop: ${loopError instanceof Error ? loopError.message : String(loopError)}`,
          last_processed_timestamp: new Date().toISOString(),
        });
      } finally {
        if (page) {
          await page.close(); // Close the page after processing each item
        }
      }
    }

    await browser.close(); // Close browser after all items are processed
    console.log('Finished: Fetch All Items');
  });

/**
 * Helper function to filter items that start with "foundations-"
 */
function getFoundationsItems(docsItems: DocsItem[]): DocsItem[] {
  return docsItems.filter(
    (item) =>
      item.originalItemId.startsWith('foundations-') &&
      item.status === 'completed',
  );
}

/**
 * Helper function to read existing markdown file content
 */
function readMarkdownFile(itemId: string): string | null {
  const safeFileName = itemId
    .replace(/[^a-z0-9-]/gi, '_')
    .replace(/--+/g, '-')
    .toLowerCase();
  const markdownFilePath = path.join(MARKDOWN_FOLDER, `${safeFileName}.md`);

  try {
    if (fs.existsSync(markdownFilePath)) {
      return fs.readFileSync(markdownFilePath, 'utf8');
    }
  } catch (error) {
    console.warn(
      `Warning: Could not read markdown file ${markdownFilePath}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  return null;
}

/**
 * Helper function to merge foundations items into guidelines.md
 */
function mergeFoundationsIntoGuidelines(foundationsItems: DocsItem[]): boolean {
  let mergedContent = '# Design Guidelines\n\n';
  mergedContent +=
    'This document contains all design foundations and guidelines for the design system.\n\n';

  let hasContent = false;

  for (const item of foundationsItems) {
    const markdownContent = readMarkdownFile(item.originalItemId);
    if (markdownContent) {
      hasContent = true;
      // Add a section header based on the item text
      mergedContent += `## ${item.text}\n\n`;
      // Add the content, removing any existing top-level headers to avoid conflicts
      const processedContent = markdownContent
        .replace(/^# .+$/gm, '') // Remove h1 headers
        .replace(/^\n+/gm, '\n') // Clean up extra newlines
        .trim();
      mergedContent += processedContent + '\n\n';
    } else {
      console.warn(
        `Warning: No markdown content found for foundations item: ${item.text} (ID: ${item.originalItemId})`,
      );
    }
  }

  if (!hasContent) {
    console.log(
      'No markdown content found for any foundations items. Guidelines file not created.',
    );
    return false;
  }

  try {
    const guidelinesDir = path.dirname(GUIDELINES_FILE);
    if (!fs.existsSync(guidelinesDir)) {
      fs.mkdirSync(guidelinesDir, { recursive: true });
    }

    fs.writeFileSync(GUIDELINES_FILE, mergedContent);
    console.log(
      `Successfully merged ${foundationsItems.length} foundations items into ${GUIDELINES_FILE}`,
    );
    return true;
  } catch (error) {
    console.error(
      `Error writing guidelines file ${GUIDELINES_FILE}: ${error instanceof Error ? error.message : String(error)}`,
    );
    return false;
  }
}

program
  .command('guidelines')
  .description(
    `Fetches all foundations items (originalItemId starting with 'foundations-') and merges them into ${GUIDELINES_FILE}.`,
  )
  .action(() => {
    console.log('Starting: Fetch Guidelines');
    ensureMarkdownFolderExists();
    const docsItems = loadDocsItemsData();
    if (!docsItems) return;

    const foundationsItems = getFoundationsItems(docsItems);

    if (foundationsItems.length === 0) {
      console.log('No foundations items found in the docs items list.');
      return;
    }

    console.log(`Found ${foundationsItems.length} foundations items to merge.`);

    // Now merge all foundations items into guidelines.md
    const success = mergeFoundationsIntoGuidelines(foundationsItems);

    if (success) {
      console.log(
        'Finished: Fetch Guidelines - Successfully created guidelines file',
      );
    } else {
      console.log(
        'Finished: Fetch Guidelines - Failed to create guidelines file',
      );
    }
  });

// Make script executable - only run if this file is executed directly (not imported)
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
