import { type ReactNode } from 'react';
import { type IressInputProps } from '../Input';
import { type FormControlReadOnly, type FormControlValue } from '@/types';

export interface IressReadonlyProps<
  T extends FormControlValue = FormControlValue,
> extends Omit<
  IressInputProps<T>,
  | 'clearable'
  | 'onClear'
  | 'onChange'
  | 'onInput'
  | 'placeholder'
  | 'readOnly'
  | 'rows'
  | 'variant'
> {
  /**
   * The formatted value. If not provided, the value will be displayed.
   */
  children?: ReactNode;
  inline?: boolean;

  /**
   * The readonly variant.
   * - `'locked'`: Applies disabled-like styling (greyed out, `not-allowed`
   *   cursor). The value is still submitted via a hidden input.
   */
  variant?: FormControlReadOnly;
}
