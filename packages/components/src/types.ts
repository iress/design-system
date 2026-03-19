import type {
  BREAKPOINTS,
  FORM_ELEMENT_WIDTHS,
  HORIZONTAL_ALIGNS,
  STATUSES,
  VERTICAL_ALIGNS,
} from '@/constants';
import type { IressCSSProps, IressTestProps } from './interfaces';
import type {
  SpacingToken as PureSpacingToken,
  SizeToken as PureSizeToken,
} from '@/styled-system/tokens';
import type { Placement } from '@floating-ui/react';
import type { RefObject } from 'react';

/**
 * The breakpoints available in the design system.
 */
export type Breakpoints = (typeof BREAKPOINTS)[number];

/**
 * The container element to render floating elements into.
 */
export type FloatingUIContainer =
  | HTMLElement
  | null
  | RefObject<HTMLElement | null>;

/**
 * The alignment options for floating elements.
 */
export type FloatingUIAligns = 'auto' | Placement;

/**
 * Allowed values for form control elements.
 */
export type FormControlValue = string | number | boolean | null;

/**
 * Shared readonly type for form controls.
 *
 * - `true`  — the field is readonly, generally informational.
 * - `'locked'` — the field is readonly because the user lacks edit
 *   permission. Form controls render the "locked" visual treatment.
 */
export type FormControlReadOnly = boolean | 'locked';

/**
 * Allowed widths for form elements.
 */
export type FormElementWidths = (typeof FORM_ELEMENT_WIDTHS)[number];

/**
 * The horizontal alignment options.
 */
export type HorizontalAligns = (typeof HORIZONTAL_ALIGNS)[number];

/**
 * Components created internally that are not exposed to consumers use this interface.
 * In some cases a public component may use this interface if it has no reason to be styled.
 */
export type IressUnstyledProps<
  T extends keyof React.JSX.IntrinsicElements = 'div',
> = Omit<
  React.JSX.IntrinsicElements[T],
  keyof IressCSSProps | 'translate' | 'height' | 'ref'
> &
  IressTestProps;

/**
 * Components that are exposed for consumers normally use this interface, allowing them to be customised in a type-safe way.
 */
export type IressStyledProps<
  T extends keyof React.JSX.IntrinsicElements = 'div',
> = IressUnstyledProps<T> & IressCSSProps;

/**
 * A spacing token that is guaranteed to be positive, and can be used for properties that do not accept negative values (eg. padding).
 */
export type PositiveSpacingToken = Exclude<
  PureSpacingToken,
  `-${string}` | `button.${string}` | `field.${string}` | `slider.${string}`
>;

/**
 * Responsive prop type that allows a single value or an object specifying values per breakpoint.
 */
export type ResponsiveProp<T> = T | Partial<Record<Breakpoints | 'base', T>>;

/**
 * A container that can be used for injecting stylesheets.
 */
export type ShadowContainer =
  | ShadowRoot
  | HTMLElement
  | RefObject<ShadowRoot | HTMLElement | null>
  | null;

/**
 * All available size tokens in the design system.
 */
export type SizeToken = Exclude<
  PureSizeToken,
  | `breakpoint-${string}`
  | `chevron.${string}`
  | `progress.${string}`
  | `slider.${string}`
  | `toggle.${string}`
  | `menu.${string}`
  | `pill.${string}`
  | `mark.${string}`
  | `icon.${string}`
  | `spinner.${string}`
  | `tab.${string}`
>;

/**
 * A spacing token that can be either positive or negative, used for properties that accept negative values (eg. margin).
 */
export type SpacingToken = Exclude<
  PureSpacingToken,
  | `button.${string}`
  | `field.${string}`
  | `slider.${string}`
  | `-button.${string}`
  | `-field.${string}`
  | `-slider.${string}`
>;

/**
 * The validation statuses used in feedback components.
 */
export type Statuses = (typeof STATUSES)[number];

/**
 * Vertical alignment options.
 */
export type VerticalAligns = (typeof VERTICAL_ALIGNS)[number];
