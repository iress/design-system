/**
 * Tests for component handlers
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  handleFindComponent,
  handleGetComponentProps,
  handleListComponents,
} from './componentHandlers.js';
import * as utils from './utils.js';

// Mock the utils module
vi.mock('./utils.js', () => ({
  getMarkdownFiles: vi.fn(),
  mapIressComponentToFile: vi.fn(),
  extractIressComponents: vi.fn(),
  readFileContent: vi.fn(),
}));

// Mock the config module
vi.mock('./config.js', () => ({
  DOCS_DIR: '/mocked/docs/path',
}));

const mockUtils = vi.mocked(utils);

describe('componentHandlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('handleFindComponent', () => {
    const mockMarkdownFiles = [
      'components-button-docs.md',
      'components-input-docs.md',
      'components-table-docs.md',
      'foundations-colors-docs.md',
      'resources-icons-docs.md',
    ];

    const mockButtonContent = `# Button Component

A versatile button component for user interactions.

## Props
- variant: string - Button style variant
- size: string - Button size

## Examples
\`\`\`jsx
<Button variant="primary">Click me</Button>
\`\`\`
`;

    it('should find exact match for Iress component', () => {
      const args = {
        query: 'IressButton',
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(
        'components-button-docs.md',
      );

      const result = handleFindComponent(args);

      expect(mockUtils.mapIressComponentToFile).toHaveBeenCalledWith(
        'IressButton',
      );
      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain(
        'Found exact match for **IressButton**',
      );
      expect(result.content[0].text).toContain('components-button-docs.md');
      expect(result.content[0].text).toContain(
        'Use `get_iress_component_info` with "IressButton"',
      );
    });

    it('should return null for non-matching Iress component', () => {
      const args = {
        query: 'IressNonExistent',
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(null);
      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue('No relevant content');
      mockUtils.extractIressComponents.mockReturnValue([]);

      const result = handleFindComponent(args);

      expect(result.content[0].text).toContain(
        'No IDS components found matching "IressNonExistent"',
      );
    });

    it('should search and rank components by relevance', () => {
      const args = {
        query: 'button',
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(null);
      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.extractIressComponents.mockReturnValue([]);

      // Mock file content with different relevance scores
      mockUtils.readFileContent.mockImplementation((filePath: string) => {
        if (filePath.includes('button')) {
          return mockButtonContent;
        }
        return 'Some other component content';
      });

      const result = handleFindComponent(args);

      expect(result.content[0].text).toContain('Found');
      expect(result.content[0].text).toContain('relevant IDS components');
      expect(result.content[0].text).toContain('button-docs.md');
    });

    it('should filter by category when specified', () => {
      const args = {
        query: 'component',
        category: 'components' as const,
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(null);
      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.extractIressComponents.mockReturnValue([]);
      mockUtils.readFileContent.mockReturnValue('Component content');

      handleFindComponent(args);

      // Should only search components category files
      expect(mockUtils.readFileContent).toHaveBeenCalledWith(
        '/mocked/docs/path/components-button-docs.md',
      );
      expect(mockUtils.readFileContent).toHaveBeenCalledWith(
        '/mocked/docs/path/components-input-docs.md',
      );
      expect(mockUtils.readFileContent).not.toHaveBeenCalledWith(
        '/mocked/docs/path/foundations-colors-docs.md',
      );
    });

    it('should handle Iress component mentions in content', () => {
      const args = {
        query: 'button',
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(null);
      mockUtils.getMarkdownFiles.mockReturnValue(['components-form-docs.md']);
      mockUtils.extractIressComponents.mockReturnValue(['IressButton']);
      mockUtils.readFileContent.mockReturnValue(
        'This form uses IressButton component',
      );

      const result = handleFindComponent(args);

      expect(result.content[0].text).toContain('relevant IDS components');
    });

    it('should validate input parameters using zod schema', () => {
      const invalidArgs = {
        query: 123, // Should be string
      };

      expect(() => handleFindComponent(invalidArgs)).toThrow();
    });

    it('should validate category parameter using zod schema', () => {
      const invalidArgs = {
        query: 'button',
        category: 'invalid-category', // Should be enum value
      };

      expect(() => handleFindComponent(invalidArgs)).toThrow();
    });

    it('should handle file reading errors gracefully', () => {
      const args = {
        query: 'button',
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(null);
      mockUtils.getMarkdownFiles.mockReturnValue(['components-button-docs.md']);
      mockUtils.readFileContent.mockImplementation(() => {
        throw new Error('File read error');
      });

      // Should not throw, but handle error gracefully
      const result = handleFindComponent(args);

      expect(result.content[0].text).toContain(
        'No IDS components found matching "button"',
      );
    });

    it('should limit results to top 10', () => {
      const args = {
        query: 'component',
      };

      const manyFiles = Array.from(
        { length: 15 },
        (_, i) => `components-comp${i}-docs.md`,
      );

      mockUtils.mapIressComponentToFile.mockReturnValue(null);
      mockUtils.getMarkdownFiles.mockReturnValue(manyFiles);
      mockUtils.extractIressComponents.mockReturnValue([]);
      mockUtils.readFileContent.mockReturnValue('component content');

      const result = handleFindComponent(args);

      // Count the number of component entries by splitting on numbered items
      const entries = result.content[0].text.split(/\n\d+\. /).length - 1;
      expect(entries).toBeLessThanOrEqual(10);
    });
  });

  describe('handleGetComponentProps', () => {
    const mockMarkdownFiles = [
      'components-button-docs.md',
      'components-input-docs.md',
    ];

    const mockComponentContent = `# Button Component

## Overview
A button component

## Props
- variant: string - The button variant
- size: string - The button size  

Some text after props

## API
Additional API methods

Some text after API

## Examples
Usage examples here

Some text after examples
`;

    it('should return component props when component exists', () => {
      const args = {
        component: 'button',
      };

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockComponentContent);

      const result = handleGetComponentProps(args);

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain(
        '**button Component Props & API**',
      );
      expect(result.content[0].text).toContain('## API');
      expect(result.content[0].text).toContain('Additional API methods');
    });

    it('should return error when component not found', () => {
      const args = {
        component: 'nonexistent',
      };

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);

      const result = handleGetComponentProps(args);

      expect(result.content[0].text).toContain(
        'Component "nonexistent" not found',
      );
      expect(result.content[0].text).toContain('Available components:');
      expect(result.content[0].text).toContain('- button');
      expect(result.content[0].text).toContain('- input');
    });

    it('should handle case-insensitive component matching', () => {
      const args = {
        component: 'BUTTON',
      };

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockComponentContent);

      const result = handleGetComponentProps(args);

      expect(result.content[0].text).toContain(
        '**BUTTON Component Props & API**',
      );
    });

    it('should extract props from content with no specific props sections', () => {
      const args = {
        component: 'button',
      };

      const contentWithoutProps = `# Button Component
This is a simple button component without specific props sections.
Here is some general documentation.`;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(contentWithoutProps);

      const result = handleGetComponentProps(args);

      expect(result.content[0].text).toContain(
        'This is a simple button component',
      );
    });

    it('should throw error when file reading fails', () => {
      const args = {
        component: 'button',
      };

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockImplementation(() => {
        throw new Error('File access denied');
      });

      expect(() => handleGetComponentProps(args)).toThrow(
        'Failed to read component file components-button-docs.md: File access denied',
      );
    });

    it('should validate input parameters using zod schema', () => {
      const invalidArgs = {
        component: 123, // Should be string
      };

      expect(() => handleGetComponentProps(invalidArgs)).toThrow();
    });

    it('should handle multiple prop-related sections', () => {
      const contentWithMultipleSections = `# Button Component

## Props
- variant: string

## API
Methods available

## Properties  
Additional properties

## mode
Different modes
`;

      const args = {
        component: 'button',
      };

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(contentWithMultipleSections);

      const result = handleGetComponentProps(args);

      expect(result.content[0].text).toContain('Props');
      expect(result.content[0].text).toContain('API');
      expect(result.content[0].text).toContain('Properties');
      expect(result.content[0].text).toContain('mode');
    });
  });

  describe('handleListComponents', () => {
    const mockMarkdownFiles = [
      'components-button-docs.md',
      'components-input-docs.md',
      'components-table-docs.md',
      'foundations-colors-docs.md',
      'foundations-typography-docs.md',
      'resources-icons-docs.md',
    ];

    it('should list all components by default', () => {
      const args = {};

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);

      const result = handleListComponents(args);

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('**IDS Component Library**');
      expect(result.content[0].text).toContain('**Components (3)**');
      expect(result.content[0].text).toContain('- button');
      expect(result.content[0].text).toContain('- input');
      expect(result.content[0].text).toContain('- table');
      expect(result.content[0].text).toContain('**Foundations (2)**');
      expect(result.content[0].text).toContain('- colors');
      expect(result.content[0].text).toContain('- typography');
      expect(result.content[0].text).toContain('**Resources (1)**');
      expect(result.content[0].text).toContain('- icons');
    });

    it('should list only components when category is "components"', () => {
      const args = {
        category: 'components' as const,
      };

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);

      const result = handleListComponents(args);

      expect(result.content[0].text).toContain('**Components (3)**');
      expect(result.content[0].text).toContain('- button');
      expect(result.content[0].text).toContain('- input');
      expect(result.content[0].text).toContain('- table');
      expect(result.content[0].text).not.toContain('**Foundations');
      expect(result.content[0].text).not.toContain('**Resources');
    });

    it('should list only foundations when category is "foundations"', () => {
      const args = {
        category: 'foundations' as const,
      };

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);

      const result = handleListComponents(args);

      expect(result.content[0].text).toContain('**Foundations (2)**');
      expect(result.content[0].text).toContain('- colors');
      expect(result.content[0].text).toContain('- typography');
      expect(result.content[0].text).not.toContain('**Components');
      expect(result.content[0].text).not.toContain('**Resources');
    });

    it('should list only resources when category is "resources"', () => {
      const args = {
        category: 'resources' as const,
      };

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);

      const result = handleListComponents(args);

      expect(result.content[0].text).toContain('**Resources (1)**');
      expect(result.content[0].text).toContain('- icons');
      expect(result.content[0].text).not.toContain('**Components');
      expect(result.content[0].text).not.toContain('**Foundations');
    });

    it('should list all categories when category is "all"', () => {
      const args = {
        category: 'all' as const,
      };

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);

      const result = handleListComponents(args);

      expect(result.content[0].text).toContain('**Components (3)**');
      expect(result.content[0].text).toContain('**Foundations (2)**');
      expect(result.content[0].text).toContain('**Resources (1)**');
    });

    it('should handle empty file lists', () => {
      const args = {
        category: 'components' as const,
      };

      mockUtils.getMarkdownFiles.mockReturnValue([]);

      const result = handleListComponents(args);

      expect(result.content[0].text).toContain('**Components (0)**');
    });

    it('should validate category parameter using zod schema', () => {
      const invalidArgs = {
        category: 'invalid-category', // Should be enum value
      };

      expect(() => handleListComponents(invalidArgs)).toThrow();
    });

    it('should use default category when not specified', () => {
      const args = {};

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);

      const result = handleListComponents(args);

      // Should default to 'all' and show all categories
      expect(result.content[0].text).toContain('**Components');
      expect(result.content[0].text).toContain('**Foundations');
      expect(result.content[0].text).toContain('**Resources');
    });

    it('should properly format component names by removing prefixes and suffixes', () => {
      const customFiles = [
        'components-complex-button-component-docs.md',
        'foundations-design-tokens-docs.md',
        'resources-icon-library-docs.md',
      ];

      const args = {};

      mockUtils.getMarkdownFiles.mockReturnValue(customFiles);

      const result = handleListComponents(args);

      expect(result.content[0].text).toContain('- complex-button-component');
      expect(result.content[0].text).toContain('- design-tokens');
      expect(result.content[0].text).toContain('- icon-library');
    });
  });
});
