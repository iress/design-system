import { type ForwardedRef, forwardRef, type Ref } from 'react';
import {
  type FieldValues,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { type FormRef, type HookFormExports } from './HookForm/HookForm';
import { LongForm, type LongFormProps } from './components/LongForm';
import { ShortForm, type ShortFormProps } from './components/ShortForm';

export type IressFormProps<T extends FieldValues, TContext = object> =
  | LongFormProps<T, TContext>
  | ShortFormProps<T, TContext>;

const Form = <T extends FieldValues, TContext = object>(
  { pattern, ...restProps }: IressFormProps<T, TContext>,
  ref: ForwardedRef<FormRef<T>>,
) => {
  if (pattern === 'long') {
    return (
      <LongForm {...(restProps as LongFormProps<T, TContext>)} ref={ref} />
    );
  }

  return (
    <ShortForm {...(restProps as ShortFormProps<T, TContext>)} ref={ref} />
  );
};

const ForwardedForm = forwardRef(Form) as <T extends FieldValues>(
  props: IressFormProps<T> & { ref?: Ref<FormRef<T>> },
) => React.ReactElement;

export const IressForm = ForwardedForm as typeof ForwardedForm &
  HookFormExports;

IressForm.useFieldArray = useFieldArray;
IressForm.useForm = useForm;
IressForm.useFormContext = useFormContext;
IressForm.useWatch = useWatch;
