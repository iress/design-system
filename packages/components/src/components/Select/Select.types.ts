import { type ReactNode } from 'react';
import { type FormElementWidth } from '@/enums';
import {
  type IressHTMLAttributes,
  type WithDataAttributes,
} from '@/interfaces';
import { type FormControlValue, type FormElementWidths } from '@/types';
import { type IressReadonlyProps } from '../Readonly';

export interface IressSelectProps<T = HTMLSelectElement>
  extends Omit<
    IressSelectHTMLAttributes<T>,
    'defaultValue' | 'value' | 'onChange'
  > {
  /**
   * The `option` and `optgroup` elements to render within the select.
   */
  children?: ReactNode | string;

  /**
   * Value of selected option for uncontrolled select.
   */
  defaultValue?: FormControlValue;

  /**
   * Identifier for select.
   */
  name?: string;

  /**
   * Handles the onChange event of the select input.
   * If you pass in a non-string value, you can access it using the second parameter of the function.
   */
  onChange?: (
    e: React.ChangeEvent<HTMLSelectElement>,
    value?: FormControlValue,
  ) => void;

  /**
   * If `true`, the user cannot modify the value.
   */
  readonly?: boolean;

  /**
   * Mark the select as a required field.
   */
  required?: boolean;

  /**
   * Value of selected option for controlled select.
   */
  value?: FormControlValue;

  /**
   * Adds an `option` as the first element with the placeholder text and no value.
   */
  placeholder?: string;

  /**
   * The width of the select.
   */
  width?: FormElementWidth | FormElementWidths;
}

export interface IressSelectOptionProps
  extends Omit<IressHTMLAttributes<HTMLOptionElement>, 'value'> {
  /**
   * Value of selected option.
   * It will be converted to a string and used to match with the value of IressSelect during the onChange event.
   */
  value?: FormControlValue;
}

type IressSelectHTMLAttributes<T = HTMLSelectElement> = WithDataAttributes<
  React.SelectHTMLAttributes<T>
>;

export interface SelectControlProps
  extends Omit<
    IressSelectHTMLAttributes<HTMLSelectElement>,
    'defaultValue' | 'value'
  > {
  /**
   * Value of selected option for uncontrolled select.
   */
  defaultValue?: FormControlValue;

  /**
   * Adds an `option` as the first element with the placeholder text and no value.
   */
  placeholder?: string;

  /**
   * Value of the select.
   */
  value?: FormControlValue;
}

export interface SelectReadonlyProps extends Omit<IressReadonlyProps, 'value'> {
  /**
   * The options of the select, used to locate the label of the selected value.
   */
  children?: React.ReactNode;

  /**
   * The value of the select.
   */
  value?: FormControlValue;
}

export interface SelectOption {
  children?: SelectOption[];
  label: string;
  onClick?: React.MouseEventHandler;
  testId?: string;
  value?: FormControlValue;
}

export type SelectRef = HTMLSelectElement | HTMLInputElement | null;

export type SelectWithEnums = React.ForwardRefExoticComponent<
  IressSelectProps & React.RefAttributes<SelectRef>
> & {
  /** @deprecated IressSelect.Width will be removed in future versions of IDS. Please use the value directly. */
  Width: typeof FormElementWidth;
};
