import { type ForwardedRef, forwardRef, type Ref } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { FormRef } from './HookForm/HookForm';
import { LongForm, type LongFormProps } from './components/LongForm';
import { ShortForm, type ShortFormProps } from './components/ShortForm';

export type IressFormProps<
  T extends FieldValues,
  TContext = object,
  TOutput = T,
> = LongFormProps<T, TContext, TOutput> | ShortFormProps<T, TContext, TOutput>;

const Form = <T extends FieldValues, TContext = object, TOutput = T>(
  { pattern, ...restProps }: IressFormProps<T, TContext, TOutput>,
  ref: ForwardedRef<FormRef<T, TContext, TOutput>>,
) => {
  if (pattern === 'long') {
    return (
      <LongForm
        {...(restProps as LongFormProps<T, TContext, TOutput>)}
        ref={ref}
      />
    );
  }

  return <ShortForm {...restProps} ref={ref} />;
};

Form.displayName = 'IressForm';

export const IressForm = forwardRef(Form) as (<
  T extends FieldValues,
  TContext = object,
  TOutput = T,
>(
  props: IressFormProps<T, TContext, TOutput> & {
    ref?: Ref<FormRef<T, TContext, TOutput>>;
  },
) => React.ReactElement) & {
  displayName: 'IressForm';
};
IressForm.displayName = 'IressForm';
