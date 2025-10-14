import {
  BREAKPOINTS,
  DISPLAY_MODES,
  FLOATING_UI_ALIGNS,
  FORM_ELEMENT_WIDTHS,
  GUTTER_SIZES,
  HEADING_LEVELS,
  HORIZONTAL_ALIGNS,
  LOGGER_LEVELS,
  PADDING_SIZES,
  SYSTEM_VALIDATION_STATUSES,
  TEXT_ALIGNS,
  TEXT_MODES,
  TEXT_VARIANTS,
  VERTICAL_ALIGNS,
} from '@/constants';
import {
  IressCSSProps,
  IressTestProps,
  VariablePaddingSize,
} from './interfaces';
import { PaddingSize } from './enums';
import { SpacingToken } from '@/styled-system/tokens';

export type Breakpoints = (typeof BREAKPOINTS)[number];

export type DisplayModes = (typeof DISPLAY_MODES)[number];

export type FloatingUIContainer =
  | HTMLElement
  | null
  | React.MutableRefObject<HTMLElement | null>;

export type FloatingUIAligns = (typeof FLOATING_UI_ALIGNS)[number];

export type FormControlValue = string | number | boolean | null;

export type FormElementWidths = (typeof FORM_ELEMENT_WIDTHS)[number];

export type GutterSizes = (typeof GUTTER_SIZES)[number];

export type HeadingLevels = (typeof HEADING_LEVELS)[number];

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

export type LoggerLevelsUnion = (typeof LOGGER_LEVELS)[number];

export type MixedPaddingSize =
  | VariablePaddingSize
  | PaddingSize
  | PaddingSizes
  | SpacingToken;

export type PaddingSizes = (typeof PADDING_SIZES)[number];

export type ResponsiveProp<T> = T | Partial<Record<Breakpoints | 'base', T>>;

export type SystemValidationStatuses =
  (typeof SYSTEM_VALIDATION_STATUSES)[number];

export type TextAligns = (typeof TEXT_ALIGNS)[number];

export type TextModes = (typeof TEXT_MODES)[number] | 'body';

export type TextVariants = (typeof TEXT_VARIANTS)[number];

export type VerticalAligns = (typeof VERTICAL_ALIGNS)[number];
