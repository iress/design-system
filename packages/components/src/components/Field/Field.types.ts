import {
  type IressHTMLAttributes,
  type ValidationMessageObj,
} from '@/interfaces';
import { type IressLabelProps } from '../Label';
import { type ReactNode } from 'react';
import { type LabelBaseProps } from '../Label/LabelBase/LabelBase.types';

export interface IressFieldProps<
  T = HTMLDivElement,
  U extends LabelBaseProps = IressLabelProps,
> extends Omit<IressHTMLAttributes<T>, 'defaultValue'>,
    Pick<U, 'hiddenLabel' | 'htmlFor' | 'optional' | 'required'>,
    Omit<FieldAppendToLabelProps<U>, 'data-parent-testid'> {
  /**
   * The form control this field is related to.
   */
  children?: React.ReactNode;

  /**
   * Text to be displayed in the label.
   **/
  label: ReactNode;

  /**
   * Renders the group in a read-only state (no asterisk symbol).
   */
  readOnly?: boolean;
}

export type FieldLegendProps = Omit<
  LabelBaseProps<'legend', IressHTMLAttributes<'legend'>>,
  'as'
>;

export interface FieldAppendToLabelProps<
  T extends LabelBaseProps = IressLabelProps,
> extends Pick<T, 'hiddenLabel'> {
  /**
   * Validation error to be displayed above the field.
   */
  error?: ReactNode;

  /**
   * Validation errors to be displayed above the field, an array of validation messages to be displayed in `IressValidationSummary`.
   */
  errorMessages?: ValidationMessageObj[];

  /**
   * Text to be displayed as supporting field description.
   */
  hint?: React.ReactNode;

  'data-parent-testid'?: string;
}
