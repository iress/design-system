import { type IressInputHTMLAttributes } from '@/interfaces';

export type InputBaseElement = HTMLTextAreaElement | HTMLInputElement;

export interface FocusableElementRef {
  focus: () => void;
  blur: () => void;
}

export type InputRef = FocusableElementRef & {
  input?: InputBaseElement | null;
};

export interface InputBaseProps
  extends IressInputHTMLAttributes<InputBaseElement> {
  /**
   * Number of rows in the `textarea` (when set the component renders a textarea element)
   */
  rows?: number;
}
