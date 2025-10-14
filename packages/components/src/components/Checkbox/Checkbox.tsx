import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  FocusEvent,
  ReactNode,
  ReactElement,
} from 'react';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import { IressCheckboxMark } from '../CheckboxMark';
import { useControlledState } from '@/hooks/useControlledState';
import { IressReadonly } from '../Readonly';
import { FormControlValue, IressStyledProps } from '@/types';
import { checkbox as checkboxStyles } from './Checkbox.styles';
import { css, cx } from '@/styled-system/css';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { getCheckboxGroupContext } from '../CheckboxGroup';
import { ReactHookFormCompatibleRef } from '@/interfaces';
import { GlobalCSSClass } from '@/enums';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { IressText } from '../Text';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';

export interface IressCheckboxProps<T = FormControlValue>
  extends Omit<IressStyledProps<'input'>, 'defaultValue' | 'value'> {
  /**
   * If true, the checkbox is selected.
   * Please use this when are rendering the checkbox in controlled mode.
   */
  checked?: boolean;

  /**
   * If true, the checkbox will be initially rendered as selected.
   * Please use this when are rendering the checkbox in uncontrolled mode.
   */
  defaultChecked?: boolean;

  /**
   * Sets whether the control is hidden. If it is within a checkbox group,
   * it will be overridden with the checkbox group's hiddenCheckbox setting.
   */
  hiddenControl?: boolean;

  /**
   * Visually hides the label (if set), label will still be read out by screenreaders.
   */
  hiddenLabel?: boolean;

  /**
   * If true, the checkbox will visually appear as indeterminate.
   */
  indeterminate?: boolean;

  /**
   * The name of the control, which is submitted with the form data.
   */
  name?: string;

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
   * The checkbox content
   */
  children?: ReactNode;

  /**
   * Add the button-like border and padding to checkbox when `touch` is true.
   */
  touch?: boolean;
}

const Checkbox = <T = FormControlValue,>(
  {
    checked: checkedProp,
    className,
    defaultChecked,
    hiddenControl,
    hiddenLabel,
    indeterminate: indeterminateProp,
    id,
    name: nameProp,
    onChange,
    value,
    children,
    readOnly,
    touch,
    'data-testid': dataTestId,
    ...restProps
  }: IressCheckboxProps<T>,
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
  const isHidden = checkboxGroup?.hiddenCheckbox ?? hiddenControl;
  const isTouch = checkboxGroup?.touch ?? touch;
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

  const styles = checkboxStyles.raw({
    hiddenControl: isHidden,
    hiddenLabel,
    touch: isTouch,
    checked,
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
          className={cx(css(styles.mark), GlobalCSSClass.FormElement)}
          checked={checked}
          indeterminate={indeterminate}
          data-testid={propagateTestid(dataTestId, 'checkboxMark')}
        />
        <IressText element="span" className={css(styles.labelSpan)}>
          {children}
        </IressText>
      </styled.label>
    </div>
  );
};

export const IressCheckbox = forwardRef(Checkbox) as <T = FormControlValue>(
  props: IressCheckboxProps<T> & {
    ref?: ForwardedRef<ReactHookFormCompatibleRef<HTMLInputElement>>;
  },
) => ReactElement;
