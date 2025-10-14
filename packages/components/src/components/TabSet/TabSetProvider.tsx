import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  type TabSetContextValue,
  type TabSetProviderProps,
  type TabSetItem,
  type TabSetRegisterItem,
} from './TabSet.types';
import { type FormControlValue } from '@/types';
import { idsLogger } from '@helpers/utility/idsLogger';

export const TabSetItemsContext = createContext<TabSetContextValue | undefined>(
  undefined,
);

export const TabSetProvider = ({
  children,
  onChange,
  defaultSelected,
  panel,
  selected: selectedProp,
}: TabSetProviderProps) => {
  const [items, setItems] = useState<TabSetItem[]>([]);
  const [uncontrolledSelected, setUncontrolledSelected] = useState<
    FormControlValue | undefined
  >(defaultSelected);

  const selected = selectedProp ?? uncontrolledSelected;
  const active = items.find(
    (item, index) => item.value === selected || index === selected,
  );

  useEffect(() => {
    if (selectedProp !== undefined && defaultSelected !== undefined) {
      idsLogger(
        'IressTabSet: Please use either the defaultSelected prop for uncontrolled components, or the selected prop for controlled components, rather than both. If you use both, the selected tab may become unpredictable.',
        'warn',
      );
    }
  }, [selectedProp, defaultSelected]);

  const register = useCallback((tab: TabSetRegisterItem) => {
    setItems((currentItems) => {
      if (
        currentItems.some(
          (item) => item.id === tab.id || item.value === tab.value,
        )
      ) {
        return currentItems;
      }

      const index = currentItems.length;

      setUncontrolledSelected((currentSelected) => {
        if (currentSelected !== undefined) return currentSelected;
        return tab.value ?? index;
      });

      return [...currentItems, { ...tab, index, value: tab.value ?? index }];
    });
  }, []);

  const context: TabSetContextValue = useMemo(
    () => ({
      items,
      active,
      panel,
      register,
      indexOf: (id, value) =>
        items.findIndex((item) => item.id === id || item.value === value),
      isActive: (id, value) => active?.id === id || active?.value === value,
      activate(index: number, value?: FormControlValue) {
        onChange?.({ index, value });
        setUncontrolledSelected(value ?? index);
      },
    }),
    [items, active, panel, register, onChange],
  );

  return (
    <TabSetItemsContext.Provider value={context}>
      {children}
    </TabSetItemsContext.Provider>
  );
};
