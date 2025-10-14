import { IressForm } from '../Form';
import { FieldValues } from 'react-hook-form';
import { useRef } from 'react';
import { IressStack } from '../../Stack';
import { IressButton } from '../../Button';
import { FormRef, IressFormProps } from '../Form.types';
import { IressFormField, IressInput, IressSelect } from '@/main';

export const ComplexForm = (props: IressFormProps<FieldValues>) => (
  <IressForm {...props}>
    <IressStack gutter={IressStack.Gutter.Lg}>
      <IressStack gutter={IressStack.Gutter.Md}>
        <IressFormField
          name="email"
          label="Email address"
          rules={{
            required: 'Email is required',
            minLength: { value: 6, message: 'Use a longer email address' },
          }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
      </IressStack>
      <IressButton
        type={IressButton.Type.Submit}
        mode={IressButton.Mode.Primary}
      >
        Submit
      </IressButton>
    </IressStack>
  </IressForm>
);

export const ComplexFormWithRef = (props: IressFormProps<FieldValues>) => {
  const formRef = useRef<FormRef<FieldValues>>(null);

  return (
    <div>
      <IressForm {...props} ref={formRef}>
        <IressStack gutter={IressStack.Gutter.Lg}>
          <IressStack gutter={IressStack.Gutter.Md}>
            <IressFormField
              name="email"
              label="Email address"
              rules={{
                required: 'Email is required',
                minLength: { value: 6, message: 'Use a longer email address' },
              }}
              render={(controlledProps) => <IressInput {...controlledProps} />}
            />
          </IressStack>
        </IressStack>
      </IressForm>
      <IressButton
        type={IressButton.Type.Submit}
        mode={IressButton.Mode.Primary}
        onClick={() => formRef.current?.submit()}
      >
        Submit
      </IressButton>
      <IressButton
        type={IressButton.Type.Reset}
        mode={IressButton.Mode.Primary}
        onClick={() => formRef.current?.reset()}
      >
        Reset
      </IressButton>
    </div>
  );
};

const SlaveField = () => {
  const { control } = IressForm.useFormContext<{ master: string }>();
  const masterValue = IressForm.useWatch({ control, name: 'master' });

  if (masterValue !== 'show') {
    return null;
  }

  return (
    <IressFormField
      name="slave"
      label="Slave"
      render={(controlledProps) => <IressInput {...controlledProps} />}
    />
  );
};

export const ConditionalFieldForm = (props: IressFormProps<FieldValues>) => (
  <div>
    <IressForm {...props} defaultValues={{ master: 'show' }}>
      <IressFormField
        name="master"
        label="Master"
        render={(controlledProps) => (
          <IressSelect {...controlledProps}>
            <option value="show">show</option>
            <option value="hide">hide</option>
          </IressSelect>
        )}
      />
      <SlaveField />
    </IressForm>
  </div>
);
