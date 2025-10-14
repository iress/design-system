import classNames from 'classnames';
import styles from './FieldGroup.module.scss';
import { useMemo } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { type IressFieldGroupProps } from './FieldGroup.types';
import { FieldAppendToLabel } from '../components/FieldAppendToLabel';
import { FieldLegend } from '../components/FieldLegend';

export const IressFieldGroup = ({
  children,
  className,
  'data-testid': dataTestId,
  error,
  errorMessages,
  hiddenLabel,
  hint,
  inline,
  join,
  label,
  optional,
  required,
  ...restProps
}: IressFieldGroupProps) => {
  const hasError = useMemo(
    () => !!error || errorMessages?.length,
    [error, errorMessages?.length],
  );

  const append = useMemo(
    () =>
      !hint && !error && !errorMessages?.length ? null : (
        <FieldAppendToLabel
          hint={hint}
          error={error}
          errorMessages={errorMessages}
          hiddenLabel={hiddenLabel}
          data-parent-testid={dataTestId}
        />
      ),
    [dataTestId, error, errorMessages, hiddenLabel, hint],
  );

  return (
    <fieldset
      className={classNames(className, styles.fieldGroup, {
        [styles.inline]: inline,
        [styles.invalid]: hasError,
        [styles.hiddenLabel]: hiddenLabel,
        [styles.join]: join,
      })}
      data-testid={dataTestId}
      {...restProps}
    >
      <FieldLegend
        append={append}
        className={styles.legend}
        data-testid={propagateTestid(dataTestId, 'legend')}
        hiddenLabel={hiddenLabel}
        optional={optional}
        required={required}
      >
        {label}
      </FieldLegend>
      <div className={styles.fields}>{children}</div>
    </fieldset>
  );
};
