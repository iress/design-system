import { closestCrossShadow } from './closestCrossShadow';

describe('closestCrossShadow', () => {
  beforeEach(() => {
    // Clean up any existing elements
    document.body.innerHTML = '';
  });

  describe('basic functionality', () => {
    it('should return null for null element', () => {
      expect(closestCrossShadow(null, '.test')).toBeNull();
    });

    it('should return null for undefined element', () => {
      expect(
        closestCrossShadow(undefined as unknown as Element, '.test'),
      ).toBeNull();
    });

    it('should return null when no matching element is found', () => {
      const element = document.createElement('div');
      expect(closestCrossShadow(element, '.nonexistent')).toBeNull();
    });

    it('should return the element itself if it matches the selector', () => {
      const element = document.createElement('div');
      element.className = 'test';
      expect(closestCrossShadow(element, '.test')).toBe(element);
    });
  });

  describe('native closest functionality', () => {
    it('should use native closest when element is found in same DOM tree', () => {
      const parent = document.createElement('div');
      parent.className = 'parent';
      const child = document.createElement('span');
      parent.appendChild(child);

      const result = closestCrossShadow(child, '.parent');
      expect(result).toBe(parent);
    });

    it('should find ancestor with specific tag name', () => {
      const form = document.createElement('form');
      const input = document.createElement('input');
      form.appendChild(input);

      const result = closestCrossShadow(input, 'form');
      expect(result).toBe(form);
    });

    it('should find ancestor with multiple classes', () => {
      const parent = document.createElement('div');
      parent.className = 'container test-class';
      const child = document.createElement('span');
      parent.appendChild(child);

      const result = closestCrossShadow(child, '.container');
      expect(result).toBe(parent);
    });
  });

  describe('shadow DOM traversal', () => {
    it('should traverse through shadow DOM to find ancestor', () => {
      // Create host element
      const host = document.createElement('div');
      host.className = 'host-element';

      // Create shadow root
      const shadowRoot = host.attachShadow({ mode: 'open' });

      // Create element inside shadow DOM
      const shadowElement = document.createElement('span');
      shadowRoot.appendChild(shadowElement);

      const result = closestCrossShadow(shadowElement, '.host-element');
      expect(result).toBe(host);
    });

    it('should traverse through multiple shadow DOM levels', () => {
      // Create outer host
      const outerHost = document.createElement('div');
      outerHost.className = 'outer-host';

      // Create outer shadow root
      const outerShadowRoot = outerHost.attachShadow({ mode: 'open' });

      // Create inner host
      const innerHost = document.createElement('div');
      innerHost.className = 'inner-host';

      // Create inner shadow root
      const innerShadowRoot = innerHost.attachShadow({ mode: 'open' });

      // Create element inside inner shadow DOM
      const deepElement = document.createElement('span');
      innerShadowRoot.appendChild(deepElement);
      outerShadowRoot.appendChild(innerHost);

      const result = closestCrossShadow(deepElement, '.outer-host');
      expect(result).toBe(outerHost);
    });

    it('should handle closed shadow DOM', () => {
      // Create host element
      const host = document.createElement('div');
      host.className = 'host-element';

      // Create closed shadow root
      const shadowRoot = host.attachShadow({ mode: 'closed' });

      // Create element inside shadow DOM
      const shadowElement = document.createElement('span');
      shadowRoot.appendChild(shadowElement);

      const result = closestCrossShadow(shadowElement, '.host-element');
      expect(result).toBe(host);
    });
  });
});
