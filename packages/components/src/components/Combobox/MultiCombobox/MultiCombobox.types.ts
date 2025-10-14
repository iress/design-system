import { type InputBaseElement, type LabelValueMeta } from '@/main';
import { type IressComboboxProps } from '../Combobox.types';
import { type SyntheticEvent } from 'react';

export interface IressMultiComboboxProps
  extends Omit<IressComboboxProps, 'defaultValue' | 'onChange' | 'value'> {
  /**
   * Value of selected option for uncontrolled combobox.
   */
  defaultValue?: LabelValueMeta[];

  /**
   * The number of select options before the view switches to a single aggregate tag.
   * @default 4
   */
  multiOptionTagLimit?: number;

  /**
   * Emitted when the value changes.
   */
  onChange?: (
    e?: SyntheticEvent<InputBaseElement>,
    value?: LabelValueMeta[],
  ) => void;

  /**
   * Text displayed next to tag count in tag when tag limit is exceeded.
   * @default options selected
   */
  selectedOptionsTagText?: string;

  /**
   * Value of selected option for controlled combobox.
   */
  value?: LabelValueMeta[];
}
