import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { idsLogger } from '@helpers/utility/idsLogger';
import { toArray } from '@helpers/formatting/toArray';
import { FormControlValue } from '../types';
import { capitalizeFirstLetter } from '@helpers/formatting/capitalizeFirstLetter';

export interface ControlledStateProps<
  T = FormControlValue,
  TMultiple extends boolean = false,
> {
  component: string;
  defaultValue?: ControlledValue<T, TMultiple>;
  multiple?: TMultiple;
  onChange?: (selected?: ControlledValue<T, TMultiple>) => void;
  propName?: string;
  value?: ControlledValue<T, TMultiple>;
}

export interface ControlledStateHook<
  T = FormControlValue,
  TMultiple extends boolean = false,
> {
  value: ControlledValue<T, TMultiple> | undefined;
  setValue: (value?: ControlledValue<T, TMultiple>) => void;
  toggleValue: (value?: T, flag?: boolean) => void;
  isControlled: boolean;
}

export type ControlledValue<
  T = FormControlValue,
  TMultiple extends boolean = false,
> = TMultiple extends true ? T[] : T;

/**
 * Gets a new selected state based on the current state, whether to add or remove the value, and whether multiple values are allowed.
 *
 * @param {TArrayValue = FormControlValue} value The value to toggle, if working with multiple values this should be a single item inside it.
 * @param {TValue = FormControlValue | undefined} currentValues The current values to toggle from, used if working with multiple values.
 * @param {boolean} toggle Whether to toggle the value on or off. In multiple mode, it will add or remove the value. In single mode, it will set the value or unset it (returning undefined).
 * @param {boolean} multiple Set whether multiple values are allowed. If true, the return value will be an array.
 */
const toggleNewValue = <
  T = FormControlValue,
  TMultiple extends boolean = false,
>(
  value?: T,
  currentValues?: T[],
  toggle?: boolean,
  multiple?: TMultiple,
): ControlledValue<T, TMultiple> | undefined => {
  if (multiple) {
    const newValues = toggle
      ? [...toArray(currentValues), value]
      : toArray(currentValues).filter((currentValue) => currentValue !== value);
    return newValues as ControlledValue<T, TMultiple>;
  }

  return toggle ? (value as ControlledValue<T, TMultiple>) : undefined;
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
 * If `TMultiple` is set to `true`, the value will be an array of values.
 *
 * @param {ControlledValueProps<T>} props Allows you to set the initial selected value, the onChange callback, and whether multiple values are allowed (array).
 */
export const useControlledState = <
  T = FormControlValue,
  TMultiple extends boolean = false,
>({
  component,
  defaultValue,
  multiple,
  onChange,
  propName = 'value',
  value,
}: ControlledStateProps<T, TMultiple>): ControlledStateHook<T, TMultiple> => {
  const previousValue = useRef<ControlledValue<T, TMultiple> | undefined>();
  const isControlled = useMemo(() => value !== undefined, [value]);
  const [uncontrolled, setUncontrolled] = useState<
    ControlledValue<T, TMultiple> | undefined
  >(
    multiple
      ? (toArray(defaultValue) as ControlledValue<T, TMultiple>)
      : defaultValue,
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
    (newValue?: ControlledValue<T, TMultiple>) => {
      if (!isControlled) setUncontrolled(newValue);
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  const toggleValue = useCallback(
    (newValue?: T, flag?: boolean) => {
      const toggledValues = toggleNewValue(
        newValue,
        toArray(value ?? uncontrolled) as T[],
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
