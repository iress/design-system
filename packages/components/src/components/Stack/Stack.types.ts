import { type IressHTMLAttributes, type ResponsiveSizing } from '@/interfaces';
import { type GutterSize } from '@/enums';
import { type GutterSizes } from '@/types';
import { type ReactNode } from 'react';

export interface IressStackProps extends IressHTMLAttributes {
  /**
   * Content to be separated by a gutter.
   */
  children?: ReactNode;

  /**
   * Sets the gutter size of the stack.
   */
  gutter?:
    | GutterSize
    | GutterSizes
    | ResponsiveSizing<GutterSize | GutterSizes>;
}

export enum StackCssClass {
  Base = 'iress-u-stack',
  Gutter = 'iress--gutter',
}

export interface StackWithEnums extends React.FC<IressStackProps> {
  /** @deprecated IressStack.Gutter is now deprecated and will be removed in a future version. Please use the GutterSizes type instead. */
  Gutter: typeof GutterSize;
}
