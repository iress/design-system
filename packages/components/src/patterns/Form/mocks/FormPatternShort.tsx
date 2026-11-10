import {
  IressButton,
  IressText,
  IressFormField,
  IressInput,
  IressForm,
} from '@/main';

/**
 * The short form pattern uses `onSubmit` validation before the user has submitted
 * the first time, and then afterwards uses `onChange` validation.
 */
export function FormPatternShort() {
  return (
    <IressForm
      pattern="short"
      heading={
        <IressText mb="spacing.4">
          <h2>Short Form</h2>
          <p>
            The short form pattern uses <code>onSubmit</code> validation before
            the user has submitted the first time, and then afterwards uses{' '}
            <code>onChange</code> validation.
          </p>
        </IressText>
      }
      actions={
        <IressButton type="submit" mode="primary">
          Submit
        </IressButton>
      }
    >
      <IressFormField
        label="First name"
        name="firstName"
        rules={{ required: 'First name is required' }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Last name"
        name="lastName"
        rules={{ required: 'Last name is required' }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
    </IressForm>
  );
}
