import { BREAKPOINT_DETAILS, BREAKPOINTS } from '@/constants';
import { type BreakpointDetail } from '@/constants';
import { type Breakpoints } from '@/types';
import { useSyncExternalStore } from 'react';

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

const getSnapshot = (): Breakpoints =>
  BREAKPOINTS.find((breakpoint) => {
    return window.matchMedia(BREAKPOINT_DETAILS[breakpoint].mediaQuery)
      ?.matches;
  }) ?? BREAKPOINTS[0];

const getServerSnapshot = (): Breakpoints => BREAKPOINTS[0];

const subscribe = (callback: () => void): (() => void) => {
  const mediaQueryLists = BREAKPOINTS.map((bp) =>
    window.matchMedia(BREAKPOINT_DETAILS[bp].mediaQuery),
  );
  mediaQueryLists.forEach((mql) => mql.addEventListener('change', callback));
  return () =>
    mediaQueryLists.forEach((mql) =>
      mql.removeEventListener('change', callback),
    );
};

/**
 * Retrieve the current breakpoint and its detail based on the window size
 */
export const useBreakpoint = (
  options: UseBreakpointOptions = {},
): BreakpointResult => {
  const { disabled = false } = options;

  const noop = () => {
    // no-op: when disabled, no subscription is needed
  };

  const breakpoint = useSyncExternalStore(
    disabled ? () => noop : subscribe,
    disabled ? () => getSnapshot() : getSnapshot,
    getServerSnapshot,
  );

  return {
    breakpoint,
    detail: BREAKPOINT_DETAILS[breakpoint],
  };
};
