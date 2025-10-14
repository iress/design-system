import { type ReactNode, useContext, useEffect, useMemo, useRef } from 'react';
import {
  type Control,
  type ControllerRenderProps,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form';
import {
  type FormFieldErrorType,
  getErrorTypeMessage,
} from './helpers/getErrorTypeMessage';
import { FormContext } from '../FormContext';
import {
  type CustomRules,
  transformCustomRulesToValidateRule,
} from './helpers/transformCustomRulesToValidateRule';
import { IressField, type IressFieldProps } from '@/components/Field';
import { type ReactHookFormCompatibleRef } from '@/interfaces';
import { useFieldRenderProps } from './hooks/useFieldRenderProps';

export interface IressFormFieldProps<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>,
> extends Omit<IressFieldProps, 'children' | 'htmlFor' | 'required'>,
    Omit<UseControllerProps<T, FieldPath<T>>, 'disabled'> {
  /**
   * React Hook Form control object. It is used to register the field with the form.
   * It is automatically provided when used inside an `IressForm`, but it can be overridden if you are using a custom form control.
   * @see https://react-hook-form.com/ts#Control
   */
  control?: Control<T>;

  /**
   * A default value for the field. Although this is provided here as it is part of the React Hook Form API, it is recommended to set the default value in the form's `defaultValues` prop, to ensure the form is correctly initialised.
   */
  defaultValue?: FieldPathValue<T, TName>;

  /**
   * Name of the field. It is used to identify the field in the form. It must be unique within the form.
   */
  name: FieldPath<T>;

  /**
   * Render function to provide the control for the field.
   * To ensure the field is correctly registered with the form, the control must be passed as props to the rendered component.
   * (eg. `render={field => <IressInput {...field} />}`)
   */
  render: (field: FormFieldRenderProps<T>) => ReactNode;

  /**
   * Validation rules, including: required, min, max, minLength, maxLength, pattern, validate
   * @see https://react-hook-form.com/api/useform/register)
   */
  rules?: CustomRules<T>;

  /**
   * Input will be unregistered after unmount and defaultValues will be removed as well (it will not be stored in the form state).
   * @see https://react-hook-form.com/docs/usecontroller
   */
  shouldUnregister?: boolean;

  /**
   * Text to be displayed instead of input field.
   */
  readOnly?: boolean;
}

/**
 * Props for the `IressFormField` `render` prop.
 */
export interface FormFieldRenderProps<T extends FieldValues>
  extends ControllerRenderProps<T, FieldPath<T>> {
  /**
   * ID of the field. It is automatically generated based on the name of the field and its parent form.
   */
  id: string;
}

/**
 * A `IressField` wrapper that can show error message and label automatically inside an `IressForm`.
 * It uses the `useController` hook from `react-hook-form` for form management.
 */
export const IressFormField = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  render,
  rules: withCustomRules,
  shouldUnregister,
  readOnly,
  ...fieldProps
}: IressFormFieldProps<T>) => {
  const form = useContext(FormContext);
  const fieldRef = useRef<ReactHookFormCompatibleRef | null>(null);

  if (!form) {
    throw new Error(
      'IressFormField must be used inside an IressForm. If you need a standalone field, use IressField instead.',
    );
  }

  const rules = useMemo(() => {
    if (readOnly) return undefined;
    return withCustomRules
      ? transformCustomRulesToValidateRule(withCustomRules)
      : undefined;
  }, [readOnly, withCustomRules]);

  const { field, fieldState } = useController<T>({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  });

  const errorMessage = useMemo(
    () =>
      fieldState.error
        ? getErrorTypeMessage(
            fieldState.error?.message,
            fieldState.error?.type as FormFieldErrorType,
            withCustomRules,
          )
        : '',
    [fieldState.error, withCustomRules],
  );

  useEffect(() => {
    if (!readOnly) {
      form.setErrorMessage(name, errorMessage);
    } else {
      form.setErrorMessage(name, '');
    }
  }, [errorMessage, form, name, readOnly]);

  const renderField = useFieldRenderProps<T>(field, fieldRef);

  return (
    <IressField
      errorMessages={
        errorMessage && !readOnly ? [{ message: errorMessage }] : undefined
      }
      readOnly={readOnly}
      required={!!rules?.required}
      htmlFor={`${form.id}__${name}`}
      {...fieldProps}
    >
      {render({
        ...renderField,
        id: `${form.id}__${name}`,
      })}
    </IressField>
  );
};
