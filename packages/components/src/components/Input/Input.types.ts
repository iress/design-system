import { type FormElementWidth } from '@/enums';
import { type FormControlValue, type FormElementWidths } from '@/types';
import {
  type InputBaseElement,
  type InputBaseProps,
} from './InputBase/InputBase.types';

export interface IressInputProps<T extends FormControlValue = string | number>
  extends Omit<InputBaseProps, 'defaultValue' | 'onChange' | 'value'> {
  /**
   * Content to append to the input field, usually a button or icon.
   **/
  append?: React.ReactNode;

  /**
   * If `true`, then user can clear the value of the input. Will be ignored if `rows` prop is in use.
   */
  clearable?: boolean;

  /**
   * The value of the input. Can be a string or a number. Use for uncontrolled inputs.
   */
  defaultValue?: T;

  /**
   * Bring your own formatter that will be used to format the value when the input is not focused, allowing you to display the value in a different format.
   * e.g. User type in value="dsf 987kkk123" => result after formatter: $987,123 (string)
   */
  formatter?: (value?: T) => string | number;

  /**
   * The loading states of the input field. If provided a string, will use that text as the loading message.
   */
  loading?: boolean | string;

  /**
   * Emitted when the input value changes with the new changed value.
   */
  onChange?: (e: React.ChangeEvent<InputBaseElement>, value: T) => void;

  /**
   * Emitted when the input is manually cleared.
   */
  onClear?: (e: React.ChangeEvent<InputBaseElement>) => void;

  /**
   * Content to prepended to the input field, usually an icon.
   **/
  prepend?: React.ReactNode;

  /**
   * The value of the input. Can be a string or a number. Use for controlled inputs.
   */
  value?: T;

  /**
   * When set to `true` add ons will render with a different style. Will be ignored if `prepend` or `append` props are not being used.
   */
  watermark?: boolean;

  /**
   * The width of the input.
   */
  width?: FormElementWidth | FormElementWidths;

  /**
   * Make prepend/append element closer to the input content.
   */
  inline?: boolean;

  /**
   * Set input content align to right.
   */
  alignRight?: boolean;
}

/** @deprecated InputMode enum is now deprecated and will be removed in a future version. Please use the InputModes type instead. */
export enum InputMode {
  None = 'none',
  Text = 'text',
  Tel = 'tel',
  Url = 'url',
  Email = 'email',
  Numeric = 'numeric',
  Decimal = 'decimal',
  Search = 'search',
  DateTimeLocal = 'datetime-local',
}
export const INPUT_MODES = [
  'none',
  'text',
  'tel',
  'url',
  'email',
  'numeric',
  'decimal',
  'search',
  'datetime-local',
] as const;
export type InputModes = (typeof INPUT_MODES)[number];

export type InputElementType = HTMLInputElement & HTMLTextAreaElement;
