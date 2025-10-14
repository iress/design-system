import { type ReactNode } from 'react';
import { type SystemValidationStatus, type PaddingSize } from './enums';
import {
  type FormControlValue,
  type PaddingSizes,
  type SystemValidationStatuses,
} from './types';

export interface ValidationMessageObj {
  status?: SystemValidationStatus | SystemValidationStatuses;
  message: string;
  linkToTarget?: string;
  dataTestId?: string;
  prefix?: ReactNode;
  visiblePrefix?: boolean;
}

export type WithDataAttributes<T = NonNullable<unknown>> = T & {
  'data-testid'?: string;
  'data-value'?: string;
};

export interface NameValue {
  name: string;
  value: string;
}

export type IressHTMLAttributes<T = HTMLDivElement> = WithDataAttributes<
  React.HTMLAttributes<T>
>;

export type IressInputHTMLAttributes<T = HTMLInputElement> = WithDataAttributes<
  React.InputHTMLAttributes<T>
>;

export type IressAnchorHTMLAttributes<T = HTMLAnchorElement> =
  WithDataAttributes<React.AnchorHTMLAttributes<T>>;

export type IressButtonHTMLAttributes<T = HTMLButtonElement> =
  WithDataAttributes<React.ButtonHTMLAttributes<T>>;

export type IressFormHTMLAttributes<T = HTMLFormElement> = WithDataAttributes<
  React.FormHTMLAttributes<T>
>;

/**
 * @deprecated, use ResponsiveProps<T> instead
 */
export interface ResponsiveSizing<T> {
  xs?: T | null;
  sm?: T | null;
  md?: T | null;
  lg?: T | null;
  xl?: T | null;
  xxl?: T | null;
}

type VariablePaddingSizeDimension = PaddingSize | PaddingSizes | null;

export interface VariablePaddingSize {
  b?: VariablePaddingSizeDimension;
  l?: VariablePaddingSizeDimension;
  r?: VariablePaddingSizeDimension;
  t?: VariablePaddingSizeDimension;
  x?: VariablePaddingSizeDimension;
  y?: VariablePaddingSizeDimension;
}

export interface LabelValue {
  label: string;
  testId?: string;
  value?: FormControlValue;
}

export interface LabelValueMeta extends LabelValue {
  append?: React.ReactNode;
  divider?: boolean;
  meta?: React.ReactNode;
  prepend?: React.ReactNode;
}

export interface FormattedLabelValueMeta extends LabelValueMeta {
  formattedLabel?: React.ReactNode;
  formattedMeta?: React.ReactNode;
}

export interface BreakpointDetail {
  mediaQuery: string;
  screenWidthRange: string;
  minScreenWidth: string;
  maxScreenWidth?: string;
  containerMaxWidth: string;
  viewportWidth: number;
}
