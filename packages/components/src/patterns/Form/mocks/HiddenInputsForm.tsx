import {
  IressButton,
  IressForm,
  IressFormField,
  IressHookForm,
  IressInput,
  IressStack,
} from '@/main';

export const HiddenInputsForm = () => {
  const form = IressForm.useForm();

  const { register } = form;

  // This is a hidden input field that the user cannot see or interact with.
  // This is the recommended way to handle hidden inputs in Iress forms.
  const hiddenInputStoredInVariable = 'hiddenValue';

  return (
    <IressHookForm
      form={form}
      onSubmit={(data) => {
        console.log('Form submitted with data:', {
          ...data,
          hiddenInputStoredInVariable,
        });
      }}
    >
      <IressStack gap="md">
        <IressFormField
          label="Visible Input"
          name="visibleInput"
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />

        {/* Hidden field - NOT RECOMMENDED */}
        <input
          type="hidden"
          {...register('hiddenField')} // Manually register the hidden field with react-hook-form
          value="hiddenValue"
        />

        <IressButton type="submit">Submit</IressButton>
      </IressStack>
    </IressHookForm>
  );
};
