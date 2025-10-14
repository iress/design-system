import classNames from 'classnames';
import styles from '../ValidationMessage.module.scss';
import { capitalizeFirstLetter } from '@helpers/formatting/capitalizeFirstLetter';
import { type ValidationBaseProps } from './ValidationBase.types';
import { GlobalCSSClass } from '@/enums';

const ValidationPrefix = ({
  prefix,
  status = 'danger',
}: Pick<ValidationBaseProps, 'prefix' | 'status'>) => {
  if (prefix) {
    return prefix;
  }

  const statusPrefix =
    status === 'danger' ? 'Error' : capitalizeFirstLetter(status);
  return `${statusPrefix}: `;
};

export const ValidationBase = ({
  as: BaseTag = 'div',
  children,
  className,
  prefix,
  status = 'danger',
  visiblePrefix,
  ...restProps
}: ValidationBaseProps) => (
  <BaseTag
    {...restProps}
    className={classNames(
      className,
      styles.validationMessage,
      styles[status],
      'iress-u-text',
      `iress--${status}`,
    )}
  >
    <div
      className={classNames(styles.prefix, {
        [GlobalCSSClass.SROnly]: !visiblePrefix,
      })}
    >
      <ValidationPrefix prefix={prefix} status={status} />
    </div>
    <div className={styles.message}>{children}</div>
  </BaseTag>
);
