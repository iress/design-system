import { BREAKPOINT_DETAILS } from '../../src/constants';

// Panda uses a mobile-first breakpoint system and leverages min-width media queries @media(min-width) when you write responsive styles.
export const breakpoints = Object.fromEntries(
  Object.entries(BREAKPOINT_DETAILS).map(([breakpoint, detail]) => [
    breakpoint,
    detail.minScreenWidth,
  ]),
);
