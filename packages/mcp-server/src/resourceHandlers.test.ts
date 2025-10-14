/**
 * Tests for resourceHandlers.ts
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as path from 'path';
import { handleListResources, handleReadResource } from './resourceHandlers.js';
import { getMarkdownFiles, readFileContent } from './utils.js';
import { DOCS_DIR } from './config.js';

const mockGetMarkdownFiles = vi.mocked(getMarkdownFiles);
const mockReadFileContent = vi.mocked(readFileContent);

// Mock dependencies
vi.mock('./utils.js', () => ({
  getMarkdownFiles: vi.fn(),
  readFileContent: vi.fn(),
}));

vi.mock('./config.js', () => ({
  DOCS_DIR: '/mock/docs/ids',
}));

describe('resourceHandlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('handleListResources', () => {
    it('should return empty resources when no markdown files exist', () => {
      mockGetMarkdownFiles.mockReturnValue([]);

      const result = handleListResources();

      expect(result).toEqual({
        resources: [],
      });
      expect(mockGetMarkdownFiles).toHaveBeenCalledOnce();
    });

    it('should categorize component files correctly', () => {
      const mockFiles = [
        'components-button-docs.md',
        'components-input-docs.md',
        'components-modal-docs.md',
      ];
      mockGetMarkdownFiles.mockReturnValue(mockFiles);

      const result = handleListResources();

      expect(result.resources).toHaveLength(3);
      expect(result.resources[0]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'components-button-docs.md')}`,
        name: 'Components: button',
        description: 'IDS components documentation for button',
        mimeType: 'text/markdown',
      });
      expect(result.resources[1]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'components-input-docs.md')}`,
        name: 'Components: input',
        description: 'IDS components documentation for input',
        mimeType: 'text/markdown',
      });
      expect(result.resources[2]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'components-modal-docs.md')}`,
        name: 'Components: modal',
        description: 'IDS components documentation for modal',
        mimeType: 'text/markdown',
      });
    });

    it('should categorize foundation files correctly', () => {
      const mockFiles = [
        'foundations-colors-docs.md',
        'foundations-typography-docs.md',
        'foundations-spacing-docs.md',
      ];
      mockGetMarkdownFiles.mockReturnValue(mockFiles);

      const result = handleListResources();

      expect(result.resources).toHaveLength(3);
      expect(result.resources[0]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'foundations-colors-docs.md')}`,
        name: 'Foundations: colors',
        description: 'IDS foundations documentation for colors',
        mimeType: 'text/markdown',
      });
      expect(result.resources[1]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'foundations-typography-docs.md')}`,
        name: 'Foundations: typography',
        description: 'IDS foundations documentation for typography',
        mimeType: 'text/markdown',
      });
      expect(result.resources[2]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'foundations-spacing-docs.md')}`,
        name: 'Foundations: spacing',
        description: 'IDS foundations documentation for spacing',
        mimeType: 'text/markdown',
      });
    });

    it('should categorize resource files correctly', () => {
      const mockFiles = [
        'resources-guidelines-docs.md',
        'resources-patterns-docs.md',
      ];
      mockGetMarkdownFiles.mockReturnValue(mockFiles);

      const result = handleListResources();

      expect(result.resources).toHaveLength(2);
      expect(result.resources[0]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'resources-guidelines-docs.md')}`,
        name: 'Resources: guidelines',
        description: 'IDS resources documentation for guidelines',
        mimeType: 'text/markdown',
      });
      expect(result.resources[1]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'resources-patterns-docs.md')}`,
        name: 'Resources: patterns',
        description: 'IDS resources documentation for patterns',
        mimeType: 'text/markdown',
      });
    });

    it('should categorize introduction files correctly', () => {
      const mockFiles = ['introduction.md', 'getting-started-introduction.md'];
      mockGetMarkdownFiles.mockReturnValue(mockFiles);

      const result = handleListResources();

      expect(result.resources).toHaveLength(2);
      expect(result.resources[0]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'introduction.md')}`,
        name: 'Getting Started: Introduction',
        description: 'IDS getting started documentation for Introduction',
        mimeType: 'text/markdown',
      });
      expect(result.resources[1]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'getting-started-introduction.md')}`,
        name: 'Getting Started: Introduction',
        description: 'IDS getting started documentation for Introduction',
        mimeType: 'text/markdown',
      });
    });

    it('should categorize uncategorized files as Other', () => {
      const mockFiles = ['readme.md', 'changelog.md', 'random-file.md'];
      mockGetMarkdownFiles.mockReturnValue(mockFiles);

      const result = handleListResources();

      expect(result.resources).toHaveLength(3);
      expect(result.resources[0]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'readme.md')}`,
        name: 'Other: readme.md',
        description: 'IDS other documentation for readme.md',
        mimeType: 'text/markdown',
      });
      expect(result.resources[1]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'changelog.md')}`,
        name: 'Other: changelog.md',
        description: 'IDS other documentation for changelog.md',
        mimeType: 'text/markdown',
      });
      expect(result.resources[2]).toEqual({
        uri: `file://${path.join(DOCS_DIR, 'random-file.md')}`,
        name: 'Other: random-file.md',
        description: 'IDS other documentation for random-file.md',
        mimeType: 'text/markdown',
      });
    });

    it('should handle mixed file categories', () => {
      const mockFiles = [
        'components-button-docs.md',
        'foundations-colors-docs.md',
        'resources-guidelines-docs.md',
        'introduction.md',
        'readme.md',
      ];
      mockGetMarkdownFiles.mockReturnValue(mockFiles);

      const result = handleListResources();

      expect(result.resources).toHaveLength(5);

      // Check that each category is represented
      const categories = result.resources.map(
        (resource) => resource.name.split(':')[0],
      );
      expect(categories).toContain('Components');
      expect(categories).toContain('Foundations');
      expect(categories).toContain('Resources');
      expect(categories).toContain('Getting Started');
      expect(categories).toContain('Other');
    });
  });

  describe('handleReadResource', () => {
    const mockFileContent = '# Test Documentation\n\nThis is test content.';

    beforeEach(() => {
      mockReadFileContent.mockReturnValue(mockFileContent);
    });

    it('should successfully read a valid file', () => {
      const testFilePath = path.join(DOCS_DIR, 'components-button-docs.md');
      const request = {
        params: {
          uri: `file://${testFilePath}`,
        },
      };

      const result = handleReadResource(request);

      expect(result).toEqual({
        contents: [
          {
            uri: request.params.uri,
            mimeType: 'text/markdown',
            text: mockFileContent,
          },
        ],
      });
      expect(mockReadFileContent).toHaveBeenCalledWith(testFilePath);
    });

    it('should throw error for unsupported protocol', () => {
      const request = {
        params: {
          uri: 'http://example.com/file.md',
        },
      };

      expect(() => handleReadResource(request)).toThrow(
        'Unsupported protocol: http:',
      );
    });

    it('should throw error for files outside docs directory', () => {
      const request = {
        params: {
          uri: 'file:///etc/passwd',
        },
      };

      expect(() => handleReadResource(request)).toThrow(
        'Access denied: File is outside the docs directory',
      );
    });

    it('should throw error for files using relative path traversal', () => {
      const testFilePath = path.join(DOCS_DIR, '..', '..', 'secret.md');
      const request = {
        params: {
          uri: `file://${testFilePath}`,
        },
      };

      expect(() => handleReadResource(request)).toThrow(
        'Access denied: File is outside the docs directory',
      );
    });

    it('should handle file read errors gracefully', () => {
      const testFilePath = path.join(DOCS_DIR, 'nonexistent-file.md');
      const readError = new Error('File not found');

      mockReadFileContent.mockImplementation(() => {
        throw readError;
      });

      const request = {
        params: {
          uri: `file://${testFilePath}`,
        },
      };

      expect(() => handleReadResource(request)).toThrow(
        'Failed to read file: File not found',
      );
      expect(mockReadFileContent).toHaveBeenCalledWith(testFilePath);
    });

    it('should handle unknown errors gracefully', () => {
      const testFilePath = path.join(DOCS_DIR, 'components-button-docs.md');

      mockReadFileContent.mockImplementation(() => {
        throw new Error('Unknown error string'); // Proper Error object
      });

      const request = {
        params: {
          uri: `file://${testFilePath}`,
        },
      };

      expect(() => handleReadResource(request)).toThrow(
        'Failed to read file: Unknown error string',
      );
    });

    it('should handle files in subdirectories within docs directory', () => {
      const testFilePath = path.join(
        DOCS_DIR,
        'subdirectory',
        'components-nested-docs.md',
      );
      const request = {
        params: {
          uri: `file://${testFilePath}`,
        },
      };

      const result = handleReadResource(request);

      expect(result).toEqual({
        contents: [
          {
            uri: request.params.uri,
            mimeType: 'text/markdown',
            text: mockFileContent,
          },
        ],
      });
      expect(mockReadFileContent).toHaveBeenCalledWith(testFilePath);
    });

    it('should handle Windows-style paths correctly', () => {
      const normalizedPath = path.join(DOCS_DIR, 'components-button-docs.md');
      const windowsStyleUri = `file://${normalizedPath.replace(/\\/g, '/')}`;

      const request = {
        params: {
          uri: windowsStyleUri,
        },
      };

      const result = handleReadResource(request);

      expect(result).toEqual({
        contents: [
          {
            uri: request.params.uri,
            mimeType: 'text/markdown',
            text: mockFileContent,
          },
        ],
      });
    });
  });

  // Add type-specific tests at the end
  describe('Type compliance tests', () => {
    it('should return resources with correct interface structure', () => {
      const mockFiles = ['components-button-docs.md'];
      mockGetMarkdownFiles.mockReturnValue(mockFiles);

      const result = handleListResources();

      // Verify the returned structure matches expected interface
      expect(result).toHaveProperty('resources');
      expect(Array.isArray(result.resources)).toBe(true);

      if (result.resources.length > 0) {
        const resource = result.resources[0];
        expect(resource).toHaveProperty('uri');
        expect(resource).toHaveProperty('name');
        expect(resource).toHaveProperty('description');
        expect(resource).toHaveProperty('mimeType');
        expect(typeof resource.uri).toBe('string');
        expect(typeof resource.name).toBe('string');
        expect(typeof resource.description).toBe('string');
        expect(resource.mimeType).toBe('text/markdown');
      }
    });

    it('should return read resource with correct content structure', () => {
      const mockContent = '# Component Documentation\n\nDescription here.';
      mockReadFileContent.mockReturnValue(mockContent);

      const testFilePath = path.join(DOCS_DIR, 'components-button-docs.md');
      const request = {
        params: {
          uri: `file://${testFilePath}`,
        },
      };

      const result = handleReadResource(request);

      // Verify the returned structure matches expected interface
      expect(result).toHaveProperty('contents');
      expect(Array.isArray(result.contents)).toBe(true);
      expect(result.contents).toHaveLength(1);

      const content = result.contents[0];
      expect(content).toHaveProperty('uri');
      expect(content).toHaveProperty('mimeType');
      expect(content).toHaveProperty('text');
      expect(typeof content.uri).toBe('string');
      expect(content.mimeType).toBe('text/markdown');
      expect(typeof content.text).toBe('string');
      expect(content.text).toBe(mockContent);
    });

    it('should handle empty file names correctly', () => {
      const mockFiles = ['', '   ', '.md'];
      mockGetMarkdownFiles.mockReturnValue(mockFiles);

      const result = handleListResources();

      expect(result.resources).toHaveLength(3);
      // All should be categorized as "Other" since they don't match patterns
      result.resources.forEach((resource) => {
        expect(resource.name).toMatch(/^Other:/);
      });
    });

    it('should preserve original filename in Other category', () => {
      const originalFilename = 'some-random-documentation.md';
      const mockFiles = [originalFilename];
      mockGetMarkdownFiles.mockReturnValue(mockFiles);

      const result = handleListResources();

      expect(result.resources).toHaveLength(1);
      expect(result.resources[0].name).toBe(`Other: ${originalFilename}`);
      expect(result.resources[0].description).toBe(
        `IDS other documentation for ${originalFilename}`,
      );
    });
  });
});
