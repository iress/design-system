import { type Meta, type StoryObj } from '@storybook/react-vite';

import { IressForm } from './Form';
import { FormSubmission } from './mocks/FormSubmission';
import FormSubmissionSource from './mocks/FormSubmission.tsx?raw';
import { CustomErrorHandlingForm } from './mocks/CustomErrorHandlingForm';
import CustomErrorHandlingFormSource from './mocks/CustomErrorHandlingForm.tsx?raw';
import { ControlledForm } from './mocks/ControlledForm';
import ControlledFormSource from './mocks/ControlledForm.tsx?raw';
import { DisableValidationForm } from './mocks/DisableValidationForm';
import DisableValidationFormSource from './mocks/DisableValidationForm.tsx?raw';
import { FormReset } from './mocks/FormReset';
import FormResetSource from './mocks/FormReset.tsx?raw';
import { IressStack } from '@/components/Stack';
import { IressText } from '@/components/Text';
import { IressFormValidationSummary } from '@/main';
import {
  formArgs,
  formArgTypes,
  formParameters,
} from './mocks/storybookFormHelpers';
import {
  DiffViewer,
  disableArgTypes,
  withCustomSource,
  withTransformedRawSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressForm>;

export default {
  title: 'Patterns/Form',
  component: IressForm,
  args: {
    ...formArgs,
  },
  argTypes: {
    ...formArgTypes,
  },
  parameters: {
    ...formParameters,
  },
} as Meta<typeof IressForm>;

export const Simple: Story = {
  args: {
    children: formArgTypes.children.mapping.simple,
    pattern: 'short',
  },
};

export const Fields: Story = {
  args: {
    heading: 'All supported form fields',
    children: formArgTypes.children.mapping.supportedControls,
    pattern: 'long',
  },
};

export const HandlingSubmission: Story = {
  args: {
    ...Simple.args,
    actions: formArgTypes.actions.mapping.none,
  },
  argTypes: {
    ...Simple.argTypes,
    ...disableArgTypes(['children', 'onSubmit']),
  },
  render: (args) => <FormSubmission {...args} />,
  parameters: {
    ...withTransformedRawSource(
      FormSubmissionSource,
      'IressFormProps<FieldValues>',
      ['children'],
    ),
  },
};

export const ValidationSummary: Story = {
  ...Fields,
  args: {
    ...Fields.args,
    alert: <IressFormValidationSummary />,
    heading: 'Try hitting submit to see the validation summary',
  },
};

export const CustomErrorHandling: Story = {
  ...HandlingSubmission,
  argTypes: {
    ...HandlingSubmission.argTypes,
    ...disableArgTypes(['children', 'onError']),
  },
  render: (args) => <CustomErrorHandlingForm {...args} />,
  parameters: {
    ...withTransformedRawSource(
      CustomErrorHandlingFormSource,
      'IressFormProps<FieldValues>',
      ['children'],
    ),
  },
};

export const ExcludeReadOnlyValidation: Story = {
  args: {
    ...HandlingSubmission.args,
    children: formArgTypes.children.mapping.readOnly,
    actions: formArgTypes.actions.mapping.submit,
  },
  render: (args) => (
    <IressStack gap="md">
      <IressText>
        <h2>Excludes read-only validation</h2>
        <p>Try hitting submit to see that only email is being validated</p>
      </IressText>
      <IressForm {...args} />
    </IressStack>
  ),
};

export const DefaultValues: Story = {
  ...Simple,
  args: {
    ...Simple.args,
    defaultValues: {
      name: 'Luke Skywalker',
      email: 'luke.skywalker@iress.com',
    },
  },
};

export const Values: Story = {
  ...Simple,
  argTypes: {
    ...Simple.argTypes,
    ...disableArgTypes(['values', 'onSubmit']),
  },
  render: (args) => <ControlledForm {...args} />,
  parameters: {
    ...withCustomSource(ControlledFormSource),
  },
};

export const DisableValidation: Story = {
  ...Simple,
  argTypes: {
    ...Simple.argTypes,
    ...disableArgTypes(['children', 'onError', 'onSubmit']),
  },
  render: (args) => <DisableValidationForm {...args} />,
  parameters: {
    ...withTransformedRawSource(
      DisableValidationFormSource,
      'IressFormProps<FieldValues>',
      ['children'],
    ),
  },
};

export const ResetForm: Story = {
  ...Simple,
  args: {
    ...Simple.args,
    actions: formArgTypes.actions.mapping.none,
    defaultValues: {
      name: '',
      email: '',
    },
  },
  argTypes: {
    ...Simple.argTypes,
    ...disableArgTypes(['children']),
  },
  render: (args) => <FormReset {...args} />,
  parameters: {
    ...withTransformedRawSource(
      FormResetSource,
      'IressFormProps<FieldValues>',
      ['children'],
    ),
  },
};

export const UpdateErrorSummaryOnSubmit: Story = {
  ...Simple,
  args: {
    ...Simple.args,
    alert: <IressFormValidationSummary />,
    updateErrorSummaryOnSubmit: true,
  },
};

export const StateManagementV4ToV5: Story = {
  render: () => (
    <DiffViewer
      allowModeChange
      oldValue={`import { IressForm, IressField, IressInput, IressCheckboxGroup, IressCheckbox } from '@iress/components';

export const App = () => {
  // We need to create our own state to manage the visibility of the fields, 
  // which means we have two sources of truth potentially making our code harder to maintain
  const [show, setShow] = useState(['name']);

  return (
      <IressForm>
        <IressField label="Show fields">
          <IressCheckboxGroup value={show} onChange={(newValues) => setShow(newValues)}>
            <IressCheckbox value="name">Name</IressCheckbox>
            <IressCheckbox value="email">Email</IressCheckbox>
          </IressCheckboxGroup>
        </IressField>
        {show.includes('name') && (
          <IressField label="Name">
            <IressInput name="name" />
          </IressField>
        )}
        {show.includes('email') && (
          <IressField label="Email">
            <IressInput name="email" type="email" />
          </IressField>
        )}
      </IressForm>
  );
};`}
      newValue={`import { IressForm, IressFormField, IressInput, IressCheckboxGroup, IressCheckbox } from '@iress-oss/ids-components';

const ConditionalFields = () => {
  // Instead of creating our own state, we can now use the form state via the useWatch hook, 
  // meaning we still have a single source of truth
  const show = IressForm.useWatch({ name: 'show'});

  return (
    <>
      <IressFormField 
        label="Show fields" 
        name="show"
        render={(controlledProps) => (
          <IressCheckboxGroup {...controlledProps}>
            <IressCheckbox value="name">Name</IressCheckbox>
            <IressCheckbox value="email">Email</IressCheckbox>
          </IressCheckboxGroup>
        )}
      />
      {show?.includes('name') && (
        <IressFormField 
          label="Name" 
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
      )}
      {show?.includes('email') && (
        <IressFormField 
          label="Email" 
          name="email"
          render={(controlledProps) => <IressInput {...controlledProps} type="email" />}
        />
      )}
     </>
  );
};

export const App = () => (
  <IressForm defaultValues={{ show: ['name'] }}>
    <ConditionalFields /> 
  </IressForm>
);`}
    />
  ),
};

export const ValidationV4ToV5: Story = {
  render: () => (
    <DiffViewer
      allowModeChange
      oldValue={`import { IressForm, IressField, IressInput, IressButton } from '@iress/components';

export const App = () => (
  <IressForm valueMissing="{{fieldName}} needs to be filled in!">
    <IressField label="Name">
      <IressInput name="name" required />
    </IressField>
    <IressField label="Email">
      <IressInput name="email" maxLength={10} />
    </IressField>
    <IressButton type="submit" mode="primary">
      Sign up
    </IressButton>
  </IressForm>
);`}
      newValue={`import { IressForm, IressFormField, IressInput, IressButton } from '@iress-oss/ids-components';

export const App = () => (
  <IressForm>
    <IressFormField 
      label="Name"
      name="name"
      render={(controlledProps) => <IressInput {...controlledProps} />}
      rules={{ required: 'Name needs to be filled in!' }}
    />
    <IressFormField 
      label="Email"
      name="email"
      render={(controlledProps) => <IressInput {...controlledProps} type="email" maxLength={10} />}
      rules={{ maxLength: 10 }}
    />
    <IressButton type="submit" mode="primary">
      Sign up
    </IressButton>
  </IressForm>
);`}
    />
  ),
};
