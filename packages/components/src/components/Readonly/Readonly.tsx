import { forwardRef } from 'react';
import { type IressReadonlyProps } from './Readonly.types';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { type FormControlValue, GlobalCSSClass, IressSpinner } from '@/main';
import classNames from 'classnames';

import styles from '../Input/Input.module.scss';
import baseStyles from '../Input/InputBase/InputBase.module.scss';
import { useNoDefaultValueInForms } from '../Form/hooks/useNoDefaultValueInForms';
import { getFormControlValueAsStringIfDefined } from '@/helpers/form/getFormControlValueAsStringIfDefined';

const Readonly = <T extends FormControlValue = string | number>(
  {
    append,
    children,
    className,
    'data-testid': dataTestId,
    defaultValue,
    loading,
    prepend,
    style,
    watermark,
    width,
    value,
    inline,
    alignRight,
    ...restProps
  }: IressReadonlyProps<T>,
  ref: React.Ref<HTMLInputElement>,
) => {
  useNoDefaultValueInForms({
    component: 'IressReadonly',
    defaultValue,
  });

  const classes = classNames(
    styles.input,
    styles.readonly,
    className,
    GlobalCSSClass.FormElement,
    {
      [`${GlobalCSSClass.Width}--${width}`]: width?.includes('perc'),
      [styles.watermark]: watermark,
    },
  );

  const inputClasses = classNames(
    className,
    baseStyles.formControl,
    baseStyles.readonly,
    styles.readonlyControl,
    {
      [`${GlobalCSSClass.Width}--${width}`]: width && !width?.includes('perc'),
      [baseStyles.readonlyAlignRight]: alignRight,
    },
  );

  const validDefaultValue = getFormControlValueAsStringIfDefined(defaultValue);
  const validValue = getFormControlValueAsStringIfDefined(value);

  return (
    <div className={classes} data-testid={dataTestId} style={style}>
      <div
        className={classNames(styles.wrapper, GlobalCSSClass.FormElementInner, {
          [styles.inlineWrapper]: inline,
        })}
      >
        {prepend && (
          <div className={`${styles.addon} ${styles.prepend}`}>{prepend}</div>
        )}
        <div className={inputClasses}>
          {children ?? validValue ?? validDefaultValue}
        </div>
        <div className={styles.internal}>
          {loading && (
            <IressSpinner
              screenreaderText={loading === true ? 'loading' : loading}
            />
          )}
        </div>
        {append && (
          <div className={`${styles.addon} ${styles.append}`}>{append}</div>
        )}
      </div>
      <input
        {...restProps}
        defaultValue={validDefaultValue}
        type="hidden"
        ref={ref}
        data-testid={propagateTestid(dataTestId, 'input')}
        value={validValue}
      />
    </div>
  );
};

export const IressReadonly = forwardRef(Readonly) as <
  T extends FormControlValue,
>(
  props: IressReadonlyProps<T> & React.RefAttributes<HTMLInputElement | null>,
) => React.ReactElement;
