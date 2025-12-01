#!/usr/bin/env -S yarn tsx

import { chromium } from 'playwright';
import fs from 'fs';
import config from './config.js';

// Types
export interface DocItem {
  id: string;
  title: string;
  url: string;
  link: string;
  status: 'pending' | 'completed' | 'error';
  processed_url?: string;
  last_processed_error?: string | null;
  last_processed_timestamp?: string;
}

export interface Dependencies {
  fs: typeof fs;
  chromium: typeof chromium;
  console: typeof console;
}

interface StorybookRef {
  title: string;
  url: string;
  id: string;
}

export function createFolder(
  folderPath: string,
  deps: Dependencies = { fs, chromium, console },
): void {
  deps.console.log(`--- :open_file_folder:: Make folder: ${folderPath}`);
  deps.fs.mkdirSync(folderPath, { recursive: true });
}

export async function collectDocItems(
  deps: Dependencies = { fs, chromium, console },
): Promise<DocItem[]> {
  deps.console.log('--- :storybook:: Collecting documentation from Storybook');
  const browser = await deps.chromium.launch({ headless: true });
  const page = await browser.newPage();

  deps.console.log(`Opening Storybook at ${config.storybookBaseUrl}`);
  await page.goto(`${config.storybookBaseUrl}/?path=/docs/introduction--docs`, {
    waitUntil: 'domcontentloaded',
    timeout: config.browserTimeout,
  });

  // Wait for the navigation to load
  deps.console.log(`Expecting sidebar to collect documentation...`);
  await page.waitForSelector('nav', { timeout: config.selectorTimeout });

  // Allow time for the sidebar to load
  await page.waitForTimeout(500);

  // Expand the sidebar to ensure all stories are visible
  await page.keyboard.press('ControlOrMeta+Shift+ArrowDown');

  // Allow time for the sidebar to re-render
  await page.waitForTimeout(500);

  // Get refs for storybook composition
  const refs: Record<string, StorybookRef> | undefined = await page.evaluate(
    () =>
      (
        window as Window &
          typeof globalThis & { REFS: Record<string, StorybookRef> }
      ).REFS,
  );

  // Extract documentation
  const links = await page.$$('a[href^="/?path="]');
  const items: DocItem[] = [];
  let successCount = 0;
  let failureCount = 0;
  deps.console.log(`Found ${links.length} links to convert to markdown files.`);

  for (const link of links) {
    const href = await link.getAttribute('href');

    // Process links that strictly start with "/?path=/story/"
    if (href?.startsWith('/?path=/docs/')) {
      const url = new URL(href, config.storybookBaseUrl);
      const params = new URLSearchParams(url.search);

      const id = params.get('path')?.replace('/docs/', '');
      const title = await link.innerText();

      if (id) {
        deps.console.log(`✓ Processing link: ${href}, id: "${id}"`);
        const ref = await link.evaluate((el) =>
          el.parentElement?.getAttribute('data-ref-id'),
        );
        const refId =
          ref && refs?.[ref]
            ? id.startsWith(`${ref}_`)
              ? id.slice(ref.length + 1)
              : id
            : id;
        const iframeUrl = new URL(
          `iframe.html?viewMode=docs&id=${refId}`,
          ref && refs?.[ref] ? refs[ref].url : config.storybookBaseUrl,
        ).toString();
        const category = ref && refs?.[ref] ? `${refs[ref]?.title} / ` : '';

        const item: DocItem = {
          id,
          title: `${category}${title.split('\n')[0].trim()}`, // Use the first line as title
          url: iframeUrl,
          link: url.toString(),
          status: 'pending',
        };

        items.push(item);
        successCount++;
      } else {
        deps.console.warn(
          `✗ Skipping link with empty id: ${href}. Please check that the link is correct.`,
        );
        failureCount++;
      }
    }
  }

  await browser.close();

  deps.console.log(
    `--- :white_check_mark:: Documentation collection complete.`,
  );
  deps.console.log(`✓ Success: ${successCount}`);
  deps.console.log(`✗ Failures: ${failureCount}`);

  return items;
}

export function writeStories(
  stories: DocItem[],
  deps: Dependencies = { fs, chromium, console },
): void {
  deps.console.log(
    `--- :file_folder:: Writing stories to ${config.docItemsFile}`,
  );
  deps.fs.writeFileSync(config.docItemsFile, JSON.stringify(stories, null, 2));
}

export async function main(
  deps: Dependencies = { fs, chromium, console },
): Promise<void> {
  createFolder(config.folder, deps);
  const items = await collectDocItems(deps);
  writeStories(items, deps);
}

// Only run main when this file is executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  const deps = { fs, chromium, console };

  main(deps).catch((error) => {
    console.error('Error running doc items collection:', error);
    process.exit(1);
  });
}
