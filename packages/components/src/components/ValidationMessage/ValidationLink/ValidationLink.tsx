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
export interface IressValidationLinkProps extends IressValidationMessageProps<string> {
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
 * Displays a validation message as a link that scrolls to the associated form field.
 *
 * @example
 * ```tsx
 * import { IressValidationLink } from '@iress-oss/ids-components';
 *
 * <IressValidationLink linkToTarget="email" status="danger">Invalid email</IressValidationLink>
 * ```
 *
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
IressValidationLink.displayName = 'IressValidationLink';
