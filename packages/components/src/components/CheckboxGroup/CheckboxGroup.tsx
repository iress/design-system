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
import {
  type FormControlReadOnly,
  type FormControlValue,
  type IressStyledProps,
} from '@/types';
import { useControlledState } from '@/hooks/useControlledState';
import { checkboxGroup } from './CheckboxGroup.styles';
import { cx } from '@/styled-system/css';
import type {
  IressCheckboxProps,
  CheckboxVariants,
} from '../Checkbox/Checkbox';
import { type ReactHookFormCompatibleRef } from '@/interfaces';
import { GlobalCSSClass } from '@/enums';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';

export interface IressCheckboxGroupProps<T = FormControlValue> extends Omit<
  IressStyledProps,
  'defaultValue' | 'onChange' | 'color'
> {
  /**
   * Content to be displayed inside the group, usually multiple `IressCheckbox`.
   */
  children?: ReactNode;

  /**
   * Value of checkbox group when in uncontrolled mode.
   */
  defaultValue?: T | T[];

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
  readOnly?: FormControlReadOnly;

  /**
   * Value of checkbox group when in controlled mode.
   */
  value?: T | T[];

  /**
   * The visual variant of the checkboxes in the group. This is passed down to child checkboxes, but can be overridden at the individual checkbox level.
   * - `card`: Provides a larger, card-like style with a heading slot.
   * - `touch`: Provides a larger, button-like style, great for mobile devices.
   * - `undefined`: The default checkbox style.
   */
  variant?: CheckboxVariants;
}

export interface CheckboxGroupRef<
  T = FormControlValue,
> extends ReactHookFormCompatibleRef<HTMLDivElement> {
  check: (checked: T) => void;
  reset: () => void;
}

export type CheckboxGroupContextValue<T = FormControlValue> = Pick<
  IressCheckboxGroupProps<T>,
  'name' | 'readOnly' | 'variant'
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

// eslint-disable-next-line react-refresh/only-export-components -- Context export for use throughout the component tree
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
    name,
    role = 'group',
    readOnly,
    variant,
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
      name,
      onChange: (_e, checked, value) => toggleValue(value, checked),
      readOnly,
      value: value ?? [],
      variant,
    }),
    [name, readOnly, value, variant, toggleValue],
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
    if (e.relatedTarget && !divRef.current?.contains(e.relatedTarget)) {
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
          checkboxGroup({ layout, readOnly: !!readOnly }),
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

/**
 * Groups related checkboxes so users can select multiple options from a set.
 *
 * @example
 * ```tsx
 * import { IressCheckboxGroup, IressCheckbox } from '@iress-oss/ids-components';
 *
 * <IressCheckboxGroup name="options">
 *   <IressCheckbox value="a">Option A</IressCheckbox>
 *   <IressCheckbox value="b">Option B</IressCheckbox>
 * </IressCheckboxGroup>
 * ```
 */
export const IressCheckboxGroup = forwardRef(CheckboxGroup) as (<
  T = FormControlValue,
>(
  props: IressCheckboxGroupProps<T> & {
    ref?: ForwardedRef<CheckboxGroupRef<T>>;
  },
) => ReactElement) & {
  displayName: 'IressCheckboxGroup';
};

IressCheckboxGroup.displayName = 'IressCheckboxGroup';
