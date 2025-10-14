import { type SyntheticEvent } from 'react';
import { type TagListInputProps } from '../components/TagListInput/TagListInput.types';
import { type InputBaseElement } from '@/components/Input';

export interface IressTagInputProps
  extends Omit<
    TagListInputProps,
    'defaultValue' | 'deleteButton' | 'onChange' | 'styles' | 'tags' | 'value'
  > {
  /**
   * Tags to display (uncontrolled)
   */
  defaultValue?: string[];

  /**
   * Emitted when the value changes.
   */
  onChange?: (e?: SyntheticEvent<InputBaseElement>, value?: string[]) => void;

  /**
   * Emitted when the user attempts to add a tag that already exists.
   */
  onExistingTag?: (tag: string) => void;

  /**
   * Tags to display (controlled)
   */
  value?: string[];
}
