import {
  createContext,
  type MutableRefObject,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { type FormControlValue } from '@/types';
import { useControlledState } from '@/hooks';

export interface TabSetContextValue {
  activate: (node?: HTMLElement | null) => void;
  active?: HTMLElement;
  hover?: HTMLElement;
  isActive: (node?: HTMLElement | null) => boolean;
  layoutVersion: number;
  panel: HTMLDivElement | null;
  register: (node: HTMLElement, value?: FormControlValue) => void;
  setHover: (node?: HTMLElement) => void;
  unregister: (node: HTMLElement) => void;
  type?: 'primary' | 'secondary';
}

export interface TabSetProviderProps extends PropsWithChildren {
  defaultSelected?: FormControlValue;
  hoverIndicator?: MutableRefObject<HTMLElement | null>;
  onChange?: (event: TabSetChangedEventDetail) => void;
  panel: HTMLDivElement | null;
  selected?: FormControlValue;
  type?: 'primary' | 'secondary';
}

export interface TabSetChangedEventDetail {
  /**
   * The index of the tab that was selected.
   */
  index: number;

  /**
   * The value of the tab that was selected.
   * If the tab does not have a value, this will be the same as `index`.
   */
  value?: FormControlValue;
}

// eslint-disable-next-line react-refresh/only-export-components -- Keeps the context in the same place as the provider
export const TabSetContext = createContext<TabSetContextValue | undefined>(
  undefined,
);

export const TabSetProvider = ({
  children,
  defaultSelected,
  onChange,
  panel,
  selected: selectedProp,
  type,
}: TabSetProviderProps) => {
  const [hover, setHover] = useState<HTMLElement | undefined>();
  const [nodes, setNodes] = useState(() => new Set<HTMLElement>());
  const [values, setValues] = useState(
    () => new Map<number, FormControlValue>(),
  );
  const [layoutVersion, setLayoutVersion] = useState(0);
  const { value: selected, setValue: setSelected } = useControlledState({
    component: 'IressTabSet',
    defaultValue: defaultSelected,
    propName: 'selected',
    value: selectedProp,
  });

  const active = useMemo(
    () =>
      [...nodes].find(
        (_node, index) =>
          (values.has(index) && values.get(index) === selected) ||
          index === selected,
      ),
    [nodes, selected, values],
  );

  const register = useCallback(
    (node: HTMLElement, value?: FormControlValue) => {
      setNodes((prevSet) => {
        if (prevSet.has(node)) {
          if (value !== undefined) {
            const nodeIndex = [...prevSet].indexOf(node);
            setValues((prevValues) => {
              const newValues = new Map(prevValues);
              newValues.set(nodeIndex, value);
              return newValues;
            });
          }
          return prevSet;
        }

        const newSet = new Set(prevSet).add(node);
        const nodeIndex = [...newSet].indexOf(node);

        if (value !== undefined) {
          setValues((prevValues) => {
            const newValues = new Map(prevValues);
            newValues.set(nodeIndex, value);
            return newValues;
          });
        }

        return newSet;
      });
      setLayoutVersion((v) => v + 1);
    },
    [],
  );

  const unregister = useCallback((node: HTMLElement) => {
    setNodes((prevSet) => {
      const newSet = new Set(prevSet);
      const nodeIndex = [...newSet].indexOf(node);
      newSet.delete(node);

      setValues((prevValues) => {
        if (!prevValues.has(nodeIndex)) return prevValues;
        const newValues = new Map(prevValues);
        newValues.delete(nodeIndex);
        return newValues;
      });

      return newSet;
    });
    setLayoutVersion((v) => v + 1);
    setHover((currentHover) =>
      currentHover === node ? undefined : currentHover,
    );
  }, []);

  useEffect(() => {
    if (selected === undefined && !!nodes.size) {
      setSelected(values.get(0) ?? 0);
    }
  }, [nodes, selected, setSelected, values]);

  const context: TabSetContextValue = useMemo(
    () => ({
      active,
      activate(node) {
        if (!node) return;
        const index = [...nodes].indexOf(node);
        const value = values.get(index);
        onChange?.({ index, value });
        setSelected(value ?? index);
      },
      isActive: (node) => (node ? active === node : false),
      hover,
      layoutVersion,
      panel,
      register,
      setHover: (node?: HTMLElement) => {
        setHover(node);
      },
      unregister,
      type,
    }),
    [
      active,
      hover,
      layoutVersion,
      panel,
      register,
      unregister,
      type,
      nodes,
      values,
      onChange,
      setSelected,
    ],
  );

  return (
    <TabSetContext.Provider value={context}>{children}</TabSetContext.Provider>
  );
};

TabSetProvider.displayName = 'TabSetProvider';
