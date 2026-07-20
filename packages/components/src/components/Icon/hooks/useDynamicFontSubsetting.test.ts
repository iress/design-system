import { renderHook, waitFor } from '@testing-library/react';
import { useDynamicFontSubsetting } from './useDynamicFontSubsetting';
import { act } from '@testing-library/react';

describe('useDynamicFontSubsetting', () => {
  let mockDocumentFonts: {
    check: ReturnType<typeof vi.fn>;
    load: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Mock document.fonts API
    mockDocumentFonts = {
      check: vi.fn(() => false),
      load: vi.fn(() => Promise.resolve()),
    };

    Object.defineProperty(document, 'fonts', {
      value: mockDocumentFonts,
      writable: true,
      configurable: true,
    });

    // Clear any existing link elements and nonce meta tags
    document.querySelectorAll('link[data-test-font]').forEach((el) => {
      el.remove();
    });
    document.querySelectorAll("meta[name='csp-nonce']").forEach((el) => {
      el.remove();
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Clean up link elements and nonce meta tags
    document.querySelectorAll('link[data-test-font]').forEach((el) => {
      el.remove();
    });
    document.querySelectorAll("meta[name='csp-nonce']").forEach((el) => {
      el.remove();
    });
  });

  describe('Default behavior', () => {
    it('returns empty loadedIcons initially', () => {
      const { result } = renderHook(() =>
        useDynamicFontSubsetting({
          icons: new Set(),
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      expect(result.current.loadedIcons).toEqual(new Set());
      expect(result.current.isIconLoaded('test')).toBe(false);
    });

    it('provides isIconLoaded function', () => {
      const { result } = renderHook(() =>
        useDynamicFontSubsetting({
          icons: new Set(),
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      expect(typeof result.current.isIconLoaded).toBe('function');
    });
  });

  describe('Font loading', () => {
    it('creates a link element when icons are added', () => {
      const icons = new Set(['icon1', 'icon2']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement?.getAttribute('href')).toBe(
        'https://fonts.test/icon1,icon2',
      );
    });

    it('sorts icons alphabetically before building URL', () => {
      const icons = new Set(['zebra', 'alpha', 'beta']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      expect(linkElement?.getAttribute('href')).toBe(
        'https://fonts.test/alpha,beta,zebra',
      );
    });

    it('creates a link stylesheet element in document head', () => {
      const icons = new Set(['icon1']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement?.getAttribute('rel')).toBe('stylesheet');
    });

    it('sets data-url attribute on link element', () => {
      const icons = new Set(['icon1']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      expect(linkElement?.getAttribute('data-url')).toBe(
        'https://fonts.test/icon1',
      );
    });

    it('uses Font Loading API to detect when fonts are ready', async () => {
      const icons = new Set(['icon1']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      // Simulate link load event
      const linkElement = document.querySelector('link[data-test-font]');
      linkElement?.dispatchEvent(new Event('load'));

      await waitFor(() => {
        expect(mockDocumentFonts.check).toHaveBeenCalledWith(
          '24px "Test Font"',
        );
      });
    });

    it('calls fonts.load when check returns false', async () => {
      mockDocumentFonts.check.mockReturnValue(false);
      const icons = new Set(['icon1']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      linkElement?.dispatchEvent(new Event('load'));

      await waitFor(() => {
        expect(mockDocumentFonts.load).toHaveBeenCalledWith('24px "Test Font"');
      });
    });

    it('marks icons as loaded after font is ready', async () => {
      const icons = new Set(['icon1', 'icon2']);

      const { result } = renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      linkElement?.dispatchEvent(new Event('load'));

      await waitFor(() => {
        expect(result.current.isIconLoaded('icon1')).toBe(true);
        expect(result.current.isIconLoaded('icon2')).toBe(true);
      });
    });
  });

  describe('disabled', () => {
    it('does not create link element when disabled is true', () => {
      const icons = new Set(['icon1']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
          disabled: true,
        }),
      );

      expect(
        document.querySelector('link[data-test-font]'),
      ).not.toBeInTheDocument();
    });

    it('returns empty loadedIcons when disabled', () => {
      const icons = new Set(['icon1']);

      const { result } = renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
          disabled: true,
        }),
      );

      expect(result.current.loadedIcons).toEqual(new Set());
      expect(result.current.isIconLoaded('icon1')).toBe(false);
    });
  });

  describe('noSubsetting', () => {
    it('marks all icons as loaded after first load when noSubsetting is true', async () => {
      const icons = new Set(['icon1']);

      const { result } = renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
          noSubsetting: true,
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      linkElement?.dispatchEvent(new Event('load'));

      await waitFor(() => {
        expect(result.current.isIconLoaded('icon1')).toBe(true);
        expect(result.current.isIconLoaded('other-icon')).toBe(true);
      });
    });

    it('still creates link element when noSubsetting is true', () => {
      const icons = new Set(['icon1']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
          noSubsetting: true,
        }),
      );

      expect(
        document.querySelector('link[data-test-font]'),
      ).toBeInTheDocument();
    });
  });

  describe('MFE icon merging', () => {
    it('stores only own icon list in data-icons attribute (not a full union)', () => {
      const icons = new Set(['icon1', 'icon2']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      expect(linkElement?.getAttribute('data-icons')).toBe('icon1,icon2');
    });

    it('uses a unique per-instance ID as the data attribute value', () => {
      const icons = new Set(['icon1']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      // Value must be a non-empty instance ID (not just "true")
      const instanceId = linkElement?.getAttribute('data-test-font');
      expect(instanceId).toBeTruthy();
      expect(instanceId).not.toBe('true');
    });

    it('merges icons from other instances into the URL to prevent competing font-face rules', () => {
      // Simulate another provider's link already in the DOM (different instanceId as value)
      const otherProviderLink = document.createElement('link');
      otherProviderLink.rel = 'stylesheet';
      otherProviderLink.setAttribute('data-test-font', 'other-instance-id');
      otherProviderLink.setAttribute(
        'data-url',
        'https://fonts.test/icon1,icon2',
      );
      otherProviderLink.setAttribute('data-icons', 'icon1,icon2');
      document.head.appendChild(otherProviderLink);

      // This hook instance only knows about icon3 and icon4
      const icons = new Set(['icon3', 'icon4']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      // The new link should be a superset: other provider's icons + this instance's icons
      const newLink = document.querySelector(
        'link[data-url="https://fonts.test/icon1,icon2,icon3,icon4"]',
      );
      expect(newLink).toBeInTheDocument();
    });

    it("creates a superset link but never removes other providers' links", async () => {
      // Simulate provider A's link already in the DOM
      const providerALink = document.createElement('link');
      providerALink.rel = 'stylesheet';
      providerALink.setAttribute('data-test-font', 'provider-a-id');
      providerALink.setAttribute('data-url', 'https://fonts.test/icon1,icon2');
      providerALink.setAttribute('data-icons', 'icon1,icon2');
      document.head.appendChild(providerALink);

      // Provider B hook mounts with its own icons
      const icons = new Set(['icon3', 'icon4']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      // Provider B's new link exists with the superset URL
      const providerBLink = document.querySelector(
        'link[data-url="https://fonts.test/icon1,icon2,icon3,icon4"]',
      );
      expect(providerBLink).toBeInTheDocument();

      // Simulate provider B's link loading
      providerBLink?.dispatchEvent(new Event('load'));

      await waitFor(() => {
        // Provider A's link must NOT be removed — it belongs to a different instance
        expect(
          document.querySelector('link[data-test-font="provider-a-id"]'),
        ).toBeInTheDocument();
      });

      // Both links coexist; provider B's link (last in DOM) wins in CSS cascade
      expect(document.querySelectorAll('link[data-test-font]').length).toBe(2);
    });

    it('each provider only removes its own previous link on URL update', async () => {
      const icons1 = new Set(['icon1']);
      const icons2 = new Set(['icon1', 'icon2']);

      const { rerender } = renderHook(
        ({ icons }) =>
          useDynamicFontSubsetting({
            icons,
            buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
            dataAttribute: 'test-font',
            fontFamily: 'Test Font',
          }),
        { initialProps: { icons: icons1 } },
      );

      const firstLink = document.querySelector('link[data-test-font]');
      const instanceId = firstLink?.getAttribute('data-test-font');
      expect(firstLink).toBeInTheDocument();

      act(() => {
        rerender({ icons: icons2 });
      });

      // A new link with expanded URL exists
      const newLink = document.querySelector(
        'link[data-url="https://fonts.test/icon1,icon2"]',
      );
      expect(newLink).toBeInTheDocument();
      // New link has the same instance ID as the old one
      expect(newLink?.getAttribute('data-test-font')).toBe(instanceId);

      // Simulate load — only the old own link should be removed
      newLink?.dispatchEvent(new Event('load'));

      await waitFor(() => {
        const remaining = document.querySelectorAll('link[data-test-font]');
        expect(remaining.length).toBe(1);
        expect(remaining[0].getAttribute('data-url')).toBe(
          'https://fonts.test/icon1,icon2',
        );
      });
    });

    it('does not add data-icons attribute when noSubsetting is true', () => {
      const icons = new Set(['icon1', 'icon2']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
          noSubsetting: true,
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      expect(linkElement?.hasAttribute('data-icons')).toBe(false);
    });

    it('does not merge icons from other providers when noSubsetting is true', () => {
      // Simulate another provider's link in the DOM
      const existingLink = document.createElement('link');
      existingLink.rel = 'stylesheet';
      existingLink.setAttribute('data-test-font', 'other-instance-id');
      existingLink.setAttribute('data-url', 'https://fonts.test/icon1,icon2');
      existingLink.setAttribute('data-icons', 'icon1,icon2');
      document.head.appendChild(existingLink);

      // Hook with noSubsetting=true: buildUrl ignores icon list
      const icons = new Set(['icon3']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: () => 'https://fonts.test/full-font',
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
          noSubsetting: true,
        }),
      );

      // URL should be the full-font URL, not a merged subset
      const newLink = document.querySelector(
        'link[data-url="https://fonts.test/full-font"]',
      );
      expect(newLink).toBeInTheDocument();
    });
  });

  describe('URL caching', () => {
    it('does not recreate link if URL has not changed', () => {
      const icons = new Set(['icon1']);

      const { rerender } = renderHook(
        ({ icons }) =>
          useDynamicFontSubsetting({
            icons,
            buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
            dataAttribute: 'test-font',
            fontFamily: 'Test Font',
          }),
        { initialProps: { icons } },
      );

      const linkElements = document.querySelectorAll('link[data-test-font]');
      expect(linkElements.length).toBe(1);

      // Rerender with same icons
      rerender({ icons });

      // Should still only have one link element
      expect(document.querySelectorAll('link[data-test-font]').length).toBe(1);
    });

    it('creates new link if icons change', () => {
      const icons1 = new Set(['icon1']);
      const icons2 = new Set(['icon1', 'icon2']);

      const { rerender } = renderHook(
        ({ icons }) =>
          useDynamicFontSubsetting({
            icons,
            buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
            dataAttribute: 'test-font',
            fontFamily: 'Test Font',
          }),
        { initialProps: { icons: icons1 } },
      );

      expect(document.querySelectorAll('link[data-test-font]').length).toBe(1);

      // Rerender with different icons
      act(() => {
        rerender({ icons: icons2 });
      });

      // New link element should be created (old one removed on load)
      const linkElements = document.querySelectorAll('link[data-test-font]');
      expect(linkElements.length).toBeGreaterThanOrEqual(1);
      const urls = Array.from(linkElements).map((el) =>
        el.getAttribute('data-url'),
      );
      expect(urls).toContain('https://fonts.test/icon1,icon2');
    });
  });

  describe('Error handling', () => {
    it('handles link error events gracefully', async () => {
      vi.useFakeTimers();
      const icons = new Set(['icon1']);

      const { result } = renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      linkElement?.dispatchEvent(new Event('error'));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      // Should mark icons as loaded after timeout
      expect(result.current.isIconLoaded('icon1')).toBe(true);

      vi.useRealTimers();
    });

    it('handles Font Loading API errors gracefully', async () => {
      vi.useFakeTimers();
      mockDocumentFonts.load.mockRejectedValueOnce(
        new Error('Font load error'),
      );
      const icons = new Set(['icon1']);

      const { result } = renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      linkElement?.dispatchEvent(new Event('load'));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      // Should still mark icons as loaded
      expect(result.current.isIconLoaded('icon1')).toBe(true);

      vi.useRealTimers();
    });

    it('falls back to setTimeout when Font Loading API is not available', async () => {
      // Save original fonts API
      const originalFonts = document.fonts;

      // Remove fonts API
      delete (document as unknown as { fonts: never }).fonts;

      vi.useFakeTimers();

      const icons = new Set(['icon1']);

      const { result } = renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      linkElement?.dispatchEvent(new Event('load'));

      // Fast-forward past the 1000ms setTimeout fallback
      await act(async () => {
        await vi.advanceTimersByTimeAsync(2000);
      });

      // Icons should now be loaded
      expect(result.current.isIconLoaded('icon1')).toBe(true);

      vi.useRealTimers();

      // Restore original fonts API
      Object.defineProperty(document, 'fonts', {
        value: originalFonts,
        writable: true,
        configurable: true,
      });
    });
  });

  describe('Cleanup', () => {
    it('removes link element on unmount', () => {
      const icons = new Set(['icon1']);

      const { unmount } = renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      expect(
        document.querySelector('link[data-test-font]'),
      ).toBeInTheDocument();

      unmount();

      expect(
        document.querySelector('link[data-test-font]'),
      ).not.toBeInTheDocument();
    });

    it('handles cleanup when link element has no parent', () => {
      const icons = new Set(['icon1']);

      const { unmount } = renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector('link[data-test-font]');
      expect(linkElement).toBeInTheDocument();
      // Manually remove the element to simulate edge case
      linkElement?.remove();

      // Should not throw error on unmount
      expect(() => unmount()).not.toThrow();
    });

    it('removes own old link when URL changes to a new icon set', async () => {
      const icons1 = new Set(['icon1']);
      const icons2 = new Set(['icon2']);

      const { rerender } = renderHook(
        ({ icons }) =>
          useDynamicFontSubsetting({
            icons,
            buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
            dataAttribute: 'test-font',
            fontFamily: 'Test Font',
          }),
        { initialProps: { icons: icons1 } },
      );

      expect(document.querySelectorAll('link[data-test-font]').length).toBe(1);
      expect(
        document
          .querySelector('link[data-test-font]')
          ?.getAttribute('data-url'),
      ).toBe('https://fonts.test/icon1');

      act(() => {
        rerender({ icons: icons2 });
      });

      // New link for the updated icon set is created alongside the old one
      const linkElements = document.querySelectorAll('link[data-test-font]');
      const newLink = Array.from(linkElements).find(
        (el) => el.getAttribute('data-url') === 'https://fonts.test/icon2',
      );
      newLink?.dispatchEvent(new Event('load'));

      await waitFor(() => {
        const remaining = document.querySelectorAll('link[data-test-font]');
        // Only the new link remains after the old own link is removed
        expect(remaining.length).toBe(1);
        expect(remaining[0].getAttribute('data-url')).toBe(
          'https://fonts.test/icon2',
        );
      });
    });
  });

  describe('CSP nonce support', () => {
    it('adds nonce attribute to link element when csp-nonce meta tag exists', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'csp-nonce');
      meta.setAttribute('content', 'test-nonce-123');
      document.head.appendChild(meta);

      const icons = new Set(['icon1']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector<HTMLLinkElement>(
        'link[data-test-font]',
      );
      expect(linkElement).toBeInTheDocument();
      expect(linkElement?.nonce).toBe('test-nonce-123');
    });

    it('does not add nonce attribute when csp-nonce meta tag is absent', () => {
      const icons = new Set(['icon1']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      const linkElement = document.querySelector<HTMLLinkElement>(
        'link[data-test-font]',
      );
      expect(linkElement).toBeInTheDocument();
      expect(linkElement?.nonce).toBeFalsy();
    });
  });
});
