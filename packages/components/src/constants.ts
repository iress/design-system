// Import shared constants from theme-preset (single source of truth at runtime).
// We use import + re-export (not `export { } from`) so that vite-plugin-dts
// emits self-contained declarations instead of a re-export pointing to the
// internal @theme-preset package which consumers cannot resolve.
import {
  BREAKPOINT_DETAILS as _BREAKPOINT_DETAILS,
  BREAKPOINTS as _BREAKPOINTS,
  FORM_ELEMENT_WIDTHS as _FORM_ELEMENT_WIDTHS,
  GRID_SIZE as _GRID_SIZE,
  HORIZONTAL_ALIGNS as _HORIZONTAL_ALIGNS,
  MATERIAL_SYMBOLS as _MATERIAL_SYMBOLS,
  TEXT_ALIGNS as _TEXT_ALIGNS,
  VERTICAL_ALIGNS as _VERTICAL_ALIGNS,
  Z_INDEX as _Z_INDEX,
  Z_INDEX_OFFSET_VAR as _Z_INDEX_OFFSET_VAR,
} from '@theme-preset/constants';

/** Details about a specific breakpoint in the design system. */
export interface BreakpointDetail {
  containerMaxWidth: string;
  margin?: string;
  maxColumns?: number;
  maxScreenWidth?: string;
  mediaQuery: string;
  minScreenWidth: string;
  screenWidthRange: string;
  viewportWidth: number;
}

export const BREAKPOINT_DETAILS = _BREAKPOINT_DETAILS;
export const BREAKPOINTS = _BREAKPOINTS;
export const FORM_ELEMENT_WIDTHS = _FORM_ELEMENT_WIDTHS;
export const GRID_SIZE = _GRID_SIZE;
export const HORIZONTAL_ALIGNS = _HORIZONTAL_ALIGNS;
export const MATERIAL_SYMBOLS = _MATERIAL_SYMBOLS;
export const TEXT_ALIGNS = _TEXT_ALIGNS;
export const VERTICAL_ALIGNS = _VERTICAL_ALIGNS;
export const Z_INDEX = _Z_INDEX;
export const Z_INDEX_OFFSET_VAR = _Z_INDEX_OFFSET_VAR;

/**
 * The CSS custom property name for the toaster position offset.
 * Set this to push the toaster away from the viewport edge (e.g. to clear a fixed navbar):
 *
 * @example
 * ```css
 * :root {
 *   --iress-toaster-offset: 60px;
 * }
 * ```
 */
export const TOASTER_OFFSET_VAR = '--iress-toaster-offset';

/**
 * A CSS selector string that matches all focusable elements.
 */
export const FOCUSABLE_QUERY_SELECTOR =
  'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * The statuses available for various components.
 */
export const STATUSES = ['danger', 'info', 'success', 'warning'] as const;
