import {
  type BREAKPOINTS,
  type DISPLAY_MODES,
  type FLOATING_UI_ALIGNS,
  type FORM_ELEMENT_WIDTHS,
  type GUTTER_SIZES,
  type HEADING_LEVELS,
  type HORIZONTAL_ALIGNS,
  type LOGGER_LEVELS,
  type PADDING_SIZES,
  type SYSTEM_VALIDATION_STATUSES,
  type TEXT_ALIGNS,
  type TEXT_MODES,
  type TEXT_VARIANTS,
  type VERTICAL_ALIGNS,
} from '@/constants';
import { type VariablePaddingSize } from './interfaces';
import { type PaddingSize } from './enums';

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

export type LoggerLevelsUnion = (typeof LOGGER_LEVELS)[number];

export type MixedPaddingSize = VariablePaddingSize | PaddingSize | PaddingSizes;

export type PaddingSizes = (typeof PADDING_SIZES)[number];

export type ResponsiveProps<T> = Partial<Record<Breakpoints, T>>;

export type SystemValidationStatuses =
  (typeof SYSTEM_VALIDATION_STATUSES)[number];

export type TextAligns = (typeof TEXT_ALIGNS)[number];

export type TextModes = (typeof TEXT_MODES)[number] | 'body';

export type TextVariants = (typeof TEXT_VARIANTS)[number];

export type VerticalAligns = (typeof VERTICAL_ALIGNS)[number];
