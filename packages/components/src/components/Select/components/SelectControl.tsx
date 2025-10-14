import { forwardRef, type ReactElement, type Ref } from 'react';
import { GlobalCSSClass } from '@/enums';
import { getFormControlValueAsStringIfDefined } from '@helpers/form/getFormControlValueAsStringIfDefined';
import { select } from '../Select.styles';
import { css, cx } from '@/styled-system/css';
import { type FormControlValue, type IressUnstyledProps } from '@/types';
import { input, type IressInputProps } from '@/components/Input';

export interface SelectControlProps<T = FormControlValue>
  extends Omit<
    IressUnstyledProps<'select'>,
    'defaultValue' | 'value' | 'width'
  > {
  /**
   * Value of selected option for uncontrolled select.
   */
  defaultValue?: T;

  /**
   * Adds an `option` as the first element with the placeholder text and no value.
   */
  placeholder?: string;

  /**
   * Value of the select.
   */
  value?: T;

  /**
   * The width of the select.
   */
  width?: IressInputProps['width'];
}

const Component = <T = FormControlValue,>(
  {
    children,
    className,
    defaultValue,
    placeholder,
    value,
    width,
    ...restProps
  }: SelectControlProps<T>,
  ref: Ref<HTMLSelectElement>,
) => {
  const styles = select({ width });
  const rawStyles = select.raw({ width });

  return (
    <div className={cx(styles.control, GlobalCSSClass.FormElementInner)}>
      <select
        {...restProps}
        className={cx(
          css(rawStyles.element, input.raw().formControl),
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
  );
};

export const SelectControl = forwardRef(Component) as <T = FormControlValue>(
  props: SelectControlProps<T> & { ref?: Ref<HTMLSelectElement> },
) => ReactElement;
