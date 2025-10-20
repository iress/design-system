import { BREAKPOINT_DETAILS } from '../../src/constants';

// Panda uses a mobile-first breakpoint system and leverages min-width media queries @media(min-width) when you write responsive styles.
export const breakpoints = {
  xs: BREAKPOINT_DETAILS.xs.minScreenWidth,
  sm: BREAKPOINT_DETAILS.sm.minScreenWidth,
  md: BREAKPOINT_DETAILS.md.minScreenWidth,
  lg: BREAKPOINT_DETAILS.lg.minScreenWidth,
  xl: BREAKPOINT_DETAILS.xl.minScreenWidth,
  xxl: BREAKPOINT_DETAILS.xxl.minScreenWidth,
};
