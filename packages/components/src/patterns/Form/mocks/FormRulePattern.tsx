import { IressForm, IressFormField, IressInput, IressButton } from '@/main';

/**
 * The `pattern` rule works with text-based controls. Uses a regex to validate input.
 */
export function FormRulePattern() {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return (
    <IressForm>
        <IressFormField
          label="Default message"
          name="default"
          hint="Enter a valid email address"
          rules={{ pattern: emailRegex }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressFormField
          label="Custom message"
          name="custom"
          hint="Enter a valid email address"
          rules={{ pattern: { value: emailRegex, message: 'Please enter a valid email address!' } }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressButton type="submit" mode="primary">
          Validate
        </IressButton>
    </IressForm>
  );
}
