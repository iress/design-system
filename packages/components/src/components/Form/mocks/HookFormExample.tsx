import {
  IressButton,
  IressFormField,
  IressHookForm,
  IressInput,
  IressPanel,
  IressStack,
} from '@/main';
import { useForm } from 'react-hook-form';

interface FieldValues {
  firstName: string;
  lastName: string;
}

export const HookFormExample = () => {
  const form = useForm<FieldValues>();

  // eslint-disable-next-line react-hooks/incompatible-library -- Known limitation: react-hook-form's watch() API cannot be memoized by React Compiler
  const firstName = form.watch('firstName');
  const lastName = form.watch('lastName');

  return (
    <IressHookForm form={form}>
      <IressStack gutter="md">
        {firstName && lastName && (
          <IressPanel>
            Name: {firstName} {lastName}
          </IressPanel>
        )}
        <IressFormField
          name="firstName"
          label="First Name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{ required: true }}
        />
        <IressFormField
          name="lastName"
          label="Last Name"
          render={(controlledProps) => (
            <IressInput {...controlledProps} type="email" />
          )}
          rules={{ required: true }}
        />
        <IressButton type="submit" mode="primary">
          Submit
        </IressButton>
      </IressStack>
    </IressHookForm>
  );
};
