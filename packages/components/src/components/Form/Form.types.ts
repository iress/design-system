import { type GutterSize, type HeadingLevel } from '@/enums';
import { type IressFormHTMLAttributes } from '@/interfaces';
import {
  type DefaultValues,
  type FieldValues,
  type SubmitErrorHandler,
  type UseControllerProps,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';
import { type ReactNode } from 'react';
import { type GutterSizes } from '@/types';

type GenericFieldProps<T extends FieldValues> = UseControllerProps<T>;

export type CombinedProps<T extends FieldValues> = GenericFieldProps<T> &
  UseControllerProps<T> &
  FieldControllerProps;

/** @deprecated FormDefaultText is deprecated and will be removed in a future version. Please use the value directly instead. */
export enum FormDefaultText {
  InvalidValue = '{{fieldName}} value is not valid',
  InvalidFormat = '{{fieldName}} is not in a valid format',
  RangeOverflow = '{{fieldName}} must be {{attrValue}} or lower',
  RangeUnderflow = '{{fieldName}} must be {{attrValue}} or more',
  TooLong = '{{fieldName}} is too long. Must not exceed {{attrValue}} characters',
  TooShort = '{{fieldName}} is too short. Must be at least {{attrValue}} characters long',
  ValueMissing = '{{fieldName}} is a required field',
  ErrorSummaryHeading = 'There was a problem submitting this form',
}

export interface IressHookFormProps<T extends FieldValues, TContext = object>
  extends Omit<
    IressFormHTMLAttributes,
    'defaultValue' | 'onSubmit' | 'onError'
  > {
  /**
   * Section to place error summary when the app is in control of validation.
   */
  alert?: React.ReactNode;

  /**
   * The content of the form, usually multiple `IressFormField` or `IressFormFieldset` components.
   */
  children?: React.ReactNode;

  /**
   * Content to be displayed in the title of the error summary.
   * @default <h3>There was a problem submitting this form</h3>
   */
  errorSummaryHeading?: ReactNode;

  /**
   * Text to be displayed in the title of the error summary.
   * @deprecated Use errorSummaryHeading instead.
   */
  errorSummaryHeadingText?: string;

  /**
   * Level of error summary heading for semantics.
   * @deprecated Use errorSummaryHeading instead.
   */
  errorSummaryHeadingLevel?: HeadingLevel;

  /**
   * Sets the amount of spacing between the heading, alert, children and footer.
   * @default 'lg'
   */
  gutter?: GutterSize | GutterSizes;

  /**
   * Sets which of the block / inline layout options apply.
   * @default false
   */
  hiddenErrorSummary?: boolean;

  /**
   * React hook form instance.
   */
  form: UseFormReturn<T, TContext>;

  /**
   * Emitted when any field has an error.
   * Called after the first submit if any errors are recorded, and from then on when any value changes.
   *
   * [Learn more](https://react-hook-form.com/docs/useform/handlesubmit)
   */
  onError?: SubmitErrorHandler<T>;

  /**
   * Handler for when the submit method on the form is called after validation is passed.
   *
   * [Learn more](https://react-hook-form.com/docs/useform/handlesubmit)
   */
  onSubmit?: (data: T) => void;

  /**
   * Emitted when the form state is valid.
   *
   * [Learn more](https://react-hook-form.com/docs/useform/formstate)
   */
  onValidChange?: (isValid: boolean) => void;

  /**
   * If set to `true`, the summary will only update when the form is submitted, not on every field change.
   * This is useful for performance reasons, especially in large forms.
   * @default false
   */
  updateErrorSummaryOnSubmit?: boolean;
}

export interface IressFormProps<T extends FieldValues, TContext = object>
  extends Partial<Omit<UseFormProps<T, TContext>, 'disabled' | 'errors'>>,
    Omit<IressHookFormProps<T, TContext>, 'form'> {
  /**
   * This context object is mutable and will be injected into the `resolver`'s second argument (eg. [Yup](https://github.com/jquense/yup) validation's context object).
   *
   * [Learn more](https://react-hook-form.com/docs/useform#context)
   */
  context?: UseFormProps<T, TContext>['context'];

  /**
   * Display all validation errors or one at a time.
   *
   * [Learn more](https://react-hook-form.com/docs/useform#criteriaMode)
   */
  criteriaMode?: UseFormProps<T, TContext>['criteriaMode'];

  /**
   * Default values to be passed through when an input is unset.
   *
   * [Learn more](https://react-hook-form.com/docs/useform#defaultValues)
   */
  defaultValues?: DefaultValues<T>;

  /**
   * Delay error from appearing instantly.
   *
   * [Learn more](https://react-hook-form.com/docs/useform#delayError)
   */
  delayError?: UseFormProps<T, TContext>['delayError'];

  /**
   * React hook form instance from `useForm`, use if you need more control over the internal state.
   *
   * ```tsx
   * const form = useForm();
   * return <IressForm form={form} />;
   * ```
   */
  form?: UseFormReturn<T, TContext>;

  /**
   * Configure the validation strategy **before** a user submits the form.
   *
   * [Learn more](https://react-hook-form.com/docs/useform#mode)
   * @default onSubmit
   */
  mode?: UseFormProps<T, TContext>['mode'];

  /**
   * Progressive Enhancement only applicable for SSR framework.
   * [Learn more](https://react-hook-form.com/docs/useform)
   */
  progressive?: UseFormProps<T, TContext>['progressive'];

  /**
   * This property is related to value update behaviors.
   *
   * [Learn more](https://react-hook-form.com/docs/useform#resetOptions)
   */
  resetOptions?: UseFormProps<T, TContext>['resetOptions'];

  /**
   * This function allows you to use any external validation library such as Yup, Zod, Joi, Vest, Ajv and many others.
   *
   * [Learn more](https://react-hook-form.com/docs/useform#resolver)
   */
  resolver?: UseFormProps<T, TContext>['resolver'];

  /**
   * Configure validation strategy when inputs with errors get re-validated **after** a user submits the form.
   *
   * [Learn more](https://react-hook-form.com/docs/useform#reValidateMode)
   */
  reValidateMode?: UseFormProps<T, TContext>['reValidateMode'];

  /**
   * When set to true, and the user submits a form that fails validation, focus is set on the first field with an error.
   * By default, it is set based on the `hiddenErrorSummary` prop.
   * - If hiddenErrorSummary is true, it will focus on the first field with an error.
   * - If hiddenErrorSummary is false, it will focus on the error summary.
   *
   * [Learn more](https://react-hook-form.com/docs/useform#shouldFocusError)
   */
  shouldFocusError?: UseFormProps<T, TContext>['shouldFocusError'];

  /**
   * This config will enable browser native validation. It will also enable CSS selectors :valid and:invalid making styling inputs easier.
   *
   * [Learn more](https://react-hook-form.com/docs/useform#shouldUseNativeValidation)
   */
  shouldUseNativeValidation?: UseFormProps<
    T,
    TContext
  >['shouldUseNativeValidation'];

  /**
   * By default, an input value will be retained when input is removed. However, you can set `shouldUnregister` to `true` to `unregister` input during unmount.
   *
   * [Learn more](https://react-hook-form.com/docs/useform#shouldUnregister)
   */
  shouldUnregister?: UseFormProps<T, TContext>['shouldUnregister'];

  /**
   * The values prop will react to changes and update the form values, which is useful when your form needs to be updated by external state or server data.
   *
   * [Learn more](https://react-hook-form.com/docs/useform#values)
   */
  values?: UseFormProps<T, TContext>['values'];
}

export interface FormRef<T extends FieldValues> {
  element?: HTMLFormElement;
  api: UseFormReturn<T>;
  reset: (values?: DefaultValues<T>) => void;
  submit: () => void;
}

export interface FieldControllerProps {
  error?: boolean;
  formId?: string;
  label?: string;
  required?: boolean;
  children?: React.ReactNode;
}
