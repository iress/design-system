import classNames from 'classnames';
import {
  type FocusEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from 'react';
import { toArray } from '@helpers/formatting/toArray';
import { type FormControlValue } from '@/types';
import styles from './CheckboxGroup.module.scss';
import {
  type CheckboxGroupWithEnums,
  CheckboxGroupLayout,
  type CheckboxGroupRef,
  type IressCheckboxGroupProps,
  type CheckboxGroupContextValue,
} from './CheckboxGroup.types';
import { useControlledState } from '@/hooks/useControlledState';
import { useNoDefaultValueInForms } from '../Form/hooks/useNoDefaultValueInForms';
import { CheckboxGroupContext } from './CheckboxGroupContext';

export const IressCheckboxGroup = forwardRef<
  CheckboxGroupRef,
  IressCheckboxGroupProps
>(
  (
    {
      className,
      value: valueProp,
      defaultValue,
      children,
      layout = 'stack',
      onChange,
      onFocus,
      hiddenCheckbox,
      name,
      role = 'group',
      readonly,
      touch,
      ...wrapperProps
    },
    ref,
  ) => {
    useNoDefaultValueInForms({
      component: 'IressCheckboxGroup',
      defaultValue,
    });

    const { value, setValue, toggleValue } = useControlledState<
      FormControlValue[],
      FormControlValue
    >({
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
      focus: () => currentElement?.focus(),
      blur: () => currentElement?.blur(),
      input: currentElement,
      check: (checkboxValue: FormControlValue) => {
        toggleValue(checkboxValue, true);
      },
      reset: () => {
        setValue([]);
      },
    }));

    const context: CheckboxGroupContextValue = useMemo(
      () => ({
        hiddenCheckbox,
        name,
        onChange: (e, value) => {
          toggleValue(value, e.target.checked);
        },
        readonly,
        touch,
        value,
      }),
      [name, value, hiddenCheckbox, readonly, touch, toggleValue],
    );

    const handleFocus: FocusEventHandler<HTMLDivElement> = (e) => {
      onFocus?.(e);

      if (e.target === divRef.current) {
        divRef.current.querySelector('input')?.focus();
      }
    };

    return (
      <CheckboxGroupContext.Provider value={context}>
        <div
          {...wrapperProps}
          role={role}
          ref={divRef}
          className={classNames(
            className,
            styles.checkboxGroup,
            styles[layout],
            {
              [styles.readonly]: readonly,
            },
          )}
          onFocus={handleFocus}
        >
          {children}
        </div>
      </CheckboxGroupContext.Provider>
    );
  },
) as CheckboxGroupWithEnums;

IressCheckboxGroup.displayName = 'IressCheckboxGroup';

/** @deprecated The CheckboxGroupLayout enum will be removed in future versions of IDS. Please use the value directly. */
IressCheckboxGroup.Layout = CheckboxGroupLayout;
