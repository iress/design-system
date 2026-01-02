import { BREAKPOINTS } from '@/constants';
import type { ResponsiveProp } from '@/types';

export const normaliseHideValues = (values: ResponsiveProp<boolean> = {}) => {
  if (typeof values === 'boolean') {
    return Object.fromEntries(
      BREAKPOINTS.map((breakpoint) => [breakpoint, values]),
    );
  }

  return BREAKPOINTS.reduce<Record<string, boolean>>(
    (hideValues, breakpoint, index) => {
      // If value is undefined, use previous value
      hideValues[breakpoint] =
        values[breakpoint] ?? hideValues[BREAKPOINTS[index - 1]] ?? false;
      return hideValues;
    },
    {},
  );
};
