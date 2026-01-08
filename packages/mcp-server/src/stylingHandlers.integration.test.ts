import { describe, it, expect } from 'vitest';
import { handleGetStylingPropsReference } from './stylingHandlers.js';

/**
 * Integration tests for styling props reference tool
 * These tests validate end-to-end behavior including:
 * - Real file system reads from generated docs
 * - Content accuracy and completeness
 * - AI-focused validation scenarios
 */
describe('stylingHandlers - Integration Tests', () => {
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

      // Match both markdown list format (`px:`) and prop format (px=)
      expect(text).toMatch(/`p`:|p=|\\bp\\b/);
      expect(text).toMatch(/`px`:|px=|\\bpx\\b/);
      expect(text).toMatch(/`py`:|py=|\\bpy\\b/);
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

      expect(text).toMatch(/bg\\?=/); // Match bg= or bg\="
      expect(text).toMatch(/color\\?=/); // Match color= or color\="

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

      // Should be substantial content
      expect(text.length).toBeGreaterThan(5000);

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
