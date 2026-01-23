import { createPortal } from 'react-dom';
import type { ShadowContainer } from '@/types';
import type { IressTestProps } from '@/interfaces';

export interface FontLoaderProps extends IressTestProps {
  /**
   * Optional container to inject the font styles into.
   * Can be a ShadowRoot, HTMLElement, or a ref to either.
   * Note: Font is always injected into document head as well.
   */
  container?: ShadowContainer;

  /**
   * Unique key prefix for the portal keys
   */
  keyPrefix: string;

  /**
   * Only load into the shadow container, not the head
   * Used when the font is already loaded in the head in a different method (eg. subsetting)
   */
  onlyShadow?: boolean;

  /**
   * The URL of the font stylesheet to load
   */
  url: string;
}

/**
 * Shared component for injecting font stylesheets into document head and optional shadow container.
 * This component uses React's createPortal to ensure the font styles are added where required.
 *
 * Uses <style> tags with @import to support CSS layers, which has lower priority
 * than Panda CSS utilities. This allows Panda CSS styling props to override the default font styles.
 */
export const FontLoader = ({
  container,
  keyPrefix,
  onlyShadow,
  url,
}: FontLoaderProps) => {
  // Only inject in browser environment
  if (typeof document === 'undefined') {
    return null;
  }

  // Determine the target container
  let target: HTMLElement | ShadowRoot | null = null;

  if (container) {
    // Handle ref objects
    if ('current' in container) {
      target = container.current;
    } else {
      target = container;
    }
  }

  const styleContent = `@import url("${url}") layer(reset);`;

  return (
    <>
      {!onlyShadow &&
        createPortal(
          <style data-url={url}>{styleContent}</style>,
          document.head,
          `${keyPrefix}-head`,
        )}
      {target &&
        createPortal(
          <style data-url={url}>{styleContent}</style>,
          target,
          `${keyPrefix}-shadow`,
        )}
    </>
  );
};
