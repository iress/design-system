import { IressForm, IressFormField, IressInput, IressButton } from '@/main';

/**
 * The `minLength` rule works with text-based controls (Input, InputCurrency).
 */
export function FormRuleMinLength() {
  return (
    <IressForm>
        <IressFormField
          label="Default message"
          name="default"
          hint="Enter a minimum of 7 characters"
          rules={{ minLength: 7 }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressFormField
          label="Custom message"
          name="custom"
          hint="Enter a minimum of 7 characters"
          rules={{ minLength: { value: 7, message: 'Please enter a min of 7 characters!' } }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressButton type="submit" mode="primary">
          Validate
        </IressButton>
    </IressForm>
  );
}
