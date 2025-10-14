import { type ReactNode } from 'react';
import { type HeadingLevel, type SystemValidationStatus } from '@/enums';
import { type IressHTMLAttributes } from '@/interfaces';
import { type HeadingLevels, type SystemValidationStatuses } from '@/types';

export interface IressAlertProps extends IressHTMLAttributes {
  /**
   * Contents of the alert. Is automatically wrapped in `<IressText />` and will inherit its styling.
   **/
  children?: ReactNode;

  /**
   * Buttons and controls for the alert.
   **/
  footer?: ReactNode;

  /**
   * Text for alert heading. If a string, it will use a heading with level 2.
   **/
  heading?: ReactNode;

  /**
   * Text for alert heading. If not supplied, heading will not be displayed.
   * @deprecated Use `heading` instead.
   **/
  headingText?: string;

  /**
   * Heading level for the alert heading.
   * @default h2
   * @deprecated Use `heading` instead.
   **/
  headingLevel?: HeadingLevel | HeadingLevels;

  /**
   * Alert type - danger, info, success or warning.
   * @default info
   */
  status?: SystemValidationStatus | SystemValidationStatuses;
}

export interface AlertWithEnums extends React.FC<IressAlertProps> {
  /** @deprecated IressAlert.HeadingLevel enum is now deprecated and will be removed in a future version. Please use the HeadingLevels type instead. */
  HeadingLevel: typeof HeadingLevel;

  /** @deprecated IressAlert.Status enum is now deprecated and will be removed in a future version. Please use the SystemValidationStatuses type instead. */
  Status: typeof SystemValidationStatus;
}

export const ALERT_ICONS: Record<SystemValidationStatuses, string> = {
  danger: 'ban',
  info: 'info-square',
  success: 'check',
  warning: 'exclamation-triangle',
};
