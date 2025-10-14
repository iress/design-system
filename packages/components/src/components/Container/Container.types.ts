import { type IressHTMLAttributes } from '@/interfaces';

export interface IressContainerProps
  extends IressHTMLAttributes<HTMLDivElement> {
  /**
   * Any content you would like to be contained. Best used with `IressRow` and `IressCol`.
   */
  children?: React.ReactNode;

  /**
   * Container stretches to fill the width of the browser window if true.
   */
  fluid?: boolean;
}

export enum ContainerCssClass {
  Base = 'iress-u-container',
  Fluid = 'iress--fluid',
}
