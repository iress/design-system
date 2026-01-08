/**
 * Tests for styling props handlers functionality
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
import { handleGetStylingPropsReference } from './stylingHandlers.js';
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
};

describe('stylingHandlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('handleGetStylingPropsReference', () => {
    it('should return all styling props files for category="all"', () => {
      const mockMarkdownFiles = [
        'components_styling-props-reference-docs.md',
        'components_styling-props-spacing-docs.md',
        'components_styling-props-colour-docs.md',
        'components_styling-props-typography-docs.md',
        'components_styling-props-elevation-docs.md',
        'components_styling-props-radius-docs.md',
        'components_styling-props-sizing-docs.md',
        'components_styling-props-screen-readers-docs.md',
        'components_styling-props-scrollable-docs.md',
      ];

      const mockContent = `# Styling Props Reference\n\n## Best Practices\n\n### When to use styling props`;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleGetStylingPropsReference({
        category: 'all',
      });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect((result.content[0] as { text: string }).text).toContain(
        'Styling Props Reference',
      );
      expect((result.content[0] as { text: string }).text).toContain(
        'Best Practices',
      );
      expect(mockUtils.getMarkdownFiles).toHaveBeenCalled();
      expect(mockUtils.readFileContent).toHaveBeenCalled();
    });

    it('should return spacing docs for category="spacing"', () => {
      const mockMarkdownFiles = ['components_styling-props-spacing-docs.md'];

      const mockContent = `# Spacing Props\n\nPadding and margin props with textAlign and stretch.`;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleGetStylingPropsReference({
        category: 'spacing',
      });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      const text = (result.content[0] as { text: string }).text;
      expect(text).toContain('Spacing Props');
      expect(text).not.toContain('Best Practices'); // Best Practices only in reference docs
      expect(mockUtils.readFileContent).toHaveBeenCalledWith(
        expect.stringContaining('spacing'),
      );
    });

    it('should return colour docs for category="colors"', () => {
      const mockMarkdownFiles = ['components_styling-props-colour-docs.md'];

      const mockContent = `# Color Props\n\nThe \`bg\` and \`color\` props.`;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleGetStylingPropsReference({
        category: 'colors',
      });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect((result.content[0] as { text: string }).text).toContain(
        'Color Props',
      );
      expect(mockUtils.readFileContent).toHaveBeenCalledWith(
        expect.stringContaining('colour'),
      );
    });

    it('should return typography docs for category="typography"', () => {
      const mockMarkdownFiles = ['components_styling-props-typography-docs.md'];

      const mockContent = `# Typography Props\n\nThe \`textStyle\` prop.`;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleGetStylingPropsReference({
        category: 'typography',
      });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect((result.content[0] as { text: string }).text).toContain(
        'Typography Props',
      );
    });

    it('should return combined docs for category="visual"', () => {
      const mockMarkdownFiles = [
        'components_styling-props-elevation-docs.md',
        'components_styling-props-radius-docs.md',
      ];

      const elevationContent = `# Elevation\n\nThe \`layerStyle\` prop.`;
      const radiusContent = `# Border Radius\n\nThe \`borderRadius\` prop.`;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent
        .mockReturnValueOnce(elevationContent)
        .mockReturnValueOnce(radiusContent);

      const result: ToolResponse = handleGetStylingPropsReference({
        category: 'visual',
      });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      const text = (result.content[0] as { text: string }).text;
      expect(text).toContain('Elevation');
      expect(text).toContain('Border Radius');
    });

    it('should return combined docs for category="utility" including hideFrom, hideBelow, srOnly', () => {
      const mockMarkdownFiles = [
        'components_styling-props-screen-readers-docs.md',
        'components_styling-props-scrollable-docs.md',
      ];

      const screenReadersContent = `# Screen Readers\n\nThe \`srOnly\`, \`hideFrom\`, and \`hideBelow\` props.`;
      const scrollableContent = `# Scrollable\n\nThe \`scrollable\` prop.`;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent
        .mockReturnValueOnce(screenReadersContent)
        .mockReturnValueOnce(scrollableContent);

      const result: ToolResponse = handleGetStylingPropsReference({
        category: 'utility',
      });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      const text = (result.content[0] as { text: string }).text;
      expect(text).toContain('Screen Readers');
      expect(text).toContain('Scrollable');
    });

    it('should return sizing docs for category="sizing"', () => {
      const mockMarkdownFiles = ['components_styling-props-sizing-docs.md'];

      const mockContent = `# Sizing Props\n\nThe \`width\` and \`maxWidth\` props.`;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleGetStylingPropsReference({
        category: 'sizing',
      });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect((result.content[0] as { text: string }).text).toContain(
        'Sizing Props',
      );
    });

    it('should return component-specific guidance when component param is provided', () => {
      const result: ToolResponse = handleGetStylingPropsReference({
        category: 'all',
        component: 'IressButton',
      });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      const text = (result.content[0] as { text: string }).text;
      expect(text).toContain('Styling Props Support for IressButton');
      expect(text).toContain('IressStyledProps interface');
      expect(text).toContain('Related Tools');
      expect(text).toContain('get_component_props');
      expect(text).toContain('get_usage_examples');
      expect(text).toContain('get_iress_component_info');
      // Should not read files when component param is provided
      expect(mockUtils.readFileContent).not.toHaveBeenCalled();
    });

    it('should return error for invalid category', () => {
      mockUtils.getMarkdownFiles.mockReturnValue([]);

      expect(() =>
        handleGetStylingPropsReference({ category: 'invalid' }),
      ).toThrow();
    });

    it('should default to category="all" when no category provided', () => {
      const mockMarkdownFiles = [
        'components_styling-props-reference-docs.md',
        'components_styling-props-spacing-docs.md',
        'components_styling-props-colour-docs.md',
        'components_styling-props-typography-docs.md',
        'components_styling-props-elevation-docs.md',
        'components_styling-props-radius-docs.md',
        'components_styling-props-sizing-docs.md',
        'components_styling-props-screen-readers-docs.md',
        'components_styling-props-scrollable-docs.md',
      ];

      const mockContent = `# Styling Props Reference\n\n## Best Practices\n\n### When to use styling props`;

      mockUtils.getMarkdownFiles.mockReturnValue(mockMarkdownFiles);
      mockUtils.readFileContent.mockReturnValue(mockContent);

      const result: ToolResponse = handleGetStylingPropsReference({});

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      const text = (result.content[0] as { text: string }).text;
      expect(text).toContain('Best Practices'); // Should include Best Practices from reference docs for "all"
    });

    it('should handle missing documentation files gracefully', () => {
      mockUtils.getMarkdownFiles.mockReturnValue([]);

      const result: ToolResponse = handleGetStylingPropsReference({
        category: 'spacing',
      });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      const text = (result.content[0] as { text: string }).text;
      expect(text).toContain('No documentation found');
      expect(text).toContain('spacing');
    });
  });
});
