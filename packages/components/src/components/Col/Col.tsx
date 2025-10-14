import { styled } from '@/styled-system/jsx';
import { col } from './Col.styles';
import { type FC, type ReactNode } from 'react';
import { type IressStyledProps, type ResponsiveProp } from '@/types';
import { type UtilityValues } from '@/styled-system/types/prop-type';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export interface IressColProps extends IressStyledProps {
  /**
   * Individual alignment of column
   */
  alignSelf?: 'start' | 'end' | 'center' | 'stretch';

  /**
   * Any content you would like to be contained in a column.
   */
  children?: ReactNode;

  /**
   * Number of columns to offset.
   */
  offset?: ResponsiveProp<
    UtilityValues['offset'] | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  >;

  /**
   * Number of columns to span.
   * @default auto
   */
  span?: ResponsiveProp<
    UtilityValues['span'] | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  >;
}

const Component = styled('div', col) as FC<IressColProps>;

export const IressCol = ({ className, ...restProps }: IressColProps) => (
  <Component {...restProps} className={cx(className, GlobalCSSClass.Col)} />
);
