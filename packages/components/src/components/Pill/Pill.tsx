import { css, cx } from '@/styled-system/css';
import { pill } from './Pill.styles';
import { type ReactNode } from 'react';
import type { IressStyledProps } from '@/types';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';

export interface IressPillProps extends IressStyledProps<'span'> {
  /**
   * Content of the badge.
   */
  children?: ReactNode;

  /**
   * Renders a smaller pill by reducing its padding. The text size is unchanged.
   * Useful when a count sits alongside other text, such as inside a tab.
   */
  compact?: boolean;

  /**
   * Style of the badge, based on the data colour palette (10-90), system status colours (danger, info, success, warning) or the neutral palette.
   * Can be a number (10-90), a string ('10'-'90'), a system status ('danger', 'info', 'success', 'warning') or 'neutral'.
   * @default '90'
   */
  mode?:
    | 10
    | 20
    | 30
    | 40
    | 50
    | 60
    | 70
    | 80
    | 90
    | '10'
    | '20'
    | '30'
    | '40'
    | '50'
    | '60'
    | '70'
    | '80'
    | '90'
    | 'danger'
    | 'info'
    | 'success'
    | 'warning'
    | 'neutral';
}

export const IressPill = ({
  children,
  compact,
  mode = '90',
  className,
  ...restProps
}: IressPillProps) => {
  const styles = pill.raw({
    compact,
    mode: mode as Extract<IressPillProps['mode'], string>,
  });
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  return (
    <styled.span
      {...nonStyleProps}
      className={cx(css(styles, styleProps), className, GlobalCSSClass.Pill)}
    >
      {children}
    </styled.span>
  );
};

IressPill.displayName = 'IressPill';
