import {
  forwardRef,
  useContext,
  type ReactNode,
  type ForwardedRef,
  type Ref,
  type ReactElement,
  type ChangeEvent,
} from 'react';
import { useIdIfNeeded } from '../../hooks';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressReadonly } from '../Readonly';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import {
  type FormControlReadOnly,
  type FormControlValue,
  type IressStyledProps,
} from '@/types';
import { css, cx } from '@/styled-system/css';
import { radio } from './Radio.styles';
import { GlobalCSSClass } from '@/enums';
import { useControlledState } from '@/hooks/useControlledState';
import { IressRadioMark } from '@/components/RadioMark';
import { getRadioGroupContext } from '../RadioGroup';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { IressText } from '../Text';
import type { CheckboxVariants } from '../Checkbox';

export interface IressRadioProps<
  T = FormControlValue,
  TVariant extends CheckboxVariants = undefined,
> extends Omit<
  IressStyledProps<'input'>,
  'defaultValue' | 'readOnly' | 'value'
> {
  /**
   * Sets the checked state of the radio.
   * If it is within a radio group, it will be overridden by the radio group's value
   * and whether it matches this radio's value.
   */
  checked?: boolean;

  /**
   * Label of the radio
   */
  children?: ReactNode;

  /**
   * Sets the heading for the radio when using the `card` variant
   */
  heading?: TVariant extends 'card' ? ReactNode : never;

  /**
   * Sets the name attribute on the radio input. If it is within a radio group,
   * it will be overridden with the radio group's name.
   */
  name?: string;

  /**
   * Handles the onChange event of the radio input.
   * If you pass in a non-string value, you can access it using the second parameter of the function.
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>, value?: T) => void;

  /**
   * If `true`, the radio is a required field and will be validated as such.
   * If it is within a radio group, it will be overridden with the radio group's
   * required state.
   */
  required?: boolean;

  /**
   * Renders the radio as read-only.
   * Use `'locked'` when the value is read-only because of permissions.
   */
  readOnly?: FormControlReadOnly;

  /**
   * The value which is submitted with the form data when this radio button is checked.
   * To set this radio as checked by default, use the `checked` property.
   */
  value?: T;

  /**
   * The visual variant of the radio.
   * - `card`: Provides a larger, card-like style with a heading slot.
   * - `touch`: Provides a larger, button-like style, great for mobile devices.
   * - `undefined`: The default radio style.
   */
  variant?: TVariant;
}

const Radio = <
  T = FormControlValue,
  TVariant extends CheckboxVariants = undefined,
>(
  {
    checked: controlledChecked,
    children,
    className,
    'data-testid': dataTestId,
    defaultChecked: uncontrolledChecked,
    heading,
    name,
    onChange,
    readOnly: readOnlyProp,
    required,
    value,
    variant: variantProp,
    ...restProps
  }: IressRadioProps<T, TVariant>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const id = useIdIfNeeded(restProps);
  const radioGroup = useContext(getRadioGroupContext<T>());
  const { value: internalChecked, setValue: setInternalChecked } =
    useControlledState({
      component: 'Radio',
      defaultValue: !!uncontrolledChecked,
      value: controlledChecked,
      propName: 'checked',
    });

  const hasRadioGroup = !!radioGroup?.onChange;
  const isChecked = hasRadioGroup
    ? radioGroup.value === value
    : internalChecked;
  const readOnly = hasRadioGroup ? radioGroup.readOnly : readOnlyProp;

  if (readOnly) {
    return isChecked ? (
      <IressReadonly
        {...restProps}
        width={undefined}
        value={getFormControlValueAsString(value)}
      >
        {children}
      </IressReadonly>
    ) : null;
  }

  const radioName = radioGroup?.name ?? name;
  const variant = variantProp ?? radioGroup?.variant;
  const isRequired = radioGroup?.required ?? required;

  const classes = radio({
    checked: isChecked,
    variant,
  });
  const styles = radio.raw({
    checked: isChecked,
    variant,
  });

  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  return (
    <div
      data-testid={dataTestId}
      className={cx(
        className,
        css(styles.root, styleProps),
        GlobalCSSClass.Group,
        GlobalCSSClass.Radio,
      )}
    >
      <styled.input
        {...nonStyleProps}
        {...styles.input}
        type="radio"
        id={id}
        name={radioName}
        ref={ref}
        data-testid={propagateTestid(dataTestId, 'input')}
        onChange={(e) => {
          if (!hasRadioGroup) {
            setInternalChecked(e.target.checked);
          }
          onChange?.(e, value);
          radioGroup?.onChange?.(e, value);
        }}
        value={String(value)}
        checked={isChecked}
        required={isRequired}
      />
      <styled.label htmlFor={id} {...styles.label}>
        <IressRadioMark
          checked={isChecked}
          data-testid={propagateTestid(dataTestId, 'radioMark')}
          className={classes.mark}
        />
        <IressText element="span" className={classes.content}>
          {typeof heading === 'string' ? (
            <IressText
              element="strong"
              textStyle="typography.heading.4"
              className={classes.heading}
            >
              {heading}
            </IressText>
          ) : (
            heading
          )}
          {children}
        </IressText>
      </styled.label>
    </div>
  );
};

export const IressRadio = forwardRef(Radio) as (<
  T = FormControlValue,
  TVariant extends CheckboxVariants = undefined,
>(
  props: IressRadioProps<T, TVariant> & { ref?: Ref<HTMLInputElement> },
) => ReactElement) & {
  displayName: 'IressRadio';
};

IressRadio.displayName = 'IressRadio';
