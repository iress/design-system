import { useMemo } from 'react';
import { type ResponsiveProps } from '@/types';
import { useBreakpoint } from './useBreakpoint';
import { BREAKPOINTS } from '@/constants';

/**
 * Allows you to pluck a value from a an object with breakpoint keys.
 * Note: Where possible, we recommend using media queries in CSS instead of JS, as that will reduce the load for the user. However, sometimes it's necessary to change a prop based on the user's breakpoint, hence why this hook is provided.
 * @param {ResponsiveProps<T>} values A set of values, separated by breakpoint and ready for plucking.
 * @param {boolean} inheritPrevious Whether to inherit the previous breakpoint value, if none was found for the current one.
 * @returns { breakpoint: Breakpoints; value?: T | null } The current user's breakpoint, along with a matching value if one was found.
 */
export const useResponsiveProps = <T>(
  props?: ResponsiveProps<T>,
  inheritPrevious = true,
) => {
  const { breakpoint } = useBreakpoint();

  const value = useMemo(() => {
    // If no props are provided, return undefined and don't waste time
    if (!props) {
      return undefined;
    }

    // If the current breakpoint has a value, return it
    if (props[breakpoint]) {
      return props[breakpoint];
    }

    // If inheritPrevious is true, check the previous breakpoints for a value
    if (inheritPrevious) {
      const index = BREAKPOINTS.indexOf(breakpoint);
      for (let i = index; i >= 0; i--) {
        if (props[BREAKPOINTS[i]]) {
          return props[BREAKPOINTS[i]];
        }
      }
    }

    // If no value was found, return undefined
    return undefined;
  }, [breakpoint, inheritPrevious, props]);

  return {
    breakpoint,
    value,
  };
};

/**
 * @deprecated Use useResponsiveProps instead
 */
export const useResponsiveValue = useResponsiveProps;
