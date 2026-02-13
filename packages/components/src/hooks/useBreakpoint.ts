import { BREAKPOINT_DETAILS, BREAKPOINTS } from '@/constants';
import { type BreakpointDetail } from '@/interfaces';
import { type Breakpoints } from '@/types';
import { useCallback, useLayoutEffect, useState } from 'react';

interface BreakpointResult {
  breakpoint: Breakpoints;
  detail: BreakpointDetail;
}

interface UseBreakpointOptions {
  /**
   * Disables the hook from running any side effects.
   * When disabled, the hook returns the initial breakpoint without listening to resize events.
   * @default false
   */
  disabled?: boolean;
}

const getCurrentBreakpoint = () =>
  BREAKPOINTS.find((breakpoint) => {
    return window.matchMedia(BREAKPOINT_DETAILS[breakpoint].mediaQuery)
      ?.matches;
  }) ?? BREAKPOINTS[0];

/**
 * Retrieve the current breakpoint and its detail based on the window size
 */
export const useBreakpoint = (
  options: UseBreakpointOptions = {},
): BreakpointResult => {
  const { disabled = false } = options;
  const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint());

  const updateBreakpoint = useCallback(() => {
    setBreakpoint(getCurrentBreakpoint());
  }, []);

  useLayoutEffect(() => {
    if (disabled) return;

    const callback = updateBreakpoint;
    window.addEventListener('resize', callback);
    callback();
    return () => window.removeEventListener('resize', callback);
  }, [disabled, updateBreakpoint]);

  return {
    breakpoint,
    detail: BREAKPOINT_DETAILS[breakpoint],
  };
};
