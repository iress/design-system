import { css, cx } from '@/styled-system/css';
import { badge as badgeStyles } from './Badge.styles';
import { type ReactNode } from 'react';
import type { IressStyledProps, Statuses } from '@/types';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';

export interface IressBadgeProps extends IressStyledProps<'span'> {
  /**
   * Content of the badge.
   */
  children?: ReactNode;

  /**
   * Style of the badge.
   */
  mode?:
    | Statuses
    | 'neutral'
    | 'primary'
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
   * Whether the Badge should be styled as a pill.
   */
  pill?: boolean;
}

export const IressBadge = ({
  children,
  mode = 'neutral',
  pill,
  className,
  ...restProps
}: IressBadgeProps) => {
  const classes = badgeStyles.raw({
    mode: mode as Extract<IressBadgeProps['mode'], string>,
    pill,
  });
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  return (
    <styled.span
      {...nonStyleProps}
      className={cx(
        css(classes.root, classes.badge, styleProps),
        className,
        GlobalCSSClass.Badge,
      )}
    >
      {children}
    </styled.span>
  );
};

IressBadge.displayName = 'IressBadge';
