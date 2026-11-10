import {
  type ChangeEvent,
  type Context,
  createContext,
  type FocusEventHandler,
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  type Ref,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useControlledState } from '@/hooks/useControlledState';

import { type ReactNode } from 'react';
import { type ReactHookFormCompatibleRef } from '@/interfaces';
import {
  type FormControlReadOnly,
  type FormControlValue,
  type IressStyledProps,
} from '@/types';
import { radioGroup } from './RadioGroup.styles';
import { cx } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';
import type { CheckboxVariants } from '../Checkbox';

export interface IressRadioGroupProps<T = FormControlValue> extends Omit<
  IressStyledProps,
  'onChange' | 'defaultValue'
> {
  /**
   * Content of the radio group, usually multiple `IressRadio` components.
   */
  children?: ReactNode;

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
  readOnly?: FormControlReadOnly;

  /**
   * Value of radio group when in controlled mode.
   */
  value?: T;

  /**
   * The visual variant of the radios in the group. This is passed down to child radios, but can be overridden at the individual radio level.
   * - `card`: Provides a larger, card-like style with a heading slot.
   * - `touch`: Provides a larger, button-like style, great for mobile devices.
   * - `undefined`: The default radio style.
   */
  variant?: CheckboxVariants;
}

export type RadioGroupContextValue<T = FormControlValue> = Pick<
  IressRadioGroupProps<T>,
  'name' | 'value' | 'required' | 'onChange' | 'readOnly' | 'variant'
>;

export interface RadioGroupRef extends ReactHookFormCompatibleRef<HTMLDivElement> {
  reset: () => void;
}

function createRadioGroupContext<T = FormControlValue>() {
  return createContext<RadioGroupContextValue<T> | undefined>(undefined);
}

// eslint-disable-next-line react-refresh/only-export-components -- keeping it here for context
export function getRadioGroupContext<T = FormControlValue>() {
  return RadioGroupContext as unknown as Context<
    RadioGroupContextValue<T> | undefined
  >;
}

// eslint-disable-next-line react-refresh/only-export-components -- Context export for use throughout the component tree
export const RadioGroupContext = createRadioGroupContext();

const RadioGroup = <T = FormControlValue,>(
  {
    children,
    className,
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
    variant,
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
      required,
      readOnly,
      onChange: (e, newValue) => {
        setValue(newValue);
        onChange?.(e, newValue);
      },
      variant,
    }),
    [name, value, required, readOnly, variant, setValue, onChange],
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
    if (e.relatedTarget && !divRef.current?.contains(e.relatedTarget)) {
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
          radioGroup({ layout }),
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

/**
 * Groups related radio buttons so users can select one option from a set.
 *
 * @example
 * ```tsx
 * import { IressRadioGroup, IressRadio } from '@iress-oss/ids-components';
 *
 * <IressRadioGroup name="choice">
 *   <IressRadio value="a">Option A</IressRadio>
 *   <IressRadio value="b">Option B</IressRadio>
 * </IressRadioGroup>
 * ```
 */
export const IressRadioGroup = forwardRef(RadioGroup) as (<
  T = FormControlValue,
>(
  props: IressRadioGroupProps<T> & { ref?: Ref<RadioGroupRef> },
) => ReactElement) & {
  displayName: 'IressRadioGroup';
};

IressRadioGroup.displayName = 'IressRadioGroup';
