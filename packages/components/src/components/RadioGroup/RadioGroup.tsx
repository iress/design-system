import classNames from 'classnames';
import {
  type IressRadioGroupProps,
  type RadioGroupWithEnums,
  RadioGroupLayout,
  type RadioGroupContextValue,
  type RadioGroupRef,
} from './RadioGroup.types';
import styles from './RadioGroup.module.scss';
import {
  type FocusEventHandler,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useControlledState } from '@/hooks/useControlledState';
import { RadioGroupContext } from './RadioGroupContext';
import { useNoDefaultValueInForms } from '../Form/hooks/useNoDefaultValueInForms';

/**
 * Determines whether the RadioGroup's onBlur handler should fire.
 * Returns false if focus stays inside the group, true otherwise.
 */
export function shouldFireRadioGroupBlur(
  radioGroupElement: HTMLElement | null,
  newFocusTarget: Node | null,
  eventTarget: EventTarget | null,
): boolean {
  // Focus stays inside the group
  if (
    radioGroupElement &&
    newFocusTarget &&
    radioGroupElement.contains(newFocusTarget)
  ) {
    return false;
  }

  // Focus moves to browser UI - only fire if blur originated from the group container
  if (!newFocusTarget) {
    return eventTarget === radioGroupElement;
  }

  // Focus moves outside
  return true;
}

export const IressRadioGroup: RadioGroupWithEnums = forwardRef<
  RadioGroupRef,
  IressRadioGroupProps
>(
  (
    {
      children,
      className,
      hiddenRadio,
      layout = 'stack',
      name,
      onChange,
      onFocus,
      onBlur,
      required,
      role = 'radiogroup',
      defaultValue,
      readonly,
      value: valueProp,
      touch,
      ...restProps
    }: IressRadioGroupProps,
    ref,
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

    const context: RadioGroupContextValue = useMemo(
      () => ({
        name,
        value,
        hiddenRadio,
        required,
        readonly,
        touch,
        onChange: (e, newValue) => {
          setValue(newValue);
          onChange?.(e, newValue);
        },
      }),
      [name, value, hiddenRadio, required, readonly, setValue, onChange, touch],
    );

    useImperativeHandle(ref, () => ({
      // React hook form requires the focus, blur, input
      focus: () => currentElement?.focus(),
      blur: () => currentElement?.blur(),
      input: currentElement,
      reset: () => setValue(undefined),
    }));

    const handleFocus: FocusEventHandler<HTMLDivElement> = (e) => {
      onFocus?.(e);
      if (e.target === divRef.current) {
        divRef.current.querySelector('input')?.focus();
      }
    };

    // Uses pure helper for focus transition decision (testable in isolation)
    const handleBlur: FocusEventHandler<HTMLDivElement> = (e) => {
      if (
        shouldFireRadioGroupBlur(
          divRef.current,
          e.relatedTarget as Node | null,
          e.target,
        )
      ) {
        onBlur?.(e);
      }
    };

    return (
      <RadioGroupContext.Provider value={context}>
        <div
          {...restProps}
          ref={divRef}
          role={role}
          className={classNames(className, styles.radioGroup, {
            [styles[layout]]: !!layout,
          })}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
) as RadioGroupWithEnums;

IressRadioGroup.displayName = 'IressRadioGroup';

/** @deprecated IressRadioGroup.Layout will be removed in future versions of IDS. Please use the value directly. */
IressRadioGroup.Layout = RadioGroupLayout;
