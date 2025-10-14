import { row } from './Row.styles';
import {
  HorizontalAligns,
  IressStyledProps,
  ResponsiveProp,
  VerticalAligns,
} from '@/types';
import { ReactNode, FC } from 'react';
import { styled } from '@/styled-system/jsx';
import { PositiveSpacingToken } from '@theme-preset/tokens/spacing';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export interface IressRowProps extends IressStyledProps {
  /**
   * Any content you would like to be contained. Best used with `IressCol`.
   */
  children?: ReactNode;

  /**
   * Sets the gap between the children `<IressCol />` components.
   */
  gutter?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * Horizontal alignment, follows flexbox justify-content
   * @default left
   */
  horizontalAlign?: HorizontalAligns;

  /**
   * Sets the size of the top and bottom gap between direct children when they begin to wrap.
   * @see https://developer.mozilla.org/docs/Web/CSS/row-gap
   */
  rowGap?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * Vertical alignment, follows flexbox align-items
   * @default top
   */
  verticalAlign?: VerticalAligns;
}

const Component = styled('div', row) as FC<IressRowProps>;

export const IressRow = ({ className, ...restProps }: IressRowProps) => (
  <Component {...restProps} className={cx(className, GlobalCSSClass.Row)} />
);
