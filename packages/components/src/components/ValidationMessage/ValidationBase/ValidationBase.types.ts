import {
  type IressAnchorHTMLAttributes,
  type SystemValidationStatus,
  type SystemValidationStatuses,
} from '@/main';
import { type ElementType, type ReactNode } from 'react';

export type ValidationBaseProps<
  T = ElementType,
  U = IressAnchorHTMLAttributes<T>,
> = Omit<U, 'prefix'> & {
  /**
   * The base tag of the label.
   * @default label
   */
  as?: T;

  /**
   * Validation content (what went wrong, what went right).
   */
  children?: ReactNode;

  /**
   * Prefix to the validation message. Will be `status` prop if nothing is provided.
   */
  prefix?: ReactNode;

  /**
   * Whether message is danger, warning, success or info.
   * **Note**: danger is translated to Error when used as the prefix.
   * @default danger
   **/
  status?: SystemValidationStatus | SystemValidationStatuses;

  /**
   * If set to true, the prefix will be visually displayed (default is only available to screen readers)
   */
  visiblePrefix?: boolean;
};
