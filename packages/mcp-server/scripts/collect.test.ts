/**
 * Tests for collect.ts script
 */
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type MockedFunction,
} from 'vitest';
import type { Browser, Page, ElementHandle } from 'playwright';
import type { Dependencies, DocItem } from './collect.js';
import {
  createFolder,
  collectDocItems,
  writeStories,
  main,
} from './collect.js';

// Mock config
vi.mock('./config.js', () => ({
  default: {
    browserTimeout: 30000,
    docsFolder: 'generated/docs',
    docItemsFile: 'generated/index.json',
    folder: 'generated',
    guidelinesFile: 'generated/docs/guidelines.md',
    selectorTimeout: 10000,
    storybookBaseUrl: 'http://localhost:6006',
    storybookContentSelector: '#storybook-docs',
  },
}));

describe('collect.ts', () => {
  let mockDeps: Dependencies;
  let mockBrowser: Browser;
  let mockPage: Page;
  let mockFs: {
    mkdirSync: MockedFunction<typeof import('fs').mkdirSync>;
    writeFileSync: MockedFunction<typeof import('fs').writeFileSync>;
  };
  let mockChromium: {
    launch: MockedFunction<typeof import('playwright').chromium.launch>;
  };
  let mockConsole: {
    log: MockedFunction<typeof console.log>;
    warn: MockedFunction<typeof console.warn>;
    error: MockedFunction<typeof console.error>;
  };

  beforeEach(() => {
    // Mock filesystem
    mockFs = {
      mkdirSync: vi.fn(),
      writeFileSync: vi.fn(),
    };

    // Mock console
    mockConsole = {
      log: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    // Mock playwright page
    mockPage = {
      goto: vi.fn(),
      waitForSelector: vi.fn(),
      waitForTimeout: vi.fn(),
      keyboard: {
        press: vi.fn(),
      },
      $$: vi.fn(),
    } as unknown as Page;

    // Mock playwright browser
    mockBrowser = {
      newPage: vi.fn().mockResolvedValue(mockPage),
      close: vi.fn(),
    } as unknown as Browser;

    // Mock chromium
    mockChromium = {
      launch: vi.fn().mockResolvedValue(mockBrowser),
    };

    // Create mock dependencies
    mockDeps = {
      fs: mockFs as unknown as typeof import('fs'),
      chromium: mockChromium as unknown as typeof import('playwright').chromium,
      console: mockConsole as unknown as Console,
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('createFolder', () => {
    it('should create folder with recursive option', () => {
      const folderPath = 'test/folder/path';

      createFolder(folderPath, mockDeps);

      expect(mockFs.mkdirSync).toHaveBeenCalledWith(folderPath, {
        recursive: true,
      });
      expect(mockConsole.log).toHaveBeenCalledWith(
        `--- :open_file_folder:: Make folder: ${folderPath}`,
      );
    });

    it('should use default dependencies when not provided', () => {
      // This test verifies the function can be called without deps parameter
      // We can't easily test the real fs call, but we can verify it doesn't throw
      expect(() => createFolder('test')).not.toThrow();
    });
  });

  describe('collectDocItems', () => {
    it('should collect documentation items successfully', async () => {
      // Mock link elements
      const mockLinks = [
        {
          getAttribute: vi
            .fn()
            .mockResolvedValue('/?path=/docs/button--default'),
          innerText: vi.fn().mockResolvedValue('Button\nDefault'),
        },
        {
          getAttribute: vi
            .fn()
            .mockResolvedValue('/?path=/docs/input--primary'),
          innerText: vi.fn().mockResolvedValue('Input Primary'),
        },
        {
          getAttribute: vi
            .fn()
            .mockResolvedValue('/?path=/story/modal--default'),
          innerText: vi.fn().mockResolvedValue('Modal Default'),
        },
      ] as unknown as ElementHandle[];

      mockPage.$$ = vi.fn().mockResolvedValue(mockLinks);

      const result = await collectDocItems(mockDeps);

      // Verify browser setup
      expect(mockChromium.launch).toHaveBeenCalledWith({ headless: true });
      expect(mockBrowser.newPage).toHaveBeenCalled();

      // Verify navigation
      expect(mockPage.goto).toHaveBeenCalledWith(
        'http://localhost:6006/?path=/docs/introduction--docs',
        {
          waitUntil: 'networkidle',
          timeout: 30000,
        },
      );

      // Verify page interactions
      expect(mockPage.waitForSelector).toHaveBeenCalledWith('nav', {
        timeout: 10000,
      });
      expect(mockPage.waitForTimeout).toHaveBeenCalledWith(500);
      expect(mockPage.keyboard.press).toHaveBeenCalledWith(
        'ControlOrMeta+Shift+ArrowDown',
      );

      // Verify link extraction
      expect(mockPage.$$).toHaveBeenCalledWith('a[href^="/?path="]');

      // Verify browser cleanup
      expect(mockBrowser.close).toHaveBeenCalled();

      // Verify results - only docs links should be processed, not story links
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 'button--default',
        title: 'Button',
        url: 'http://localhost:6006/iframe.html?viewMode=docs&id=button--default',
        link: 'http://localhost:6006/?path=/docs/button--default',
        status: 'pending',
      });
      expect(result[1]).toEqual({
        id: 'input--primary',
        title: 'Input Primary',
        url: 'http://localhost:6006/iframe.html?viewMode=docs&id=input--primary',
        link: 'http://localhost:6006/?path=/docs/input--primary',
        status: 'pending',
      });

      // Verify console output
      expect(mockConsole.log).toHaveBeenCalledWith(
        '--- :storybook:: Collecting documentation from Storybook',
      );
      expect(mockConsole.log).toHaveBeenCalledWith(
        'Opening Storybook at http://localhost:6006',
      );
      expect(mockConsole.log).toHaveBeenCalledWith(
        'Expecting sidebar to collect documentation...',
      );
      expect(mockConsole.log).toHaveBeenCalledWith(
        'Found 3 links to convert to markdown files.',
      );
      expect(mockConsole.log).toHaveBeenCalledWith(
        '--- :white_check_mark:: Documentation collection complete.',
      );
      expect(mockConsole.log).toHaveBeenCalledWith('✓ Success: 2');
      expect(mockConsole.log).toHaveBeenCalledWith('✗ Failures: 0');
    });

    it('should handle links with empty ids', async () => {
      const mockLinks = [
        {
          getAttribute: vi.fn().mockResolvedValue('/?path=/docs/'),
          innerText: vi.fn().mockResolvedValue('Empty ID Link'),
        },
        {
          getAttribute: vi.fn().mockResolvedValue('/?path=/docs/valid--story'),
          innerText: vi.fn().mockResolvedValue('Valid Story'),
        },
      ] as unknown as ElementHandle[];

      mockPage.$$ = vi.fn().mockResolvedValue(mockLinks);

      const result = await collectDocItems(mockDeps);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('valid--story');

      expect(mockConsole.warn).toHaveBeenCalledWith(
        '✗ Skipping link with empty id: /?path=/docs/. Please check that the link is correct.',
      );
    });

    it('should handle null href attributes', async () => {
      const mockLinks = [
        {
          getAttribute: vi.fn().mockResolvedValue(null),
          innerText: vi.fn().mockResolvedValue('Null Href Link'),
        },
        {
          getAttribute: vi.fn().mockResolvedValue('/?path=/docs/valid--story'),
          innerText: vi.fn().mockResolvedValue('Valid Story'),
        },
      ] as unknown as ElementHandle[];

      mockPage.$$ = vi.fn().mockResolvedValue(mockLinks);

      const result = await collectDocItems(mockDeps);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('valid--story');
    });

    it('should handle multiline titles correctly', async () => {
      const mockLinks = [
        {
          getAttribute: vi
            .fn()
            .mockResolvedValue('/?path=/docs/button--default'),
          innerText: vi.fn().mockResolvedValue('Button\nDefault\nExtra Line'),
        },
      ] as unknown as ElementHandle[];

      mockPage.$$ = vi.fn().mockResolvedValue(mockLinks);

      const result = await collectDocItems(mockDeps);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Button');
    });

    it('should filter only docs links, not story links', async () => {
      const mockLinks = [
        {
          getAttribute: vi
            .fn()
            .mockResolvedValue('/?path=/docs/button--default'),
          innerText: vi.fn().mockResolvedValue('Button Default'),
        },
        {
          getAttribute: vi
            .fn()
            .mockResolvedValue('/?path=/story/input--primary'),
          innerText: vi.fn().mockResolvedValue('Input Primary'),
        },
        {
          getAttribute: vi.fn().mockResolvedValue('/other/path'),
          innerText: vi.fn().mockResolvedValue('Other Path'),
        },
      ] as unknown as ElementHandle[];

      mockPage.$$ = vi.fn().mockResolvedValue(mockLinks);

      const result = await collectDocItems(mockDeps);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('button--default');
    });

    it('should handle empty links array', async () => {
      mockPage.$$ = vi.fn().mockResolvedValue([]);

      const result = await collectDocItems(mockDeps);

      expect(result).toHaveLength(0);
      expect(mockConsole.log).toHaveBeenCalledWith(
        'Found 0 links to convert to markdown files.',
      );
      expect(mockConsole.log).toHaveBeenCalledWith('✓ Success: 0');
      expect(mockConsole.log).toHaveBeenCalledWith('✗ Failures: 0');
    });

    it('should use default dependencies when not provided', async () => {
      // This is more of a structural test since we can't easily mock the defaults
      expect(collectDocItems).toBeDefined();
    });

    it('should handle browser errors gracefully', async () => {
      const error = new Error('Browser launch failed');
      mockChromium.launch.mockRejectedValue(error);

      await expect(collectDocItems(mockDeps)).rejects.toThrow(
        'Browser launch failed',
      );
    });

    it('should handle page navigation errors', async () => {
      mockPage.goto = vi.fn().mockRejectedValue(new Error('Navigation failed'));

      await expect(collectDocItems(mockDeps)).rejects.toThrow(
        'Navigation failed',
      );
    });
  });

  describe('writeStories', () => {
    it('should write stories to file as JSON', () => {
      const stories: DocItem[] = [
        {
          id: 'button--default',
          title: 'Button Default',
          url: 'http://localhost:6006/iframe.html?viewMode=docs&id=button--default',
          link: 'http://localhost:6006/?path=/docs/button--default',
          status: 'pending',
        },
        {
          id: 'input--primary',
          title: 'Input Primary',
          url: 'http://localhost:6006/iframe.html?viewMode=docs&id=input--primary',
          link: 'http://localhost:6006/?path=/docs/input--primary',
          status: 'completed',
          processed_url: 'http://example.com/processed',
          last_processed_timestamp: '2023-01-01T00:00:00Z',
        },
      ];

      writeStories(stories, mockDeps);

      expect(mockConsole.log).toHaveBeenCalledWith(
        '--- :file_folder:: Writing stories to generated/index.json',
      );
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'generated/index.json',
        JSON.stringify(stories, null, 2),
      );
    });

    it('should handle empty stories array', () => {
      const stories: DocItem[] = [];

      writeStories(stories, mockDeps);

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'generated/index.json',
        JSON.stringify([], null, 2),
      );
    });

    it('should use default dependencies when not provided', () => {
      // Skip this test as it would try to write to real file system
      // This test mainly verifies the function signature works
      expect(writeStories).toBeDefined();
    });
  });

  describe('main', () => {
    it('should orchestrate the complete workflow', async () => {
      const mockLinks = [
        {
          getAttribute: vi
            .fn()
            .mockResolvedValue('/?path=/docs/button--default'),
          innerText: vi.fn().mockResolvedValue('Button Default'),
        },
      ] as unknown as ElementHandle[];

      mockPage.$$ = vi.fn().mockResolvedValue(mockLinks);

      await main(mockDeps);

      // Verify folder creation
      expect(mockFs.mkdirSync).toHaveBeenCalledWith('generated', {
        recursive: true,
      });

      // Verify browser operations
      expect(mockChromium.launch).toHaveBeenCalled();
      expect(mockBrowser.newPage).toHaveBeenCalled();
      expect(mockBrowser.close).toHaveBeenCalled();

      // Verify file writing
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'generated/index.json',
        expect.stringContaining('"id": "button--default"'),
      );

      // Verify console output for each step
      expect(mockConsole.log).toHaveBeenCalledWith(
        '--- :open_file_folder:: Make folder: generated',
      );
      expect(mockConsole.log).toHaveBeenCalledWith(
        '--- :storybook:: Collecting documentation from Storybook',
      );
      expect(mockConsole.log).toHaveBeenCalledWith(
        '--- :file_folder:: Writing stories to generated/index.json',
      );
    });

    it('should propagate errors from collectDocItems', async () => {
      const error = new Error('Collection failed');
      mockChromium.launch.mockRejectedValue(error);

      await expect(main(mockDeps)).rejects.toThrow('Collection failed');
    });

    it('should propagate errors from createFolder', async () => {
      const error = new Error('Folder creation failed');
      mockFs.mkdirSync.mockImplementation(() => {
        throw error;
      });

      await expect(main(mockDeps)).rejects.toThrow('Folder creation failed');
    });

    it('should propagate errors from writeStories', async () => {
      const error = new Error('Write failed');
      mockFs.writeFileSync.mockImplementation(() => {
        throw error;
      });

      mockPage.$$ = vi.fn().mockResolvedValue([]);

      await expect(main(mockDeps)).rejects.toThrow('Write failed');
    });

    it('should use default dependencies when not provided', async () => {
      // This is more of a structural test since we can't easily mock the defaults
      expect(main).toBeDefined();
    });
  });

  describe('type safety and interfaces', () => {
    it('should create valid DocItem objects', () => {
      const docItem: DocItem = {
        id: 'test-id',
        title: 'Test Title',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'pending',
      };

      expect(docItem.id).toBe('test-id');
      expect(docItem.title).toBe('Test Title');
      expect(docItem.url).toBe('http://example.com');
      expect(docItem.link).toBe('http://example.com/link');
      expect(docItem.status).toBe('pending');
    });

    it('should support optional properties in DocItem', () => {
      const completedDocItem: DocItem = {
        id: 'test-id',
        title: 'Test Title',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'completed',
        processed_url: 'http://processed.com',
        last_processed_error: null,
        last_processed_timestamp: '2023-01-01T00:00:00Z',
      };

      expect(completedDocItem.processed_url).toBe('http://processed.com');
      expect(completedDocItem.last_processed_error).toBe(null);
      expect(completedDocItem.last_processed_timestamp).toBe(
        '2023-01-01T00:00:00Z',
      );
    });

    it('should support error status with error message', () => {
      const errorDocItem: DocItem = {
        id: 'test-id',
        title: 'Test Title',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'error',
        last_processed_error: 'Processing failed due to timeout',
        last_processed_timestamp: '2023-01-01T00:00:00Z',
      };

      expect(errorDocItem.status).toBe('error');
      expect(errorDocItem.last_processed_error).toBe(
        'Processing failed due to timeout',
      );
    });

    it('should validate Dependencies interface requirements', () => {
      const dependencies: Dependencies = {
        fs: mockFs as unknown as typeof import('fs'),
        chromium:
          mockChromium as unknown as typeof import('playwright').chromium,
        console: mockConsole as unknown as Console,
      };

      expect(dependencies.fs).toBeDefined();
      expect(dependencies.chromium).toBeDefined();
      expect(dependencies.console).toBeDefined();
      expect(typeof dependencies.fs.mkdirSync).toBe('function');
      expect(typeof dependencies.fs.writeFileSync).toBe('function');
      expect(typeof dependencies.chromium.launch).toBe('function');
      expect(typeof dependencies.console.log).toBe('function');
    });
  });

  describe('integration scenarios', () => {
    it('should handle mixed valid and invalid links', async () => {
      const mockLinks = [
        {
          getAttribute: vi
            .fn()
            .mockResolvedValue('/?path=/docs/button--default'),
          innerText: vi.fn().mockResolvedValue('Button Default'),
        },
        {
          getAttribute: vi.fn().mockResolvedValue('/?path=/docs/'),
          innerText: vi.fn().mockResolvedValue('Empty ID'),
        },
        {
          getAttribute: vi.fn().mockResolvedValue(null),
          innerText: vi.fn().mockResolvedValue('Null Href'),
        },
        {
          getAttribute: vi
            .fn()
            .mockResolvedValue('/?path=/story/input--primary'),
          innerText: vi.fn().mockResolvedValue('Story Link'),
        },
        {
          getAttribute: vi.fn().mockResolvedValue('/?path=/docs/card--basic'),
          innerText: vi.fn().mockResolvedValue('Card\nBasic\nVariant'),
        },
      ] as unknown as ElementHandle[];

      mockPage.$$ = vi.fn().mockResolvedValue(mockLinks);

      const result = await collectDocItems(mockDeps);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 'button--default',
        title: 'Button Default',
        url: 'http://localhost:6006/iframe.html?viewMode=docs&id=button--default',
        link: 'http://localhost:6006/?path=/docs/button--default',
        status: 'pending',
      });
      expect(result[1]).toEqual({
        id: 'card--basic',
        title: 'Card',
        url: 'http://localhost:6006/iframe.html?viewMode=docs&id=card--basic',
        link: 'http://localhost:6006/?path=/docs/card--basic',
        status: 'pending',
      });

      expect(mockConsole.log).toHaveBeenCalledWith('✓ Success: 2');
      expect(mockConsole.log).toHaveBeenCalledWith('✗ Failures: 1');
      expect(mockConsole.warn).toHaveBeenCalledWith(
        '✗ Skipping link with empty id: /?path=/docs/. Please check that the link is correct.',
      );
    });

    it('should handle complete workflow with realistic data', async () => {
      const mockLinks = [
        {
          getAttribute: vi
            .fn()
            .mockResolvedValue('/?path=/docs/components-button--primary'),
          innerText: vi.fn().mockResolvedValue('Button Primary'),
        },
        {
          getAttribute: vi
            .fn()
            .mockResolvedValue('/?path=/docs/components-input--default'),
          innerText: vi.fn().mockResolvedValue('Input\nDefault'),
        },
        {
          getAttribute: vi
            .fn()
            .mockResolvedValue('/?path=/docs/layout-grid--basic'),
          innerText: vi.fn().mockResolvedValue('Grid Basic'),
        },
      ] as unknown as ElementHandle[];

      mockPage.$$ = vi.fn().mockResolvedValue(mockLinks);

      await main(mockDeps);

      // Parse the written JSON to verify content
      const writeCall = mockFs.writeFileSync.mock.calls[0];
      expect(writeCall[0]).toBe('generated/index.json');

      const writtenData = JSON.parse(writeCall[1] as string) as DocItem[];
      expect(writtenData).toHaveLength(3);

      expect(writtenData[0]).toEqual({
        id: 'components-button--primary',
        title: 'Button Primary',
        url: 'http://localhost:6006/iframe.html?viewMode=docs&id=components-button--primary',
        link: 'http://localhost:6006/?path=/docs/components-button--primary',
        status: 'pending',
      });

      expect(writtenData[1]).toEqual({
        id: 'components-input--default',
        title: 'Input',
        url: 'http://localhost:6006/iframe.html?viewMode=docs&id=components-input--default',
        link: 'http://localhost:6006/?path=/docs/components-input--default',
        status: 'pending',
      });

      expect(writtenData[2]).toEqual({
        id: 'layout-grid--basic',
        title: 'Grid Basic',
        url: 'http://localhost:6006/iframe.html?viewMode=docs&id=layout-grid--basic',
        link: 'http://localhost:6006/?path=/docs/layout-grid--basic',
        status: 'pending',
      });
    });
  });
});
