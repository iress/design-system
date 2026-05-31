import { IressForm, IressFormField, IressInput, IressButton, IressStack } from '@/main';

/**
 * The `maxLength` rule works with text-based controls (Input, InputCurrency).
 */
export function FormRuleMaxLength() {
  return (
    <IressForm>
      <IressStack gap="md">
        <IressFormField
          label="Default message"
          name="default"
          hint="Enter a maximum of 5 characters"
          rules={{ maxLength: 5 }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressFormField
          label="Custom message"
          name="custom"
          hint="Enter a maximum of 5 characters"
          rules={{ maxLength: { value: 5, message: 'Please enter a max of 5 characters!' } }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressButton type="submit" mode="primary">
          Validate
        </IressButton>
      </IressStack>
    </IressForm>
  );
}
