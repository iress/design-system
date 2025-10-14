import { createContext, useMemo } from 'react';
import { toArray } from '@helpers/formatting/toArray';
import {
  type ButtonGroupContextValue,
  type IressButtonGroupProviderProps,
} from './ButtonGroup.types';
import { useControlledState } from '../../hooks/useControlledState';

export const ButtonGroupContext = createContext<
  ButtonGroupContextValue | undefined
>(undefined);

export const IressButtonGroupProvider = ({
  children,
  defaultSelected,
  multiple,
  onChange,
  selected: selectedProp,
}: IressButtonGroupProviderProps) => {
  const { value: selected, toggleValue: toggle } = useControlledState({
    component: 'IressButtonGroup',
    defaultValue: defaultSelected,
    multiple,
    onChange: (newValue) => {
      onChange?.({ selected: newValue });
    },
    propName: 'selected',
    value: selectedProp,
  });

  const context: ButtonGroupContextValue = useMemo(
    () => ({
      isActive: (item) => !!(item && toArray(selected).includes(item)),
      toggle,
      selected: toArray(selected),
    }),
    [toggle, selected],
  );

  return (
    <ButtonGroupContext.Provider value={context}>
      {children}
    </ButtonGroupContext.Provider>
  );
};
