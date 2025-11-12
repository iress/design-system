/// <reference types="vitest/globals" />
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  userEvent.setup();
});

afterEach(() => {
  cleanup();
});

// Disable CSS processing in JSDOM to avoid parsing modern CSS features
// that JSDOM doesn't support (like :has() selector, CSS nesting)
if (typeof window !== 'undefined') {
  // Override JSDOM's CSS parser to prevent errors
  const originalCreateElement = document.createElement.bind(document);

  // Override createElement to handle style elements specially
  const customCreateElement = function (
    tagName: string,
    options?: ElementCreationOptions,
  ): HTMLElement {
    const element = originalCreateElement(tagName, options);

    // Disable CSS parsing for style elements
    if (typeof tagName === 'string' && tagName.toLowerCase() === 'style') {
      const originalSetTextContent = Object.getOwnPropertyDescriptor(
        Node.prototype,
        'textContent',
      )?.set?.bind(element);
      if (originalSetTextContent) {
        Object.defineProperty(element, 'textContent', {
          set: function (this: HTMLStyleElement, value: string | null) {
            // Don't process CSS, just set as text
            if (this.sheet) {
              try {
                // Clear any existing rules
                while (this.sheet.cssRules.length > 0) {
                  this.sheet.deleteRule(0);
                }
              } catch {
                // Ignore errors when clearing rules
              }
            }
            // Set the text content without parsing
            originalSetTextContent?.(value);
          },
          get: function (this: HTMLElement): string {
            return this.innerHTML ?? '';
          },
          configurable: true,
          enumerable: true,
        });
      }
    }

    return element;
  };

  // Replace the original method
  document.createElement = customCreateElement as Document['createElement'];
}
