import { type ReactNode } from 'react';
import {
  type IressHTMLAttributes,
  type ValidationMessageObj,
} from '@/interfaces';
import { type SystemValidationStatus } from '@/enums';
import { type SystemValidationStatuses } from '@/main';

export interface IressValidationSummaryProps
  extends Omit<IressHTMLAttributes<HTMLUListElement>, 'prefix'> {
  /**
   * ValidationMessage Array containing the `id` of the field and the validation message
   **/
  messages: ValidationMessageObj[];

  /**
   * Renders validation messages as links pointing at the field it relates to, specified as a string
   * Only works when used with the `messages` prop.
   */
  linkToTarget?: string;

  /**
   * Prefix to all validation messages. Will be `status` prop if nothing is provided.
   */
  prefix?: ReactNode;

  /**
   * Status for all child ValidationMessage components
   */
  status?: SystemValidationStatus | SystemValidationStatuses;

  /**
   * If set to true, the prefix will be visually displayed (default is only available to screen readers)
   */
  visiblePrefix?: boolean;
}
