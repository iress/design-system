import { type ReactNode, type MouseEvent, type MouseEventHandler } from 'react';
import { type SystemValidationStatuses } from '@/types';
import { capitalizeFirstLetter } from '@/helpers/formatting/capitalizeFirstLetter';
import { cx } from '@/styled-system/css';
import { IressText, type IressTextProps } from '../Text';
import { styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { isValidFormInputElement } from '@/helpers/form/isValidFormInputElement';

type ValidationElement<TLinkToTarget extends string | undefined = undefined> =
  TLinkToTarget extends string ? 'a' : 'div';
type ValidationInstance<TLinkToTarget extends string | undefined = undefined> =
  TLinkToTarget extends string ? HTMLAnchorElement : HTMLDivElement;

export type IressValidationMessageProps<
  TLinkToTarget extends string | undefined = undefined,
> = Omit<IressTextProps<ValidationElement<TLinkToTarget>>, 'prefix'> & {
  /**
   * Validation content (what went wrong, what went right).
   */
  children?: ReactNode;

  /**
   * ID of element the message is describing. If nothing is supplied a link will not render.
   */
  linkToTarget?: TLinkToTarget;

  /**
   * Emitted when the message is clicked.
   */
  onClick?: MouseEventHandler<ValidationInstance<TLinkToTarget>>;

  /**
   * Prefix to the validation message. Will be `status` prop if nothing is provided.
   */
  prefix?: ReactNode;

  /**
   * Whether message is danger, warning, success or info.
   * **Note**: danger is translated to Error when used as the prefix.
   * @default 'danger'
   **/
  status?: SystemValidationStatuses;

  /**
   * If set to true, the prefix will be visually displayed (default is only available to screen readers)
   */
  visiblePrefix?: boolean;
};

const ValidationPrefix = ({
  prefix,
  status = 'danger',
}: Pick<IressValidationMessageProps, 'prefix' | 'status'>) => {
  if (prefix) {
    return prefix;
  }

  const statusPrefix =
    status === 'danger' ? 'Error' : capitalizeFirstLetter(status);
  return `${statusPrefix}: `;
};

export const IressValidationMessage = <
  TLinkToTarget extends string | undefined = undefined,
>({
  children,
  className,
  linkToTarget,
  prefix,
  status = 'danger',
  visiblePrefix = false,
  ...restProps
}: IressValidationMessageProps<TLinkToTarget>) => (
  <IressText
    color={`colour.system.${status}.text`}
    display="block"
    {...(restProps as IressTextProps<ValidationElement<TLinkToTarget>>)}
    element={linkToTarget ? 'a' : 'div'}
    href={linkToTarget ? `#${linkToTarget}` : undefined}
    onClick={(e: MouseEvent<ValidationInstance<TLinkToTarget>>) => {
      restProps.onClick?.(e);

      if (!linkToTarget) {
        return;
      }

      const target = document.getElementById(linkToTarget);

      if (!target) {
        return;
      }

      e.preventDefault();

      if (isValidFormInputElement(target)) {
        target.focus();
      } else {
        target.setAttribute('tabIndex', '-1');
        target.focus();
        target.removeAttribute('tabIndex');
      }
    }}
    className={cx(className, GlobalCSSClass.ValidationMessage)}
  >
    <styled.div srOnly={!visiblePrefix} display="inline" pe="spacing.1">
      <ValidationPrefix prefix={prefix} status={status} />
    </styled.div>
    <styled.div display="inline">{children}</styled.div>
  </IressText>
);
