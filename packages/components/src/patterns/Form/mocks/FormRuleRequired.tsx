import { IressForm, IressFormField, IressInput, IressButton, IressStack } from '@/main';

/**
 * The `required` rule works with all form controls (Input, Select, Checkbox, etc.).
 * Pass `true` for the default message, or a string for a custom message.
 */
export function FormRuleRequired() {
  return (
    <IressForm>
      <IressStack gap="md">
        <IressFormField
          label="Default message"
          name="default"
          rules={{ required: true }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressFormField
          label="Custom message"
          name="custom"
          rules={{ required: 'Please check this field' }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressButton type="submit" mode="primary">
          Validate
        </IressButton>
      </IressStack>
    </IressForm>
  );
}
