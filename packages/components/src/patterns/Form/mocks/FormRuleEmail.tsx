import { IressForm, IressFormField, IressInput, IressButton, IressStack } from '@/main';

/**
 * The `email` rule is a shorthand for email validation. Works with text-based controls.
 */
export function FormRuleEmail() {
  return (
    <IressForm>
      <IressStack gap="md">
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
      </IressStack>
    </IressForm>
  );
}
