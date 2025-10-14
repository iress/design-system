import { type ReactNode } from 'react';
import { type LabelBaseProps } from './LabelBase/LabelBase.types';

export interface IressLabelProps extends Omit<LabelBaseProps, 'as'> {
  /**
   * Content to be displayed in the label.
   * This can also include error messages to make sure it makes sense in this context.
   */
  children: ReactNode;

  /**
   * Used to connect it to the input element, it should be the input's id.
   *
   * [Learn more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for)
   */
  htmlFor?: string;
}
