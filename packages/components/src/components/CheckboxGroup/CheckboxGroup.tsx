import {
  type FocusEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
  type ReactNode,
  createContext,
  type ForwardedRef,
  type ReactElement,
} from 'react';
import { toArray } from '@helpers/formatting/toArray';
import { type FormControlValue, type IressStyledProps } from '@/types';
import { useControlledState } from '@/hooks/useControlledState';
import { checkboxGroup } from './CheckboxGroup.styles';
import { cx } from '@/styled-system/css';
import { type IressCheckboxProps } from '../Checkbox/Checkbox';
import { type ReactHookFormCompatibleRef } from '@/interfaces';
import { GlobalCSSClass } from '@/enums';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';

export interface IressCheckboxGroupProps<T = FormControlValue>
  extends Omit<IressStyledProps, 'defaultValue' | 'onChange' | 'color'> {
  /**
   * Content to be displayed inside the group, usually multiple `IressCheckbox`.
   */
  children?: ReactNode;

  /**
   * Value of checkbox group when in uncontrolled mode.
   */
  defaultValue?: T | T[];

  /**
   * Hides the checkbox controls to allow the creation of custom checkboxes.
   */
  hiddenCheckbox?: boolean;

  /**
   * Sets which of the block / inline layout options apply.
   * @default 'stack'
   */
  layout?: 'stack' | 'block' | 'inline';

  /**
   * Name to be applied to all checkboxes in the group.
   */
  name?: string;

  /**
   * Called with collated new value when a user toggles one of its children checkboxes.
   */
  onChange?: (value?: T[]) => void;

  /**
   * Renders the group in a read-only state.
   */
  readOnly?: boolean;

  /**
   * Value of checkbox group when in controlled mode.
   */
  value?: T | T[];

  /**
   * Add the button-like border and padding to checkbox when `touch` is true.
   */
  touch?: boolean;
}

export interface CheckboxGroupRef<T = FormControlValue>
  extends ReactHookFormCompatibleRef<HTMLDivElement> {
  check: (checked: T) => void;
  reset: () => void;
}

export type CheckboxGroupContextValue<T = FormControlValue> = Pick<
  IressCheckboxGroupProps<T>,
  'name' | 'hiddenCheckbox' | 'readOnly' | 'touch'
> &
  Pick<IressCheckboxProps<T>, 'onChange'> & {
    value: T[];
  };

function createCheckboxGroupContext<T = FormControlValue>() {
  return createContext<CheckboxGroupContextValue<T> | undefined>(undefined);
}

// eslint-disable-next-line react-refresh/only-export-components -- keeping it here for context
export function getCheckboxGroupContext<T = FormControlValue>() {
  return CheckboxGroupContext as unknown as React.Context<
    CheckboxGroupContextValue<T>
  >;
}

export const CheckboxGroupContext = createCheckboxGroupContext();

const CheckboxGroup = <T = FormControlValue,>(
  {
    className,
    value: valueProp,
    defaultValue,
    children,
    layout = 'stack',
    onBlur,
    onChange,
    onFocus,
    hiddenCheckbox,
    name,
    role = 'group',
    readOnly,
    touch,
    ...restProps
  }: IressCheckboxGroupProps<T>,
  ref: ForwardedRef<CheckboxGroupRef<T>>,
) => {
  useNoDefaultValueInForms({
    component: 'IressCheckboxGroup',
    defaultValue,
  });

  const { value, setValue, toggleValue } = useControlledState<T, true>({
    component: 'IressCheckbox',
    defaultValue:
      defaultValue === undefined ? undefined : toArray(defaultValue),
    multiple: true,
    onChange,
    value: valueProp === undefined ? undefined : toArray(valueProp),
  });

  // Refs
  const divRef = useRef<HTMLDivElement>(null);
  const currentElement = divRef.current;

  useImperativeHandle(ref, () => ({
    // React hook form requires the focus, blur, input
    focus: () => currentElement?.querySelector('input')?.focus(),
    blur: () => currentElement?.blur(),
    input: currentElement,

    // Custom methods allowing you to interact with an uncontrolled checkbox group
    check: (checkboxValue) => toggleValue(checkboxValue, true),
    reset: () => setValue([]),
  }));

  const context: CheckboxGroupContextValue<T> = useMemo(
    () => ({
      hiddenCheckbox,
      name,
      onChange: (_e, checked, value) => toggleValue(value, checked),
      readOnly,
      touch,
      value: value ?? [],
    }),
    [name, value, hiddenCheckbox, readOnly, touch, toggleValue],
  );

  const handleFocus: FocusEventHandler<HTMLDivElement> = (e) => {
    onFocus?.(e);

    if (e.target === divRef.current) {
      divRef.current.querySelector('input')?.focus();
    }
  };

  const handleBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    // Only trigger onBlur if the focus is leaving the group
    // and not just moving between checkboxes within the group.
    if (e.relatedTarget && !divRef.current?.contains(e.relatedTarget as Node)) {
      onBlur?.(e);
    }
  };

  const { Provider } = getCheckboxGroupContext<T>();
  return (
    <Provider value={context}>
      <div
        {...restProps}
        role={role}
        ref={divRef}
        className={cx(
          className,
          checkboxGroup({ layout, readOnly }),
          GlobalCSSClass.CheckboxGroup,
        )}
        onBlur={handleBlur}
        onFocus={handleFocus}
      >
        {children}
      </div>
    </Provider>
  );
};

export const IressCheckboxGroup = forwardRef(CheckboxGroup) as <
  T = FormControlValue,
>(
  props: IressCheckboxGroupProps<T> & {
    ref?: ForwardedRef<CheckboxGroupRef<T>>;
  },
) => ReactElement;
