import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleGetStylingPropsReference } from './stylingHandlers.js';

// Mock the utils module to provide test documentation
vi.mock('./utils.js', () => ({
  getMarkdownFiles: vi.fn(() => [
    'components_styling-props-reference-docs.md',
    'components_styling-props-spacing-docs.md',
    'components_styling-props-colour-docs.md',
    'components_styling-props-typography-docs.md',
    'components_styling-props-elevation-docs.md',
    'components_styling-props-radius-docs.md',
    'components_styling-props-sizing-docs.md',
    'components_styling-props-screen-readers-docs.md',
    'components_styling-props-scrollable-docs.md',
  ]),
  readFileContent: vi.fn((filePath: string) => {
    // Extract filename from path
    const fileName = filePath.split('/').pop() ?? '';

    // Return mock content based on filename
    const mockContent: Record<string, string> = {
      'components_styling-props-reference-docs.md': `# Styling Props Reference

## Best Practices

When styling IDS components, prefer this hierarchy:
1. **Style props** for simple, one-off adjustments
2. **iressCss()** for complex styles or pseudo-selectors
3. **CSS-in-JS** for advanced scenarios

## When to Use Each Approach

- **Style props**: Use for spacing, colors, responsive utilities
- **iressCss()**: Use for hover states, media queries, complex selectors
- **Inline styles**: Avoid - use style props instead

## Example Usage

\`\`\`tsx
import { IressButton } from '@iress-oss/ids-components';

// Using style props
<IressButton px="spacing[400]" bg="colour.primary.fill">
  Click me
</IressButton>
\`\`\`

## Comprehensive Styling Guide

IDS components support a wide range of styling props through the Panda CSS system.
Each component that extends IressStyledProps can accept these props for flexible styling.

### Responsive Design

All styling props support responsive values using breakpoint objects:
\`\`\`tsx
<IressBox px={{ base: "spacing[200]", md: "spacing[400]", lg: "spacing[600]" }}>
  Responsive padding
</IressBox>
\`\`\`

### Design Token Integration

Always prefer design tokens over hardcoded values:
- **Spacing**: Use \`spacing[100]\` through \`spacing[900]\` or semantic names
- **Colors**: Use \`colour.primary.*\`, \`colour.secondary.*\`, \`colour.neutral.*\`
- **Typography**: Use \`textStyle\` with predefined styles
- **Elevation**: Use \`layerStyle\` for consistent shadows

### Common Patterns

**Card Layout:**
\`\`\`tsx
<IressBox
  p="spacing[400]"
  bg="colour.neutral.subtle"
  borderRadius="radius.medium"
  layerStyle="raised"
>
  Card content
</IressBox>
\`\`\`

**Flexible Container:**
\`\`\`tsx
<IressBox
  display="flex"
  flexDirection="column"
  gap="spacing[300]"
  maxWidth="800px"
>
  Flex content
</IressBox>
\`\`\`

**Responsive Visibility:**
\`\`\`tsx
<IressBox hideBelow="md">
  Desktop only content
</IressBox>
<IressBox hideFrom="md">
  Mobile only content
</IressBox>
\`\`\`
`,
      'components_styling-props-spacing-docs.md': `# Spacing Props

Spacing props control padding, margin, and gap between elements.

## Props

- \`p\` - padding (all sides)
- \`px\` - padding horizontal (left & right)
- \`py\` - padding vertical (top & bottom)
- \`m\` - margin (all sides)
- \`mx\` - margin horizontal
- \`my\` - margin vertical

## Token Usage

Always use spacing tokens from the design system:
- \`spacing[100]\` - 4px
- \`spacing[200]\` - 8px
- \`spacing[400]\` - 16px
- \`spacing.md\` - Medium spacing

## Usage Examples

\`\`\`tsx
<IressButton p="spacing[400]" px="spacing.lg">
  Padded button
</IressButton>
\`\`\`
`,
      'components_styling-props-colour-docs.md': `# Color Props

Color props control background, text, and border colors.

## Props

- \`bg\` - background color
- \`color\` - text color
- \`borderColor\` - border color

## Semantic Tokens

Use semantic color tokens:
- \`colour.primary.fill\` - Primary fill color
- \`colour.primary.onFill\` - Text on primary fill
- \`colour.secondary.fill\` - Secondary fill
- \`colour.neutral.border\` - Neutral border
- \`colour.neutral.subtle\` - Subtle backgrounds

## Usage Examples

\`\`\`tsx
<IressButton bg="colour.primary.fill" color="colour.primary.onFill">
  Colored button
</IressButton>
\`\`\`
`,
      'components_styling-props-typography-docs.md': `# Typography Props

Typography props control text styling.

## Props

- \`textStyle\` - Predefined text styles
- \`fontSize\` - Font size
- \`fontWeight\` - Font weight

## Text Styles

Use semantic text styles:
- \`heading.large\` - Large headings
- \`heading.medium\` - Medium headings
- \`body.large\` - Large body text
- \`body.medium\` - Medium body text
- \`label.medium\` - Labels
- \`caption.small\` - Captions
`,
      'components_styling-props-elevation-docs.md': `# Elevation & Shadow Props

Visual effects for depth and elevation.

## Props

- \`layerStyle\` - Predefined elevation styles
- \`boxShadow\` - Custom shadows

## Layer Styles

- \`raised\` - Slightly raised
- \`floating\` - Floating elevation
- \`overlay\` - Modal/overlay elevation
- \`sunken\` - Inset appearance
`,
      'components_styling-props-radius-docs.md': `# Border Radius Props

Control rounded corners.

## Props

- \`borderRadius\` - All corners
- \`borderTopLeftRadius\` - Top left corner
- \`borderTopRightRadius\` - Top right corner

## Token Values

Use radius tokens for consistency.
`,
      'components_styling-props-sizing-docs.md': `# Sizing Props

Control component dimensions and constraints.

## Props

- \`width\` - Element width
- \`maxWidth\` - Maximum width constraint
- \`minWidth\` - Minimum width constraint
- \`height\` - Element height
- \`maxHeight\` - Maximum height constraint
- \`minHeight\` - Minimum height constraint

## Usage

Use size tokens or responsive values.
`,
      'components_styling-props-screen-readers-docs.md': `# Screen Reader Props

Accessibility utilities for hiding content.

## Props

- \`hideFrom\` - Hide element from specified breakpoint upward
- \`hideBelow\` - Hide element below specified breakpoint

## Breakpoints

- \`mobile\` - Mobile devices
- \`tablet\` - Tablets (md)
- \`desktop\` - Desktop (lg, xl)
`,
      'components_styling-props-scrollable-docs.md': `# Scrollable Props

Control overflow and scrolling behavior.

## Props

- \`overflow\` - Overflow behavior
- \`overflowX\` - Horizontal overflow
- \`overflowY\` - Vertical overflow
`,
    };

    return mockContent[fileName] || `# Mock content for ${fileName}`;
  }),
}));

/**
 * Integration tests for styling props reference tool
 * These tests validate end-to-end behavior including:
 * - Mocked file system reads from generated docs
 * - Content accuracy and completeness
 * - AI-focused validation scenarios
 */
describe('stylingHandlers - Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  // Helper to extract text content from ToolResponse
  const getTextContent = (
    result: Awaited<ReturnType<typeof handleGetStylingPropsReference>>,
  ): string => {
    return result.content[0].text;
  };

  describe('AI Assistant Validation Scenarios', () => {
    it('should help AI discover spacing props for responsive padding', async () => {
      // Scenario: AI needs to add responsive padding to a component
      const result = handleGetStylingPropsReference({
        category: 'spacing',
      });
      const text = getTextContent(result);

      // Match markdown list format or prop usage in examples
      expect(text).toMatch(/`p`|\bp="/);
      expect(text).toMatch(/`px`|\bpx="/);
      expect(text).toMatch(/`py`|\bpy="/);
      expect(text).toContain('spacing token');

      // Should guide toward tokens, not hardcoded values - check for 'spacing.' or 'spacing[' notation
      expect(text).toMatch(/spacing\.|spacing\[|spacing\.400|spacing\.md/i);
    });

    it('should guide AI on hiding content at breakpoints', async () => {
      // Scenario: AI needs to hide element on mobile, show on desktop
      const result = handleGetStylingPropsReference({
        category: 'utility',
      });
      const text = getTextContent(result);

      expect(text).toContain('hideFrom');
      expect(text).toContain('hideBelow');
      expect(text).toContain('breakpoint');

      // Should provide responsive utility props
      expect(text).toMatch(/mobile|tablet|desktop|sm|md|lg|xl/i);
    });

    it('should explain styling approach differences for AI decision-making', async () => {
      // Scenario: AI needs to decide between style props, iressCss(), or CSS-in-JS
      const result = handleGetStylingPropsReference({ category: 'all' });
      const text = getTextContent(result);

      // Should include Best Practices section from Storybook
      expect(text).toContain('Best Practices');

      // Should explain when to use different approaches
      expect(text).toMatch(/style\s+props?/i);
      expect(text).toMatch(/iressCss/i);

      // Should provide decision guidance
      expect(text.toLowerCase()).toMatch(/when\s+to\s+use/i);
    });

    it('should provide component-specific styling guidance', async () => {
      // Scenario: AI needs to know which styling props IressButton accepts
      const result = handleGetStylingPropsReference({
        category: 'all',
        component: 'IressButton',
      });
      const text = getTextContent(result);

      expect(text).toContain('IressButton');

      // Should include component-specific context
      expect(text.toLowerCase()).toMatch(/component|button/i);
    });

    it('should help AI use color tokens correctly', async () => {
      // Scenario: AI needs to apply semantic colors
      const result = handleGetStylingPropsReference({
        category: 'colors',
      });
      const text = getTextContent(result);

      expect(text).toMatch(/`bg`|\bbg="/); // Match backtick or prop usage
      expect(text).toMatch(/`color`|\bcolor="/); // Match backtick or prop usage

      // Should reference color tokens
      expect(text).toMatch(/colour\.|color\./i);
      expect(text).toMatch(/primary|secondary|neutral/i);

      // Should guide toward semantic tokens
      expect(text).toMatch(/fill|onFill|subtle|border/i);
    });

    it('should guide AI on typography styling', async () => {
      // Scenario: AI needs to apply text styles
      const result = handleGetStylingPropsReference({
        category: 'typography',
      });
      const text = getTextContent(result);

      expect(text).toContain('textStyle');

      // Should reference typography tokens
      expect(text).toMatch(/heading|body|label|caption/i);
    });

    it('should help AI with visual effects (elevation, borders)', async () => {
      // Scenario: AI needs to add shadow/elevation or border radius
      const result = handleGetStylingPropsReference({
        category: 'visual',
      });
      const text = getTextContent(result);

      expect(text).toMatch(/layerStyle|borderRadius|elevation|shadow/i);

      // Should reference visual tokens
      expect(text).toMatch(/raised|floating|overlay|sunken/i);
    });

    it('should guide AI on sizing constraints', async () => {
      // Scenario: AI needs to constrain component width
      const result = handleGetStylingPropsReference({
        category: 'sizing',
      });
      const text = getTextContent(result);

      expect(text).toMatch(/width|maxWidth|minWidth|height/i);

      // Should provide sizing guidance
      expect(text).toMatch(/size|dimension|constraint/i);
    });
  });

  describe('Content Quality Validation', () => {
    it('should include code examples with proper imports', async () => {
      const result = handleGetStylingPropsReference({ category: 'all' });
      const text = getTextContent(result);

      // Should show how to import IDS components
      expect(text).toMatch(/@iress-oss\/ids-components|from ['"]@iress-oss/i);
    });

    it('should reference design tokens consistently', async () => {
      const result = handleGetStylingPropsReference({ category: 'all' });
      const text = getTextContent(result);

      // Should use token notation consistently
      expect(text).toMatch(/spacing\[|colour\.|typography\./i);

      // Should avoid hardcoded values in examples
      const hasHardcodedPx = text.match(/\d+px/g);
      const hasTokens = text.match(/spacing\[|colour\.|typography\./gi);

      // If there are hardcoded values, tokens should be more prominent
      if (hasHardcodedPx) {
        expect(hasTokens).toBeTruthy();
        expect(hasTokens?.length ?? 0).toBeGreaterThan(
          hasHardcodedPx?.length ?? 0,
        );
      }
    });

    it('should provide actionable guidance, not just reference', async () => {
      const result = handleGetStylingPropsReference({ category: 'all' });
      const text = getTextContent(result);

      // Should include Best Practices section with actionable advice
      expect(text).toContain('Best Practices');

      // Should have decision-making guidance
      expect(text.toLowerCase()).toMatch(
        /when to use|how to|best practice|recommended/i,
      );
    });

    it('should be comprehensive for category="all"', async () => {
      const result = handleGetStylingPropsReference({ category: 'all' });
      const text = getTextContent(result);

      // Should be substantial content (combined from all category files)
      expect(text.length).toBeGreaterThan(3000);

      // Should cover multiple styling concerns
      expect(text).toMatch(/spacing/i);
      expect(text).toMatch(/color/i);
      expect(text).toMatch(/typography/i);

      // Should include Best Practices
      expect(text).toContain('Best Practices');
    });
  });

  describe('Error Handling Validation', () => {
    it('should handle invalid category gracefully', async () => {
      // Zod validation should throw an error for invalid categories
      let errorThrown = false;
      try {
        handleGetStylingPropsReference({ category: 'invalid' as never });
      } catch (error) {
        errorThrown = true;
        // Should be a Zod validation error
        expect(error).toBeTruthy();
      }
      expect(errorThrown).toBe(true);
    });

    it('should handle empty component name', async () => {
      const result = handleGetStylingPropsReference({
        category: 'all',
        component: '',
      });
      const text = getTextContent(result);

      // Should still return reference content
      expect(text).toBeTruthy();
      expect(text.length).toBeGreaterThan(0);
    });
  });

  describe('Consistency with Other Tools', () => {
    it('should return content in same format as other reference tools', async () => {
      const result = handleGetStylingPropsReference({ category: 'all' });

      // Should return ToolResponse format
      expect(result).toHaveProperty('content');
      expect(Array.isArray(result.content)).toBe(true);
      expect(result.content[0]).toHaveProperty('type', 'text');
      expect(result.content[0]).toHaveProperty('text');
      expect(typeof result.content[0].text).toBe('string');
    });

    it('should use markdown formatting for readability', async () => {
      const result = handleGetStylingPropsReference({ category: 'all' });
      const text = getTextContent(result);

      // Should include markdown elements
      expect(text).toMatch(/^#+ /m); // Headers
      expect(text).toMatch(/```/); // Code blocks
      expect(text).toMatch(/^[-*] /m); // Lists
    });
  });
});
