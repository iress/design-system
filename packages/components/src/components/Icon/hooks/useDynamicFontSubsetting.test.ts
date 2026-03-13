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

    it('removes old link when URL changes', async () => {
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

      // Simulate load event on new link to trigger old link removal
      const linkElements = document.querySelectorAll('link[data-test-font]');
      const newLink = Array.from(linkElements).find(
        (el) => el.getAttribute('data-url') === 'https://fonts.test/icon2',
      );
      newLink?.dispatchEvent(new Event('load'));

      await waitFor(() => {
        const remaining = document.querySelectorAll('link[data-test-font]');
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
