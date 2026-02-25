import { css, cx } from '@/styled-system/css';
import { pill } from './Pill.styles';
import { type ReactNode } from 'react';
import type { IressStyledProps, Statuses } from '@/types';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';

export interface IressPillProps extends IressStyledProps<'span'> {
  /**
   * Content of the badge.
   */
  children?: ReactNode;

  /**
   * Style of the badge, based on the data colour palette.
   * Can be a number (10-90) or a string ('10'-'90').
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
    | '90';

  /**
   * System status colour variant for the badge.
   * When provided, overrides the mode prop.
   * Use for semantic status indicators (e.g., error states, success messages).
   */
  status?: Statuses;
}

export const IressPill = ({
  children,
  mode = '90',
  status,
  className,
  ...restProps
}: IressPillProps) => {
  const styles = pill.raw({
    mode: status
      ? undefined
      : (mode as Extract<IressPillProps['mode'], string>),
    status,
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
