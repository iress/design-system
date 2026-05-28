import { useId, type ReactNode } from 'react';
import { css, cx } from '@/styled-system/css';
import { splitCssProps } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { avatar } from './Avatar.styles';
import type { IressStyledProps } from '@/types';
import { IressIcon, type IressIconProps } from '../Icon';
import { IressTooltip } from '../Tooltip';

type AvatarMode =
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

type AvatarCssMode = Extract<AvatarMode, string>;

export interface IressAvatarTooltip {
  /** The person's name, displayed prominently. */
  name: string;
  /** Badge label (e.g. "New"). Shown as muted metadata. */
  badge?: string;
  /** Type label (e.g. "Group"). Shown as muted metadata. */
  type?: string;
}

export interface IressAvatarProps extends IressStyledProps<'span'> {
  /**
   * Badge indicator at the top-right of the avatar.
   * Pass an object with `icon` and optional `color`, or `false` to hide.
   * @default false
   */
  badge?:
    | {
        /** Accessible label for the badge content (e.g. "Online", "Offline", "Busy"). */
        ariaLabel: string;

        /** Filled variation of the icon */
        filled?: boolean;

        /** Icon to display inside the badge. */
        icon?: IressIconProps['name'];

        /** Colour from the data (10-90) or system status spectrum. */
        mode?: AvatarMode;
      }
    | false;

  /**
   * Content to display inside the avatar (e.g. initials text, an icon, or an image).
   */
  children?: ReactNode;

  /**
   * Renders a smaller avatar, designed for stacking with negative margin.
   * @default false
   */
  compact?: boolean;

  /**
   * Colour mode from the data palette (10-90) or system status colours (danger, info, success, warning).
   * Controls the avatar's background and text colour.
   */
  mode?: AvatarMode;

  /**
   * Tooltip shown on hover. Displays the name prominently with optional
   * metadata (badge and type) in muted text separated by a dot.
   */
  tooltip?: IressAvatarTooltip;

  /**
   * Secondary circle at the bottom-right. Pass an icon `ReactNode` to display, or `false`/`undefined` to hide.
   * @default false
   */
  type?:
    | {
        /** Accessible label for the type content (e.g. "User", "Bot", "Admin"). */
        ariaLabel: string;

        /** Filled variation of the icon */
        filled?: boolean;

        /** Icon to display as the type */
        icon: IressIconProps['name'];
      }
    | false;
}

export const IressAvatar = ({
  children,
  badge = false,
  type = false,
  mode,
  compact = false,
  tooltip,
  className,
  ...restProps
}: IressAvatarProps) => {
  const classes = avatar({ compact, mode: mode as AvatarCssMode });
  const styles = avatar.raw({
    badgeMode:
      typeof badge === 'object' && badge.mode
        ? (String(badge.mode) as AvatarCssMode)
        : undefined,
    compact,
    mode: mode as AvatarCssMode,
    noBadgeIcon: badge && !badge.icon,
  });
  const [styleProps, nonStyleProps] = splitCssProps(restProps);
  const labelId = useId();

  const buildTooltipText = (): string[] => {
    if (!tooltip) return [];
    const metaParts = [tooltip.badge, tooltip.type].filter(Boolean);
    const lines = [tooltip.name];
    if (metaParts.length > 0) {
      lines.push(metaParts.join(' · '));
    }
    return lines;
  };

  const avatarElement = (
    <span
      {...nonStyleProps}
      tabIndex={tooltip ? (nonStyleProps.tabIndex ?? 0) : nonStyleProps.tabIndex}
      className={cx(
        css(styles.root, styleProps),
        className,
        GlobalCSSClass.Avatar,
      )}
      role="img"
      aria-labelledby={labelId}
    >
      <span
        className={classes.initials}
        id={labelId}
        aria-label={restProps['aria-label']}
      >
        {children}
      </span>
      {badge && (
        <span className={classes.badge} role="img" aria-label={badge.ariaLabel}>
          {badge.icon && (
            <IressIcon
              name={badge.icon}
              filled={badge.filled}
              aria-hidden="true"
            />
          )}
        </span>
      )}
      {type && (
        <span className={classes.type}>
          <IressIcon
            name={type.icon}
            filled={type.filled}
            screenreaderText={type.ariaLabel}
          />
        </span>
      )}
    </span>
  );

  if (tooltip) {
    return (
      <IressTooltip tooltipText={buildTooltipText()} variant="rich" delay={300}>
        {avatarElement}
      </IressTooltip>
    );
  }

  return avatarElement;
};

IressAvatar.displayName = 'IressAvatar';
