import { IressCustomiseSlot, ValidationMessageObj } from '@/interfaces';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressValidationMessage } from '../ValidationMessage';
import { useIdIfNeeded } from '@/hooks';
import { IressStyledProps, SystemValidationStatuses } from '@/types';
import { ReactNode } from 'react';
import { styled } from '@/styled-system/jsx';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export interface IressValidationSummaryProps
  extends Omit<IressStyledProps<'ul'>, 'prefix'> {
  /**
   * ValidationMessage Array containing the `id` of the field and the validation message
   **/
  messages: ValidationMessageObj[];

  /**
   * Add additional styles to each item in the list.
   */
  itemStyle?: IressCustomiseSlot;

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
  status?: SystemValidationStatuses;

  /**
   * If set to true, the prefix will be visually displayed (default is only available to screen readers)
   */
  visiblePrefix?: boolean;
}

export const IressValidationSummary = ({
  messages = [],
  linkToTarget,
  prefix,
  visiblePrefix,
  status = 'danger',
  'data-testid': dataTestId,
  children,
  itemStyle,
  className,
  ...restProps
}: IressValidationSummaryProps) => {
  const id = useIdIfNeeded({ id: restProps.id });

  if (!messages.length && !children) {
    return null;
  }

  return (
    <styled.ul
      data-testid={dataTestId}
      listStyle="none"
      m="spacing.000"
      p="spacing.000"
      {...restProps}
      className={cx(className, GlobalCSSClass.ValidationSummary)}
    >
      {messages.map((msg: ValidationMessageObj) => (
        <styled.li
          m="spacing.000"
          key={`${id}-${msg.linkToTarget}-${msg.message}`}
        >
          <IressValidationMessage
            linkToTarget={msg.linkToTarget ?? linkToTarget}
            status={msg.status ?? status}
            prefix={msg.prefix ?? prefix}
            visiblePrefix={msg.visiblePrefix ?? visiblePrefix}
            data-testid={msg.dataTestId ?? propagateTestid(dataTestId, 'error')}
            {...itemStyle}
          >
            {msg.message}
          </IressValidationMessage>
        </styled.li>
      ))}
      {children && (
        <styled.li m="spacing.000">
          <IressValidationMessage
            status={status}
            prefix={prefix}
            visiblePrefix={visiblePrefix}
            data-testid={propagateTestid(dataTestId, 'error')}
            {...itemStyle}
          >
            {children}
          </IressValidationMessage>
        </styled.li>
      )}
    </styled.ul>
  );
};
