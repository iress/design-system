import { renderHook, waitFor } from '@testing-library/react';
import { useDynamicFontSubsetting } from './useDynamicFontSubsetting';
import { act } from '@testing-library/react';

describe('useDynamicFontSubsetting', () => {
  let mockFetch: ReturnType<typeof vi.fn>;
  let mockDocumentFonts: {
    check: ReturnType<typeof vi.fn>;
    load: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Mock fetch
    mockFetch = vi.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('@font-face { font-family: "Test Font"; }'),
      } as Response),
    );

    global.fetch = mockFetch as never;

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

    // Clear any existing style elements and nonce meta tags
    document.querySelectorAll('style[data-test-font]').forEach((el) => {
      el.remove();
    });
    document.querySelectorAll("meta[name='csp-nonce']").forEach((el) => {
      el.remove();
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Clean up style elements and nonce meta tags
    document.querySelectorAll('style[data-test-font]').forEach((el) => {
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
    it('fetches font CSS when icons are added', async () => {
      const icons = new Set(['icon1', 'icon2']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          'https://fonts.test/icon1,icon2',
        );
      });
    });

    it('sorts icons alphabetically before building URL', async () => {
      const icons = new Set(['zebra', 'alpha', 'beta']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          'https://fonts.test/alpha,beta,zebra',
        );
      });
    });

    it('injects CSS into document head with reset layer', async () => {
      const icons = new Set(['icon1']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      await waitFor(() => {
        const styleElement = document.querySelector('style[data-test-font]');
        expect(styleElement).toBeInTheDocument();
        expect(styleElement?.textContent).toContain('@layer reset');
        expect(styleElement?.textContent).toContain(
          '@font-face { font-family: "Test Font"; }',
        );
      });
    });

    it('sets data-url attribute on style element', async () => {
      const icons = new Set(['icon1']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      await waitFor(() => {
        const styleElement = document.querySelector('style[data-test-font]');
        expect(styleElement?.getAttribute('data-url')).toBe(
          'https://fonts.test/icon1',
        );
      });
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

      await waitFor(() => {
        expect(result.current.isIconLoaded('icon1')).toBe(true);
        expect(result.current.isIconLoaded('icon2')).toBe(true);
      });
    });
  });

  describe('disabled', () => {
    it('does not fetch fonts when disabled is true', async () => {
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

      // Wait a bit to ensure no style injection happens
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(mockFetch).not.toHaveBeenCalled();
      expect(
        document.querySelector('style[data-test-font]'),
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

      await waitFor(() => {
        // Even icons not in the set should be marked as loaded
        expect(result.current.isIconLoaded('icon1')).toBe(true);
        expect(result.current.isIconLoaded('other-icon')).toBe(true);
      });
    });

    it('still fetches fonts when noSubsetting is true', async () => {
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

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });
    });
  });

  describe('URL caching', () => {
    it('does not recreate style if URL has not changed', async () => {
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

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      // Rerender with same icons
      rerender({ icons });

      // Should not fetch again
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('fetches again if icons change', async () => {
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

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      // Rerender with different icons
      act(() => {
        rerender({ icons: icons2 });
      });

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('Error handling', () => {
    it('handles fetch errors gracefully', async () => {
      vi.useFakeTimers();
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      const icons = new Set(['icon1']);

      const { result } = renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

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
    it('removes style element on unmount', async () => {
      const icons = new Set(['icon1']);

      const { unmount } = renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      await waitFor(() => {
        expect(
          document.querySelector('style[data-test-font]'),
        ).toBeInTheDocument();
      });

      unmount();

      await waitFor(() => {
        expect(
          document.querySelector('style[data-test-font]'),
        ).not.toBeInTheDocument();
      });
    });

    it('handles cleanup when style element has no parent', async () => {
      const icons = new Set(['icon1']);

      const { unmount } = renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      await waitFor(() => {
        const styleElement = document.querySelector('style[data-test-font]');
        expect(styleElement).toBeInTheDocument();
        // Manually remove the element to simulate edge case
        styleElement?.remove();
      });

      // Should not throw error on unmount
      expect(() => unmount()).not.toThrow();
    });

    it('removes old stylesheet when URL changes', async () => {
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

      await waitFor(() => {
        const styleElements = document.querySelectorAll(
          'style[data-test-font]',
        );
        expect(styleElements.length).toBe(1);
        expect(styleElements[0].getAttribute('data-url')).toBe(
          'https://fonts.test/icon1',
        );
      });

      act(() => {
        rerender({ icons: icons2 });
      });

      await waitFor(() => {
        const styleElements = document.querySelectorAll(
          'style[data-test-font]',
        );
        // Should only have one style element (old one removed)
        expect(styleElements.length).toBe(1);
        expect(styleElements[0].getAttribute('data-url')).toBe(
          'https://fonts.test/icon2',
        );
      });
    });
  });

  describe('CSP nonce support', () => {
    it('adds nonce attribute to style element when csp-nonce meta tag exists', async () => {
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

      await waitFor(() => {
        const styleElement = document.querySelector('style[data-test-font]');
        expect(styleElement).toBeInTheDocument();
        expect(styleElement?.getAttribute('nonce')).toBe('test-nonce-123');
      });
    });

    it('does not add nonce attribute when csp-nonce meta tag is absent', async () => {
      const icons = new Set(['icon1']);

      renderHook(() =>
        useDynamicFontSubsetting({
          icons,
          buildUrl: (icons) => `https://fonts.test/${icons.join(',')}`,
          dataAttribute: 'test-font',
          fontFamily: 'Test Font',
        }),
      );

      await waitFor(() => {
        const styleElement = document.querySelector('style[data-test-font]');
        expect(styleElement).toBeInTheDocument();
        expect(styleElement?.getAttribute('nonce')).toBeNull();
      });
    });
  });
});
