import {
  forwardRef,
  useContext,
  ReactNode,
  ForwardedRef,
  Ref,
  ReactElement,
  ChangeEvent,
} from 'react';
import { useIdIfNeeded } from '../../hooks';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressReadonly } from '../Readonly';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import { FormControlValue, IressStyledProps } from '@/types';
import { css, cx } from '@/styled-system/css';
import { radio } from './Radio.styles';
import { GlobalCSSClass } from '@/enums';
import { useControlledState } from '@/hooks/useControlledState';
import { IressCheckboxMark } from '@/components/CheckboxMark';
import { getRadioGroupContext } from '../RadioGroup';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { IressText } from '../Text';

export interface IressRadioProps<T = FormControlValue>
  extends Omit<IressStyledProps<'input'>, 'defaultValue' | 'value'> {
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
   * Sets whether the control is hidden. If it is within a radio group,
   * it will be overridden with the radio group's hiddenControl setting.
   */
  hiddenControl?: boolean;

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
   * The value which is submitted with the form data when this radio button is checked.
   * To set this radio as checked by default, use the `checked` property.
   */
  value?: T;

  /**
   * Add the button-like border and padding to radio when `touch` is true.
   */
  touch?: boolean;
}

const Radio = <T = FormControlValue,>(
  {
    checked: controlledChecked,
    children,
    className,
    'data-testid': dataTestId,
    defaultChecked: uncontrolledChecked,
    hiddenControl,
    name,
    onChange,
    readOnly: readOnlyProp,
    required,
    value,
    touch,
    ...restProps
  }: IressRadioProps<T>,
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
  const isHidden = radioGroup?.hiddenRadio ?? hiddenControl;
  const isRequired = radioGroup?.required ?? required;
  const isTouch = radioGroup?.touch ?? touch;

  const styles = radio.raw({
    hiddenControl: isHidden,
    touch: isTouch,
    checked: isChecked,
  });

  const RadioMark = () => (
    <styled.svg
      version="1.1"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...styles.radioMark}
      className={GlobalCSSClass.FormElement}
    >
      <circle cx="100" cy="100" r="70" />
    </styled.svg>
  );

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
        {!isHidden && (
          <RadioMark data-testid={propagateTestid(dataTestId, 'radioMark')} />
        )}
        {isHidden && (
          <IressCheckboxMark
            className={css(styles.checkboxMark)}
            checked={isChecked}
            data-testid={propagateTestid(dataTestId, 'checkboxMark')}
          />
        )}
        <IressText element="span">{children}</IressText>
      </styled.label>
    </div>
  );
};

export const IressRadio = forwardRef(Radio) as <T = FormControlValue>(
  props: IressRadioProps<T> & { ref?: Ref<HTMLInputElement> },
) => ReactElement;
