import { type IressInputHTMLAttributes } from '@/interfaces';
import { type FormControlValue } from '@/types';

export interface IressCheckboxProps
  extends Omit<
    IressInputHTMLAttributes<HTMLInputElement>,
    'defaultValue' | 'value'
  > {
  /**
   * If true, the checkbox is selected.
   * Please use this when are rendering the checkbox in controlled mode.
   */
  checked?: boolean;

  /**
   * If true, the checkbox will be initially rendered as selected.
   * Please use this when are rendering the checkbox in uncontrolled mode.
   */
  defaultChecked?: boolean;

  /**
   * Sets whether the control is hidden. If it is within a checkbox group,
   * it will be overridden with the checkbox group's hiddenCheckbox setting.
   */
  hiddenControl?: boolean;

  /**
   * Visually hides the label (if set), label will still be read out by screenreaders.
   */
  hiddenLabel?: boolean;

  /**
   * If true, the checkbox will visually appear as indeterminate.
   */
  indeterminate?: boolean;

  /**
   * The name of the control, which is submitted with the form data.
   */
  name?: string;

  /**
   * If `true`, the checkbox is a required field and will be validated as such.
   */
  required?: boolean;

  /**
   * Value of the checkbox when used in a checkbox group. The checked state of the checkbox will be overridden based on this value if used inside a checkbox group.
   * **Note:** The value of the checkbox does not mean if its checked or not, use the checked property for that.
   */
  value?: FormControlValue;

  /**
   * Emitted when the checkbox loses focus.
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Emitted when the checkbox value changes.
   */
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    value?: FormControlValue,
  ) => void;

  /**
   * Emitted when the checkbox gains focus.
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * The checkbox content
   */
  children?: React.ReactNode;

  /**
   * Add the button-like border and padding to checkbox when `touch` is true.
   */
  touch?: boolean;
}

export interface CheckboxRef {
  element?: HTMLInputElement;
  check: (checked: boolean) => void;
  reset: () => void;
}
