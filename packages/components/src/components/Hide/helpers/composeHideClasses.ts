import { BREAKPOINTS, type Breakpoints, type ResponsiveSizing } from '@/main';
import { type HideCssClass } from '../Hide.types';

export const composeHideClasses = (
  modifier: HideCssClass,
  values: ResponsiveSizing<boolean> = {},
) => {
  const hideBreakpoints = normaliseHideValues(values);

  // filter out breakpoints that are not hidden, and then transform using modifier
  return Object.keys(hideBreakpoints)
    .filter((breakpoint) => !!hideBreakpoints[breakpoint as Breakpoints])
    .map((breakpoint) => `${modifier}--${breakpoint}`);
};

export const normaliseHideValues = (values: ResponsiveSizing<boolean> = {}) => {
  return BREAKPOINTS.reduce<ResponsiveSizing<boolean>>(
    (hideValues, breakpoint, index) => {
      // If value is undefined, use previous value
      hideValues[breakpoint] =
        values[breakpoint] ?? hideValues[BREAKPOINTS[index - 1]];
      return hideValues;
    },
    {},
  );
};
