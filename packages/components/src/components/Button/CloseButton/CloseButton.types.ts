import { type IressButtonProps } from '../Button.types';

export interface IressCloseButtonProps
  extends Omit<IressButtonProps, 'children'> {
  /**
   * Description for screen readers.
   * @default Close button
   **/
  screenreaderText?: string;
}
