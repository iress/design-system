import { type ReactElement, type ReactNode } from 'react';
import { type IressHTMLAttributes } from '@/interfaces';

export interface IressBadgeProps extends IressHTMLAttributes<HTMLDivElement> {
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
  mode?: BadgeMode | BadgeModes;

  /**
   * Whether the Badge should be styled as a pill.
   */
  pill?: boolean;
}

export interface BadgeWithEnums extends React.FC<IressBadgeProps> {
  /** @deprecated IressBadge.Mode is now deprecated and will be removed in a future version. Please use the BadgeModes type instead. */
  Mode: typeof BadgeMode;
}

/** @deprecated BadgeMode enum is now deprecated and will be removed in a future version. Please use the BadgeModes type instead. */
export enum BadgeMode {
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Info = 'info',
  Positive = 'positive',
  Negative = 'negative',
  BackgroundAlt = 'background-alt',
  BackgroundDefault = 'background-default',
}
export const BADGE_MODES = [
  'success',
  'warning',
  'danger',
  'info',
  'positive',
  'negative',
  'background-alt',
  'background-default',
] as const;
export type BadgeModes = (typeof BADGE_MODES)[number];
