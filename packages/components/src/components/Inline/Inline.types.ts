import { type IressHTMLAttributes, type ResponsiveSizing } from '@/interfaces';
import { type ReactNode } from 'react';
import {
  type GutterSize,
  type HorizontalAlign,
  type VerticalAlign,
} from '@/enums';
import {
  type GutterSizes,
  type HorizontalAligns,
  type VerticalAligns,
} from '@/types';

export interface IressInlineProps extends IressHTMLAttributes {
  /**
   * Content to be displayed inline.
   */
  children?: ReactNode;

  /**
   * Sets the spacing between inline content.
   */
  gutter?:
    | GutterSize
    | GutterSizes
    | ResponsiveSizing<GutterSize | GutterSizes>;

  /**
   * Sets the horizontal alignment of the inline content.
   */
  horizontalAlign?: HorizontalAlign | HorizontalAligns;

  /**
   * Wraps content when stretches beyond container.
   */
  noWrap?: boolean;

  /**
   * Sets the vertical alignment of the inline content.
   */
  verticalAlign?: VerticalAlign | VerticalAligns;
}

export interface InlineWithEnums extends React.FC<IressInlineProps> {
  /** @deprecated IressInline.Gutter is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Gutter: typeof GutterSize;

  /** @deprecated IressInline.HorizontalAlign is now deprecated and will be removed in a future version. Please use the value directly instead. */
  HorizontalAlign: typeof HorizontalAlign;

  /** @deprecated IressInline.VerticalAlign is now deprecated and will be removed in a future version. Please use the value directly instead. */
  VerticalAlign: typeof VerticalAlign;
}

export enum InlineCssClass {
  Base = 'iress-u-inline',
  NoWrap = 'iress--no-wrap',
  HorizontalAlign = 'iress--h-align',
  VerticalAlign = 'iress--v-align',
  Gutter = 'iress--gutter',
}
