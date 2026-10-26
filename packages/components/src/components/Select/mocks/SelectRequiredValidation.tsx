import { IressButton, IressForm, IressFormField, IressSelect } from '@/main';

export function SelectRequiredValidation() {
  return (
    <IressForm onSubmit={() => undefined}>
      <IressFormField
        label="Gender"
        name="gender"
        rules={{ required: true }}
        render={(controlledProps) => (
          <IressSelect
            {...controlledProps}
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
              { label: 'Option 4', value: '4' },
              { label: 'Option 5', value: '5' },
            ]}
          />
        )}
      />
      <IressButton type="submit">Validate</IressButton>
    </IressForm>
  );
}
