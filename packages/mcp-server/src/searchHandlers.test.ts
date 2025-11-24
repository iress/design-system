/**
 * Tests for search handlers functionality
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
import {
  handleGetUsageExamples,
  handleSearchIdsDocs,
  handleGetDesignTokens,
  handleGetDesignGuidelines,
} from './searchHandlers.js';
import { ToolResponse } from './types.js';
import * as utils from './utils.js';

// Mock the utils module
vi.mock('./utils.js');
vi.mock('./config.js', () => ({
  DOCS_DIR: '/mock/docs/dir',
}));

const mockUtils = {
  getMarkdownFiles: utils.getMarkdownFiles as Mock,
  readFileContent: utils.readFileContent as Mock,
  fileExists: utils.fileExists as Mock,
  mapIressComponentToFile: utils.mapIressComponentToFile as Mock,
  extractIressComponents: utils.extractIressComponents as Mock,
};

describe('searchHandlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('handleGetUsageExamples', () => {
    it('should return usage examples for a valid component', () => {
      const mockMarkdownFiles = [
        'components-button-docs.md',
        'components-input-docs.md',
        'recipes-button-variations.md',
      ];

      const mockContent = `
# Button Component

## Basic Usage

\`\`\`jsx
<Button variant="primary">Click me</Button>
\`\`\`

## Advanced Example

\`\`\`javascript
const MyButton = () => (
  <Button size="large" onClick={handleClick}>
    Advanced Button
  </Button>
);
\`\`\`

<Button disabled>Disabled Button</Button>
      `;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleGetUsageExamples({
        component: 'Button',
      });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('**Button Usage Examples**');
      expect(result.content[0].text).toContain('```jsx');
      expect(result.content[0].text).toContain('<Button variant="primary">');
      expect(result.isError).toBeUndefined();
    });

    it('should find component files including recipes', () => {
      const mockMarkdownFiles = [
        'components-input-docs.md',
        'recipes-button-variations.md', // This should match for 'button'
        'recipes-other-component.md',
      ];

      const mockContent = `
# Button Recipes

\`\`\`jsx
<Button variant="recipe">Recipe Button</Button>
\`\`\`
      `;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleGetUsageExamples({
        component: 'Button',
      });

      expect(result.content[0].text).toContain('**Button Usage Examples**');
      expect(result.content[0].text).toContain('Recipe Button');
      // Should have processed the recipes file
      expect(mockUtils.readFileContent).toHaveBeenCalledWith(
        expect.stringContaining('recipes-button-variations.md'),
      );
    });

    it('should filter examples by pattern when provided', () => {
      const mockMarkdownFiles = ['components-button-docs.md'];
      const mockContent = `
\`\`\`jsx
<Button variant="primary">Primary</Button>
\`\`\`

\`\`\`jsx
<Button variant="secondary">Secondary</Button>
\`\`\`

\`\`\`jsx
<Button size="large">Large Button</Button>
\`\`\`
      `;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleGetUsageExamples({
        component: 'Button',
        pattern: 'primary',
      });

      expect(result.content[0].text).toContain('(primary pattern)');
      expect(result.content[0].text).toContain('variant="primary"');
      expect(result.content[0].text).not.toContain('variant="secondary"');
    });

    it('should return appropriate message when no component files found', () => {
      mockUtils.getMarkdownFiles.mockReturnValue([
        'components-input-docs.md',
        'components-select-docs.md',
      ]);

      const result: ToolResponse = handleGetUsageExamples({
        component: 'NonExistent',
      });

      expect(result.content[0].text).toContain(
        'No examples found for "NonExistent"',
      );
      expect(result.content[0].text).toContain('Try: input, select');
    });

    it('should handle file reading errors gracefully', () => {
      const mockMarkdownFiles = ['components-button-docs.md'];

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockImplementation(() => {
        throw new Error('File read error');
      });

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result: ToolResponse = handleGetUsageExamples({
        component: 'Button',
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error reading file'),
        expect.any(Error),
      );
      expect(result.content[0].text).toContain('No usage examples found');

      consoleSpy.mockRestore();
    });

    it('should handle multiple file reading errors', () => {
      const mockMarkdownFiles = [
        'components-button-docs.md',
        'recipes-button-variations.md',
      ];

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockImplementation(() => {
        throw new Error('Multiple file read errors');
      });

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result: ToolResponse = handleGetUsageExamples({
        component: 'Button',
      });

      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading file components-button-docs.md:',
        expect.any(Error),
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading file recipes-button-variations.md:',
        expect.any(Error),
      );
      expect(result.content[0].text).toContain('No usage examples found');

      consoleSpy.mockRestore();
    });

    it('should validate input parameters using zod schema', () => {
      expect(() => handleGetUsageExamples({})).toThrow();
      expect(() => handleGetUsageExamples({ component: 123 })).toThrow();
      expect(() =>
        handleGetUsageExamples({ component: 'Button', pattern: 123 }),
      ).toThrow();
    });
  });

  describe('handleSearchIdsDocs', () => {
    it('should find and return search matches with context', () => {
      const mockMarkdownFiles = [
        'components-button-docs.md',
        'foundations-colors-docs.md',
      ];

      const mockButtonContent = `
# Button Component
The Button component is used for actions.
It supports various variants.
Use primary for main actions.
      `;

      const mockColorsContent = `
# Colors Foundation
Primary colors define the brand.
Secondary colors provide support.
Use primary sparingly.
      `;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent
        .mockReturnValueOnce(mockButtonContent)
        .mockReturnValueOnce(mockColorsContent);

      const result: ToolResponse = handleSearchIdsDocs({
        query: 'primary',
        case_sensitive: false,
      });

      expect(result.content[0].text).toContain('Found 3 matches');
      expect(result.content[0].text).toContain('**button:5**');
      expect(result.content[0].text).toContain('**colors:3**');
      expect(result.content[0].text).toContain('Use primary for main actions');
      expect(result.content[0].text).toContain(
        'Primary colors define the brand',
      );
    });

    it('should respect case sensitivity when specified', () => {
      const mockMarkdownFiles = ['components-button-docs.md'];
      const mockContent = `
Primary button example
primary button example
PRIMARY button example
      `;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const caseSensitiveResult: ToolResponse = handleSearchIdsDocs({
        query: 'Primary',
        case_sensitive: true,
      });

      const caseInsensitiveResult: ToolResponse = handleSearchIdsDocs({
        query: 'Primary',
        case_sensitive: false,
      });

      expect(caseSensitiveResult.content[0].text).toContain('Found 1 matches');
      expect(caseInsensitiveResult.content[0].text).toContain(
        'Found 3 matches',
      );
    });

    it('should return no matches message when query not found', () => {
      const mockMarkdownFiles = ['components-button-docs.md'];
      const mockContent =
        'Button component documentation without the search term.';

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleSearchIdsDocs({
        query: 'nonexistent',
        case_sensitive: false,
      });

      expect(result.content[0].text).toContain(
        'No matches found for "nonexistent"',
      );
    });

    it('should limit results to 15 matches', () => {
      const mockMarkdownFiles = ['components-button-docs.md'];
      // Create content with 20 lines containing "test"
      const mockContent = Array.from(
        { length: 20 },
        (_, i) => `Line ${i + 1} with test content`,
      ).join('\n');

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleSearchIdsDocs({
        query: 'test',
        case_sensitive: false,
      });

      // Count the number of **button:** entries in the result
      const matches = (
        result.content[0].text.match(/\*\*button:\d+\*\*/g) ?? []
      ).length;
      expect(matches).toBe(15);
    });

    it('should use default case_sensitive value when not provided', () => {
      const mockMarkdownFiles = ['components-button-docs.md'];
      const mockContent = 'Primary button and primary action';

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleSearchIdsDocs({ query: 'PRIMARY' });

      expect(result.content[0].text).toContain('Found 1 matches');
    });

    it('should handle file reading errors during search', () => {
      const mockMarkdownFiles = [
        'components-button-docs.md',
        'foundations-colors-docs.md',
      ];

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockImplementation((filePath: string) => {
        if (filePath.includes('button')) {
          return 'Button content with search term';
        }
        throw new Error('File read error for colors');
      });

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result: ToolResponse = handleSearchIdsDocs({
        query: 'search',
        case_sensitive: false,
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading file foundations-colors-docs.md:',
        expect.any(Error),
      );
      expect(result.content[0].text).toContain('Found 1 matches');
      expect(result.content[0].text).toContain(
        'Button content with search term',
      );

      consoleSpy.mockRestore();
    });
  });

  describe('handleGetDesignTokens', () => {
    it('should return all design tokens when type is "all"', () => {
      const mockMarkdownFiles = [
        'foundations-colors-docs.md',
        'foundations-spacing-docs.md',
        'foundations-typography-docs.md',
      ];

      const mockColorsContent = `
# Colors
## Primary Colors
Use these CSS variables: --iress-color-primary, --iress-color-secondary
      `;

      const mockSpacingContent = `
# Spacing
## Base Spacing
Available variables: --iress-space-sm, --iress-space-md, --iress-space-lg
      `;

      const mockTypographyContent = `
# Typography
## Font Sizes
Typography tokens: --iress-font-size-sm, --iress-font-size-lg
      `;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent
        .mockReturnValueOnce(mockColorsContent)
        .mockReturnValueOnce(mockSpacingContent)
        .mockReturnValueOnce(mockTypographyContent);

      const result: ToolResponse = handleGetDesignTokens({ type: 'all' });

      expect(result.content[0].text).toContain('**IDS Design Tokens**');
      expect(result.content[0].text).toContain('**colors**');
      expect(result.content[0].text).toContain('**spacing**');
      expect(result.content[0].text).toContain('**typography**');
      expect(result.content[0].text).toContain('--iress-color-primary');
      expect(result.content[0].text).toContain('--iress-space-sm');
      expect(result.content[0].text).toContain('--iress-font-size-sm');
    });

    it('should filter tokens by specific type', () => {
      const mockMarkdownFiles = [
        'foundations-colors-docs.md',
        'foundations-spacing-docs.md',
      ];

      const mockColorsContent = `
# Colors
CSS Variables: --iress-color-primary, --iress-color-secondary
      `;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockColorsContent);

      const result: ToolResponse = handleGetDesignTokens({ type: 'colors' });

      expect(result.content[0].text).toContain(
        '**IDS Design Tokens (colors)**',
      );
      expect(result.content[0].text).toContain('--iress-color-primary');
      // Should only process the colors file
      expect(mockUtils.readFileContent).toHaveBeenCalledTimes(1);
    });

    it('should handle case when no foundation files match the type', () => {
      mockUtils.getMarkdownFiles.mockReturnValue([
        'components-button-docs.md',
        'foundations-other-docs.md',
      ]);

      const result: ToolResponse = handleGetDesignTokens({ type: 'colors' });

      expect(result.content[0].text).toContain(
        'No design token information found for colors',
      );
      expect(result.content[0].text).toContain('Available foundations: other');
    });

    it('should use default type "all" when not specified', () => {
      const mockMarkdownFiles = ['foundations-colors-docs.md'];
      const mockContent = 'Colors with --iress-color-primary';

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleGetDesignTokens({});

      expect(result.content[0].text).toContain('**IDS Design Tokens**');
      expect(result.content[0].text).not.toContain('(colors)');
    });

    it('should extract token sections and CSS variables correctly', () => {
      const mockMarkdownFiles = ['foundations-tokens-docs.md'];
      const mockContent = `
# Design Tokens

## Primary Colors
Main brand colors

### Secondary Colors  
Supporting colors

CSS Variables available:
- --iress-primary-100
- --iress-primary-200
- --iress-secondary-100
      `;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleGetDesignTokens({ type: 'all' });

      expect(result.content[0].text).toContain('## Primary Colors');
      expect(result.content[0].text).toContain('### Secondary Colors');
      expect(result.content[0].text).toContain('--iress-primary-');
      expect(result.content[0].text).toContain('--iress-secondary-');
    });

    it('should handle file reading errors during token extraction', () => {
      const mockMarkdownFiles = [
        'foundations-colors-docs.md',
        'foundations-spacing-docs.md',
      ];

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockImplementation((filePath: string) => {
        if (filePath.includes('colors')) {
          return 'Colors with --iress-color-primary token';
        }
        throw new Error('File read error for spacing');
      });

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result: ToolResponse = handleGetDesignTokens({ type: 'all' });

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading file foundations-spacing-docs.md:',
        expect.any(Error),
      );
      expect(result.content[0].text).toContain('**IDS Design Tokens**');
      expect(result.content[0].text).toContain('**colors**');
      expect(result.content[0].text).toContain('--iress-color-primary');

      consoleSpy.mockRestore();
    });
  });

  describe('handleGetDesignGuidelines', () => {
    it('should return full guidelines when no section or query specified', () => {
      const mockGuidelinesContent = `
# Design Guidelines

## Core Design Principles
1. Consistency
2. Accessibility

## Visual Design Standards
Typography and color usage

## Component Guidelines
How to use components
      `;

      mockUtils.readFileContent.mockReturnValue(mockGuidelinesContent);

      const result: ToolResponse = handleGetDesignGuidelines({});

      expect(result.content[0].text).toContain('**IDS Design Guidelines**');
      expect(result.content[0].text).toContain('# Design Guidelines');
      expect(result.content[0].text).toContain('## Core Design Principles');
      expect(result.content[0].text).toContain('## Visual Design Standards');
    });

    it('should filter by section when specified', () => {
      const mockGuidelinesContent = `
# Design Guidelines

## Core Design Principles
1. Consistency is key
2. Accessibility first

## Visual Design Standards
Typography and color usage

## Component Guidelines
How to use components properly
      `;

      mockUtils.readFileContent.mockReturnValue(mockGuidelinesContent);

      const result: ToolResponse = handleGetDesignGuidelines({
        section: 'Core Design Principles',
      });

      expect(result.content[0].text).toContain(
        '**IDS Design Guidelines - Core Design Principles**',
      );
      expect(result.content[0].text).toContain('1. Consistency is key');
      expect(result.content[0].text).toContain('2. Accessibility first');
      expect(result.content[0].text).not.toContain(
        '## Visual Design Standards',
      );
    });

    it('should filter by query when specified', () => {
      const mockGuidelinesContent = `
# Design Guidelines

Accessibility is important for all users.
Make sure colors meet accessibility standards.
Typography should be accessible.

Design should be consistent across components.
Use consistent spacing and layout.
      `;

      mockUtils.readFileContent.mockReturnValue(mockGuidelinesContent);

      const result: ToolResponse = handleGetDesignGuidelines({
        query: 'accessibility',
      });

      expect(result.content[0].text).toContain(
        '**IDS Design Guidelines (filtered by: accessibility)**',
      );
      expect(result.content[0].text).toContain('Accessibility is important');
      expect(result.content[0].text).toContain(
        'colors meet accessibility standards',
      );
      expect(result.content[0].text).toContain(
        'Typography should be accessible',
      );
      expect(result.content[0].text).not.toContain('consistent spacing');
    });

    it('should handle both section and query filters together', () => {
      const mockGuidelinesContent = `
# Design Guidelines

## Accessibility Guidelines
Accessibility is crucial for inclusive design.
Colors must meet WCAG standards.
Typography should be legible.

## Design Principles  
Consistency in design elements.
Accessibility as a core principle.
      `;

      mockUtils.readFileContent.mockReturnValue(mockGuidelinesContent);

      const result: ToolResponse = handleGetDesignGuidelines({
        section: 'Accessibility',
        query: 'colors',
      });

      expect(result.content[0].text).toContain(
        '**IDS Design Guidelines - Accessibility (filtered by: colors)**',
      );
      expect(result.content[0].text).toContain(
        'Colors must meet WCAG standards',
      );
      // The filterContentByQuery function includes context lines, so we should expect the typography line to be included
      expect(result.content[0].text).toContain('Typography should be legible');
    });

    it('should return error when section not found', () => {
      const mockGuidelinesContent = `
# Design Guidelines

## Core Principles
Basic principles
      `;

      mockUtils.readFileContent.mockReturnValue(mockGuidelinesContent);

      const result: ToolResponse = handleGetDesignGuidelines({
        section: 'NonExistent Section',
      });

      expect(result.content[0].text).toContain(
        'Section "NonExistent Section" not found',
      );
      expect(result.content[0].text).toContain('Available sections include:');
    });

    it('should return error when query not found', () => {
      const mockGuidelinesContent = `
# Design Guidelines

Basic design information without the search term.
      `;

      mockUtils.readFileContent.mockReturnValue(mockGuidelinesContent);

      const result: ToolResponse = handleGetDesignGuidelines({
        query: 'nonexistent',
      });

      expect(result.content[0].text).toContain(
        'No guidelines found matching "nonexistent"',
      );
      expect(result.content[0].text).toContain('Try searching for terms like:');
    });

    it('should handle file reading errors', () => {
      mockUtils.readFileContent.mockImplementation(() => {
        throw new Error('File not found');
      });

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result: ToolResponse = handleGetDesignGuidelines({});

      expect(result.content[0].text).toContain(
        'Error reading design guidelines',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading guidelines:',
        expect.any(Error),
      );

      consoleSpy.mockRestore();
    });

    it('should handle empty file content', () => {
      mockUtils.readFileContent.mockReturnValue('');

      const result: ToolResponse = handleGetDesignGuidelines({});

      expect(result.content[0].text).toContain(
        'Design guidelines file not found',
      );
    });
  });
});
