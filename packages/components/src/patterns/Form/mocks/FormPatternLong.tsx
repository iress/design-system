import {
  IressButton,
  IressText,
  IressFormField,
  IressInput,
  IressInline,
  IressForm,
} from '@/main';

/**
 * The long form pattern uses `onBlur` validation before the user has submitted
 * the first time, and then afterwards uses `onChange` validation.
 */
export function FormPatternLong() {
  return (
    <IressForm
      pattern="long"
      heading={
        <IressText>
          <h2>Long Form</h2>
          <p>
            The long form pattern uses <code>onBlur</code> validation before the
            user has submitted the first time, and then afterwards uses{' '}
            <code>onChange</code> validation.
          </p>
        </IressText>
      }
      actions={
        <IressInline gap="sm" noWrap mb="spacing.2">
          <IressButton type="reset" mode="quaternary">
            Cancel
          </IressButton>
          <IressButton type="submit" mode="primary">
            Save
          </IressButton>
        </IressInline>
      }
      footer={
        <IressText color="colour.neutral.70">
          Additional content in the footer
        </IressText>
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
      <IressFormField
        label="Email"
        name="email"
        rules={{ email: 'Please enter a valid email' }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
    </IressForm>
  );
}
