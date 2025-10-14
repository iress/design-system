import { type CSSProperties } from 'react';

export const composePopoverWidth = (
  width?: string,
  matchActivatorWidth = false,
): CSSProperties => {
  if (matchActivatorWidth) {
    return { maxWidth: 'none' };
  }

  return width ? { maxWidth: width, width: '100%' } : {};
};
