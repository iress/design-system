import {
  type HorizontalAligns,
  type VerticalAligns,
  type IressStyledProps,
  type ResponsiveProp,
} from '@/types';
import { inline } from './Inline.styles';
import { styled } from '@/styled-system/jsx';
import { type FC, type ReactNode } from 'react';
import { type PositiveSpacingToken } from '@theme-preset/tokens/spacing';
import { GlobalCSSClass } from '@/enums';
import { cx } from '@/styled-system/css';

export interface IressInlineProps extends IressStyledProps {
  /**
   * Content to be displayed inline.
   */
  children?: ReactNode;

  /**
   * Sets the gap between direct children.
   * @see https://developer.mozilla.org/docs/Web/CSS/gap
   */
  gap?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * Sets the horizontal alignment of the inline content.
   */
  horizontalAlign?: HorizontalAligns;

  /**
   * Wraps content when stretches beyond container.
   */
  noWrap?: boolean;

  /**
   * Sets the size of the top and bottom gap between direct children when they begin to wrap.
   * @see https://developer.mozilla.org/docs/Web/CSS/row-gap
   */
  rowGap?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * Sets the vertical alignment of the inline content.
   */
  verticalAlign?: VerticalAligns;
}

const Component = styled('div', inline) as FC<IressInlineProps>;

export const IressInline = ({ className, ...restProps }: IressInlineProps) => (
  <Component {...restProps} className={cx(className, GlobalCSSClass.Inline)} />
);
