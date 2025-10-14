import { propagateTestid } from '@helpers/utility/propagateTestid';
import { css, cx } from '@/styled-system/css';
import { badge as badgeStyles } from './Badge.styles';
import { type ReactElement, type ReactNode } from 'react';
import { type IressStyledProps, type SystemValidationStatuses } from '@/types';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';

export interface IressBadgeProps extends IressStyledProps<'span'> {
  /**
   * Content of the badge.
   */
  children?: ReactNode;

  /**
   * Element to attach the badge to.
   */
  host?: ReactElement;

  /**
   * Style of the badge.
   */
  mode?: SystemValidationStatuses | 'neutral' | 'primary';

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
  host,
  ...restProps
}: IressBadgeProps) => {
  const classes = badgeStyles.raw({ mode, pill, host: !!host });
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  const badge = (
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

  return host ? (
    <div
      className={css(classes.host)}
      data-testid={propagateTestid(restProps['data-testid'], 'host')}
    >
      {host}
      {badge}
    </div>
  ) : (
    badge
  );
};
