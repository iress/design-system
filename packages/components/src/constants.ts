import type { BreakpointDetail } from './interfaces';

/**
 * Breakpoints are the points at which the layout of a page will change in response to the size of the viewport.
 */
export const BREAKPOINT_DETAILS = {
  /**
   * Extra small breakpoint, for mobile devices
   */
  xs: {
    mediaQuery: '(min-width: 0) and (max-width: 575px)',
    screenWidthRange: '0 - 575px',
    margin: 'spacing.4',
    maxColumns: 4,
    minScreenWidth: '0px',
    maxScreenWidth: '575px',
    containerMaxWidth: '100%',
    viewportWidth: 360,
  },
  /**
   * Small breakpoint, for larger mobile devices and tablets
   */
  sm: {
    mediaQuery: '(min-width: 576px) and (max-width: 767px)',
    screenWidthRange: '576px - 767px',
    margin: 'spacing.4',
    minScreenWidth: '576px',
    maxScreenWidth: '767px',
    containerMaxWidth: '100%',
    viewportWidth: 767,
  },
  /**
   * Medium breakpoint for tablets and small desktops
   */
  md: {
    mediaQuery: '(min-width: 768px) and (max-width: 1023px)',
    screenWidthRange: '768px - 1023px',
    margin: 'spacing.6',
    maxColumns: 4,
    minScreenWidth: '768px',
    maxScreenWidth: '1023px',
    containerMaxWidth: '100%',
    viewportWidth: 1022,
  },

  /**
   * Large breakpoint for desktops
   */
  lg: {
    mediaQuery: '(min-width: 1024px) and (max-width: 1279px)',
    screenWidthRange: '1024px - 1279px',
    margin: 'spacing.6',
    maxColumns: 6,
    minScreenWidth: '1024px',
    maxScreenWidth: '1279px',
    containerMaxWidth: '100%',
    viewportWidth: 1278,
  },

  /**
   * Extra large breakpoint for large desktops
   */
  xl: {
    mediaQuery: '(min-width: 1280px) and (max-width: 1599px)',
    screenWidthRange: '1280px - 1599px',
    margin: 'spacing.8',
    minScreenWidth: '1280px',
    maxScreenWidth: '1599px',
    containerMaxWidth: '1440px',
    viewportWidth: 1440 + 64,
  },

  /**
   * Extra extra large breakpoint for extra large desktops (32inch)
   */
  xxl: {
    mediaQuery: '(min-width: 1600px)',
    margin: 'spacing.8',
    screenWidthRange: '1600px and above',
    minScreenWidth: '1600px',
    containerMaxWidth: '1690px',
    viewportWidth: 1690 + 64,
  },
} satisfies Record<string, BreakpointDetail>;

/**
 * The breakpoints used in the design system.
 */
export const BREAKPOINTS = Object.keys(
  BREAKPOINT_DETAILS,
) as (keyof typeof BREAKPOINT_DETAILS)[];

/**
 * A CSS selector string that matches all focusable elements.
 */
export const FOCUSABLE_QUERY_SELECTOR =
  'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * The widths available for form elements.
 */
export const FORM_ELEMENT_WIDTHS = [
  '2',
  '4',
  '6',
  '8',
  '10',
  '12',
  '16',
  '25%',
  '50%',
  '75%',
  '100%',
] as const;

/**
 * The grid size is the base unit of the grid system.
 */
export const GRID_SIZE = 12;

/**
 * The horizontal alignment options.
 */
export const HORIZONTAL_ALIGNS = [
  'around',
  'between',
  'center',
  'evenly',
  'left',
  'right',
  'stretch',
] as const;

/**
 * The statuses available for various components.
 */
export const STATUSES = ['danger', 'info', 'success', 'warning'] as const;

/**
 * The text alignment options.
 */
export const TEXT_ALIGNS = [
  'inherit',
  'left',
  'center',
  'right',
  'justify',
] as const;

/**
 * The vertical alignment options.
 */
export const VERTICAL_ALIGNS = ['top', 'middle', 'bottom', 'stretch'] as const;

/**
 * The z-index determines the stacking order of elements. Elements with a higher z-index always sit in front of elements with a lower z-index.
 */
export const Z_INDEX = {
  /**
   * The default z-index used for most elements.
   */
  DEFAULT: 0,

  /**
   * Used for IressNavbar.
   */
  NAVBAR: 100,

  /**
   * Used for IressPopover.
   */
  POPOVER: 200,

  /**
   * Used for IressSlideout.
   */
  SLIDEOUT: 300,

  /**
   * Used for IressModal.
   */
  MODAL: 400,

  /**
   * Used for IressToast.
   */
  TOAST: 500,

  /**
   * Used for IressTooltip.
   */
  TOOLTIP: 600,
};
