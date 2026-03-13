import { useState, useEffect, useCallback, useRef } from 'react';
import { getNonce } from '@helpers/dom/getNonce';
import { idsLogger } from '@helpers/utility/idsLogger';

export interface UseDynamicFontSubsettingOptions {
  /**
   * Set of icon names to load
   */
  icons: Set<string>;

  /**
   * Function to build the font URL from an array of icon names
   * Should return false if the URL cannot be built (e.g. invalid icon names), in which case no font will be loaded
   */
  buildUrl: (icons: string[]) => string | false;

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
 * Uses <link rel="stylesheet"> to load the font CSS (CSP-safe for external stylesheets).
 * The provider's CSS class (e.g. .material-symbols-rounded) is NOT applied to icon elements —
 * Panda CSS utility classes handle all icon styling, so the class is harmless even though
 * Google injects it alongside the @font-face declarations.
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
  const currentLinkRef = useRef<HTMLLinkElement | null>(null);

  const mergeLoadedIcons = useCallback((iconsToMerge: string[]) => {
    setLoadedIcons((prevLoaded) => {
      const newLoaded = new Set(prevLoaded);
      iconsToMerge.forEach((icon) => newLoaded.add(icon));
      return newLoaded;
    });
  }, []);

  const removeOldStylesheet = useCallback((existing: Element | null) => {
    existing?.parentNode?.removeChild(existing);
  }, []);

  const handleFontLoaded = useCallback(
    (existing: Element | null, iconsToMerge: string[]) => {
      mergeLoadedIcons(iconsToMerge);
      removeOldStylesheet(existing);
      if (noSubsetting) {
        setFullyLoaded(true);
      }
    },
    [mergeLoadedIcons, removeOldStylesheet, noSubsetting],
  );

  const handleFontError = useCallback(
    (iconsToMerge: string[]) => {
      idsLogger(
        `[useDynamicFontSubsetting] Failed to load font "${fontFamily}" for icons: ${iconsToMerge.join(', ')}. Icons will render as text after timeout.`,
      );
      setTimeout(() => {
        mergeLoadedIcons(iconsToMerge);
      }, 3000);
    },
    [mergeLoadedIcons, fontFamily],
  );

  const checkFontReady = useCallback(
    (existing: Element | null, iconsToMerge: string[]) => {
      if ('fonts' in document) {
        const fontPromise = document.fonts.check(`24px "${fontFamily}"`)
          ? Promise.resolve()
          : document.fonts.load(`24px "${fontFamily}"`);

        fontPromise
          .then(() => handleFontLoaded(existing, iconsToMerge))
          .catch(() => handleFontError(iconsToMerge));
      } else {
        setTimeout(() => mergeLoadedIcons(iconsToMerge), 1000);
      }
    },
    [fontFamily, handleFontLoaded, handleFontError, mergeLoadedIcons],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      currentLinkRef.current?.parentNode?.removeChild(currentLinkRef.current);
    };
  }, []);

  // Load fonts dynamically based on usage
  useEffect(() => {
    if (disabled) return;

    const iconsArray = Array.from(icons);
    iconsArray.sort((a, b) => a.localeCompare(b));
    const url = buildUrl(iconsArray);
    const existing = document.querySelector(`link[data-${dataAttribute}]`);

    if (url === false) {
      if (noSubsetting) setFullyLoaded(true);
      return;
    }

    if (existing?.getAttribute('data-url') === url) {
      // Reuse existing stylesheet link: only check font readiness if there are new unloaded icons
      const hasNewIcons = iconsArray.some((icon) => !loadedIcons.has(icon));
      if (hasNewIcons) {
        checkFontReady(null, iconsArray);
      }
      return;
    }
    const nonce = getNonce();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    if (nonce) link.nonce = nonce;
    link.setAttribute(`data-${dataAttribute}`, 'true');
    link.setAttribute('data-url', url);

    link.addEventListener('load', () => checkFontReady(existing, iconsArray));
    link.addEventListener('error', () => handleFontError(iconsArray));

    document.head.appendChild(link);
    currentLinkRef.current = link;
  }, [
    icons,
    buildUrl,
    dataAttribute,
    disabled,
    checkFontReady,
    handleFontError,
    noSubsetting,

  ]);

  return {
    loadedIcons,
    isIconLoaded: (name: string) =>
      noSubsetting ? fullyLoaded : loadedIcons.has(name),
  };
};
