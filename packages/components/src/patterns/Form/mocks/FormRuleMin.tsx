import { IressForm, IressFormField, IressInput, IressButton } from '@/main';

/**
 * The `min` rule works with numeric inputs.
 */
export function FormRuleMin() {
  return (
    <IressForm>
        <IressFormField
          label="Default message"
          name="default"
          hint="Enter a minimum of 20"
          rules={{ min: 20 }}
          render={(controlledProps) => <IressInput {...controlledProps} type="number" />}
        />
        <IressFormField
          label="Custom message"
          name="custom"
          hint="Enter a minimum of 20"
          rules={{ min: { value: 20, message: 'Please enter a min of 20!' } }}
          render={(controlledProps) => <IressInput {...controlledProps} type="number" />}
        />
        <IressButton type="submit" mode="primary">
          Validate
        </IressButton>
    </IressForm>
  );
}
