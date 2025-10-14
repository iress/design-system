import { type IressHTMLAttributes } from '@/interfaces';

export interface IressProgressProps
  extends IressHTMLAttributes<HTMLDivElement> {
  /**
   * The maximum value of the progress indicator.
   * @default 100
   **/
  max?: number;

  /**
   * The minimum value of the progress indicator.
   * @default 0
   **/
  min?: number;

  /**
   * The text that is announced by the screen reader. Should contain a description of the section the progress is being measured for. You can use {{current}} and {{max}} as string replacers for the current value and maximum value respectively..
   * @default "Progress is {{current}} of {{max}}"
   */
  sectionTitle?: string;

  /**
   * The current value of the progress indicator.
   * @default 0
   **/
  value?: number;
}
