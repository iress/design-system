import { type ReactNode } from 'react';
import { type IressInputProps } from '../Input';
import { type FormControlValue } from '@/types';

export interface IressReadonlyProps<
  T extends FormControlValue = FormControlValue,
> extends Omit<
  IressInputProps<T>,
  'clearable' | 'onClear' | 'onChange' | 'onInput' | 'placeholder' | 'rows'
> {
  /**
   * The formatted value. If not provided, the value will be displayed.
   */
  children?: ReactNode;

  /**
   * When true, displays the component inline.
   */
  inline?: boolean;

  /**
   * Readonly variant:
   * - `'locked'`: Permission-based readonly (displays lock icon in Field label)
   * - `undefined`: Standard readonly (informational)
   */
  variant?: 'locked';
}
