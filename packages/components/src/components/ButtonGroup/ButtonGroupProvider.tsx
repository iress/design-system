import { Context, createContext, PropsWithChildren, useMemo } from 'react';
import { toArray } from '@helpers/formatting/toArray';
import {
  ControlledValue,
  useControlledState,
} from '../../hooks/useControlledState';
import { FormControlValue } from '@/types';

export interface ButtonGroupProviderProps<
  T = FormControlValue,
  TMultiple extends boolean = false,
> extends PropsWithChildren {
  defaultSelected?: ControlledValue<T, TMultiple>;
  multiple?: boolean;
  onChange?: (newSelected?: ControlledValue<T, TMultiple>) => void;
  selected?: ControlledValue<T, TMultiple>;
}

interface ButtonGroupContextValue<
  T = FormControlValue,
  TMultiple extends boolean = false,
> {
  isActive: (value?: T) => boolean;
  selected?: ControlledValue<T, TMultiple>;
  toggle?: (value?: T, flag?: boolean) => void;
}

function createButtonGroupContext<
  T = FormControlValue,
  TMultiple extends boolean = false,
>() {
  return createContext<ButtonGroupContextValue<T, TMultiple> | undefined>(
    undefined,
  );
}

// TODO: Is there a way to do this without casting?
export function getButtonGroupContext<
  T = FormControlValue,
  TMultiple extends boolean = false,
>() {
  return ButtonGroupContext as unknown as Context<
    ButtonGroupContextValue<T, TMultiple>
  >;
}

export const ButtonGroupContext = createButtonGroupContext();

export const ButtonGroupProvider = <
  T = FormControlValue,
  TMultiple extends boolean = false,
>({
  children,
  defaultSelected,
  multiple = false,
  onChange,
  selected: selectedProp,
}: ButtonGroupProviderProps<T, TMultiple>) => {
  const { value: selected, toggleValue: toggle } = useControlledState({
    component: 'IressButtonGroup',
    defaultValue: defaultSelected,
    multiple: multiple as TMultiple,
    onChange,
    propName: 'selected',
    value: selectedProp,
  });

  const context = useMemo(
    () => ({
      isActive: (item?: T) => !!(item && toArray<T>(selected).includes(item)),
      toggle,
      selected,
    }),
    [toggle, selected],
  );

  const { Provider } = getButtonGroupContext<T, TMultiple>();
  return <Provider value={context}>{children}</Provider>;
};
