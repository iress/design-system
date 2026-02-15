import {
  type ChangeEvent,
  type ForwardedRef,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type FocusEvent,
  type ReactNode,
  type ReactElement,
} from 'react';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import { IressCheckboxMark } from '../CheckboxMark';
import { useControlledState } from '@/hooks/useControlledState';
import { IressReadonly } from '../Readonly';
import { type FormControlValue, type IressStyledProps } from '@/types';
import { checkbox as checkboxStyles } from './Checkbox.styles';
import { css, cx } from '@/styled-system/css';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { getCheckboxGroupContext } from '../CheckboxGroup';
import { type ReactHookFormCompatibleRef } from '@/interfaces';
import { GlobalCSSClass } from '@/enums';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { IressText } from '../Text';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';

export type CheckboxVariants = 'card' | 'touch' | undefined;

export interface IressCheckboxProps<
  T = FormControlValue,
  TVariant extends CheckboxVariants = undefined,
> extends Omit<IressStyledProps<'input'>, 'defaultValue' | 'value'> {
  /**
   * If true, the checkbox is selected.
   * Please use this when rendering the checkbox in controlled mode.
   */
  checked?: boolean;

  /**
   * The checkbox content
   */
  children?: ReactNode;

  /**
   * If true, the checkbox will be initially rendered as selected.
   * Please use this when rendering the checkbox in uncontrolled mode.
   */
  defaultChecked?: boolean;

  /**
   * Sets the heading for the checkbox when using the `card` variant
   */
  heading?: TVariant extends 'card' ? ReactNode : never;

  /**
   * Visually hides the label (if set), label will still be read out by screenreaders.
   */
  hiddenLabel?: TVariant extends undefined ? boolean : undefined;

  /**
   * If true, the checkbox will visually appear as indeterminate.
   */
  indeterminate?: boolean;

  /**
   * The name of the control, which is submitted with the form data.
   */
  name?: string;

  /**
   * Emitted when the checkbox loses focus.
   */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;

  /**
   * Emitted when the checkbox value changes.
   */
  onChange?: (
    e: ChangeEvent<HTMLInputElement>,
    checked?: boolean,
    value?: T,
  ) => void;

  /**
   * Emitted when the checkbox gains focus.
   */
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;

  /**
   * If `true`, the checkbox is a required field and will be validated as such.
   */
  required?: boolean;

  /**
   * Value of the checkbox when used in a checkbox group. The checked state of the checkbox will be overridden based on this value if used inside a checkbox group.
   * **Note:**
   * - The value of the checkbox does not mean if its checked or not, use the checked property for that.
   * - If the value of the checkbox is true/false, and checked is undefined and not inside a CheckboxGroup, it will use this as the checked value. This ensures out-of-the-box compatibility with React Hook Form.
   */
  value?: T;

  /**
   * The visual variant of the checkbox.
   * - `card`: Provides a larger, card-like style with a heading slot.
   * - `touch`: Provides a larger, button-like style, great for mobile devices.
   * - `undefined`: The default checkbox style.
   */
  variant?: TVariant;
}

const Checkbox = <
  T = FormControlValue,
  TVariant extends CheckboxVariants = undefined,
>(
  {
    checked: checkedProp,
    className,
    defaultChecked,
    heading,
    hiddenLabel,
    indeterminate: indeterminateProp,
    id,
    name: nameProp,
    onChange,
    value,
    variant: variantProp,
    children,
    readOnly,
    'data-testid': dataTestId,
    ...restProps
  }: IressCheckboxProps<T, TVariant>,
  ref: ForwardedRef<ReactHookFormCompatibleRef<HTMLInputElement>>,
) => {
  useNoDefaultValueInForms({
    component: 'IressCheckbox',
    defaultValue: defaultChecked,
    message:
      'Using the `defaultChecked` prop on an `IressCheckbox` inside an `IressForm` component is not supported. Please use the `defaultValue` prop on the `IressFormField`, or use `defaultValues` on the `IressForm` component (recommended) to ensure a single source of truth for your form.',
  });

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const currentElement = inputRef.current;

  // Globals
  const uniqueId = useId();
  const inputId = id ?? uniqueId;

  // State
  const [isIndeterminate, setIsIndeterminate] = useState(
    indeterminateProp ?? false,
  );

  // Inside checkbox group
  const checkboxGroup = useContext(getCheckboxGroupContext<T>());
  const uncontrolledChecked = checkboxGroup ? undefined : defaultChecked;
  const variant = variantProp ?? checkboxGroup?.variant;
  const isReadonly = checkboxGroup?.readOnly ?? readOnly;
  const name = checkboxGroup?.name ?? nameProp;

  let controlledChecked = checkedProp;

  if (checkboxGroup && value) {
    // If inside a checkbox group, we override the checked value
    controlledChecked = checkboxGroup.value.includes(value);
  } else if (!checkboxGroup && typeof value === 'boolean') {
    // This ensures compatibility with React Hook Form when no checked/defaultChecked is provided.
    controlledChecked = value;
  }

  const {
    value: checked,
    setValue: setChecked,
    isControlled,
  } = useControlledState<boolean>({
    component: 'IressCheckbox',
    propName: 'checked',
    defaultValue: uncontrolledChecked,
    value: controlledChecked,
  });

  const indeterminate = isControlled ? indeterminateProp : isIndeterminate;

  // Logic
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      if (!isControlled) {
        setIsIndeterminate(false);
      }
      setChecked(e.target.checked);
      onChange?.(e, e.target.checked, value);
      checkboxGroup?.onChange?.(e, e.target.checked, value);
    },
    [checkboxGroup, isControlled, onChange, setChecked, value],
  );

  useImperativeHandle(ref, () => ({
    focus: () => currentElement?.focus(),
    blur: () => currentElement?.blur(),
    input: currentElement,
  }));

  if (isReadonly) {
    return checked ? (
      <IressReadonly
        {...restProps}
        width={undefined}
        value={getFormControlValueAsString(value)}
      >
        {children}
      </IressReadonly>
    ) : null;
  }

  const classes = checkboxStyles({
    hiddenLabel,
    checked,
    variant,
  });
  const styles = checkboxStyles.raw({
    hiddenLabel,
    checked,
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
        GlobalCSSClass.Checkbox,
      )}
    >
      <styled.input
        {...nonStyleProps}
        {...styles.input}
        value={getFormControlValueAsString(value)}
        type="checkbox"
        id={inputId}
        defaultChecked={isControlled ? undefined : checked}
        checked={isControlled ? checked : undefined}
        onChange={handleChange}
        ref={inputRef}
        name={name}
      />
      <styled.label htmlFor={inputId} {...styles.label}>
        <IressCheckboxMark
          className={cx(classes.mark, GlobalCSSClass.FormElement)}
          checked={checked}
          indeterminate={indeterminate}
          data-testid={propagateTestid(dataTestId, 'checkboxMark')}
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

export const IressCheckbox = forwardRef(Checkbox) as (<
  T = FormControlValue,
  TVariant extends CheckboxVariants = undefined,
>(
  props: IressCheckboxProps<T, TVariant> & {
    ref?: ForwardedRef<ReactHookFormCompatibleRef<HTMLInputElement>>;
  },
) => ReactElement) & {
  displayName: 'IressCheckbox';
};

IressCheckbox.displayName = 'IressCheckbox';
