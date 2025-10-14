import { default as classnames } from 'classnames';
import {
  type ChangeEvent,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { GlobalCSSClass } from '@/enums';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import { type CheckboxRef, type IressCheckboxProps } from './Checkbox.types';
import { IressCheckboxMark } from '../CheckboxMark';
import { type InputElementType } from '../Input';
import styles from '../Checkbox/Checkbox.module.scss';
import { useControlledState } from '@/hooks/useControlledState';
import { IressReadonly } from '../Readonly';
import { useNoDefaultValueInForms } from '../Form/hooks/useNoDefaultValueInForms';
import { CheckboxGroupContext } from '../CheckboxGroup/CheckboxGroupContext';
import { toArray } from '../../helpers/formatting/toArray';
import { type FormControlValue } from '@/types';

const Checkbox = (
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
    ...restProps
  }: IressCheckboxProps,
  ref: React.ForwardedRef<CheckboxRef>,
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
  const checkboxGroup = useContext(CheckboxGroupContext);
  const uncontrolledChecked = checkboxGroup ? undefined : defaultChecked;
  const controlledChecked = checkboxGroup
    ? toArray<FormControlValue | undefined>(checkboxGroup.value).includes(value)
    : checkedProp;
  const isHidden = checkboxGroup?.hiddenCheckbox ?? hiddenControl;
  const isTouch = checkboxGroup?.touch ?? touch;
  const isReadonly = checkboxGroup?.readonly ?? readOnly;
  const name = checkboxGroup?.name ?? nameProp;

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
    (e: ChangeEvent<InputElementType>): void => {
      if (!isControlled) {
        setIsIndeterminate(false);
      }
      setChecked(e.target.checked);
      onChange?.(e, value);
      checkboxGroup?.onChange?.(e, value);
    },
    [checkboxGroup, isControlled, onChange, setChecked, value],
  );

  // Public api for consumers
  useImperativeHandle(ref, () => ({
    // React hook form requires the focus, blur, input
    focus: () => currentElement?.focus(),
    blur: () => currentElement?.blur(),
    input: currentElement,
    check: (checked) => {
      // it's only works for uncontrolled component
      setChecked(checked);
    },
    reset: () => {
      // it's only works for uncontrolled component
      setChecked(false);
    },
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

  return (
    <div
      className={classnames(className, {
        [GlobalCSSClass.FormElement]: true,
        [styles.checkbox]: true,
        [styles.checked]: checked,
        [styles.hiddenControl]: isHidden,
        [styles.hiddenLabel]: hiddenLabel,
        [styles.indeterminate]: indeterminate,
        [styles.touch]: isTouch,
      })}
    >
      <input
        {...restProps}
        value={getFormControlValueAsString(value)}
        type="checkbox"
        id={inputId}
        defaultChecked={isControlled ? undefined : checked}
        checked={isControlled ? checked : undefined}
        className={classnames(styles.input, GlobalCSSClass.SROnly)}
        onChange={handleChange}
        ref={inputRef}
        name={name}
      />
      <label
        htmlFor={inputId}
        className={classnames({
          [styles.label]: true,
        })}
      >
        {!isHidden && (
          <IressCheckboxMark
            className={styles.mark}
            checked={checked}
            indeterminate={indeterminate}
          />
        )}
        <span
          className={classnames(styles.labelSpan, {
            [GlobalCSSClass.SROnly]: hiddenLabel,
          })}
        >
          {children}
        </span>
      </label>
    </div>
  );
};

export const IressCheckbox = forwardRef<CheckboxRef, IressCheckboxProps>(
  Checkbox,
);

IressCheckbox.displayName = 'IressCheckbox';
