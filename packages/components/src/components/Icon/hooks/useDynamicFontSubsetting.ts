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
 * Computes the union of icon names across all active hook instances.
 *
 * Multiple IressIconProvider instances on the same page (e.g. in MFE scenarios) all share the
 * same font-family name. Firefox (unlike Chrome) uses the last-defined @font-face declaration
 * when multiple rules exist for the same family without unicode-range, so any new link that
 * only contains its own subset will shadow every other provider's icons, causing them to render
 * as text. Each instance stores only its own icon names in `data-icons`. When creating a new
 * link, this instance reads every other provider's `data-icons` and builds a URL that is the
 * superset of all active icon sets. Since links are always appended to the end of <head>, the
 * newest link is last in document order and takes precedence in the CSS cascade — ensuring all
 * icons remain visible.
 */
const computeUnionIcons = (
  iconsArray: string[],
  dataAttribute: string,
  ownLink: HTMLLinkElement | null,
): string[] => {
  const otherIcons = Array.from(
    document.querySelectorAll<HTMLLinkElement>(`link[data-${dataAttribute}]`),
  )
    .filter((link) => link !== ownLink)
    .flatMap((link) => {
      const raw = link.getAttribute('data-icons');
      return raw ? raw.split(',').filter(Boolean) : [];
    });

  if (otherIcons.length === 0) return iconsArray;
  const merged = Array.from(new Set([...iconsArray, ...otherIcons]));
  merged.sort((a, b) => a.localeCompare(b));
  return merged;
};

// Monotonically increasing counter used to assign a stable unique ID to each hook instance.
// Avoids Math.random() and is sufficient since IDs only need to be unique within a page session.
let instanceCounter = 0;

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

  // Stable unique identifier for this hook instance. Used as the value of the
  // `data-${dataAttribute}` attribute so each provider owns its own link element
  // and never accidentally modifies another provider's link.
  const instanceIdRef = useRef(String(++instanceCounter));

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

  // Cleanup on unmount — only removes THIS instance's link, leaving other providers intact.
  useEffect(() => {
    return () => {
      currentLinkRef.current?.parentNode?.removeChild(currentLinkRef.current);
    };
  }, []);

  // Load fonts dynamically based on usage
  useEffect(() => {
    if (disabled) return;

    const instanceId = instanceIdRef.current;
    const iconsArray = Array.from(icons);
    iconsArray.sort((a, b) => a.localeCompare(b));

    // Find THIS instance's own link element (identified by instanceId as attribute value).
    const ownLink = document.querySelector<HTMLLinkElement>(
      `link[data-${dataAttribute}="${instanceId}"]`,
    );

    // Build a URL covering own icons plus every other active provider's icons (union).
    const mergedIconsArray = noSubsetting
      ? iconsArray
      : computeUnionIcons(iconsArray, dataAttribute, ownLink);

    const url = buildUrl(mergedIconsArray);

    if (url === false) {
      if (noSubsetting) setFullyLoaded(true);
      return;
    }

    if (ownLink?.getAttribute('data-url') === url) {
      // Own link already serves the current union URL — only re-check readiness for new icons.
      if (noSubsetting && !fullyLoaded) {
        checkFontReady(null, iconsArray);
      } else {
        const hasNewIcons = iconsArray.some((icon) => !loadedIcons.has(icon));
        if (hasNewIcons) {
          checkFontReady(null, iconsArray);
        }
      }
      return;
    }

    const nonce = getNonce();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    if (nonce) link.nonce = nonce;
    // Use instanceId as the attribute value so each provider uniquely identifies its own link.
    // `link[data-${dataAttribute}]`          → finds ALL providers' links (for union computation)
    // `link[data-${dataAttribute}="${id}"]`  → finds only THIS provider's link
    link.setAttribute(`data-${dataAttribute}`, instanceId);
    link.setAttribute('data-url', url);
    // Store only this instance's own icons so other providers can read each provider's
    // contribution separately when computing the union URL.
    if (!noSubsetting) {
      link.setAttribute('data-icons', iconsArray.join(','));
    }

    // On load, remove only THIS instance's previous link. Never remove other providers'
    // links — each instance is solely responsible for its own link's lifecycle.
    link.addEventListener('load', () => checkFontReady(ownLink, iconsArray));
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
    fullyLoaded,
    loadedIcons,
  ]);

  return {
    loadedIcons,
    isIconLoaded: (name: string) =>
      noSubsetting ? fullyLoaded : loadedIcons.has(name),
  };
};
