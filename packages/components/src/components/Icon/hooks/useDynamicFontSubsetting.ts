import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseDynamicFontSubsettingOptions {
  /**
   * Set of icon names to load
   */
  icons: Set<string>;

  /**
   * Function to build the font URL from an array of icon names
   */
  buildUrl: (icons: string[]) => string;

  /**
   * Data attribute to identify the link element in the DOM. Must be kebab-case.
   */
  dataAttribute: string;

  /**
   * Font family name for the Font Loading API
   */
  fontFamily: string;

  /**
   * Whether the hook is disabled (loads nothing if true)
   */
  disabled?: boolean;

  /**
   * Whether font subsetting is disabled (full font loaded at once)
   * When true, all icons are considered loaded after first font load
   */
  noSubsetting?: boolean;
}

/**
 * Hook to dynamically load fonts with text subsetting from a CDN.
 * Only loads the specific glyphs that are actually used, dramatically reducing payload size.
 *
 * @example Material Symbols: 1407KB → 15-20KB (98.5% reduction)
 */
export const useDynamicFontSubsetting = ({
  icons,
  buildUrl,
  dataAttribute,
  fontFamily,
  disabled = false,
  noSubsetting = false,
}: UseDynamicFontSubsettingOptions) => {
  const [loadedIcons, setLoadedIcons] = useState<Set<string>>(new Set());
  const [fullyLoaded, setFullyLoaded] = useState<boolean>(false);
  const currentStyleRef = useRef<HTMLStyleElement | null>(null);

  // Helper to merge new icons with existing loaded icons
  const mergeLoadedIcons = useCallback((iconsToMerge: string[]) => {
    setLoadedIcons((prevLoaded) => {
      const newLoaded = new Set(prevLoaded);
      iconsToMerge.forEach((icon) => newLoaded.add(icon));
      return newLoaded;
    });
  }, []);

  // Helper to remove old stylesheet
  const removeOldStylesheet = useCallback((existing: Element | null) => {
    if (existing?.parentNode) {
      existing.parentNode.removeChild(existing);
    }
  }, []);

  const handleFontLoaded = useCallback(
    (existing: Element | null, iconsToMerge: string[]) => {
      mergeLoadedIcons(iconsToMerge);
      removeOldStylesheet(existing);

      // In noSubsetting mode, mark all icons as loaded after first load
      if (noSubsetting) {
        setFullyLoaded(true);
      }
    },
    [mergeLoadedIcons, removeOldStylesheet, noSubsetting],
  );

  const handleFontError = useCallback(
    (iconsToMerge: string[]) => {
      // Fallback: assume loaded after timeout
      setTimeout(() => {
        mergeLoadedIcons(iconsToMerge);
      }, 3000);
    },
    [mergeLoadedIcons],
  );

  const checkFontReady = useCallback(
    (existing: Element | null, iconsToMerge: string[]) => {
      // Use Font Loading API to detect when fonts are ready
      if ('fonts' in document) {
        const fontPromise = document.fonts.check(`24px "${fontFamily}"`)
          ? Promise.resolve()
          : document.fonts.load(`24px "${fontFamily}"`).catch(() => {
              // Ignore font loading errors
            });

        fontPromise
          .then(() => handleFontLoaded(existing, iconsToMerge))
          .catch(() => handleFontError(iconsToMerge));
      } else {
        // Fallback for browsers without Font Loading API
        setTimeout(() => mergeLoadedIcons(iconsToMerge), 1000);
      }
    },
    [fontFamily, handleFontLoaded, handleFontError, mergeLoadedIcons],
  );

  // Cleanup on unmount only
  useEffect(() => {
    return () => {
      if (currentStyleRef.current?.parentNode) {
        currentStyleRef.current.parentNode.removeChild(currentStyleRef.current);
      }
    };
  }, []);

  // Load fonts dynamically based on usage
  useEffect(() => {
    if (disabled) {
      return;
    }

    const iconsArray = Array.from(icons);
    iconsArray.sort((a, b) => a.localeCompare(b));
    const url = buildUrl(iconsArray);
    const existing = document.querySelector(`style[data-${dataAttribute}]`);

    // Check if we already have this exact URL loaded
    const existingUrl = existing?.getAttribute('data-url');
    if (existingUrl === url) {
      // Already loaded - in noSubsetting mode, ensure fullyLoaded is set
      if (noSubsetting) {
        setFullyLoaded(true);
      }
      return;
    }

    // Fetch the CSS content and insert it into a style tag
    // This allows us to know when the CSS has loaded and properly wait for fonts
    const loadFontCSS = async () => {
      try {
        const response = await fetch(url);
        const cssContent = await response.text();
        const layeredCSS = `@layer reset { ${cssContent} }`;

        // Create new style element with CSS in reset layer
        // This ensures Panda CSS utilities can override Material Symbols defaults
        const style = document.createElement('style');
        style.textContent = layeredCSS;
        style.setAttribute(`data-${dataAttribute}`, 'true');
        style.setAttribute('data-url', url);

        document.head.appendChild(style);

        // Track the current style for cleanup on unmount
        currentStyleRef.current = style;

        // Now that CSS is inserted, check when fonts are actually ready
        checkFontReady(existing, iconsArray);
      } catch {
        // On fetch error, fall back to assuming loaded after timeout
        handleFontError(iconsArray);
      }
    };

    void loadFontCSS();
  }, [
    icons,
    buildUrl,
    dataAttribute,
    disabled,
    checkFontReady,
    handleFontError,
  ]);

  return {
    /**
     * Set of icons that have been loaded and are ready to use
     */
    loadedIcons,

    /**
     * Check if a specific icon has been loaded
     * In noSubsetting mode, returns true if fullyLoaded
     * In subsetting mode, only returns true for individually loaded icons
     */
    isIconLoaded: (name: string) =>
      noSubsetting ? fullyLoaded : loadedIcons.has(name),
  };
};
