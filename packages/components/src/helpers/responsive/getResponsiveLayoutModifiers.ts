import { ResponsiveSizing } from '@/interfaces';

export const getResponsiveLayoutModifiers = <T = string>(
  modifier: string,
  values?: ResponsiveSizing<T> | T,
  fallback?: T,
): string[] => {
  if (!values && typeof fallback === 'string') {
    return fallback ? [`${modifier}--${fallback}`] : [];
  }

  // No breakpoints passed in, so just use the value directly
  if (typeof values === 'string' || typeof values === 'number') {
    return [`${modifier}--${values}`];
  }

  // Breakpoints passed in, so use the key as the breakpoint and the value as the modifier
  const modifierBreakpoints = values
    ? Object.keys(values).map((breakpoint) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `${modifier}-${breakpoint}--${values[breakpoint as never]}`;
      })
    : [];

  if (typeof fallback === 'string' && !values?.['xs' as never]) {
    return [`${modifier}-xs--${fallback}`, ...modifierBreakpoints];
  }

  return modifierBreakpoints;
};
