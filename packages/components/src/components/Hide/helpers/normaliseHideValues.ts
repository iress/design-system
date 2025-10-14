import { BREAKPOINTS } from '@/constants';
import { ResponsiveSizing } from '@/interfaces';

export const normaliseHideValues = (values: ResponsiveSizing<boolean> = {}) => {
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
