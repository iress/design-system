import {
  type FieldValues,
  type UseControllerProps,
  type FieldPath,
  type ControllerRenderProps,
  type FieldPathValue,
  type Control,
} from 'react-hook-form';
import {
  type IressFieldGroupProps,
  type IressFieldProps,
} from '@/components/Field';
import { type ReactNode } from 'react';

type OmittedFieldProps =
  | 'children'
  | 'htmlFor'
  | 'inline'
  | 'inputMode'
  | 'join'
  | 'required';

export interface CustomRuleWithMessage<T> {
  value: T;
  message: string;
}

export type CustomRules<T extends FieldValues = FieldValues> =
  UseControllerProps<T, FieldPath<T>>['rules'] & {
    email?: boolean | string;
    minDate?: Date | CustomRuleWithMessage<Date>;
    maxDate?: Date | CustomRuleWithMessage<Date>;
  };

export interface IressFormFieldProps<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>,
> extends Omit<IressFieldProps, OmittedFieldProps>,
    Omit<UseControllerProps<T, FieldPath<T>>, 'disabled' | 'shouldUnregister'> {
  /**
   * React Hook Form control object. It is used to register the field with the form.
   * It is automatically provided when used inside an `IressForm`, but it can be overridden if you are using a custom form control.
   *
   * [Learn more](https://react-hook-form.com/ts#Control)
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
   *
   * [Learn more](https://react-hook-form.com/api/useform/register)
   */
  rules?: CustomRules<T>;

  /**
   * Input will be unregistered after unmount and defaultValues will be removed as well (it will not be stored in the form state).
   * You can pass an object to keep some form state available after unregistering, such as dirty fields.
   *
   * [Learn more](https://react-hook-form.com/docs/usecontroller)
   */
  shouldUnregister?:
    | boolean
    | {
        keepDirty?: boolean;
        keepTouched?: boolean;
        keepIsValid?: boolean;
        keepError?: boolean;
      };

  /**
   * Text to be displayed instead of input field.
   */
  readOnly?: boolean;
}

export interface IressFormFieldsetProps<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>,
> extends Omit<IressFieldGroupProps, OmittedFieldProps>,
    Omit<UseControllerProps<T, FieldPath<T>>, 'disabled'> {
  /**
   * React Hook Form control object. It is used to register the field with the form.
   * It is automatically provided when used inside an `IressForm`, but it can be overridden if you are using a custom form control.
   *
   * [Learn more](https://react-hook-form.com/ts#Control)
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
   */
  render: (field: FormFieldRenderProps<T>) => ReactNode;

  /**
   * Validation rules, including: required, min, max, minLength, maxLength, pattern, validate
   *
   * [Learn more](https://react-hook-form.com/api/useform/register)
   */
  rules?: CustomRules<T>;

  /**
   * Input will be unregistered after unmount and defaultValues will be removed as well (it will not be stored in the form state).
   *
   * [Learn more](https://react-hook-form.com/docs/usecontroller)
   */
  shouldUnregister?: boolean;
}

export interface FormFieldRenderProps<T extends FieldValues>
  extends ControllerRenderProps<T, FieldPath<T>> {
  /**
   * ID of the field. It is automatically generated based on the name of the field and its parent form.
   */
  id: string;
}

export enum FormFieldErrorMessages {
  required = 'Please fill out this field',
  maxLength = 'Please shorten this text to {{attrValue}} characters or less',
  minLength = 'Please lengthen this text to {{attrValue}} characters or more',
  max = 'Please enter a value less than or equal to {{attrValue}}',
  min = 'Please enter a value greater than or equal to {{attrValue}}',
  minDate = 'Please enter a date that is on or after {{attrValue}}',
  maxDate = 'Please enter a date that is on or before {{attrValue}}',
  pattern = 'Please match the requested format',
  email = 'Please enter a valid email address',
  validate = 'Please enter a valid value',
}

export type FormFieldErrorType = keyof typeof FormFieldErrorMessages;
