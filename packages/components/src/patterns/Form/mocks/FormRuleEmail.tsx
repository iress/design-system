import { IressForm, IressFormField, IressInput, IressButton } from '@/main';

/**
 * The `email` rule is a shorthand for email validation. Works with text-based controls.
 */
export function FormRuleEmail() {
  return (
    <IressForm>
        <IressFormField
          label="Default message"
          name="default"
          hint="Enter an email address"
          rules={{ email: true }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressFormField
          label="Custom message"
          name="custom"
          hint="Enter an email address"
          rules={{ email: 'Please enter a valid email address!' }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressButton type="submit" mode="primary">
          Validate
        </IressButton>
    </IressForm>
  );
}
