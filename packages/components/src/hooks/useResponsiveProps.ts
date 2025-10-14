import { useMemo } from 'react';
import { Breakpoints, ResponsiveProp } from '@/types';
import { useBreakpoint } from './useBreakpoint';
import { BREAKPOINTS } from '@/constants';

/**
 * Allows you to pluck a value from an object with breakpoint keys.
 * Note: Where possible, we recommend using media queries in CSS instead of JS, as that will reduce the load for the user. However, sometimes it's necessary to change a prop based on the user's breakpoint, hence why this hook is provided.
 * @param {ResponsiveProp<T>} values A set of values, separated by breakpoint and ready for plucking.
 * @param {boolean} inheritPrevious Whether to inherit the previous breakpoint value, if none was found for the current one.
 * @returns { breakpoint: Breakpoints; value?: T | null } The current user's breakpoint, along with a matching value if one was found.
 */
export const useResponsiveProps = <T>(
  prop?: ResponsiveProp<T>,
  inheritPrevious = true,
): { breakpoint: Breakpoints; value?: T } => {
  const { breakpoint } = useBreakpoint();

  const value = useMemo(() => {
    // If no props are provided, return undefined and don't waste time
    if (!prop) {
      return undefined;
    }

    const isObject = typeof prop === 'object';

    // If the prop is not an object or doesn't have breakpoints, return it as is
    if (!isObject || !BREAKPOINTS.some((breakpoint) => breakpoint in prop)) {
      return prop as T;
    }

    const responsiveProp = prop as Record<string, T>;

    // If the current breakpoint has a value, return it
    if (breakpoint in prop) {
      return responsiveProp[breakpoint];
    }

    // If inheritPrevious is true, check the previous breakpoints for a value
    if (inheritPrevious) {
      const index = BREAKPOINTS.indexOf(breakpoint);
      for (let i = index; i >= 0; i--) {
        if (BREAKPOINTS[i] in prop) {
          return responsiveProp[BREAKPOINTS[i]];
        }
      }
    }

    // If a base value is provided, return that as the default
    if ('base' in prop) {
      return responsiveProp.base;
    }

    // if breakpoint is not found and inheritPrevious is false, return undefined
    return undefined;
  }, [breakpoint, inheritPrevious, prop]);

  return {
    breakpoint,
    value,
  };
};
