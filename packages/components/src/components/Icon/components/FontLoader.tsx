import { createPortal } from 'react-dom';
import type { ShadowContainer } from '@/types';
import type { IressTestProps } from '@/interfaces';
import { getNonce } from '@helpers/dom/getNonce';

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
 * Uses <link rel="stylesheet"> tags, which are CSP-safe without requiring a nonce.
 * If a CSP nonce is available, it will be applied to the injected <link> elements.
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

  const nonce = getNonce() ?? undefined;

  return (
    <>
      {!onlyShadow &&
        createPortal(
          <link rel="stylesheet" href={url} nonce={nonce} data-url={url} />,
          document.head,
          `${keyPrefix}-head`,
        )}
      {target &&
        createPortal(
          <link rel="stylesheet" href={url} nonce={nonce} data-url={url} />,
          target,
          `${keyPrefix}-shadow`,
        )}
    </>
  );
};
