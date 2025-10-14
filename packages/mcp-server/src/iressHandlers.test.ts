/**
 * Tests for Iress component handlers
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  handleGetIressComponentInfo,
  handleAnalyzeComponentMentions,
} from './iressHandlers.js';
import { ToolResponse } from './types.js';
import * as utils from './utils.js';

// Mock the utils module
vi.mock('./utils.js', () => ({
  mapIressComponentToFile: vi.fn(),
  extractIressComponents: vi.fn(),
  readFileContent: vi.fn(),
}));

// Mock the config module
vi.mock('./config.js', () => ({
  DOCS_DIR: '/mocked/docs/path',
}));

const mockUtils = vi.mocked(utils);

describe('iressHandlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('handleGetIressComponentInfo', () => {
    const mockComponentContent = `# IressButton Component

## Overview
The IressButton component is a versatile button component for the Iress Design System.

## Props
- \`variant\`: string - The button variant (primary, secondary, etc.)
- \`size\`: string - The button size (small, medium, large)
- \`disabled\`: boolean - Whether the button is disabled

## Examples
\`\`\`jsx
<IressButton variant="primary" size="medium">
  Click me
</IressButton>
\`\`\`

## API Reference
Additional API documentation here.
`;

    it('should return component information with examples and props by default', () => {
      const args = {
        component_name: 'IressButton',
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(
        'components-button-docs.md',
      );
      mockUtils.readFileContent.mockReturnValue(mockComponentContent);

      const result: ToolResponse = handleGetIressComponentInfo(args);

      expect(mockUtils.mapIressComponentToFile).toHaveBeenCalledWith(
        'IressButton',
      );
      expect(mockUtils.readFileContent).toHaveBeenCalledWith(
        '/mocked/docs/path/components-button-docs.md',
      );

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain(
        '**IressButton Component Documentation**',
      );
      expect(result.content[0].text).toContain(
        'The IressButton component is a versatile button component',
      );
      expect(result.content[0].text).toContain('**Props & API:**');
      expect(result.content[0].text).toContain('**Usage Examples:**');
      expect(result.content[0].text).toContain(
        '<IressButton variant="primary"',
      );
    });

    it('should include examples when include_examples is true', () => {
      const args = {
        component_name: 'IressButton',
        include_examples: true,
        include_props: false,
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(
        'components-button-docs.md',
      );
      mockUtils.readFileContent.mockReturnValue(mockComponentContent);

      const result: ToolResponse = handleGetIressComponentInfo(args);

      expect(result.content[0].text).toContain('**Usage Examples:**');
      expect(result.content[0].text).not.toContain('**Props & API:**');
    });

    it('should include props when include_props is true', () => {
      const args = {
        component_name: 'IressButton',
        include_examples: false,
        include_props: true,
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(
        'components-button-docs.md',
      );
      mockUtils.readFileContent.mockReturnValue(mockComponentContent);

      const result: ToolResponse = handleGetIressComponentInfo(args);

      expect(result.content[0].text).toContain('**Props & API:**');
      expect(result.content[0].text).not.toContain('**Usage Examples:**');
    });

    it('should exclude examples and props when both flags are false', () => {
      const args = {
        component_name: 'IressButton',
        include_examples: false,
        include_props: false,
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(
        'components-button-docs.md',
      );
      mockUtils.readFileContent.mockReturnValue(mockComponentContent);

      const result: ToolResponse = handleGetIressComponentInfo(args);

      expect(result.content[0].text).not.toContain('**Usage Examples:**');
      expect(result.content[0].text).not.toContain('**Props & API:**');
      expect(result.content[0].text).toContain(
        '**IressButton Component Documentation**',
      );
    });

    it('should return error message when component is not found', () => {
      const args = {
        component_name: 'IressNonExistent',
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(null);

      const result: ToolResponse = handleGetIressComponentInfo(args);

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain(
        'Component "IressNonExistent" not found',
      );
      expect(result.content[0].text).toContain(
        "Make sure you're using the correct Iress component name",
      );
    });

    it('should throw error when file reading fails', () => {
      const args = {
        component_name: 'IressButton',
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(
        'components-button-docs.md',
      );
      mockUtils.readFileContent.mockImplementation(() => {
        throw new Error('File not accessible');
      });

      expect(() => handleGetIressComponentInfo(args)).toThrow(
        'Failed to read component documentation: File not accessible',
      );
    });

    it('should validate input parameters using zod schema', () => {
      const invalidArgs = {
        component_name: 123, // Should be string
      };

      expect(() => handleGetIressComponentInfo(invalidArgs)).toThrow();
    });

    it('should handle missing optional parameters with defaults', () => {
      const args = {
        component_name: 'IressButton',
        // include_examples and include_props not provided, should default to true
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(
        'components-button-docs.md',
      );
      mockUtils.readFileContent.mockReturnValue(mockComponentContent);

      const result: ToolResponse = handleGetIressComponentInfo(args);

      expect(result.content[0].text).toContain('**Usage Examples:**');
      expect(result.content[0].text).toContain('**Props & API:**');
    });

    it('should limit examples and prop sections to 3 items each', () => {
      const contentWithMultipleExamples = `# IressButton

## Overview
Button component

## Props
First prop section
## API
Second API section
## Properties
Third properties section
## Mode
Fourth mode section

\`\`\`jsx
Example 1
\`\`\`

\`\`\`jsx
Example 2
\`\`\`

\`\`\`jsx
Example 3
\`\`\`

\`\`\`jsx
Example 4
\`\`\`

<IressButton>Example 5</IressButton>
`;

      const args = {
        component_name: 'IressButton',
      };

      mockUtils.mapIressComponentToFile.mockReturnValue(
        'components-button-docs.md',
      );
      mockUtils.readFileContent.mockReturnValue(contentWithMultipleExamples);

      const result: ToolResponse = handleGetIressComponentInfo(args);

      // Should limit to 3 prop sections and 3 examples
      const propMatches = result.content[0].text.match(
        /First prop section|Second API section|Third properties section|Fourth mode section/g,
      );
      const exampleMatches = result.content[0].text.match(/Example [1-5]/g);

      expect(propMatches?.length).toBeLessThanOrEqual(3);
      expect(exampleMatches?.length).toBeLessThanOrEqual(3);
    });
  });

  describe('handleAnalyzeComponentMentions', () => {
    it('should analyze text and find component mentions', () => {
      const args = {
        text: 'Use IressButton and IressInput components in your form.',
        detailed: false,
      };

      mockUtils.extractIressComponents.mockReturnValue([
        'IressButton',
        'IressInput',
      ]);
      // Mock the function to return files for both calls
      mockUtils.mapIressComponentToFile.mockImplementation((name: string) => {
        if (name === 'IressButton') return 'components-button-docs.md';
        if (name === 'IressInput') return 'components-input-docs.md';
        return null;
      });

      const result: ToolResponse = handleAnalyzeComponentMentions(args);

      expect(mockUtils.extractIressComponents).toHaveBeenCalledWith(
        'Use IressButton and IressInput components in your form.',
      );
      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain(
        'Found 2 Iress component mention(s)',
      );
      expect(result.content[0].text).toContain('**IressButton** ✅ Available');
      expect(result.content[0].text).toContain('**IressInput** ✅ Available');
      expect(result.content[0].text).toContain(
        '*Use the `get_iress_component_info` tool with a specific component name for detailed information.*',
      );
    });

    it('should provide detailed information when detailed flag is true', () => {
      const args = {
        text: 'Use IressButton component.',
        detailed: true,
      };

      const mockFileContent = `# IressButton
A great button component for interactive elements.
## Props
- variant: string
`;

      mockUtils.extractIressComponents.mockReturnValue(['IressButton']);
      mockUtils.mapIressComponentToFile.mockReturnValue(
        'components-button-docs.md',
      );
      mockUtils.readFileContent.mockReturnValue(mockFileContent);

      const result: ToolResponse = handleAnalyzeComponentMentions(args);

      expect(result.content[0].text).toContain('**IressButton** ✅');
      expect(result.content[0].text).toContain(
        'File: components-button-docs.md',
      );
      expect(result.content[0].text).toContain(
        'Description: A great button component',
      );
    });

    it('should handle components that are not found', () => {
      const args = {
        text: 'Use IressNonExistent component.',
        detailed: false,
      };

      mockUtils.extractIressComponents.mockReturnValue(['IressNonExistent']);
      mockUtils.mapIressComponentToFile.mockReturnValue(null);

      const result: ToolResponse = handleAnalyzeComponentMentions(args);

      expect(result.content[0].text).toContain(
        '**IressNonExistent** ❌ Not found',
      );
    });

    it('should return appropriate message when no components are found', () => {
      const args = {
        text: 'This text has no component mentions.',
        detailed: false,
      };

      mockUtils.extractIressComponents.mockReturnValue([]);

      const result: ToolResponse = handleAnalyzeComponentMentions(args);

      expect(result.content[0].text).toContain(
        'No Iress component mentions found',
      );
      expect(result.content[0].text).toContain(
        "Components should be mentioned with the 'Iress' prefix",
      );
    });

    it('should handle file reading errors in detailed mode gracefully', () => {
      const args = {
        text: 'Use IressButton component.',
        detailed: true,
      };

      mockUtils.extractIressComponents.mockReturnValue(['IressButton']);
      mockUtils.mapIressComponentToFile.mockReturnValue(
        'components-button-docs.md',
      );
      mockUtils.readFileContent.mockImplementation(() => {
        throw new Error('File read error');
      });

      const result: ToolResponse = handleAnalyzeComponentMentions(args);

      expect(result.content[0].text).toContain('**IressButton** ❌');
      expect(result.content[0].text).toContain('Error reading documentation');
    });

    it('should validate input parameters using zod schema', () => {
      const invalidArgs = {
        text: 123, // Should be string
      };

      expect(() => handleAnalyzeComponentMentions(invalidArgs)).toThrow();
    });

    it('should handle missing optional detailed parameter with default false', () => {
      const args = {
        text: 'Use IressButton component.',
        // detailed not provided, should default to false
      };

      mockUtils.extractIressComponents.mockReturnValue(['IressButton']);
      mockUtils.mapIressComponentToFile.mockReturnValue(
        'components-button-docs.md',
      );

      const result: ToolResponse = handleAnalyzeComponentMentions(args);

      // Should use summary format (not detailed)
      expect(result.content[0].text).toContain('**IressButton** ✅ Available');
      expect(result.content[0].text).not.toContain('Description:');
    });

    it('should not show detailed info prompt when detailed is true', () => {
      const args = {
        text: 'Use IressButton component.',
        detailed: true,
      };

      const mockFileContent = 'Button documentation';

      mockUtils.extractIressComponents.mockReturnValue(['IressButton']);
      mockUtils.mapIressComponentToFile.mockReturnValue(
        'components-button-docs.md',
      );
      mockUtils.readFileContent.mockReturnValue(mockFileContent);

      const result: ToolResponse = handleAnalyzeComponentMentions(args);

      expect(result.content[0].text).not.toContain(
        '*Use the `get_iress_component_info` tool with a specific component name for detailed information.*',
      );
    });

    it('should handle mixed found and not found components', () => {
      const args = {
        text: 'Use IressButton and IressNonExistent components.',
        detailed: false,
      };

      mockUtils.extractIressComponents.mockReturnValue([
        'IressButton',
        'IressNonExistent',
      ]);
      // Mock the function to return different results for each component
      mockUtils.mapIressComponentToFile.mockImplementation((name: string) => {
        if (name === 'IressButton') return 'components-button-docs.md';
        if (name === 'IressNonExistent') return null;
        return null;
      });

      const result: ToolResponse = handleAnalyzeComponentMentions(args);

      expect(result.content[0].text).toContain('**IressButton** ✅ Available');
      expect(result.content[0].text).toContain(
        '**IressNonExistent** ❌ Not found',
      );
      expect(result.content[0].text).toContain(
        '*Use the `get_iress_component_info` tool with a specific component name for detailed information.*',
      );
    });
  });
});
