import { version as IDS_VERSION } from '../package.json';
import { type BreakpointDetail } from './interfaces';

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
    minScreenWidth: '768px',
    maxScreenWidth: '1023px',
    containerMaxWidth: '100%',
    viewportWidth: 962,
  },

  /**
   * Large breakpoint for desktops
   */
  lg: {
    mediaQuery: '(min-width: 1024px) and (max-width: 1199px)',
    screenWidthRange: '1024px - 1199px',
    minScreenWidth: '1024px',
    maxScreenWidth: '1199px',
    containerMaxWidth: '100%',
    viewportWidth: 1180,
  },

  /**
   * Extra large breakpoint for large desktops
   */
  xl: {
    mediaQuery: '(min-width: 1200px) and (max-width: 1499px)',
    screenWidthRange: '1200px - 1499px',
    minScreenWidth: '1200px',
    maxScreenWidth: '1499px',
    containerMaxWidth: '1280px',
    viewportWidth: 1366,
  },

  /**
   * Extra extra large breakpoint for extra large desktops (32inch)
   */
  xxl: {
    mediaQuery: '(min-width: 1500px)',
    screenWidthRange: '1500px and above',
    minScreenWidth: '1500px',
    containerMaxWidth: '1280px',
    viewportWidth: 1920,
  },
} satisfies Record<string, BreakpointDetail>;

export const BREAKPOINTS = Object.keys(
  BREAKPOINT_DETAILS,
) as (keyof typeof BREAKPOINT_DETAILS)[];

export const CSS_IDS_VERSION = `v${IDS_VERSION.replace(/\./g, '')}`;

export const DISPLAY_MODES = ['inline', 'overlay'] as const;

export const FLOATING_UI_ALIGNS = [
  'auto',
  'bottom-start',
  'bottom',
  'bottom-end',
  'top-start',
  'top',
  'top-end',
  'left-start',
  'left',
  'left-end',
  'right-start',
  'right',
  'right-end',
] as const;

export const FOCUSABLE_QUERY_SELECTOR =
  'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const FORM_ELEMENT_WIDTHS = [
  '2',
  '4',
  '6',
  '8',
  '10',
  '12',
  '16',
  '25perc',
  '50perc',
  '75perc',
  '100perc',
] as const;

/**
 * The grid size is the base unit of the grid system.
 */
export const GRID_SIZE = 12;

export const GUTTER_SIZES = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

export const HEADING_LEVELS = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;

export const HORIZONTAL_ALIGNS = [
  'around',
  'between',
  'center',
  'evenly',
  'left',
  'right',
] as const;

export const LOGGER_LEVELS = ['log', 'warn', 'error'] as const;

export const PADDING_SIZES = ['none', 'sm', 'md', 'lg'] as const;

export const SYSTEM_VALIDATION_STATUSES = [
  'danger',
  'info',
  'success',
  'warning',
] as const;

export const TEXT_ALIGNS = [
  'inherit',
  'left',
  'center',
  'right',
  'justify',
] as const;

export const TEXT_MODES = [
  'danger',
  'info',
  'muted',
  'primary',
  'success',
  'warning',
  'positive',
  'negative',
] as const;

export const TEXT_VARIANTS = [
  'blockquote',
  'body',
  'bold',
  'code',
  'display',
  'display1',
  'display2',
  'display3',
  'display4',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'italic',
  'lead',
  'small',
  'cite',
  'caption',
] as const;

export const VERTICAL_ALIGNS = ['top', 'middle', 'bottom', 'stretch'] as const;

/**
 * The z-index determines the stacking order of elements. Elements with a higher z-index always sit in front of elements with a lower z-index. Each index has been mapped to the appropriate elevation(s).
 */
export const Z_INDEX = {
  /**
   * The default z-index used for most elements. Can be combined with raised and floating elevations.
   */
  DEFAULT: 0,

  /**
   * Used for IressNavbar. Can be combined with overflow elevation.
   */
  NAVBAR: 100,

  /**
   * Used for IressPopover. Can be combined with floating elevation.
   */
  POPOVER: 200,

  /**
   * Used for IressSlideout. Can be combined with floating elevation.
   */
  SLIDEOUT: 300,

  /**
   * Used for IressModal. Can be combined with floating elevation.
   */
  MODAL: 400,

  /**
   * Used for IressToast. Can be combined with floating elevation.
   */
  TOAST: 500,

  /**
   * Used for IressTooltip. Can be combined with floating elevation.
   */
  TOOLTIP: 600,
};
