import { panel } from './Panel.styles';
import { type IressStyledProps } from '@/types';
import { type FC, type ReactNode } from 'react';
import { styled } from '@/styled-system/jsx';
import { IressText } from '../Text/Text';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export interface IressPanelProps extends IressStyledProps {
  /**
   * Content to be grouped using a panel.
   */
  children?: ReactNode;

  /**
   * Setting to true will ignore the border radius set in the theme and set it to zero.
   *
   * @deprecated Use `borderRadius="none"` instead.
   */
  noBorderRadius?: boolean;
}

const Component = styled(IressText, panel) as FC<IressPanelProps>;

export const IressPanel = ({ className, ...restProps }: IressPanelProps) => (
  <Component {...restProps} className={cx(className, GlobalCSSClass.Panel)} />
);
