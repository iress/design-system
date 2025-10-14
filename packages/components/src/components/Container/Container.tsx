import { styled } from '@/styled-system/jsx';
import { container } from './Container.styles';
import { type IressStyledProps } from '@/types';
import { type FC, type ReactNode } from 'react';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export interface IressContainerProps extends IressStyledProps {
  /**
   * Content to be contained, usually used with `IressRow` and `IressCol`.
   */
  children?: ReactNode;

  /**
   * Container stretches to fill the width of the browser window if true.
   */
  fluid?: boolean;
}

const Component = styled('div', container) as FC<IressContainerProps>;

export const IressContainer = ({
  className,
  ...restProps
}: IressContainerProps) => (
  <Component
    {...restProps}
    className={cx(className, GlobalCSSClass.Container)}
  />
);
