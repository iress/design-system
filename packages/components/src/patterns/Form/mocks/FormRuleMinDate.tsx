import { IressForm, IressFormField, IressInput, IressButton } from '@/main';

/**
 * The `minDate` rule works with date inputs. Validates that the date is after the specified value.
 */
export function FormRuleMinDate() {
  return (
    <IressForm>
        <IressFormField
          label="Default message"
          name="default"
          hint="Enter a date after today"
          rules={{ minDate: new Date() }}
          render={(controlledProps) => <IressInput {...controlledProps} type="date" />}
        />
        <IressFormField
          label="Custom message"
          name="custom"
          hint="Enter a date after today"
          rules={{ minDate: { value: new Date(), message: 'Please enter a date after today!' } }}
          render={(controlledProps) => <IressInput {...controlledProps} type="date" />}
        />
        <IressButton type="submit" mode="primary">
          Validate
        </IressButton>
    </IressForm>
  );
}
