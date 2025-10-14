import { type ReactNode } from 'react';
import { type IressInputHTMLAttributes } from '@/interfaces';
import { type FormControlValue } from '@/types';

export interface IressRadioProps
  extends Omit<
    IressInputHTMLAttributes<HTMLInputElement>,
    'defaultValue' | 'value'
  > {
  /**
   * Sets the checked state of the radio.
   * If it is within a radio group, it will be overridden by the radio group's value
   * and whether it matches this radio's value.
   */
  checked?: boolean;

  /**
   * Label of the radio
   */
  children?: ReactNode;

  /**
   * Sets whether the control is hidden. If it is within a radio group,
   * it will be overridden with the radio group's hiddenControl setting.
   */
  hiddenControl?: boolean;

  /**
   * Sets the name attribute on the radio input. If it is within a radio group,
   * it will be overridden with the radio group's name.
   */
  name?: string;

  /**
   * Handles the onChange event of the radio input.
   * If you pass in a non-string value, you can access it using the second parameter of the function.
   */
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    value?: FormControlValue,
  ) => void;

  /**
   * If `true`, the radio is a required field and will be validated as such.
   * If it is within a radio group, it will be overridden with the radio group's
   * required state.
   */
  required?: boolean;

  /**
   * The value which is submitted with the form data when this radio button is checked.
   * To set this radio as checked by default, use the `checked` property.
   */
  value?: FormControlValue;

  /**
   * Add the button-like border and padding to radio when `touch` is true.
   */
  touch?: boolean;
}
