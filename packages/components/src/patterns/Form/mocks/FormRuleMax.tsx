import { IressForm, IressFormField, IressInput, IressButton, IressStack } from '@/main';

/**
 * The `max` rule works with numeric inputs.
 */
export function FormRuleMax() {
  return (
    <IressForm>
      <IressStack gap="md">
        <IressFormField
          label="Default message"
          name="default"
          hint="Enter a maximum of 2"
          rules={{ max: 2 }}
          render={(controlledProps) => <IressInput {...controlledProps} type="number" />}
        />
        <IressFormField
          label="Custom message"
          name="custom"
          hint="Enter a maximum of 2"
          rules={{ max: { value: 2, message: 'Please enter a max of 2!' } }}
          render={(controlledProps) => <IressInput {...controlledProps} type="number" />}
        />
        <IressButton type="submit" mode="primary">
          Validate
        </IressButton>
      </IressStack>
    </IressForm>
  );
}
