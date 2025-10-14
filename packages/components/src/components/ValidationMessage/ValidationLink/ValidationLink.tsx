import {
  IressValidationMessage,
  type IressValidationMessageProps,
} from '../ValidationMessage';
import { type ReactNode } from 'react';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

/**
 * @deprecated Use `IressValidationMessageProps<string>` instead.
 */
export interface IressValidationLinkProps
  extends IressValidationMessageProps<string> {
  /**
   * Validation content (what went wrong, what went right).
   */
  children?: ReactNode;

  /**
   * ID of element the message is describing. If nothing is supplied a link will not render.
   */
  linkToTarget: string;
}

/**
 * @deprecated Use `IressValidationMessage` instead.
 */
export const IressValidationLink = ({
  className,
  linkToTarget,
  ...props
}: IressValidationLinkProps) => (
  <IressValidationMessage<string>
    {...props}
    className={cx(className, GlobalCSSClass.ValidationLink)}
    linkToTarget={linkToTarget}
  />
);
