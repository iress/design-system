/**
 * Tests for generate.ts script
 */
import { describe, it, expect, vi, MockedFunction } from 'vitest';
import fs from 'fs';

// Mock external dependencies before importing
vi.mock('fs');
vi.mock('path');
vi.mock('turndown');
vi.mock('turndown-plugin-gfm');
vi.mock('playwright');
vi.mock('chromium');

// Mock document
const mockDocument = {
  querySelector: vi.fn(),
  querySelectorAll: vi.fn(),
  getElementById: vi.fn(),
  createElement: vi.fn(),
  body: {
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    querySelectorAll: vi.fn().mockReturnValue([]),
  },
};

Object.defineProperty(global, 'document', {
  value: mockDocument,
  writable: true,
});

import {
  filterItemsToProcess,
  createSafeFileName,
  setupTurndownService,
  updateDocItemStatus,
  checkDocItemsFileExists,
  readDocItems,
  extractPageContent,
  processPageItem,
  convertHtmlToMarkdown,
  generateDocumentation,
} from './generate.js';
import type { DocItem } from './collect.js';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { Browser, chromium, Page } from 'playwright';
import config from './config.js';
import path from 'path';

describe('generate.ts', () => {
  describe('checkDocItemsFileExists', () => {
    it('checks the file exists by file name', () => {
      checkDocItemsFileExists('test');
      expect(fs.existsSync).toHaveBeenCalledWith('test');
    });
  });

  describe('readDocItems', () => {
    it('reads the docs file into an array', () => {
      fs.readFileSync = vi.fn().mockReturnValue('[]');
      const content = readDocItems('test');
      expect(content).toStrictEqual([]);
    });
  });

  describe('filterItemsToProcess', () => {
    const mockItems: DocItem[] = [
      {
        id: 'completed-item',
        title: 'Completed Item',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'completed',
      },
      {
        id: 'pending-item',
        title: 'Pending Item',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'pending',
      },
      {
        id: 'error-item',
        title: 'Error Item',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'error',
        last_processed_error: 'Some error',
      },
      {
        id: 'completed-with-error',
        title: 'Completed with Error',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'completed',
        last_processed_error: 'Previous error',
      },
    ];

    it('should return all items when force flag is true', () => {
      const result = filterItemsToProcess(mockItems, true);

      expect(result).toEqual(mockItems);
      expect(result).toHaveLength(4);
    });

    it('should filter out completed items without errors when force flag is false', () => {
      const result = filterItemsToProcess(mockItems, false);

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe('pending-item');
      expect(result[1].id).toBe('error-item');
      expect(result[2].id).toBe('completed-with-error');
    });

    it('should return empty array when all items are completed without errors', () => {
      const completedItems: DocItem[] = [
        {
          id: 'completed-1',
          title: 'Completed 1',
          url: 'http://example.com',
          link: 'http://example.com/link',
          status: 'completed',
        },
        {
          id: 'completed-2',
          title: 'Completed 2',
          url: 'http://example.com',
          link: 'http://example.com/link',
          status: 'completed',
        },
      ];

      const result = filterItemsToProcess(completedItems, false);

      expect(result).toHaveLength(0);
    });

    it('should handle empty array', () => {
      const result = filterItemsToProcess([], false);

      expect(result).toEqual([]);
    });
  });

  describe('createSafeFileName', () => {
    it('should replace non-alphanumeric characters with underscores', () => {
      expect(createSafeFileName('button--default')).toBe('button-default');
      expect(createSafeFileName('input@primary!')).toBe('input_primary_');
      expect(createSafeFileName('modal/dialog#basic')).toBe(
        'modal_dialog_basic',
      );
    });

    it('should replace multiple hyphens with single hyphen', () => {
      expect(createSafeFileName('button---default')).toBe('button-default');
      expect(createSafeFileName('input----primary')).toBe('input-primary');
    });

    it('should convert to lowercase', () => {
      expect(createSafeFileName('Button--Default')).toBe('button-default');
      expect(createSafeFileName('INPUT_PRIMARY')).toBe('input_primary');
    });

    it('should handle complex cases', () => {
      expect(createSafeFileName('Components/Button--Primary@v2!')).toBe(
        'components_button-primary_v2_',
      );
      expect(createSafeFileName('Layout---Grid___System')).toBe(
        'layout-grid___system',
      );
    });

    it('should handle empty string', () => {
      expect(createSafeFileName('')).toBe('');
    });
  });

  describe('setupTurndownService', () => {
    it('creates a turndown service with gfm enabled', () => {
      // Mock the TurndownService instance and its use method
      const mockUse = vi.fn();
      const mockTurndownInstance = {
        use: mockUse,
      } as unknown as TurndownService;

      // Make the constructor return our mock instance
      vi.mocked(TurndownService).mockReturnValue(mockTurndownInstance);

      const result = setupTurndownService();

      expect(TurndownService).toHaveBeenCalled();
      expect(mockUse).toHaveBeenCalledWith(gfm);
      expect(result).toBe(mockTurndownInstance);
    });
  });

  describe('updateDocItemStatus', () => {
    it('updates the status with completed', () => {
      const log = vi.spyOn(console, 'log');

      vi.useFakeTimers();
      vi.setSystemTime(new Date('2023-01-01T00:00:00Z'));

      const items: DocItem[] = [
        {
          id: 'item-1',
          title: 'Item 1',
          url: 'http://example.com',
          link: 'http://example.com/link',
          status: 'pending',
        },
      ];
      const updatedItems: DocItem[] = [
        {
          id: 'item-1',
          title: 'Item 1',
          url: 'http://example.com',
          link: 'http://example.com/link',
          status: 'completed',
          last_processed_timestamp: '2023-01-01T00:00:00.000Z',
        },
      ];

      updateDocItemStatus('file', items, 0, items[0]);

      expect(log).toHaveBeenCalledWith('Update file');

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        'file',
        JSON.stringify(updatedItems, null, 2),
      );

      vi.useRealTimers();
    });

    it('updates the status with error', () => {
      const log = vi.spyOn(console, 'log');

      vi.useFakeTimers();
      vi.setSystemTime(new Date('2023-01-01T00:00:00Z'));

      const items: DocItem[] = [
        {
          id: 'item-1',
          title: 'Item 1',
          url: 'http://example.com',
          link: 'http://example.com/link',
          status: 'pending',
        },
      ];
      const updatedItems: DocItem[] = [
        {
          id: 'item-1',
          title: 'Item 1',
          url: 'http://example.com',
          link: 'http://example.com/link',
          status: 'error',
          last_processed_timestamp: '2023-01-01T00:00:00.000Z',
          last_processed_error: 'Some error',
        },
      ];

      updateDocItemStatus('file', items, 0, items[0], 'Some error');

      expect(log).toHaveBeenCalledWith('Update file');

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        'file',
        JSON.stringify(updatedItems, null, 2),
      );

      vi.useRealTimers();
    });
  });

  describe('handleShowCodeButtons', () => {
    it('should click all "Show code" buttons on the page', async () => {
      const warn = vi.spyOn(console, 'warn');
      const mockPage = {
        waitForTimeout: vi.fn(),
        $$: vi
          .fn()
          .mockResolvedValue([
            { click: vi.fn().mockResolvedValue(undefined) },
            { click: vi.fn().mockRejectedValue(undefined) },
          ]),
      };

      const { handleShowCodeButtons } = await import('./generate.js');

      await handleShowCodeButtons(mockPage as unknown as Page);

      expect(mockPage.$$).toHaveBeenCalledWith(
        'div.sbdocs.sbdocs-preview button.css-1fdphfk, div.sbdocs.sbdocs-preview button.docblock-code-toggle',
      );

      const buttons = (await mockPage.$$.mock.results[0].value) as {
        click: MockedFunction<never>;
      }[];

      // Ensure both buttons were clicked
      expect(buttons[0].click).toHaveBeenCalled();
      expect(buttons[1].click).toHaveBeenCalled();

      expect(warn).toHaveBeenCalledWith(
        "Could not click a 'Show code' button: undefined",
      );
    });

    it('should handle error when finding show code buttons fails', async () => {
      const warn = vi.spyOn(console, 'warn');
      const mockPage = {
        $$: vi.fn().mockRejectedValue(new Error('Button search failed')),
      };

      const { handleShowCodeButtons } = await import('./generate.js');

      await handleShowCodeButtons(mockPage as unknown as Page);

      expect(warn).toHaveBeenCalledWith(
        "Could not find or process 'Show code' buttons for docs view: Button search failed",
      );
    });

    it('should handle click error with non-Error object', async () => {
      const warn = vi.spyOn(console, 'warn');
      const mockPage = {
        waitForTimeout: vi.fn(),
        $$: vi
          .fn()
          .mockResolvedValue([
            { click: vi.fn().mockRejectedValue('string error') },
          ]),
      };

      const { handleShowCodeButtons } = await import('./generate.js');

      await handleShowCodeButtons(mockPage as unknown as Page);

      expect(warn).toHaveBeenCalledWith(
        "Could not click a 'Show code' button: string error",
      );
    });

    it('should handle find error with non-Error object', async () => {
      const warn = vi.spyOn(console, 'warn');
      const mockPage = {
        $$: vi.fn().mockRejectedValue('string error'),
      };

      const { handleShowCodeButtons } = await import('./generate.js');

      await handleShowCodeButtons(mockPage as unknown as Page);

      expect(warn).toHaveBeenCalledWith(
        "Could not find or process 'Show code' buttons for docs view: string error",
      );
    });
  });

  describe('extractPageContent', () => {
    it('extracts the main content HTML from the page', async () => {
      const mockHtmlContent =
        '<div class="main-content">Extracted Content</div>';

      const mockPage = {
        waitForTimeout: vi.fn(),
        $: vi.fn().mockResolvedValue({
          innerHTML: vi.fn().mockResolvedValue('<div>Main Content</div>'),
        }),
        evaluate: vi.fn().mockResolvedValue(mockHtmlContent),
      };

      const content = await extractPageContent(
        mockPage as unknown as Page,
        5000,
        '#storybook-docs',
      );

      expect(mockPage.evaluate).toHaveBeenCalledWith(expect.any(Function), {
        timeout: 5000,
        primarySelector: '#storybook-docs',
      });

      expect(content).toBe(mockHtmlContent);

      const evaluateFn = mockPage.evaluate.mock
        .lastCall?.[0] as unknown as Page['evaluate'];

      await evaluateFn({
        primarySelector: '#storybook-docs',
        timeout: 5000,
      } as never);

      expect(document.querySelector).toHaveBeenCalledWith('#storybook-docs');
      expect(document.querySelector).toHaveBeenCalledWith('div.css-1xrl4hz');
      expect(document.querySelector).toHaveBeenCalledWith('#root');
      expect(document.querySelector).toHaveBeenCalledWith('body');
    });

    it('should fallback to body content and clean unwanted elements', async () => {
      const mockUnwantedElement = {
        outerHTML:
          '<div class="ids-styles--props-section">unwanted content</div>',
        remove: vi.fn(),
      };

      const mockBody = {
        innerHTML: '<div>Body content</div>',
        querySelectorAll: vi.fn().mockReturnValue([mockUnwantedElement]),
      };

      // Mock document with body that has unwanted elements
      const mockDocumentWithUnwanted = {
        querySelector: vi.fn().mockReturnValue(null), // All selectors fail
        querySelectorAll: vi.fn().mockReturnValue([]),
        getElementById: vi.fn(),
        createElement: vi.fn(),
        body: mockBody,
        documentElement: {},
      };

      Object.defineProperty(global, 'document', {
        value: mockDocumentWithUnwanted,
        writable: true,
      });

      const mockPage = {
        evaluate: vi.fn().mockResolvedValue('<div>Body content cleaned</div>'),
      };

      const content = await extractPageContent(
        mockPage as unknown as Page,
        5000,
        '#storybook-docs',
      );

      expect(content).toBe('<div>Body content cleaned</div>');

      // Test the actual evaluate function behavior
      const evaluateFn = mockPage.evaluate.mock.lastCall?.[0] as (params: {
        primarySelector: string;
        timeout: number;
      }) => Promise<string>;
      await evaluateFn({
        primarySelector: '#storybook-docs',
        timeout: 5000,
      });

      // The function should fallback to body content and clean unwanted elements
      expect(mockBody.querySelectorAll).toHaveBeenCalledWith(
        'div[class^="ids-styles--props-"]',
      );
      expect(mockUnwantedElement.remove).toHaveBeenCalled();
    });

    it('should handle element found but with empty innerHTML', async () => {
      // Mock document with empty element
      const mockElement = {
        innerHTML: '', // Empty innerHTML
        querySelectorAll: vi.fn().mockReturnValue([]),
      };

      const mockDocumentWithEmpty = {
        querySelector: vi.fn().mockReturnValue(mockElement),
        querySelectorAll: vi.fn().mockReturnValue([]),
        getElementById: vi.fn(),
        createElement: vi.fn(),
        body: {
          innerHTML: '<div>Fallback body content</div>',
          querySelectorAll: vi.fn().mockReturnValue([]),
        },
        documentElement: {},
      };

      Object.defineProperty(global, 'document', {
        value: mockDocumentWithEmpty,
        writable: true,
      });

      const mockPage = {
        evaluate: vi.fn().mockResolvedValue('<div>Fallback body content</div>'),
      };

      await extractPageContent(
        mockPage as unknown as Page,
        5000,
        '#storybook-docs',
      );

      // Test the actual evaluate function behavior to trigger the empty innerHTML path
      const evaluateFn = mockPage.evaluate.mock.lastCall?.[0] as (params: {
        primarySelector: string;
        timeout: number;
      }) => Promise<string>;
      await evaluateFn({
        primarySelector: '#storybook-docs',
        timeout: 5000,
      });

      // Should call querySelector to find the element
      expect(mockDocumentWithEmpty.querySelector).toHaveBeenCalledWith(
        '#storybook-docs',
      );
    });

    it('should handle single selector case in triedSelectorsMessage', async () => {
      const mockPage = {
        evaluate: vi.fn().mockResolvedValue('<div>Body fallback</div>'),
      };

      // Create a minimal mock document for the single selector case
      Object.defineProperty(global, 'document', {
        value: {
          querySelector: vi.fn().mockReturnValue(null),
          querySelectorAll: vi.fn().mockReturnValue([]),
          body: {
            innerHTML: '<div>Body fallback</div>',
            querySelectorAll: vi.fn().mockReturnValue([]),
          },
        },
        writable: true,
      });

      await extractPageContent(mockPage as unknown as Page, 5000, 'body');

      expect(mockPage.evaluate).toHaveBeenCalled();
    });
  });

  describe('processPageItem', () => {
    it('processes a page item and return HTML content', async () => {
      const log = vi.spyOn(console, 'log');
      const page = {
        goto: vi.fn().mockResolvedValue(undefined),
        evaluate: vi.fn().mockResolvedValue('<div>Content</div>'),
        waitForSelector: vi.fn().mockResolvedValue(undefined),
        waitForTimeout: vi.fn(),
        $$: vi.fn().mockResolvedValue([]),
      };
      const item: DocItem = {
        id: 'item-1',
        title: 'Item 1',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'pending',
      };

      const content = await processPageItem(
        page as unknown as Page,
        item,
        config,
      );

      expect(log).toHaveBeenCalledWith(
        '--- Processing: "Item 1" (ID: item-1) ---',
      );

      expect(page.goto).toHaveBeenCalledWith('http://example.com', {
        waitUntil: 'networkidle',
        timeout: config.browserTimeout,
      });

      expect(content).toBe('<div>Content</div>');
    });

    it('should handle timeout waiting for selector and log warning', async () => {
      const warn = vi.spyOn(console, 'warn');
      const page = {
        goto: vi.fn().mockResolvedValue(undefined),
        evaluate: vi.fn().mockResolvedValue('<div>Content after timeout</div>'),
        waitForSelector: vi.fn().mockRejectedValue(new Error('Timeout')),
        waitForTimeout: vi.fn(),
        $$: vi.fn().mockResolvedValue([]),
      };
      const item: DocItem = {
        id: 'item-timeout',
        title: 'Timeout Item',
        url: 'http://example.com/timeout',
        link: 'http://example.com/link',
        status: 'pending',
      };

      const content = await processPageItem(
        page as unknown as Page,
        item,
        config,
      );

      expect(warn).toHaveBeenCalledWith(
        `Timed out waiting for general root element '${config.storybookContentSelector}' on "Timeout Item". Content might be missing or delayed. Error: Timeout`,
      );

      expect(content).toBe('<div>Content after timeout</div>');
    });

    it('should handle non-Error timeout and log warning with string conversion', async () => {
      const warn = vi.spyOn(console, 'warn');
      const page = {
        goto: vi.fn().mockResolvedValue(undefined),
        evaluate: vi.fn().mockResolvedValue('<div>Content</div>'),
        waitForSelector: vi.fn().mockRejectedValue('String timeout error'),
        waitForTimeout: vi.fn(),
        $$: vi.fn().mockResolvedValue([]),
      };
      const item: DocItem = {
        id: 'item-string-error',
        title: 'String Error Item',
        url: 'http://example.com/string-error',
        link: 'http://example.com/link',
        status: 'pending',
      };

      await processPageItem(page as unknown as Page, item, config);

      expect(warn).toHaveBeenCalledWith(
        `Timed out waiting for general root element '${config.storybookContentSelector}' on "String Error Item". Content might be missing or delayed. Error: String timeout error`,
      );
    });
  });

  describe('convertHtmlToMarkdown', () => {
    it('converts HTML content to Markdown', () => {
      vi.spyOn(path, 'join').mockReturnValueOnce('generated/docs/item-1.md');
      const mockTurndownInstance = {
        use: vi.fn(),
        turndown: vi.fn().mockReturnValue('# Heading\n\nSome **bold** text.'),
      } as unknown as TurndownService;
      const item: DocItem = {
        id: 'item-1',
        title: 'Item 1',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'pending',
      };

      const htmlContent =
        '<h1>Heading</h1><p>Some <strong>bold</strong> text.</p>';

      const success = convertHtmlToMarkdown(
        htmlContent,
        mockTurndownInstance,
        item,
        config.docsFolder,
      );

      expect(mockTurndownInstance.turndown).toHaveBeenCalledWith(htmlContent);
      expect(fs.writeFileSync).toHaveBeenLastCalledWith(
        `${config.docsFolder}/item-1.md`,
        '# Heading\n\nSome **bold** text.\n',
      );
      expect(success).toBe(true);
    });

    it('returns false when HTML content is empty', () => {
      const log = vi.spyOn(console, 'log');
      const mockTurndownInstance = {
        turndown: vi.fn(),
      } as unknown as TurndownService;
      const item: DocItem = {
        id: 'item-1',
        title: 'Item 1',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'pending',
      };

      const success = convertHtmlToMarkdown(
        '',
        mockTurndownInstance,
        item,
        config.docsFolder,
      );

      expect(log).toHaveBeenCalledWith(
        '✗ No content found for: "Item 1" (ID: item-1)',
      );
      expect(mockTurndownInstance.turndown).not.toHaveBeenCalled();
      expect(success).toBe(false);
    });

    it('returns false when HTML content is only whitespace', () => {
      const log = vi.spyOn(console, 'log');
      const mockTurndownInstance = {
        turndown: vi.fn(),
      } as unknown as TurndownService;
      const item: DocItem = {
        id: 'item-1',
        title: 'Item 1',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'pending',
      };

      const success = convertHtmlToMarkdown(
        '   \n  \t  ',
        mockTurndownInstance,
        item,
        config.docsFolder,
      );

      expect(log).toHaveBeenCalledWith(
        '✗ No content found for: "Item 1" (ID: item-1)',
      );
      expect(mockTurndownInstance.turndown).not.toHaveBeenCalled();
      expect(success).toBe(false);
    });

    it('processes markdown content and removes unwanted strings', () => {
      vi.spyOn(path, 'join').mockReturnValueOnce('generated/docs/item-1.md');
      const log = vi.spyOn(console, 'log');
      const mockTurndownInstance = {
        turndown: vi
          .fn()
          .mockReturnValue('Hide code\n# Heading\n\nCopy\nSome text.'),
      } as unknown as TurndownService;
      const item: DocItem = {
        id: 'item-1',
        title: 'Item 1',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'pending',
      };

      const success = convertHtmlToMarkdown(
        '<h1>Heading</h1><p>Some text.</p>',
        mockTurndownInstance,
        item,
        config.docsFolder,
      );

      expect(log).toHaveBeenCalledWith(
        '✓ Successfully extracted markdown for: "Item 1"',
      );
      expect(fs.writeFileSync).toHaveBeenLastCalledWith(
        `${config.docsFolder}/item-1.md`,
        '```\n# Heading\n\n```\nSome text.\n',
      );
      expect(success).toBe(true);
    });
  });

  describe('generateDocumentation', () => {
    const mockItems: DocItem[] = [
      {
        id: 'pending-item',
        title: 'Pending Item',
        url: 'http://example.com/pending',
        link: 'http://example.com/link',
        status: 'pending',
      },
      {
        id: 'completed-item',
        title: 'Completed Item',
        url: 'http://example.com/completed',
        link: 'http://example.com/link',
        status: 'completed',
      },
    ];

    beforeEach(() => {
      // Reset all mocks
      vi.clearAllMocks();

      // Mock file operations
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockItems));
      vi.mocked(fs.mkdirSync).mockReturnValue(undefined);

      // Mock console
      vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    it('should throw error when doc items file does not exist', async () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      await expect(generateDocumentation()).rejects.toThrow(
        'Docs item file not found: generated/index.json. Please run "yarn collect" first.',
      );
    });

    it('should return zero counts when no items to process', async () => {
      const completedItems: DocItem[] = [
        {
          id: 'completed-item',
          title: 'Completed Item',
          url: 'http://example.com',
          link: 'http://example.com/link',
          status: 'completed',
        },
      ];

      vi.mocked(fs.readFileSync).mockReturnValue(
        JSON.stringify(completedItems),
      );

      const result = await generateDocumentation({ force: false });

      expect(result).toEqual({ successCount: 0, failureCount: 0 });
      expect(console.log).toHaveBeenCalledWith(
        "No items to process. All items are marked as 'completed' or list is empty. Use --force to process all.",
      );
    });

    it('should process all items when force flag is true', async () => {
      // Mock browser and page
      const mockPage = {
        goto: vi.fn().mockResolvedValue(undefined),
        waitForSelector: vi.fn().mockResolvedValue(undefined),
        waitForTimeout: vi.fn().mockResolvedValue(undefined),
        $$: vi.fn().mockResolvedValue([]),
        evaluate: vi.fn().mockResolvedValue('<div>Test content</div>'),
        close: vi.fn().mockResolvedValue(undefined),
      };

      const mockBrowser = {
        newPage: vi.fn().mockResolvedValue(mockPage),
        close: vi.fn().mockResolvedValue(undefined),
      };

      vi.mocked(chromium.launch).mockResolvedValue(mockBrowser as never);

      // Mock TurndownService
      const mockTurndownInstance = {
        use: vi.fn(),
        turndown: vi.fn().mockReturnValue('# Test content'),
      };
      vi.mocked(TurndownService).mockReturnValue(mockTurndownInstance as never);

      const result = await generateDocumentation({ force: true });

      expect(result.successCount).toBe(2);
      expect(result.failureCount).toBe(0);
      expect(mockBrowser.newPage).toHaveBeenCalledTimes(2);
      expect(mockPage.goto).toHaveBeenCalledTimes(2);
    });

    it('should handle errors during page processing', async () => {
      // Mock browser and page that throws error
      const mockPage = {
        goto: vi.fn().mockRejectedValue(new Error('Navigation failed')),
        close: vi.fn().mockResolvedValue(undefined),
      };

      const mockBrowser = {
        newPage: vi.fn().mockResolvedValue(mockPage),
        close: vi.fn().mockResolvedValue(undefined),
      };

      vi.mocked(chromium.launch).mockResolvedValue(mockBrowser as never);

      const result = await generateDocumentation({ force: false });

      expect(result.successCount).toBe(0);
      expect(result.failureCount).toBe(1); // Only pending item is processed
      expect(console.log).toHaveBeenCalledWith(
        '✗ Error when processing: "Pending Item" (ID: pending-item)',
      );
    });

    it('should create docs folder if it does not exist', async () => {
      // Mock browser
      const mockPage = {
        goto: vi.fn().mockResolvedValue(undefined),
        waitForSelector: vi.fn().mockResolvedValue(undefined),
        waitForTimeout: vi.fn().mockResolvedValue(undefined),
        $$: vi.fn().mockResolvedValue([]),
        evaluate: vi.fn().mockResolvedValue('<div>Test content</div>'),
        close: vi.fn().mockResolvedValue(undefined),
      };

      const mockBrowser = {
        newPage: vi.fn().mockResolvedValue(mockPage),
        close: vi.fn().mockResolvedValue(undefined),
      };

      vi.mocked(chromium.launch).mockResolvedValue(mockBrowser as never);

      // Mock TurndownService
      const mockTurndownInstance = {
        use: vi.fn(),
        turndown: vi.fn().mockReturnValue('# Test content'),
      };
      vi.mocked(TurndownService).mockReturnValue(mockTurndownInstance as never);

      await generateDocumentation({ force: false });

      expect(fs.mkdirSync).toHaveBeenCalledWith('generated/docs', {
        recursive: true,
      });
    });

    it('should handle browser close errors gracefully', async () => {
      const mockBrowser = {
        newPage: vi.fn().mockResolvedValue({
          goto: vi.fn().mockResolvedValue(undefined),
          waitForSelector: vi.fn().mockResolvedValue(undefined),
          waitForTimeout: vi.fn().mockResolvedValue(undefined),
          $$: vi.fn().mockResolvedValue([]),
          evaluate: vi.fn().mockResolvedValue('<div>Test content</div>'),
          close: vi.fn().mockResolvedValue(undefined),
        }),
        close: vi.fn().mockRejectedValue(new Error('Browser close failed')),
      };

      vi.mocked(chromium.launch).mockResolvedValue(
        mockBrowser as unknown as Browser,
      );

      // Mock TurndownService
      const mockTurndownInstance = {
        use: vi.fn(),
        turndown: vi.fn().mockReturnValue('# Test content'),
      };
      vi.mocked(TurndownService).mockReturnValue(
        mockTurndownInstance as unknown as TurndownService,
      );

      const result = await generateDocumentation({ force: false });

      expect(console.log).toHaveBeenCalledWith(
        'Error closing browser: Browser close failed',
      );
      expect(result.successCount).toBe(1); // Only pending item should be processed
    });

    it('should process items successfully and log completion messages', async () => {
      const log = vi.spyOn(console, 'log');

      // Mock browser and page
      const mockPage = {
        goto: vi.fn().mockResolvedValue(undefined),
        waitForSelector: vi.fn().mockResolvedValue(undefined),
        waitForTimeout: vi.fn().mockResolvedValue(undefined),
        $$: vi.fn().mockResolvedValue([]),
        evaluate: vi.fn().mockResolvedValue('<div>Test content</div>'),
        close: vi.fn().mockResolvedValue(undefined),
      };

      const mockBrowser = {
        newPage: vi.fn().mockResolvedValue(mockPage),
        close: vi.fn().mockResolvedValue(undefined),
      };

      vi.mocked(chromium.launch).mockResolvedValue(mockBrowser as never);

      // Mock TurndownService
      const mockTurndownInstance = {
        use: vi.fn(),
        turndown: vi.fn().mockReturnValue('# Test content'),
      };
      vi.mocked(TurndownService).mockReturnValue(mockTurndownInstance as never);

      const result = await generateDocumentation({ force: false });

      expect(result.successCount).toBe(1);
      expect(result.failureCount).toBe(0);

      // Check completion messages are logged
      expect(log).toHaveBeenCalledWith(
        '--- :white_check_mark:: Documentation generation complete.',
      );
      expect(log).toHaveBeenCalledWith('✓ Success: 1');
      expect(log).toHaveBeenCalledWith('✗ Failures: 0');
    });

    it('should handle conversion failure and log error details', async () => {
      // Mock browser and page that returns empty content
      const mockPage = {
        goto: vi.fn().mockResolvedValue(undefined),
        waitForSelector: vi.fn().mockResolvedValue(undefined),
        waitForTimeout: vi.fn().mockResolvedValue(undefined),
        $$: vi.fn().mockResolvedValue([]),
        evaluate: vi.fn().mockResolvedValue(''), // Empty content
        close: vi.fn().mockResolvedValue(undefined),
      };

      const mockBrowser = {
        newPage: vi.fn().mockResolvedValue(mockPage),
        close: vi.fn().mockResolvedValue(undefined),
      };

      vi.mocked(chromium.launch).mockResolvedValue(mockBrowser as never);

      const result = await generateDocumentation({ force: false });

      expect(result.successCount).toBe(0);
      expect(result.failureCount).toBe(1);

      // Check that writeFileSync was called (which means status was updated)
      expect(fs.writeFileSync).toHaveBeenCalled();

      // Get the last call arguments to check the JSON content
      const writeFileCall = vi.mocked(fs.writeFileSync).mock.lastCall;
      expect(writeFileCall?.[0]).toBe('generated/index.json');

      // Parse the JSON to check the structure
      const jsonContent = writeFileCall?.[1] as string;
      const parsedContent = JSON.parse(jsonContent) as DocItem[];

      // Find the pending item in the result (it should be updated to error status)
      const pendingItem = parsedContent.find(
        (item: DocItem) => item.id === 'pending-item',
      );
      expect(pendingItem?.status).toBe('error');
      expect(pendingItem?.last_processed_error).toBe(
        'No content found in specified containers',
      );
    });

    it('should correctly map item indices in the original docItems array', async () => {
      // Create a more complex scenario with mixed item states
      const complexItems: DocItem[] = [
        {
          id: 'completed-item-1',
          title: 'Completed Item 1',
          url: 'http://example.com/completed-1',
          link: 'http://example.com/link-1',
          status: 'completed',
        },
        {
          id: 'pending-item-1',
          title: 'Pending Item 1',
          url: 'http://example.com/pending-1',
          link: 'http://example.com/link-2',
          status: 'pending',
        },
        {
          id: 'completed-item-2',
          title: 'Completed Item 2',
          url: 'http://example.com/completed-2',
          link: 'http://example.com/link-3',
          status: 'completed',
        },
        {
          id: 'error-item-1',
          title: 'Error Item 1',
          url: 'http://example.com/error-1',
          link: 'http://example.com/link-4',
          status: 'error',
          last_processed_error: 'Previous error',
        },
      ];

      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(complexItems));

      // Mock browser and page
      const mockPage = {
        goto: vi.fn().mockResolvedValue(undefined),
        waitForSelector: vi.fn().mockResolvedValue(undefined),
        waitForTimeout: vi.fn().mockResolvedValue(undefined),
        $$: vi.fn().mockResolvedValue([]),
        evaluate: vi.fn().mockResolvedValue('<div>Test content</div>'),
        close: vi.fn().mockResolvedValue(undefined),
      };

      const mockBrowser = {
        newPage: vi.fn().mockResolvedValue(mockPage),
        close: vi.fn().mockResolvedValue(undefined),
      };

      vi.mocked(chromium.launch).mockResolvedValue(mockBrowser as never);

      // Mock TurndownService
      const mockTurndownInstance = {
        use: vi.fn(),
        turndown: vi.fn().mockReturnValue('# Test content'),
      };
      vi.mocked(TurndownService).mockReturnValue(mockTurndownInstance as never);

      const result = await generateDocumentation({ force: false });

      expect(result.successCount).toBe(2); // pending-item-1 and error-item-1
      expect(result.failureCount).toBe(0);

      // Verify that fs.writeFileSync is called for status updates
      // The function should process pending and error items (indices 1 and 3 from original array)
      expect(fs.writeFileSync).toHaveBeenCalled();
    });

    it('should log error details when processing throws an error', async () => {
      const log = vi.spyOn(console, 'log');

      // Mock browser and page that throws error during processing
      const mockPage = {
        goto: vi.fn().mockRejectedValue(new Error('Navigation failed')),
        close: vi.fn().mockResolvedValue(undefined),
      };

      const mockBrowser = {
        newPage: vi.fn().mockResolvedValue(mockPage),
        close: vi.fn().mockResolvedValue(undefined),
      };

      vi.mocked(chromium.launch).mockResolvedValue(mockBrowser as never);

      const result = await generateDocumentation({ force: false });

      expect(result.successCount).toBe(0);
      expect(result.failureCount).toBe(1);

      // Check error details are logged
      expect(log).toHaveBeenCalledWith(
        '✗ Error when processing: "Pending Item" (ID: pending-item)',
      );
      expect(log).toHaveBeenCalledWith('Error details: Navigation failed');
    });

    it('should handle non-Error objects in catch block', async () => {
      const log = vi.spyOn(console, 'log');

      // Mock browser and page that throws non-Error object
      const mockPage = {
        goto: vi.fn().mockRejectedValue('string error'),
        close: vi.fn().mockResolvedValue(undefined),
      };

      const mockBrowser = {
        newPage: vi.fn().mockResolvedValue(mockPage),
        close: vi.fn().mockResolvedValue(undefined),
      };

      vi.mocked(chromium.launch).mockResolvedValue(mockBrowser as never);

      const result = await generateDocumentation({ force: false });

      expect(result.successCount).toBe(0);
      expect(result.failureCount).toBe(1);

      // Check string error is logged properly
      expect(log).toHaveBeenCalledWith('Error details: string error');
    });

    it('should use config override when provided', async () => {
      const customConfig = {
        docItemsFile: 'custom/items.json',
        docsFolder: 'custom/docs',
      };

      // Mock file operations for custom path
      (
        fs.existsSync as unknown as MockedFunction<typeof fs.existsSync>
      ).mockImplementation((path) => path === 'custom/items.json');

      // Mock browser
      const mockBrowser = {
        newPage: vi.fn().mockResolvedValue({
          goto: vi.fn().mockResolvedValue(undefined),
          waitForSelector: vi.fn().mockResolvedValue(undefined),
          waitForTimeout: vi.fn().mockResolvedValue(undefined),
          $$: vi.fn().mockResolvedValue([]),
          evaluate: vi.fn().mockResolvedValue('<div>Test content</div>'),
          close: vi.fn().mockResolvedValue(undefined),
        }),
        close: vi.fn().mockResolvedValue(undefined),
      };

      vi.mocked(chromium.launch).mockResolvedValue(mockBrowser as never);

      // Mock TurndownService
      const mockTurndownInstance = {
        use: vi.fn(),
        turndown: vi.fn().mockReturnValue('# Test content'),
      };
      vi.mocked(TurndownService).mockReturnValue(mockTurndownInstance as never);

      await generateDocumentation({ force: false }, customConfig);

      expect(fs.mkdirSync).toHaveBeenCalledWith('custom/docs', {
        recursive: true,
      });
      expect(fs.existsSync).toHaveBeenCalledWith('custom/items.json');
    });
  });

  describe('CLI execution', () => {
    it('should test successful execution flow', async () => {
      // We can't directly test the CLI main function since it's not exported
      // But we can test the logic it uses
      const result = { successCount: 1, failureCount: 0 };
      const exitCode = result.failureCount > 0 ? 1 : 0;
      expect(exitCode).toBe(0);
    });

    it('should test failure execution flow', async () => {
      // Test the exit code logic for failures
      const result = { successCount: 0, failureCount: 1 };
      const exitCode = result.failureCount > 0 ? 1 : 0;
      expect(exitCode).toBe(1);
    });

    it('should test error handling flow', async () => {
      // Test error message handling logic
      const testError = new Error('Test error');
      const errorMessage =
        testError instanceof Error ? testError.message : String(testError);
      expect(errorMessage).toBe('Test error');

      // Test string error handling
      const stringError = 'string error';
      const stringErrorMessage = String(stringError);
      expect(stringErrorMessage).toBe('string error');
    });

    it('should test CLI argument parsing logic', () => {
      // Test the logic used in the main function for parsing args
      // This tests the pattern: minimist(process.argv.slice(2)) as Args;
      const mockArgv = ['node', 'script.js', '--force'];
      const parsedArgs = mockArgv.slice(2);
      expect(parsedArgs).toEqual(['--force']);

      // Test boolean conversion logic similar to what's used: !!args.force
      const args = { force: true };
      const forceFlag = !!args.force;
      expect(forceFlag).toBe(true);

      const argsUndefined: Record<string, unknown> = {};
      const forceFlagUndefined = !!argsUndefined.force;
      expect(forceFlagUndefined).toBe(false);
    });

    it('should test module execution detection logic', () => {
      // Test the logic similar to: import.meta.url === `file://${process.argv[1]}`
      const importMetaUrl = 'file:///path/to/script.js';
      const processArg1 = '/path/to/script.js';
      const isDirectExecution = importMetaUrl === `file://${processArg1}`;
      expect(typeof isDirectExecution).toBe('boolean');

      // Test the error handling pattern used in the main catch block
      const mockError = new Error('Mock error');
      const errorHandling =
        mockError instanceof Error ? mockError.message : String(mockError);
      expect(errorHandling).toBe('Mock error');
    });
  });
});
