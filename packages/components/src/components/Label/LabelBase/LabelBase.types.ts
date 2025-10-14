import { type WithDataAttributes } from '@/interfaces';
import { type ElementType, type ReactNode } from 'react';

export type LabelBaseProps<T = ElementType, U = LabelHTMLAttributes<T>> = U & {
  /**
   * Content to be appended to the label.
   * This is not affected by the `hiddenLabel` prop.
   */
  append?: ReactNode;

  /**
   * The base tag of the label.
   * @default label
   */
  as?: T;

  /**
   * Content to be displayed in the label.
   * This can also include error messages to make sure it makes sense in this context.
   */
  children: ReactNode;

  /**
   * Visually hides the label text, but still available to screen readers.
   */
  hiddenLabel?: boolean;

  /**
   * When set to true, the text '(optional)' is displayed next to the label text.
   * Can also be a string to display custom optional text.
   * Will be ignored if `required` is `true`.
   */
  optional?: boolean | string;

  /**
   * When set to true, the 'required asterisk (*)' is displayed next to the label text.
   */
  required?: boolean;
};

type LabelHTMLAttributes<T = HTMLLabelElement> = WithDataAttributes<
  React.LabelHTMLAttributes<T>
>;
