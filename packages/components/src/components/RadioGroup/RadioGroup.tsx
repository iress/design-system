import {
  ChangeEvent,
  Context,
  createContext,
  FocusEventHandler,
  ForwardedRef,
  forwardRef,
  ReactElement,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useControlledState } from '@/hooks/useControlledState';

import { ReactNode } from 'react';
import { ReactHookFormCompatibleRef } from '@/interfaces';
import { FormControlValue, IressStyledProps } from '@/types';
import { radioGroup } from './RadioGroup.styles';
import { cx } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';

export interface IressRadioGroupProps<T = FormControlValue>
  extends Omit<IressStyledProps, 'onChange' | 'defaultValue'> {
  /**
   * Content of the radio group, usually multiple `IressRadio` components.
   */
  children?: ReactNode;

  /**
   * Hides the radio control to allow the creation of custom radio buttons.
   */
  hiddenRadio?: boolean;

  /**
   * Sets which of the block / inline layout options apply.
   * @default 'stack'
   */
  layout?: 'stack' | 'block' | 'inline' | 'inlineFlex' | 'inlineEqualWidth';

  /**
   * Name to be applied to all radios in the group.
   */
  name?: string;

  /**
   * Called when a user selects one of its children radio buttons.
   * If you pass in a non-string value, you can access it using the second parameter of the function.
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>, value?: T) => void;

  /**
   * When true, marks the field as required
   */
  required?: boolean;

  /**
   * Initial value of radio group when in uncontrolled mode.
   */
  defaultValue?: T;

  /**
   * Renders a readOnly radio group.
   */
  readOnly?: boolean;

  /**
   * Value of radio group when in controlled mode.
   */
  value?: T;

  /**
   * Add the button-like border and padding to radio when `touch` is true.
   */
  touch?: boolean;
}

export type RadioGroupContextValue<T = FormControlValue> = Pick<
  IressRadioGroupProps<T>,
  | 'name'
  | 'value'
  | 'hiddenRadio'
  | 'required'
  | 'onChange'
  | 'readOnly'
  | 'touch'
>;

export interface RadioGroupRef
  extends ReactHookFormCompatibleRef<HTMLDivElement> {
  reset: () => void;
}

function createRadioGroupContext<T = FormControlValue>() {
  return createContext<RadioGroupContextValue<T> | undefined>(undefined);
}

// TODO: Is there a way to do this without casting?
export function getRadioGroupContext<T = FormControlValue>() {
  return RadioGroupContext as unknown as Context<
    RadioGroupContextValue<T> | undefined
  >;
}

export const RadioGroupContext = createRadioGroupContext();

const RadioGroup = <T = FormControlValue,>(
  {
    children,
    className,
    hiddenRadio,
    layout = 'stack',
    name,
    onBlur,
    onChange,
    onFocus,
    required,
    role = 'radiogroup',
    defaultValue,
    readOnly,
    value: valueProp,
    touch,
    ...restProps
  }: IressRadioGroupProps<T>,
  ref: ForwardedRef<RadioGroupRef>,
) => {
  useNoDefaultValueInForms({
    component: 'IressRadioGroup',
    defaultValue,
  });

  const divRef = useRef<HTMLDivElement>(null);
  const currentElement = divRef.current;

  const { value, setValue } = useControlledState({
    component: 'IressRadioGroup',
    defaultValue,
    value: valueProp,
  });

  const context: RadioGroupContextValue<T> = useMemo(
    () => ({
      name,
      value,
      hiddenRadio,
      required,
      readOnly,
      touch,
      onChange: (e, newValue) => {
        setValue(newValue);
        onChange?.(e, newValue);
      },
    }),
    [name, value, hiddenRadio, required, readOnly, setValue, onChange, touch],
  );

  useImperativeHandle(ref, () => ({
    // React hook form requires the focus, blur, input
    focus: () => currentElement?.querySelector('input')?.focus(),
    blur: () => currentElement?.querySelector('input')?.blur(),
    input: currentElement,
    reset: () => setValue(undefined),
  }));

  const handleFocus: FocusEventHandler<HTMLDivElement> = (e) => {
    onFocus?.(e);

    if (e.target === divRef.current) {
      divRef.current.querySelector('input')?.focus();
    }
  };

  const handleBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    // Only trigger onBlur if the focus is leaving the group
    // and not just moving between radios within the group.
    if (e.relatedTarget && !divRef.current?.contains(e.relatedTarget as Node)) {
      onBlur?.(e);
    }
  };

  const { Provider } = getRadioGroupContext<T>();
  return (
    <Provider value={context}>
      <styled.div
        {...restProps}
        ref={divRef}
        role={role}
        className={cx(
          className,
          radioGroup({ layout, hiddenRadio }),
          GlobalCSSClass.RadioGroup,
        )}
        onBlur={handleBlur}
        onFocus={handleFocus}
      >
        {children}
      </styled.div>
    </Provider>
  );
};

export const IressRadioGroup = forwardRef(RadioGroup) as <T = FormControlValue>(
  props: IressRadioGroupProps<T> & { ref?: Ref<RadioGroupRef> },
) => ReactElement;
