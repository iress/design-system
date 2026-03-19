import {
  forwardRef,
  type ReactElement,
  type ReactNode,
  type Ref,
  type RefAttributes,
} from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';

import { getFormControlValueAsStringIfDefined } from '@/helpers/form/getFormControlValueAsStringIfDefined';
import { type IressInputProps } from '@/components/Input';
import { readonly } from './Readonly.styles';
import { css, cx } from '@/styled-system/css';
import type { FormControlReadOnly, FormControlValue } from '@/types';
import { IressSpinner } from '../Spinner';
import { GlobalCSSClass } from '@/enums';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';
import { splitCssProps } from '@/styled-system/jsx';
import { IressButton } from '../Button';

export interface IressReadonlyProps<
  T extends FormControlValue = FormControlValue,
> extends Omit<
  IressInputProps<T, undefined>,
  | 'clearable'
  | 'onClear'
  | 'onChange'
  | 'onInput'
  | 'placeholder'
  | 'readOnly'
  | 'rows'
  | 'color'
  | 'variant'
> {
  /**
   * The formatted value. If not provided, the value will be displayed.
   */
  children?: ReactNode;

  /**
   * Make prepend/append element closer to the input content.
   */
  inline?: boolean;

  /**
   * The readonly variant.
   * - `'locked'`: Applies disabled-like styling while keeping the input
   *   accessible to screen readers (renders a visible readonly input).
   */
  variant?: FormControlReadOnly;
}

const Readonly = <T extends FormControlValue = string | number>(
  {
    actions,
    append,
    children,
    className,
    'data-testid': dataTestId,
    defaultValue,
    loading,
    prepend,
    style,
    width,
    value,
    inline,
    alignRight,
    variant,
    ...restProps
  }: IressReadonlyProps<T>,
  ref: Ref<HTMLInputElement>,
) => {
  useNoDefaultValueInForms({
    component: 'IressReadonly',
    defaultValue,
  });

  const isLocked = variant === 'locked';
  const classes = readonly.raw({ inline, width, alignRight, locked: isLocked });

  const validDefaultValue = getFormControlValueAsStringIfDefined(defaultValue);
  const validValue = getFormControlValueAsStringIfDefined(value);
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  return (
    <div
      className={cx(className, css(classes.root), GlobalCSSClass.Readonly)}
      data-testid={dataTestId}
      style={style}
    >
      <div className={css(classes.wrapper, styleProps)}>
        {prepend && <div className={css(classes.addon)}>{prepend}</div>}
        <div className={css(classes.formControl)}>
          {children ?? validValue ?? validDefaultValue}
        </div>
        <div className={css(classes.internal)}>
          {loading && (
            <IressSpinner
              screenreaderText={loading === true ? 'loading' : loading}
            />
          )}
        </div>
        {append && <div className={css(classes.addon)}>{append}</div>}
        <input
          {...nonStyleProps}
          defaultValue={validDefaultValue}
          type="hidden"
          ref={ref}
          data-testid={propagateTestid(dataTestId, 'input')}
          value={validValue}
        />
      </div>
      {actions?.map((action, index) => (
        <IressButton
          {...action}
          className={cx(action.className, css(classes.action))}
          key={index}
        />
      ))}
    </div>
  );
};

export const IressReadonly = forwardRef(Readonly) as (<
  T extends FormControlValue = string | number,
>(
  props: IressReadonlyProps<T> & RefAttributes<HTMLInputElement | null>,
) => ReactElement) & {
  displayName: 'IressReadonly';
};

IressReadonly.displayName = 'IressReadonly';
