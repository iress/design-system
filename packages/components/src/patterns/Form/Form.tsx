import { type ForwardedRef, forwardRef, type Ref } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { FormRef } from './HookForm/HookForm';
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

  return <ShortForm {...restProps} ref={ref} />;
};

Form.displayName = 'IressForm';

/**
 * Manages form state, validation, and submission for a group of input fields.
 *
 * @example
 * ```tsx
 * import { IressForm, IressFormField, IressInput } from '@iress-oss/ids-components';
 *
 * <IressForm onSubmit={handleSubmit}>
 *   <IressFormField name="email" label="Email" render={(controlledProps) => <IressInput type="email" {...controlledProps} />} />
 * </IressForm>
 * ```
 */
export const IressForm = forwardRef(Form) as (<T extends FieldValues>(
  props: IressFormProps<T> & { ref?: Ref<FormRef<T>> },
) => React.ReactElement) & {
  displayName: 'IressForm';
};
IressForm.displayName = 'IressForm';
