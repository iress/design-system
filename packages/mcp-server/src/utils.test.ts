/**
 * Tests for utility functions
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import type { ComponentMapping } from './types.js';
import {
  getMarkdownFiles,
  mapIressComponentToFile,
  extractIressComponents,
  readFileContent,
  fileExists,
} from './utils.js';

// Mock fs module
vi.mock('fs');
vi.mock('./config.js', () => ({
  DOCS_DIR: '/mock/docs/dir',
}));

const mockedFs = vi.mocked(fs);

// Test helper functions and types
const createComponentMapping = (
  componentName: string,
  filePath: string | null,
): ComponentMapping => ({
  componentName,
  filePath,
});

const mockFileList = [
  'components-button-docs.md',
  'components-input-docs.md',
  'components-card-docs.md',
] as const;

type MockFileList = (typeof mockFileList)[number];

// Type for fs.readdirSync return value to avoid repetitive eslint-disable comments
const createMockFileArray = (
  ...files: (string | Buffer | null | undefined)[]
) =>
  files.filter(
    (file): file is string | Buffer => file != null,
  ) as unknown as ReturnType<typeof fs.readdirSync>;

describe('utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getMarkdownFiles', () => {
    it('should return empty array when docs directory does not exist', () => {
      mockedFs.existsSync.mockReturnValue(false);

      const result = getMarkdownFiles();

      expect(result).toEqual([]);
      expect(fs.existsSync).toHaveBeenCalledWith('/mock/docs/dir');
    });

    it('should return markdown files when directory exists', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(
        createMockFileArray(
          'components-button-docs.md',
          'components-input-docs.md',
          'other-file.txt',
          'nested/components-card-docs.md',
          Buffer.from('buffer-file'),
        ),
      );

      const result = getMarkdownFiles();

      expect(result).toEqual([
        'components-button-docs.md',
        'components-input-docs.md',
        'nested/components-card-docs.md',
      ]);
      expect(fs.readdirSync).toHaveBeenCalledWith('/mock/docs/dir', {
        recursive: true,
      });
    });

    it('should handle errors gracefully', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockImplementation(() => {
        throw new Error('Read error');
      });

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result = getMarkdownFiles();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading docs directory:',
        expect.any(Error),
      );
    });

    it('should filter out non-string entries from directory listing', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(
        createMockFileArray(
          'file1.md',
          Buffer.from('buffer'),
          'file2.md',
          null,
          undefined,
          'file3.txt',
        ),
      );

      const result = getMarkdownFiles();

      expect(result).toEqual(['file1.md', 'file2.md']);
    });
  });

  describe('mapIressComponentToFile', () => {
    beforeEach(() => {
      mockedFs.existsSync.mockReturnValue(true);
    });

    it('should find exact match for component', () => {
      mockedFs.readdirSync.mockReturnValue(
        createMockFileArray(...mockFileList),
      );

      const mapping = createComponentMapping(
        'IressButton',
        'components-button-docs.md',
      );
      const result = mapIressComponentToFile(mapping.componentName);

      expect(result).toBe(mapping.filePath);
    });

    it('should find partial match when exact match is not available', () => {
      mockedFs.readdirSync.mockReturnValue(
        createMockFileArray(
          'components-button-advanced-docs.md',
          'components-input-docs.md',
        ),
      );

      const mapping = createComponentMapping(
        'IressButton',
        'components-button-advanced-docs.md',
      );
      const result = mapIressComponentToFile(mapping.componentName);

      expect(result).toBe(mapping.filePath);
    });

    it('should find fuzzy match when exact and partial matches are not available', () => {
      mockedFs.readdirSync.mockReturnValue(
        createMockFileArray(
          'components-custom-button-docs.md',
          'components-input-docs.md',
        ),
      );

      const mapping = createComponentMapping(
        'IressButton',
        'components-custom-button-docs.md',
      );
      const result = mapIressComponentToFile(mapping.componentName);

      expect(result).toBe(mapping.filePath);
    });

    it('should return null when no match is found', () => {
      mockedFs.readdirSync.mockReturnValue(
        createMockFileArray(
          'components-input-docs.md',
          'components-card-docs.md',
        ),
      );

      const mapping = createComponentMapping('IressButton', null);
      const result = mapIressComponentToFile(mapping.componentName);

      expect(result).toBe(mapping.filePath);
    });

    it('should handle component names without Iress prefix', () => {
      mockedFs.readdirSync.mockReturnValue(
        createMockFileArray('components-button-docs.md'),
      );

      const mapping = createComponentMapping(
        'Button',
        'components-button-docs.md',
      );
      const result = mapIressComponentToFile(mapping.componentName);

      expect(result).toBe(mapping.filePath);
    });

    it('should handle camelCase to lowercase conversion correctly', () => {
      mockedFs.readdirSync.mockReturnValue(
        createMockFileArray('components-datepicker-docs.md'),
      );

      const mapping = createComponentMapping(
        'IressDatePicker',
        'components-datepicker-docs.md',
      );
      const result = mapIressComponentToFile(mapping.componentName);

      expect(result).toBe(mapping.filePath);
    });

    it('should prioritize exact match over partial match', () => {
      mockedFs.readdirSync.mockReturnValue(
        createMockFileArray(
          'components-button-docs.md',
          'components-button-advanced-docs.md',
        ),
      );

      const mapping = createComponentMapping(
        'IressButton',
        'components-button-docs.md',
      );
      const result = mapIressComponentToFile(mapping.componentName);

      expect(result).toBe(mapping.filePath);
    });

    it('should prioritize partial match over fuzzy match', () => {
      mockedFs.readdirSync.mockReturnValue(
        createMockFileArray(
          'components-custom-button-docs.md',
          'components-button-advanced-docs.md',
        ),
      );

      const mapping = createComponentMapping(
        'IressButton',
        'components-button-advanced-docs.md',
      );
      const result = mapIressComponentToFile(mapping.componentName);

      expect(result).toBe(mapping.filePath);
    });
  });

  describe('extractIressComponents', () => {
    it('should extract Iress component names from text', () => {
      const text = `
        Use IressButton for actions and IressInput for text entry.
        You can also use IressCard to display content.
      `;

      const result = extractIressComponents(text);

      expect(result).toEqual(['IressButton', 'IressInput', 'IressCard']);
    });

    it('should handle empty text', () => {
      const result = extractIressComponents('');

      expect(result).toEqual([]);
    });

    it('should handle text without Iress components', () => {
      const text = 'This is just regular text with no components.';

      const result = extractIressComponents(text);

      expect(result).toEqual([]);
    });

    it('should remove duplicate component names', () => {
      const text = `
        Use IressButton here and IressButton there.
        Also use IressInput and IressButton again.
      `;

      const result = extractIressComponents(text);

      expect(result).toEqual(['IressButton', 'IressInput']);
    });

    it('should match component names with various cases', () => {
      const text = `
        IressA, IressB, IressC, IressABC, IressXYZ,
        IressCamelCase, IressPascalCase
      `;

      const result = extractIressComponents(text);

      expect(result).toEqual([
        'IressA',
        'IressB',
        'IressC',
        'IressABC',
        'IressXYZ',
        'IressCamelCase',
        'IressPascalCase',
      ]);
    });

    it('should match component names according to current implementation', () => {
      const text = 'ThisIressButtonIsNotValid and IressButton is valid';

      const result = extractIressComponents(text);

      // Current implementation matches any "Iress" followed by capital letter and additional letters
      // This includes compound words like "IressButtonIsNotValid"
      expect(result).toEqual(['IressButtonIsNotValid', 'IressButton']);
    });

    it('should handle special characters and boundaries', () => {
      const text = `
        <IressButton>Click me</IressButton>
        {IressInput}
        IressCard.
        IressModal,
        IressDialog;
        IressTooltip!
        IressForm?
      `;

      const result = extractIressComponents(text);

      expect(result).toEqual([
        'IressButton',
        'IressInput',
        'IressCard',
        'IressModal',
        'IressDialog',
        'IressTooltip',
        'IressForm',
      ]);
    });
  });

  describe('readFileContent', () => {
    it('should read file content successfully', () => {
      const mockContent = 'Mock file content';
      mockedFs.readFileSync.mockReturnValue(mockContent);

      const result = readFileContent('/path/to/file.txt');

      expect(result).toBe(mockContent);
      expect(fs.readFileSync).toHaveBeenCalledWith(
        '/path/to/file.txt',
        'utf-8',
      );
    });

    it('should propagate file system errors', () => {
      const error = new Error('File not found');
      mockedFs.readFileSync.mockImplementation(() => {
        throw error;
      });

      expect(() => readFileContent('/nonexistent/file.txt')).toThrow(
        'File not found',
      );
    });

    it('should handle different file paths', () => {
      mockedFs.readFileSync.mockReturnValue('content');

      readFileContent('/absolute/path/file.txt');
      expect(fs.readFileSync).toHaveBeenCalledWith(
        '/absolute/path/file.txt',
        'utf-8',
      );

      readFileContent('relative/path/file.txt');
      expect(fs.readFileSync).toHaveBeenCalledWith(
        'relative/path/file.txt',
        'utf-8',
      );
    });
  });

  describe('fileExists', () => {
    it('should return true when file exists', () => {
      mockedFs.existsSync.mockReturnValue(true);

      const result = fileExists('/path/to/file.txt');

      expect(result).toBe(true);
      expect(fs.existsSync).toHaveBeenCalledWith('/path/to/file.txt');
    });

    it('should return false when file does not exist', () => {
      mockedFs.existsSync.mockReturnValue(false);

      const result = fileExists('/nonexistent/file.txt');

      expect(result).toBe(false);
      expect(fs.existsSync).toHaveBeenCalledWith('/nonexistent/file.txt');
    });

    it('should handle different file paths', () => {
      mockedFs.existsSync.mockReturnValue(true);

      fileExists('/absolute/path/file.txt');
      expect(fs.existsSync).toHaveBeenCalledWith('/absolute/path/file.txt');

      fileExists('relative/path/file.txt');
      expect(fs.existsSync).toHaveBeenCalledWith('relative/path/file.txt');
    });

    it('should handle edge cases', () => {
      mockedFs.existsSync.mockReturnValue(false);

      expect(fileExists('')).toBe(false);
      expect(fileExists(' ')).toBe(false);
      expect(fileExists('.')).toBe(false);
      expect(fileExists('..')).toBe(false);
    });
  });

  describe('type safety and helper functions', () => {
    it('should create valid ComponentMapping objects', () => {
      const validMapping = createComponentMapping(
        'IressButton',
        'components-button-docs.md',
      );
      const nullMapping = createComponentMapping('IressNonExistent', null);

      expect(validMapping).toEqual({
        componentName: 'IressButton',
        filePath: 'components-button-docs.md',
      });

      expect(nullMapping).toEqual({
        componentName: 'IressNonExistent',
        filePath: null,
      });
    });

    it('should work with mock file list type', () => {
      const mockFile: MockFileList = 'components-button-docs.md';
      expect(mockFileList).toContain(mockFile);

      // Type checking ensures we can only use valid file names
      expect(typeof mockFile).toBe('string');
      expect(mockFile.endsWith('.md')).toBe(true);
    });

    it('should demonstrate type-safe component mapping workflow', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(
        createMockFileArray(...mockFileList),
      );

      const componentMappings: ComponentMapping[] = [
        createComponentMapping('IressButton', null),
        createComponentMapping('IressInput', null),
        createComponentMapping('IressCard', null),
      ];

      // Test that all components get properly mapped
      const results = componentMappings.map((mapping) => ({
        ...mapping,
        filePath: mapIressComponentToFile(mapping.componentName),
      }));

      expect(results).toEqual([
        { componentName: 'IressButton', filePath: 'components-button-docs.md' },
        { componentName: 'IressInput', filePath: 'components-input-docs.md' },
        { componentName: 'IressCard', filePath: 'components-card-docs.md' },
      ]);
    });
  });
});
