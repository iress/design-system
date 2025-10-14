import { type IressValidationSummaryProps } from './ValidationSummary.types';
import { type ValidationMessageObj } from '@/interfaces';
import styles from './ValidationSummary.module.scss';
import classNames from 'classnames';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressValidationMessage } from '../ValidationMessage';
import { useIdIfNeeded } from '@/hooks';
import { IressValidationLink } from '../ValidationLink/ValidationLink';
import { type IressValidationLinkProps } from '../ValidationLink/ValidationLink.types';

const ValidationSummaryItem = ({
  children,
  'data-testid': dataTestId,
  linkToTarget,
  prefix,
  status,
  visiblePrefix,
}: Partial<IressValidationLinkProps>) => {
  if (linkToTarget) {
    return (
      <IressValidationLink
        linkToTarget={linkToTarget}
        status={status}
        prefix={prefix}
        visiblePrefix={visiblePrefix}
        data-testid={dataTestId}
      >
        {children}
      </IressValidationLink>
    );
  }

  return (
    <IressValidationMessage
      status={status}
      prefix={prefix}
      visiblePrefix={visiblePrefix}
      data-testid={dataTestId}
    >
      {children}
    </IressValidationMessage>
  );
};

export const IressValidationSummary = ({
  messages = [],
  linkToTarget,
  prefix,
  visiblePrefix,
  status = 'danger',
  className,
  'data-testid': dataTestId,
  ...restProps
}: IressValidationSummaryProps) => {
  const id = useIdIfNeeded({ id: restProps.id });

  if (!messages.length) {
    return null;
  }

  return (
    <ul
      {...restProps}
      className={classNames(className, styles.validationSummary)}
      data-testid={dataTestId}
    >
      {messages.map((msg: ValidationMessageObj) => (
        <li key={`${id}-${msg.linkToTarget}-${msg.message}`}>
          <ValidationSummaryItem
            linkToTarget={msg.linkToTarget ?? linkToTarget}
            status={msg.status ?? status}
            prefix={msg.prefix ?? prefix}
            visiblePrefix={msg.visiblePrefix ?? visiblePrefix}
            data-testid={msg.dataTestId ?? propagateTestid(dataTestId, 'error')}
          >
            {msg.message}
          </ValidationSummaryItem>
        </li>
      ))}
    </ul>
  );
};
