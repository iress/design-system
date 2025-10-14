import { createContext, useMemo } from 'react';
import {
  type MenuContextValue,
  type MenuProviderProps,
  type MenuSelected,
} from './Menu.types';
import { toArray } from '@helpers/formatting/toArray';
import { useControlledState } from '@/hooks/useControlledState';

export const MenuContext = createContext<MenuContextValue | undefined>(
  undefined,
);

export const MenuProvider = ({
  changeOnBlur,
  children,
  defaultSelected,
  id,
  layout,
  multiSelect,
  nav = false,
  noWrap,
  onChange,
  role,
  selected: selectedProp,
}: MenuProviderProps) => {
  const hasArrowKeyNav = useMemo(
    () => role && ['menu', 'listbox'].includes(role),
    [role],
  );
  const supportsSelection = useMemo(
    () => role === 'listbox' || !!multiSelect,
    [role, multiSelect],
  );

  const { toggleValue: toggle, value: selected } =
    useControlledState<MenuSelected>({
      component: 'IressMenu',
      defaultValue: defaultSelected,
      multiple: multiSelect,
      onChange,
      propName: 'selected',
      value: selectedProp,
    });

  const context: MenuContextValue = useMemo(
    () => ({
      changeOnBlur: changeOnBlur && role === 'listbox',
      hasArrowKeyNav,
      id,
      isSelected: (value) =>
        value !== undefined && toArray(selected).includes(value),
      layout,
      multiSelect,
      noWrap,
      nav,
      role,
      selected,
      supportsSelection,
      toggle,
    }),
    [
      changeOnBlur,
      hasArrowKeyNav,
      id,
      layout,
      multiSelect,
      nav,
      noWrap,
      role,
      selected,
      supportsSelection,
      toggle,
    ],
  );

  return (
    <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
  );
};
