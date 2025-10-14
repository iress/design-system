import {
  type IressBadgeProps,
  BadgeMode,
  type BadgeWithEnums,
} from './Badge.types';
import classNames from 'classnames';
import styles from './Badge.module.scss';
import { propagateTestid } from '@helpers/utility/propagateTestid';

export const IressBadge: BadgeWithEnums = ({
  children,
  mode = 'background-default',
  pill,
  className,
  host,
  ...restProps
}: IressBadgeProps) => {
  const classMap = {
    [styles.badge]: true,
    [styles.base]: true,
    [styles[mode]]: true,
    [styles.pill]: pill,
  };

  const badge = (
    <span className={classNames(classMap, className)} {...restProps}>
      {children}
    </span>
  );

  return host ? (
    <div
      className={styles.host}
      data-testid={propagateTestid(restProps['data-testid'], 'host')}
    >
      {host}
      {badge}
    </div>
  ) : (
    badge
  );
};

IressBadge.displayName = 'IressBadge';

/** @deprecated IressBadge.Mode is now deprecated and will be removed in a future version. Please use the BadgeModes type instead. */
IressBadge.Mode = BadgeMode;
