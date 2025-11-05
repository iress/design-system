import { type MutableRefObject, useEffect, useState } from 'react';
import { useHash } from './useHash';
import { useTocbotClick } from './useTocbotClick';

/**
 * This hook determines if the current heading is active. It listens for hash changes and tocbot clicks, and compares the current heading's id to the hash.
 * @param heading A mutable ref to the heading element
 * @returns {boolean} Whether the heading is active
 */
export const useIsActiveHeading = (
  heading: MutableRefObject<HTMLDivElement | null>,
) => {
  const [hash] = useHash();
  const tocbotClick = useTocbotClick();
  const [active, setActive] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const headingId = heading.current?.querySelector('[id]')?.id ?? '';
      setActive(!!(headingId && hash === `#${headingId}`));
    });
  }, [hash, heading, tocbotClick]);

  return active;
};
