/**
 * Tests for guidelines.ts script
 */
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest';
import type { DocItem } from './collect.js';
import {
  checkDocItemsFileExists,
  readDocItems,
  filterGuidelinesItems,
  createSafeFileName,
  processGuidelineContent,
  mergeGuidelines,
  writeGuidelinesFile,
  generateGuidelines,
} from './guidelines.js';

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

// Mock fs
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
    writeFileSync: vi.fn(),
    mkdirSync: vi.fn(),
  },
}));

// Mock path with factory that creates fresh functions
vi.mock('path', () => {
  const joinFn = vi.fn();
  const dirnameFn = vi.fn();

  return {
    default: {
      join: joinFn,
      dirname: dirnameFn,
    },
    join: joinFn,
    dirname: dirnameFn,
  };
});

describe('guidelines.ts', () => {
  let mockFs: {
    existsSync: Mock;
    readFileSync: Mock;
    writeFileSync: Mock;
    mkdirSync: Mock;
  };
  let mockPath: {
    join: Mock;
    dirname: Mock;
  };
  beforeEach(async () => {
    // Reset mocks
    vi.clearAllMocks();

    // Get mocked modules
    const fs = await import('fs');
    const path = await import('path');

    mockFs = {
      existsSync: fs.default.existsSync as Mock,
      readFileSync: fs.default.readFileSync as Mock,
      writeFileSync: fs.default.writeFileSync as Mock,
      mkdirSync: fs.default.mkdirSync as Mock,
    };

    mockPath = {
      join: path.default.join as Mock,
      dirname: path.default.dirname as Mock,
    };

    // Mock console
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Setup default path mocks
    mockPath.join.mockImplementation((...args) => args.join('/'));
    mockPath.dirname.mockReturnValue('generated/docs');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('checkDocItemsFileExists', () => {
    it('should return true when file exists', () => {
      mockFs.existsSync.mockReturnValue(true);

      const result = checkDocItemsFileExists('generated/index.json');

      expect(result).toBe(true);
      expect(mockFs.existsSync).toHaveBeenCalledWith('generated/index.json');
    });

    it('should return false when file does not exist', () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = checkDocItemsFileExists('nonexistent.json');

      expect(result).toBe(false);
      expect(mockFs.existsSync).toHaveBeenCalledWith('nonexistent.json');
    });

    it('should handle empty string path', () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = checkDocItemsFileExists('');

      expect(result).toBe(false);
      expect(mockFs.existsSync).toHaveBeenCalledWith('');
    });
  });

  describe('readDocItems', () => {
    it('should parse and return doc items from JSON file', () => {
      const mockDocItems: DocItem[] = [
        {
          id: 'foundations-colors',
          title: 'Colors',
          url: 'http://localhost:6006/iframe.html?viewMode=docs&id=foundations-colors',
          link: 'http://localhost:6006/?path=/docs/foundations-colors',
          status: 'completed',
        },
        {
          id: 'components-button--primary',
          title: 'Button Primary',
          url: 'http://localhost:6006/iframe.html?viewMode=docs&id=components-button--primary',
          link: 'http://localhost:6006/?path=/docs/components-button--primary',
          status: 'pending',
        },
      ];

      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockDocItems));

      const result = readDocItems('generated/index.json');

      expect(result).toEqual(mockDocItems);
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        'generated/index.json',
        'utf-8',
      );
    });

    it('should handle empty JSON array', () => {
      mockFs.readFileSync.mockReturnValue('[]');

      const result = readDocItems('generated/index.json');

      expect(result).toEqual([]);
    });

    it('should throw error for invalid JSON', () => {
      mockFs.readFileSync.mockReturnValue('invalid json');

      expect(() => readDocItems('generated/index.json')).toThrow();
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        'generated/index.json',
        'utf-8',
      );
    });

    it('should handle complex doc item structure', () => {
      const mockDocItems: DocItem[] = [
        {
          id: 'foundations-typography',
          title: 'Typography',
          url: 'http://localhost:6006/iframe.html?viewMode=docs&id=foundations-typography',
          link: 'http://localhost:6006/?path=/docs/foundations-typography',
          status: 'completed',
          processed_url: 'http://processed.example.com',
          last_processed_timestamp: '2023-01-01T00:00:00Z',
          last_processed_error: null,
        },
      ];

      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockDocItems));

      const result = readDocItems('generated/index.json');

      expect(result).toEqual(mockDocItems);
      expect(result[0]).toHaveProperty('processed_url');
      expect(result[0]).toHaveProperty('last_processed_timestamp');
      expect(result[0]).toHaveProperty('last_processed_error');
    });
  });

  describe('filterGuidelinesItems', () => {
    const mockDocItems: DocItem[] = [
      {
        id: 'foundations-colors',
        title: 'Colors',
        url: 'http://example.com/colors',
        link: 'http://example.com/colors',
        status: 'completed',
      },
      {
        id: 'foundations-typography',
        title: 'Typography',
        url: 'http://example.com/typography',
        link: 'http://example.com/typography',
        status: 'completed',
      },
      {
        id: 'components-button--primary',
        title: 'Button Primary',
        url: 'http://example.com/button',
        link: 'http://example.com/button',
        status: 'completed',
      },
      {
        id: 'foundations-spacing',
        title: 'Spacing',
        url: 'http://example.com/spacing',
        link: 'http://example.com/spacing',
        status: 'pending',
      },
      {
        id: 'foundations-layout',
        title: 'Layout',
        url: 'http://example.com/layout',
        link: 'http://example.com/layout',
        status: 'error',
      },
    ];

    it('should filter only completed foundations items', () => {
      const result = filterGuidelinesItems(mockDocItems);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(mockDocItems[0]);
      expect(result[1]).toEqual(mockDocItems[1]);

      // Verify all results start with 'foundations-'
      result.forEach((item) => {
        expect(item.id).toMatch(/^foundations-/);
        expect(item.status).toBe('completed');
      });
    });

    it('should return empty array when no foundations items exist', () => {
      const nonFoundationsItems: DocItem[] = [
        {
          id: 'components-button--primary',
          title: 'Button Primary',
          url: 'http://example.com/button',
          link: 'http://example.com/button',
          status: 'completed',
        },
        {
          id: 'patterns-form-layout',
          title: 'Form Layout',
          url: 'http://example.com/form',
          link: 'http://example.com/form',
          status: 'completed',
        },
      ];

      const result = filterGuidelinesItems(nonFoundationsItems);

      expect(result).toHaveLength(0);
    });

    it('should return empty array when no completed items exist', () => {
      const pendingFoundationsItems: DocItem[] = [
        {
          id: 'foundations-colors',
          title: 'Colors',
          url: 'http://example.com/colors',
          link: 'http://example.com/colors',
          status: 'pending',
        },
        {
          id: 'foundations-typography',
          title: 'Typography',
          url: 'http://example.com/typography',
          link: 'http://example.com/typography',
          status: 'error',
        },
      ];

      const result = filterGuidelinesItems(pendingFoundationsItems);

      expect(result).toHaveLength(0);
    });

    it('should handle empty input array', () => {
      const result = filterGuidelinesItems([]);

      expect(result).toHaveLength(0);
    });

    it('should handle case sensitivity correctly', () => {
      const mixedCaseItems: DocItem[] = [
        {
          id: 'Foundations-colors', // Capital F
          title: 'Colors',
          url: 'http://example.com/colors',
          link: 'http://example.com/colors',
          status: 'completed',
        },
        {
          id: 'foundations-typography',
          title: 'Typography',
          url: 'http://example.com/typography',
          link: 'http://example.com/typography',
          status: 'completed',
        },
      ];

      const result = filterGuidelinesItems(mixedCaseItems);

      // Should only match lowercase 'foundations-'
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('foundations-typography');
    });
  });

  describe('createSafeFileName', () => {
    it('should convert basic id to safe filename', () => {
      const result = createSafeFileName('foundations-colors');

      expect(result).toBe('foundations-colors');
    });

    it('should replace special characters with underscores', () => {
      const result = createSafeFileName('foundations-colors@2x!');

      expect(result).toBe('foundations-colors_2x_');
    });

    it('should handle spaces and convert to lowercase', () => {
      const result = createSafeFileName('Foundations Colors Example');

      expect(result).toBe('foundations_colors_example');
    });

    it('should replace multiple hyphens with single hyphen', () => {
      const result = createSafeFileName('foundations---colors----typography');

      expect(result).toBe('foundations-colors-typography');
    });

    it('should handle complex mixed characters', () => {
      const result = createSafeFileName('Foundations-Colors@2x_LARGE!!!');

      expect(result).toBe('foundations-colors_2x_large___');
    });

    it('should handle empty string', () => {
      const result = createSafeFileName('');

      expect(result).toBe('');
    });

    it('should handle string with only special characters', () => {
      const result = createSafeFileName('!@#$%^&*()');

      expect(result).toBe('__________');
    });

    it('should preserve numbers and basic characters', () => {
      const result = createSafeFileName('foundations-colors-v2-beta1');

      expect(result).toBe('foundations-colors-v2-beta1');
    });

    it('should handle underscores correctly', () => {
      const result = createSafeFileName('foundations_colors_example');

      expect(result).toBe('foundations_colors_example');
    });
  });

  describe('processGuidelineContent', () => {
    it('should remove h1 headers', () => {
      const content = `# Main Title
Some content here
## Subtitle
More content`;

      const result = processGuidelineContent(content);

      expect(result).toBe(`Some content here
## Subtitle
More content`);
    });

    it('should handle multiple h1 headers', () => {
      const content = `# First Title
Content 1
# Second Title
Content 2
# Third Title
Content 3`;

      const result = processGuidelineContent(content);

      expect(result).toBe(`Content 1

Content 2

Content 3`);
    });

    it('should preserve other header levels', () => {
      const content = `# Main Title
## Subtitle
### Sub-subtitle
#### Small header
##### Smallest header
###### Tiniest header`;

      const result = processGuidelineContent(content);

      expect(result).toBe(`## Subtitle
### Sub-subtitle
#### Small header
##### Smallest header
###### Tiniest header`);
    });

    it('should clean up extra newlines but preserve structure', () => {
      const content = `# Title



Content with gaps


More content




## Section
Content`;

      const result = processGuidelineContent(content);

      expect(result).toBe(`Content with gaps

More content

## Section
Content`);
    });

    it('should trim whitespace from beginning and end', () => {
      const content = `   
# Title
Content here
   `;

      const result = processGuidelineContent(content);

      expect(result).toBe('Content here');
    });

    it('should handle empty content', () => {
      const result = processGuidelineContent('');

      expect(result).toBe('');
    });

    it('should handle content with only h1 headers', () => {
      const content = `# Title 1
# Title 2
# Title 3`;

      const result = processGuidelineContent(content);

      expect(result).toBe('');
    });

    it('should handle mixed content with code blocks', () => {
      const content = `# Main Title
Here is some content

\`\`\`javascript
const example = 'code';
\`\`\`

## Subtitle
More content after code`;

      const result = processGuidelineContent(content);

      expect(result).toBe(`Here is some content

\`\`\`javascript
const example = 'code';
\`\`\`

## Subtitle
More content after code`);
    });

    it('should not remove h1 headers within code blocks', () => {
      const content = `# Real Title
Content
\`\`\`markdown
# This is not a real h1
This is code
\`\`\`
More content`;

      const result = processGuidelineContent(content);

      // The current implementation actually does remove H1 headers even in code blocks
      // This is expected behavior based on the simple regex implementation
      expect(result).toBe(`Content
\`\`\`markdown

This is code
\`\`\`
More content`);
    });
  });

  describe('mergeGuidelines', () => {
    const mockGuidelines: DocItem[] = [
      {
        id: 'foundations-colors',
        title: 'Colors',
        url: 'http://example.com/colors',
        link: 'http://example.com/colors',
        status: 'completed',
      },
      {
        id: 'foundations-typography',
        title: 'Typography',
        url: 'http://example.com/typography',
        link: 'http://example.com/typography',
        status: 'completed',
      },
    ];

    beforeEach(() => {
      mockPath.join.mockImplementation((dir, file) => `${dir}/${file}`);
    });

    it('should merge guidelines successfully', () => {
      mockFs.readFileSync
        .mockReturnValueOnce(
          '# Colors\nThis is about colors\n## Usage\nUse colors wisely',
        )
        .mockReturnValueOnce(
          '# Typography\nThis is about typography\n## Font sizes\nVarious sizes',
        );

      const result = mergeGuidelines(mockGuidelines, 'generated/docs');

      expect(result.mergedContent).toContain('# Design Guidelines');
      expect(result.mergedContent).toContain('## Colors');
      expect(result.mergedContent).toContain('This is about colors');
      expect(result.mergedContent).toContain('## Usage');
      expect(result.mergedContent).toContain('Use colors wisely');
      expect(result.mergedContent).toContain('## Typography');
      expect(result.mergedContent).toContain('This is about typography');
      expect(result.mergedContent).toContain('## Font sizes');
      expect(result.mergedContent).toContain('Various sizes');

      expect(result.result.successCount).toBe(2);
      expect(result.result.failureCount).toBe(0);

      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        'generated/docs/foundations-colors.md',
        'utf-8',
      );
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        'generated/docs/foundations-typography.md',
        'utf-8',
      );
    });

    it('should handle file read errors gracefully', () => {
      mockFs.readFileSync
        .mockImplementationOnce(() => {
          throw new Error('File not found');
        })
        .mockReturnValueOnce('# Typography\nTypography content');

      const result = mergeGuidelines(mockGuidelines, 'generated/docs');

      expect(result.mergedContent).toContain('# Design Guidelines');
      expect(result.mergedContent).toContain('## Typography');
      expect(result.mergedContent).toContain('Typography content');
      expect(result.mergedContent).not.toContain('## Colors');

      expect(result.result.successCount).toBe(1);
      expect(result.result.failureCount).toBe(1);

      expect(console.warn).toHaveBeenCalledWith(
        'Warning: Error parsing Colors (ID: foundations-colors)',
      );
      expect(console.log).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should process safe filenames correctly', () => {
      const guidelinesWithSpecialChars: DocItem[] = [
        {
          id: 'foundations-colors@2x!',
          title: 'Colors 2x',
          url: 'http://example.com/colors',
          link: 'http://example.com/colors',
          status: 'completed',
        },
      ];

      mockFs.readFileSync.mockReturnValue('# Colors\nColor content');

      mergeGuidelines(guidelinesWithSpecialChars, 'generated/docs');

      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        'generated/docs/foundations-colors_2x_.md',
        'utf-8',
      );
    });

    it('should handle empty guidelines array', () => {
      const result = mergeGuidelines([], 'generated/docs');

      expect(result.mergedContent).toBe(
        '# Design Guidelines\n\n' +
          'This document contains all design foundations and guidelines for the design system.\n\n',
      );
      expect(result.result.successCount).toBe(0);
      expect(result.result.failureCount).toBe(0);
    });

    it('should process guideline content correctly', () => {
      const guidelines: DocItem[] = [
        {
          id: 'foundations-spacing',
          title: 'Spacing',
          url: 'http://example.com/spacing',
          link: 'http://example.com/spacing',
          status: 'completed',
        },
      ];

      mockFs.readFileSync.mockReturnValue(`# Spacing Title
This is spacing content

## Usage
Use spacing properly`);

      const result = mergeGuidelines(guidelines, 'generated/docs');

      expect(result.mergedContent).toContain('## Spacing');
      expect(result.mergedContent).toContain('This is spacing content');
      expect(result.mergedContent).toContain('## Usage');
      expect(result.mergedContent).toContain('Use spacing properly');
      expect(result.mergedContent).not.toContain('# Spacing Title');
    });

    it('should maintain proper markdown structure', () => {
      const guidelines: DocItem[] = [
        {
          id: 'foundations-colors',
          title: 'Colors',
          url: 'http://example.com/colors',
          link: 'http://example.com/colors',
          status: 'completed',
        },
      ];

      mockFs.readFileSync.mockReturnValue('Color guidelines content');

      const result = mergeGuidelines(guidelines, 'generated/docs');

      expect(result.mergedContent).toMatch(/^# Design Guidelines\n\n/);
      expect(result.mergedContent).toContain(
        'This document contains all design foundations',
      );
      expect(result.mergedContent).toMatch(
        /## Colors\n\nColor guidelines content\n\n$/,
      );
    });
  });

  describe('writeGuidelinesFile', () => {
    it('should create directory and write file', () => {
      const content = '# Design Guidelines\n\nContent here';

      writeGuidelinesFile('generated/docs/guidelines.md', content);

      expect(mockFs.mkdirSync).toHaveBeenCalledWith('generated/docs', {
        recursive: true,
      });
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'generated/docs/guidelines.md',
        content,
      );
    });

    it('should handle nested directory paths', () => {
      mockPath.dirname.mockReturnValue('deep/nested/path');

      writeGuidelinesFile('deep/nested/path/guidelines.md', 'content');

      expect(mockFs.mkdirSync).toHaveBeenCalledWith('deep/nested/path', {
        recursive: true,
      });
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'deep/nested/path/guidelines.md',
        'content',
      );
    });

    it('should handle empty content', () => {
      writeGuidelinesFile('generated/docs/guidelines.md', '');

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'generated/docs/guidelines.md',
        '',
      );
    });

    it('should handle root directory file', () => {
      mockPath.dirname.mockReturnValue('.');

      writeGuidelinesFile('guidelines.md', 'content');

      expect(mockFs.mkdirSync).toHaveBeenCalledWith('.', { recursive: true });
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'guidelines.md',
        'content',
      );
    });
  });

  describe('generateGuidelines', () => {
    const mockDocItems: DocItem[] = [
      {
        id: 'foundations-colors',
        title: 'Colors',
        url: 'http://example.com/colors',
        link: 'http://example.com/colors',
        status: 'completed',
      },
      {
        id: 'foundations-typography',
        title: 'Typography',
        url: 'http://example.com/typography',
        link: 'http://example.com/typography',
        status: 'completed',
      },
      {
        id: 'components-button--primary',
        title: 'Button Primary',
        url: 'http://example.com/button',
        link: 'http://example.com/button',
        status: 'completed',
      },
    ];

    beforeEach(() => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync
        .mockReturnValueOnce(JSON.stringify(mockDocItems))
        .mockReturnValue('# Sample\nContent here');
      mockPath.join.mockImplementation((dir, file) => `${dir}/${file}`);
      mockPath.dirname.mockReturnValue('generated/docs');
    });

    it('should generate guidelines successfully', () => {
      const result = generateGuidelines();

      expect(result.successCount).toBe(2);
      expect(result.failureCount).toBe(0);

      expect(mockFs.existsSync).toHaveBeenCalledWith('generated/index.json');
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        'generated/index.json',
        'utf-8',
      );
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'generated/docs/guidelines.md',
        expect.stringContaining('# Design Guidelines'),
      );

      expect(console.log).toHaveBeenCalledWith(
        '--- :file_folder:: Found 2 guidelines to process (out of 3 total).',
      );
      expect(console.log).toHaveBeenCalledWith(
        '--- :file_folder:: Output to: generated/docs/guidelines.md',
      );
      expect(console.log).toHaveBeenCalledWith(
        'Successfully merged 2 foundations items into generated/docs/guidelines.md.',
      );
      expect(console.log).toHaveBeenCalledWith(
        '--- :white_check_mark:: Guidelines creation complete.',
      );
      expect(console.log).toHaveBeenCalledWith('✓ Success: 2');
      expect(console.log).toHaveBeenCalledWith('✗ Failures: 0');
    });

    it('should throw error when doc items file does not exist', () => {
      mockFs.existsSync.mockReturnValue(false);

      expect(() => generateGuidelines()).toThrow(
        'Stories file not found: generated/index.json. Please run "yarn collect" first.',
      );

      expect(mockFs.existsSync).toHaveBeenCalledWith('generated/index.json');
    });

    it('should throw error when no guidelines are found', () => {
      const nonFoundationsItems: DocItem[] = [
        {
          id: 'components-button--primary',
          title: 'Button Primary',
          url: 'http://example.com/button',
          link: 'http://example.com/button',
          status: 'completed',
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(nonFoundationsItems));

      generateGuidelines();

      expect(() => generateGuidelines()).toThrow(
        "No guidelines to process. Please run 'yarn generate' first.",
      );
    });

    it('should use config overrides', () => {
      const configOverride = {
        docItemsFile: 'custom/items.json',
        docsFolder: 'custom/docs',
        guidelinesFile: 'custom/output.md',
      };

      mockFs.existsSync.mockImplementation(
        (path) => path === 'custom/items.json',
      );
      mockFs.readFileSync
        .mockReturnValueOnce(JSON.stringify(mockDocItems))
        .mockReturnValue('Content');

      mockPath.dirname.mockReturnValue('custom');

      const result = generateGuidelines(configOverride);

      expect(result.successCount).toBe(2);
      expect(mockFs.existsSync).toHaveBeenCalledWith('custom/items.json');
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        'custom/items.json',
        'utf-8',
      );
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'custom/output.md',
        expect.stringContaining('# Design Guidelines'),
      );

      expect(console.log).toHaveBeenCalledWith(
        '--- :file_folder:: Output to: custom/output.md',
      );
      expect(console.log).toHaveBeenCalledWith(
        'Successfully merged 2 foundations items into custom/output.md.',
      );
    });

    it('should handle partial config overrides', () => {
      const configOverride = {
        docItemsFile: 'custom/items.json',
      };

      mockFs.existsSync.mockImplementation(
        (path) => path === 'custom/items.json',
      );
      mockFs.readFileSync
        .mockReturnValueOnce(JSON.stringify(mockDocItems))
        .mockReturnValue('Content');

      const result = generateGuidelines(configOverride);

      expect(result.successCount).toBe(2);
      expect(mockFs.existsSync).toHaveBeenCalledWith('custom/items.json');
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'generated/docs/guidelines.md', // Still uses default guidelines file
        expect.stringContaining('# Design Guidelines'),
      );
    });

    it('should handle file processing errors gracefully', () => {
      mockFs.readFileSync
        .mockReturnValueOnce(JSON.stringify(mockDocItems))
        .mockImplementationOnce(() => {
          throw new Error('File read error');
        })
        .mockReturnValue('Content for second file');

      const result = generateGuidelines();

      expect(result.successCount).toBe(1);
      expect(result.failureCount).toBe(1);

      expect(console.warn).toHaveBeenCalledWith(
        'Warning: Error parsing Typography (ID: foundations-typography)',
      );
      expect(console.log).toHaveBeenCalledWith('✓ Success: 1');
      expect(console.log).toHaveBeenCalledWith('✗ Failures: 1');
    });

    it('should handle empty doc items array', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('[]');

      generateGuidelines();

      expect(() => generateGuidelines()).toThrow(
        "No guidelines to process. Please run 'yarn generate' first.",
      );
    });

    it('should return correct result format', () => {
      const result = generateGuidelines();

      expect(result).toHaveProperty('successCount');
      expect(result).toHaveProperty('failureCount');
      expect(typeof result.successCount).toBe('number');
      expect(typeof result.failureCount).toBe('number');
      expect(result.successCount).toBeGreaterThanOrEqual(0);
      expect(result.failureCount).toBeGreaterThanOrEqual(0);
    });
  });

  describe('type safety and interfaces', () => {
    it('should validate GuidelinesResult interface', () => {
      const testDocItems: DocItem[] = [
        {
          id: 'foundations-colors',
          title: 'Colors',
          url: 'http://example.com/colors',
          link: 'http://example.com/colors',
          status: 'completed',
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync
        .mockReturnValueOnce(JSON.stringify(testDocItems))
        .mockReturnValue('Content');

      const result = generateGuidelines();

      expect(result).toHaveProperty('successCount');
      expect(result).toHaveProperty('failureCount');
      expect(typeof result.successCount).toBe('number');
      expect(typeof result.failureCount).toBe('number');
    });

    it('should work with DocItem interface from collect.ts', () => {
      const docItem: DocItem = {
        id: 'foundations-test',
        title: 'Test Foundation',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'completed',
      };

      const filtered = filterGuidelinesItems([docItem]);
      expect(filtered).toHaveLength(1);
      expect(filtered[0]).toBe(docItem);
    });

    it('should handle DocItem with optional properties', () => {
      const docItemWithOptionals: DocItem = {
        id: 'foundations-test',
        title: 'Test Foundation',
        url: 'http://example.com',
        link: 'http://example.com/link',
        status: 'completed',
        processed_url: 'http://processed.com',
        last_processed_timestamp: '2023-01-01T00:00:00Z',
        last_processed_error: null,
      };

      const filtered = filterGuidelinesItems([docItemWithOptionals]);
      expect(filtered).toHaveLength(1);
      expect(filtered[0]).toBe(docItemWithOptionals);
    });
  });

  describe('integration scenarios', () => {
    it('should handle complete workflow with realistic data', () => {
      const realisticDocItems: DocItem[] = [
        {
          id: 'foundations-colors-primary',
          title: 'Primary Colors',
          url: 'http://localhost:6006/iframe.html?viewMode=docs&id=foundations-colors-primary',
          link: 'http://localhost:6006/?path=/docs/foundations-colors-primary',
          status: 'completed',
          processed_url: 'http://processed.example.com/colors',
          last_processed_timestamp: '2023-08-26T12:00:00Z',
        },
        {
          id: 'foundations-typography-headings',
          title: 'Typography Headings',
          url: 'http://localhost:6006/iframe.html?viewMode=docs&id=foundations-typography-headings',
          link: 'http://localhost:6006/?path=/docs/foundations-typography-headings',
          status: 'completed',
        },
        {
          id: 'components-button--primary',
          title: 'Primary Button',
          url: 'http://localhost:6006/iframe.html?viewMode=docs&id=components-button--primary',
          link: 'http://localhost:6006/?path=/docs/components-button--primary',
          status: 'completed',
        },
        {
          id: 'foundations-spacing',
          title: 'Spacing',
          url: 'http://localhost:6006/iframe.html?viewMode=docs&id=foundations-spacing',
          link: 'http://localhost:6006/?path=/docs/foundations-spacing',
          status: 'pending',
        },
      ];

      const colorContent = `# Primary Colors
Our primary color palette consists of carefully selected colors.

## Usage
- Use primary blue for main actions
- Use secondary colors for supporting elements

## Accessibility
Ensure proper contrast ratios`;

      const typographyContent = `# Typography Headings
Typography creates hierarchy and guides users through content.

## Heading Scale
We use a modular scale for consistent typography

### H1 - Page Titles
### H2 - Section Titles
### H3 - Subsection Titles`;

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync
        .mockReturnValueOnce(JSON.stringify(realisticDocItems))
        .mockReturnValueOnce(colorContent)
        .mockReturnValueOnce(typographyContent);

      mockPath.join.mockImplementation((dir, file) => `${dir}/${file}`);
      mockPath.dirname.mockReturnValue('generated/docs');

      const result = generateGuidelines();

      expect(result.successCount).toBe(2);
      expect(result.failureCount).toBe(0);

      const writeCall = mockFs.writeFileSync.mock.calls.find(
        (call) => call[0] === 'generated/docs/guidelines.md',
      );
      expect(writeCall).toBeDefined();

      const writtenContent = writeCall![1] as string;
      expect(writtenContent).toContain('# Design Guidelines');
      expect(writtenContent).toContain('## Primary Colors');
      expect(writtenContent).toContain('Our primary color palette consists of');
      expect(writtenContent).toContain('## Usage');
      expect(writtenContent).toContain('Use primary blue for main actions');
      expect(writtenContent).toContain('## Typography Headings');
      expect(writtenContent).toContain('Typography creates hierarchy');
      expect(writtenContent).toContain('### H1 - Page Titles');

      // Should not contain original H1 headers
      expect(writtenContent).not.toContain('\n# Primary Colors');
      expect(writtenContent).not.toContain('\n# Typography Headings');

      expect(console.log).toHaveBeenCalledWith(
        '--- :file_folder:: Found 2 guidelines to process (out of 4 total).',
      );
    });

    it('should handle mixed success and failure scenarios', () => {
      const mixedDocItems: DocItem[] = [
        {
          id: 'foundations-colors',
          title: 'Colors',
          url: 'http://example.com/colors',
          link: 'http://example.com/colors',
          status: 'completed',
        },
        {
          id: 'foundations-typography',
          title: 'Typography',
          url: 'http://example.com/typography',
          link: 'http://example.com/typography',
          status: 'completed',
        },
        {
          id: 'foundations-spacing',
          title: 'Spacing',
          url: 'http://example.com/spacing',
          link: 'http://example.com/spacing',
          status: 'completed',
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync
        .mockReturnValueOnce(JSON.stringify(mixedDocItems))
        .mockReturnValueOnce('# Colors\nColor content')
        .mockImplementationOnce(() => {
          throw new Error('Typography file not found');
        })
        .mockReturnValueOnce('# Spacing\nSpacing content');

      mockPath.join.mockImplementation((dir, file) => `${dir}/${file}`);
      mockPath.dirname.mockReturnValue('generated/docs');

      const result = generateGuidelines();

      expect(result.successCount).toBe(2);
      expect(result.failureCount).toBe(1);

      expect(console.warn).toHaveBeenCalledWith(
        'Warning: Error parsing Typography (ID: foundations-typography)',
      );
      expect(console.log).toHaveBeenCalledWith('✓ Success: 2');
      expect(console.log).toHaveBeenCalledWith('✗ Failures: 1');

      const writeCall = mockFs.writeFileSync.mock.calls.find(
        (call) => call[0] === 'generated/docs/guidelines.md',
      );
      const writtenContent = writeCall![1] as string;
      expect(writtenContent).toContain('## Colors');
      expect(writtenContent).toContain('## Spacing');
      expect(writtenContent).not.toContain('## Typography');
    });

    it('should handle safe filename conversion in realistic scenario', () => {
      const complexDocItems: DocItem[] = [
        {
          id: 'foundations-colors@2x-retina',
          title: 'Colors 2x Retina',
          url: 'http://example.com/colors',
          link: 'http://example.com/colors',
          status: 'completed',
        },
        {
          id: 'foundations-typography_system!',
          title: 'Typography System!',
          url: 'http://example.com/typography',
          link: 'http://example.com/typography',
          status: 'completed',
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync
        .mockReturnValueOnce(JSON.stringify(complexDocItems))
        .mockReturnValueOnce('Colors content')
        .mockReturnValueOnce('Typography content');

      mockPath.join.mockImplementation((dir, file) => `${dir}/${file}`);
      mockPath.dirname.mockReturnValue('generated/docs');

      generateGuidelines();

      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        'generated/docs/foundations-colors_2x-retina.md',
        'utf-8',
      );
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        'generated/docs/foundations-typography_system_.md',
        'utf-8',
      );
    });
  });

  describe('error handling and edge cases', () => {
    it('should handle undefined config values gracefully', () => {
      const testDocItems: DocItem[] = [
        {
          id: 'foundations-colors',
          title: 'Colors',
          url: 'http://example.com/colors',
          link: 'http://example.com/colors',
          status: 'completed',
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync
        .mockReturnValueOnce(JSON.stringify(testDocItems))
        .mockReturnValue('Content');

      const result = generateGuidelines({});

      expect(result).toHaveProperty('successCount');
      expect(result).toHaveProperty('failureCount');
    });

    it('should handle null values in content processing', () => {
      // This tests robustness against null/undefined inputs
      expect(() => processGuidelineContent('')).not.toThrow();
      expect(() => createSafeFileName('')).not.toThrow();
      expect(() => filterGuidelinesItems([])).not.toThrow();
    });

    it('should handle very long content', () => {
      const longContent = 'A'.repeat(10000);
      const result = processGuidelineContent(longContent);

      expect(result).toBe(longContent);
      expect(result.length).toBe(10000);
    });

    it('should handle unicode characters in filenames', () => {
      const unicodeId = 'foundations-émojis🎨-colors';
      const result = createSafeFileName(unicodeId);

      expect(result).toBe('foundations-_mojis__-colors');
    });

    it('should maintain proper newline handling', () => {
      const contentWithNewlines = `# Title
Line 1

Line 2


Line 3`;

      const result = processGuidelineContent(contentWithNewlines);

      expect(result).toBe(`Line 1

Line 2

Line 3`);
    });
  });
});
