import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { idsLogger } from '@helpers/utility/idsLogger';
import { toArray } from '@helpers/formatting/toArray';
import { type FormControlValue } from '../types';
import { capitalizeFirstLetter } from '@helpers/formatting/capitalizeFirstLetter';

export interface ControlledStateProps<T = FormControlValue> {
  component: string;
  defaultValue?: T;
  multiple?: boolean;
  onChange?: (selected?: T) => void;
  propName?: string;
  value?: T;
}

export interface ControlledStateHook<
  TValue = FormControlValue,
  TArrayValue = TValue,
> {
  value: TValue | undefined;
  setValue: (value?: TValue) => void;
  toggleValue: (value?: TArrayValue, flag?: boolean) => void;
  isControlled: boolean;
}

/**
 * Gets a new selected state based on the current state, whether to add or remove the value, and whether multiple values are allowed.
 *
 * @param {TArrayValue = FormControlValue} value The value to toggle, if working with multiple values this should be a single item inside it.
 * @param {TValue = FormControlValue | undefined} currentValues The current values to toggle from, used if working with multiple values.
 * @param {boolean} toggle Whether to toggle the value on or off. In multiple mode, it will add or remove the value. In single mode, it will set the value or unset it (returning undefined).
 * @param {boolean} multiple Set whether multiple values are allowed. If true, the return value will be an array.
 */
const toggleNewValue = <TValue = FormControlValue, TArrayValue = TValue>(
  value: TArrayValue,
  currentValues?: TValue,
  toggle?: boolean,
  multiple?: boolean,
): TValue | undefined => {
  if (multiple) {
    return toggle
      ? ([...toArray(currentValues), value] as TValue)
      : (toArray<TArrayValue>(currentValues as TArrayValue[]).filter(
          (currentValue) => currentValue !== value,
        ) as TValue);
  }

  return toggle ? (value as unknown as TValue) : undefined;
};

const resetUncontrolledValue = <TValue = FormControlValue>(
  setUncontrolled: (value: TValue | undefined) => void,
  previousValue?: TValue,
  nextValue?: TValue,
) => {
  if (previousValue !== undefined && nextValue === undefined) {
    setUncontrolled(undefined);
  }
};

/**
 * Allows you to return a controlled state or uncontrolled state, depending on the props passed.
 * It can also deal with the cases when an array of values is required.
 *
 * @param {ControlledValueProps<T>} props Allows you to set the initial selected value, the onChange callback, and whether multiple values are allowed (array).
 */
export const useControlledState = <
  TValue = FormControlValue,
  TArrayValue = TValue,
>({
  component,
  defaultValue,
  multiple,
  onChange,
  propName = 'value',
  value,
}: ControlledStateProps<TValue>): ControlledStateHook<TValue, TArrayValue> => {
  const previousValue = useRef<TValue | undefined>();
  const isControlled = useMemo(() => value !== undefined, [value]);
  const [uncontrolled, setUncontrolled] = useState<TValue | undefined>(
    multiple ? (toArray(defaultValue) as TValue) : defaultValue,
  );

  resetUncontrolledValue(setUncontrolled, previousValue.current, value);
  previousValue.current = value;

  useEffect(() => {
    if (value !== undefined && defaultValue !== undefined) {
      idsLogger(
        `${component}: Please use either the default${capitalizeFirstLetter(
          propName,
        )} prop for uncontrolled components, or the ${propName} prop for controlled components, rather than both. If you use both, the value of the component may become unpredictable.`,
        'warn',
      );
    }
  }, [value, defaultValue, component, propName]);

  const setValue = useCallback(
    (newValue?: TValue) => {
      if (!isControlled) setUncontrolled(newValue);
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  const toggleValue = useCallback(
    (newValue?: TArrayValue, flag?: boolean) => {
      const toggledValues = toggleNewValue(
        newValue,
        value ?? uncontrolled,
        flag,
        multiple,
      );
      if (!isControlled) setUncontrolled(toggledValues);
      onChange?.(toggledValues);
    },
    [isControlled, multiple, onChange, uncontrolled, value],
  );

  return {
    isControlled,
    setValue,
    toggleValue,
    value: value ?? uncontrolled,
  };
};
