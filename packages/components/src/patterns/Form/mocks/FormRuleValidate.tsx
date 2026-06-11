import { IressForm, IressFormField, IressInput, IressButton } from '@/main';

/**
 * The `validate` rule allows custom validation functions. Works with all form controls.
 * Return `true` for valid, or a string message for invalid.
 */
export function FormRuleValidate() {
  return (
    <IressForm>
        <IressFormField
          label="Must contain 'hello'"
          name="default"
          hint="Type something containing 'hello'"
          rules={{
            validate: {
              containsHello: (value: string) =>
                value?.includes('hello') || 'Value must contain "hello"',
            },
          }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressFormField
          label="Must be Google"
          name="custom"
          hint="Type 'Google' to pass"
          rules={{
            validate: {
              isGoogle: (value: string) =>
                value === 'Google' || 'Only Google is accepted!',
            },
          }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressButton type="submit" mode="primary">
          Validate
        </IressButton>
    </IressForm>
  );
}
