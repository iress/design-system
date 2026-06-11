import { IressForm, IressFormField, IressInput, IressButton } from '@/main';

/**
 * The `maxDate` rule works with date inputs. Validates that the date is before the specified value.
 */
export function FormRuleMaxDate() {
  return (
    <IressForm>
        <IressFormField
          label="Default message"
          name="default"
          hint="Enter a date before today"
          rules={{ maxDate: new Date() }}
          render={(controlledProps) => <IressInput {...controlledProps} type="date" />}
        />
        <IressFormField
          label="Custom message"
          name="custom"
          hint="Enter a date before today"
          rules={{ maxDate: { value: new Date(), message: 'Please enter a date before today!' } }}
          render={(controlledProps) => <IressInput {...controlledProps} type="date" />}
        />
        <IressButton type="submit" mode="primary">
          Validate
        </IressButton>
    </IressForm>
  );
}
