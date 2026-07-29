import { type ChangeEvent, type ForwardedRef, forwardRef } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import type { IressStyledProps } from '@/types';
import type { LabelValueMeta } from '@/interfaces';
import type { IressInputProps } from '../../Input';
import { nativeSelect } from './NativeSelect.styles';
import { input } from '../../Input/Input.styles';
import { css, cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { splitCssProps } from '@/styled-system/jsx';
import { getFormControlValueAsStringIfDefined } from '@helpers/form/getFormControlValueAsStringIfDefined';
import { useIdIfNeeded } from '../../../hooks';

export type NativeSelectProps = Omit<
  IressStyledProps<'select'>,
  'defaultValue' | 'value' | 'onChange' | 'width' | 'children'
> & {
  /**
   * Handles the onChange event of the select input.
   * If you pass in a non-string value, you can access it using the second parameter of the function.
   */
  onChange?: (
    e: ChangeEvent<HTMLSelectElement>,
    value?: LabelValueMeta,
  ) => void;

  /**
   * The available options that the user can select from.
   */
  options: LabelValueMeta[];

  /**
   * The placeholder text to display when no option is selected.
   */
  placeholder?: string;

  /**
   * Value of selected option for controlled select.
   */
  value?: LabelValueMeta;

  /**
   * The width of the select.
   */
  width?: IressInputProps['width'];
};

export const NativeSelect = forwardRef(
  (
    {
      className,
      'data-testid': dataTestid,
      options,
      onChange,
      placeholder,
      style,
      value,
      width,
      ...restProps
    }: NativeSelectProps,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    const id = useIdIfNeeded(restProps as IressStyledProps);

    const styles = nativeSelect.raw({
      showingPlaceholder: !value && !!placeholder,
      width,
    });
    const inputStyles = input.raw();

    const [styleProps, nonStyleProps] = splitCssProps(restProps);

    return (
      <div
        data-testid={dataTestid}
        className={cx(
          className,
          css(inputStyles.wrapper, styles.wrapper, styleProps),
          GlobalCSSClass.FormElement,
          GlobalCSSClass.Select,
        )}
        style={style}
      >
        <select
          {...nonStyleProps}
          className={css(styles.element)}
          data-testid={propagateTestid(dataTestid, 'select')}
          id={id}
          onChange={(event) => {
            const nodeValue = options.find(
              (option) =>
                getFormControlValueAsStringIfDefined(
                  option.value ?? option.label,
                ) === event.currentTarget.value,
            );
            onChange?.(event, nodeValue);
          }}
          ref={ref}
          value={
            getFormControlValueAsStringIfDefined(
              value?.value ?? value?.label,
            ) ?? ''
          }
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((option) => {
            if (option.children) {
              return (
                <optgroup label={option.label} key={option.label}>
                  {option.children.map((childOption) => (
                    <option
                      value={getFormControlValueAsStringIfDefined(
                        childOption.value ?? childOption.label,
                      )}
                      key={childOption.label}
                    >
                      {childOption.label}
                    </option>
                  ))}
                </optgroup>
              );
            }

            return (
              <option
                value={getFormControlValueAsStringIfDefined(
                  option.value ?? option.label,
                )}
                key={option.label}
              >
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  },
);

NativeSelect.displayName = 'NativeSelect';
