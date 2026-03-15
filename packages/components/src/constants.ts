// Re-export shared constants from theme-preset (single source of truth)
export {
  BREAKPOINT_DETAILS,
  BREAKPOINTS,
  FORM_ELEMENT_WIDTHS,
  GRID_SIZE,
  HORIZONTAL_ALIGNS,
  MATERIAL_SYMBOLS,
  TEXT_ALIGNS,
  VERTICAL_ALIGNS,
  Z_INDEX,
} from '@theme-preset/constants';

export type { BreakpointDetail } from '@theme-preset/constants';

/**
 * A CSS selector string that matches all focusable elements.
 */
export const FOCUSABLE_QUERY_SELECTOR =
  'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * The statuses available for various components.
 */
export const STATUSES = ['danger', 'info', 'success', 'warning'] as const;
