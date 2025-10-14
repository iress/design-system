import { type ReactNode } from 'react';
import { type IressButtonHTMLAttributes } from '@/interfaces';
import { type FormControlValue } from '@/types';

export interface IressTabProps
  extends Omit<IressButtonHTMLAttributes, 'children' | 'value'> {
  /**
   * Sets the active styling of the tab.
   */
  active?: boolean;

  /**
   * Text to be displayed inside the tab panel.
   */
  children?: ReactNode;

  /**
   * The label of this tab.
   */
  label: ReactNode;

  /**
   * You can provide your own value to allow you to control its active state when used in `IressTabSet`.
   */
  value?: FormControlValue;
}
