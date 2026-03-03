import type { ComponentType } from 'react';

/**
 * Lazy module map for all generated icon components.
 *
 * Isolated in its own file so the ~7,600-entry glob map is emitted as a
 * separate chunk and does NOT inflate Icon.js. Both Storybook (dev) and
 * the library build (Rollup) can resolve these imports correctly.
 */
const iconModules = import.meta.glob<{ default: ComponentType }>(
  './generated/*.tsx',
);

export function loadIconModule(
  fileName: string,
): Promise<{ default: ComponentType }> | undefined {
  return iconModules[`./generated/${fileName}.tsx`]?.();
}
