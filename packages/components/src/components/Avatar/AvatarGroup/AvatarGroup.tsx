import { Children, cloneElement, isValidElement, type ReactNode } from 'react';
import { css, cx } from '@/styled-system/css';
import { splitCssProps } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { avatarGroup } from './AvatarGroup.styles';
import type { IressStyledProps } from '@/types';
import { IressAvatar, type IressAvatarProps } from '../Avatar';

export interface IressAvatarGroupProps extends IressStyledProps<'div'> {
  /** Avatar components to stack. */
  children?: ReactNode;

  /**
   * Applies compact mode to all child avatars.
   * @default false
   */
  compact?: boolean;

  /**
   * Maximum number of avatars to display before showing an overflow indicator.
   * When undefined, all avatars are shown.
   */
  max?: number;

  /**
   * Render prop for the overflow indicator. Receives the count of hidden avatars.
   * @default (count) => `+${count} more`
   */
  overflowLabel?: (count: number) => ReactNode;
}

export const IressAvatarGroup = ({
  children,
  compact = false,
  max,
  overflowLabel = (count) => `+${count} more`,
  className,
  ...restProps
}: IressAvatarGroupProps) => {
  const classes = avatarGroup();
  const styles = avatarGroup.raw();
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  const items = Children.toArray(children).filter(isValidElement);
  const total = items.length;
  const visible = max != null && max < total ? items.slice(0, max) : items;
  const overflowCount = max != null ? total - max : 0;

  return (
    <div
      role="group"
      {...nonStyleProps}
      className={cx(
        css(styles.root, styleProps),
        className,
        GlobalCSSClass.AvatarGroup,
      )}
    >
      {visible.map((child, index) => (
        <span
          key={index}
          className={classes.item}
          style={{ zIndex: total - index }}
        >
          {compact &&
          isValidElement<IressAvatarProps>(child) &&
          child.type === IressAvatar
            ? cloneElement(child, { compact: true })
            : child}
        </span>
      ))}
      {overflowCount > 0 && (
        <span className={classes.overflow}>{overflowLabel(overflowCount)}</span>
      )}
    </div>
  );
};

IressAvatarGroup.displayName = 'IressAvatarGroup';
