import classNames from 'classnames';
import styles from './Field.module.scss';
import { type IressFieldProps } from './Field.types';
import { isValidElement, useMemo } from 'react';
import { IressLabel } from '../Label';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { FieldAppendToLabel } from './components/FieldAppendToLabel';
import { type IressHTMLAttributes } from '@/main';

export const IressField = ({
  children,
  className,
  'data-testid': dataTestId,
  error,
  errorMessages,
  hiddenLabel,
  hint,
  htmlFor: htmlForProp,
  label,
  optional,
  required,
  readOnly,
  ...restProps
}: IressFieldProps) => {
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

  let htmlFor = htmlForProp;
  if (htmlFor === undefined && isValidElement<IressHTMLAttributes>(children)) {
    htmlFor = toArray(children)[0].props.id;
  }

  return (
    <div
      className={classNames(className, {
        [styles.field]: true,
        [styles.invalid]: hasError,
        [styles.hiddenLabel]: hiddenLabel === true,
      })}
      data-testid={dataTestId}
      {...restProps}
    >
      <IressLabel
        append={append}
        className={styles.label}
        data-testid={propagateTestid(dataTestId, 'label')}
        hiddenLabel={hiddenLabel}
        htmlFor={htmlFor}
        optional={optional}
        required={readOnly ? false : !!required}
      >
        {label}
      </IressLabel>
      {children}
    </div>
  );
};
