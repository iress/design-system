import classNames from 'classnames';
import styles from '../Select.module.scss';
import { forwardRef } from 'react';
import { GlobalCSSClass } from '@/enums';
import { getFormControlValueAsStringIfDefined } from '@helpers/form/getFormControlValueAsStringIfDefined';
import { type SelectControlProps } from '../Select.types';

export const SelectControl = forwardRef(
  (
    {
      children,
      className,
      defaultValue,
      placeholder,
      value,
      ...restProps
    }: SelectControlProps,
    ref: React.Ref<HTMLSelectElement>,
  ) => (
    <div
      className={classNames(styles.wrapper, GlobalCSSClass.FormElementInner)}
    >
      <select
        {...restProps}
        className={classNames(
          styles.element,
          className,
          GlobalCSSClass.FormElementInner,
        )}
        defaultValue={getFormControlValueAsStringIfDefined(defaultValue)}
        ref={ref}
        value={getFormControlValueAsStringIfDefined(value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
    </div>
  ),
);

SelectControl.displayName = 'SelectControl';
