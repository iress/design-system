import { type GutterSizes } from '@/types';
import { type IressHTMLAttributes } from '@/interfaces';

export interface IressDividerProps extends IressHTMLAttributes<HTMLHRElement> {
  /**
   * Sets gutter of the divider.
   */
  gutter?: GutterSizes;

  /**
   * Change to a vertical divider.
   */
  vertical?: boolean;
}

export enum DividerCssClass {
  Base = 'iress-u-divider',
  Gutter = 'iress--gutter',
  Vertical = 'iress--vertical',
}
