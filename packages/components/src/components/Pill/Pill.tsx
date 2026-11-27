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
   * Style of the badge, based on the data colour palette (10-90) or system status colours (danger, info, success, warning).
   * Can be a number (10-90), a string ('10'-'90'), or a system status ('danger', 'info', 'success', 'warning').
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
    | 'warning';
}

/**
 * Displays a small, rounded badge for categorisation or status indication.
 *
 * @example
 * ```tsx
 * import { IressPill } from '@iress-oss/ids-components';
 *
 * <IressPill>New</IressPill>
 * ```
 */
export const IressPill = ({
  children,
  mode = '90',
  className,
  ...restProps
}: IressPillProps) => {
  const styles = pill.raw({
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
