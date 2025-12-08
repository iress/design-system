import { type Meta, type StoryObj } from '@storybook/react';

import { IressForm } from './Form';
import { IressInput } from '../Input';
import { IressButton } from '../Button';
import { IressAlert } from '../Alert';
import { IressStack } from '../Stack';
import { FormSubmission } from './mocks/FormSubmission';
import FormSubmissionSource from './mocks/FormSubmission.tsx?raw';
import { CustomErrorHandlingForm } from './mocks/CustomErrorHandlingForm';
import CustomErrorHandlingFormSource from './mocks/CustomErrorHandlingForm.tsx?raw';
import { IressText } from '../Text';
import { ControlledForm } from './mocks/ControlledForm';
import ControlledFormSource from './mocks/ControlledForm.tsx?raw';
import { DisableValidationForm } from './mocks/DisableValidationForm';
import DisableValidationFormSource from './mocks/DisableValidationForm.tsx?raw';
import { FormReset } from './mocks/FormReset';
import FormResetSource from './mocks/FormReset.tsx?raw';
import { CustomFormFieldComponents as CustomFormFieldComponentsExample } from './mocks/CustomFormFieldComponents';
import CustomFormFieldComponentsSource from './mocks/CustomFormFieldComponents.tsx?raw';
import { FormExpanders } from './mocks/FormExpanders';
import FormExpandersSource from './mocks/FormExpanders.tsx?raw';
import { WatchForm } from './mocks/WatchForm';
import WatchFormSource from './mocks/WatchForm.tsx?raw';
import { IressFormField } from '@/main';
import {
  SUPPORTED_FORM_FIELDS,
  withRenderSnippet,
} from './mocks/supportedFormFields';
import { addToReactHookFormsCategory } from './mocks/addToReactHookFormsCategory';
import { UseWatchForm } from './mocks/UseWatchForm';
import UseWatchFormSource from './mocks/UseWatchForm.tsx?raw';
import {
  disableArgTypes,
  removeArgTypes,
  withCustomSource,
  withTransformedRawSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressForm>;

const alertOptions = {
  none: null,
  basicAlert: (
    <IressAlert status={IressAlert.Status.Danger}>
      There are some problems with your form!
    </IressAlert>
  ),
};

const childrenOptions = {
  none: null,
  simple: (
    <IressStack gutter="md">
      <IressFormField
        name="name"
        label="Name"
        rules={{ required: 'Name is required' }}
        render={(controlledProps) => (
          <IressInput {...controlledProps} data-component="IressInput" />
        )}
      />
      <IressFormField
        name="email"
        label="Email address"
        rules={{
          required: 'Email is required',
          minLength: { value: 6, message: 'Use a longer email address' },
        }}
        render={(controlledProps) => (
          <IressInput {...controlledProps} data-component="IressInput" />
        )}
      />
      <IressButton type="submit" mode="primary">
        Sign up
      </IressButton>
    </IressStack>
  ),
  supportedControls: (
    <IressStack gutter="md">
      {Object.values(SUPPORTED_FORM_FIELDS).map((field) => field.formField)}
      <IressButton type="submit" mode="primary">
        Sign up
      </IressButton>
    </IressStack>
  ),
  readOnly: (
    <IressStack gutter="md">
      <IressFormField
        name="name"
        label="Name"
        rules={{ required: 'Name is required' }}
        readOnly={true}
        render={(controlledProps) => (
          <IressInput
            readOnly={true}
            {...controlledProps}
            value={'Luke Skywalker'}
            data-component="IressInput"
          />
        )}
      />
      <IressFormField
        name="email"
        label="Email address"
        rules={{
          required: 'Email is required',
          minLength: { value: 6, message: 'Use a longer email address' },
        }}
        render={(controlledProps) => (
          <IressInput {...controlledProps} data-component="IressInput" />
        )}
      />
      <IressButton type="submit" mode="primary">
        Sign up
      </IressButton>
    </IressStack>
  ),
};

export default {
  title: 'Components/Form',
  component: IressForm,
  argTypes: {
    ...removeArgTypes(['ref']),
    alert: {
      control: {
        type: 'select',
        labels: {
          Heading: 'With Custom Alert',
        },
      },
      options: Object.keys(alertOptions),
      mapping: alertOptions,
    },
    children: {
      control: {
        type: 'select',
        labels: {
          Heading: 'With Custom Children',
        },
      },
      options: Object.keys(childrenOptions),
      mapping: childrenOptions,
    },
    ...addToReactHookFormsCategory(),
  },
  parameters: {
    ...withRenderSnippet(),
    IDS_Sandbox: {
      scopes: ['react-hook-form'],
    },
  },
} as Meta<typeof IressForm>;

export const Simple: Story = {
  args: {
    children: childrenOptions.simple,
  },
};

export const Fields: Story = {
  args: {
    children: childrenOptions.supportedControls,
  },
};

export const HandlingSubmission: Story = {
  ...Simple,
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
  ...Simple,
  args: {
    ...Simple.args,
    errorSummaryHeading:
      'We have seen the following errors in your submission...',
  },
  render: (args) => (
    <IressStack gutter="md">
      <IressText element="h2">
        Try hitting submit to see the validation summary
      </IressText>
      <IressForm {...args} />
    </IressStack>
  ),
};

export const HiddenErrorSummary: Story = {
  ...Simple,
  args: {
    ...Simple.args,
    hiddenErrorSummary: true,
  },
  render: (args) => (
    <IressStack gutter="md">
      <IressText element="h2">
        Try hitting submit to see the errors only on the fields
      </IressText>
      <IressForm {...args} />
    </IressStack>
  ),
};

export const CustomErrorHandling: Story = {
  ...HiddenErrorSummary,
  argTypes: {
    ...HiddenErrorSummary.argTypes,
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
    children: childrenOptions.readOnly,
  },
  render: (args) => (
    <IressStack gutter="md">
      <IressText element="h2">
        Try hitting submit to see the validation summary: only email is being
        validated
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

export const UpdateErrorSummaryOnSubmit: Story = {
  ...Simple,
  args: {
    ...Simple.args,
    updateErrorSummaryOnSubmit: true,
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

export const CustomFormFieldComponents: Story = {
  ...Simple,
  argTypes: {
    ...Simple.argTypes,
    ...disableArgTypes(['children']),
  },
  render: () => <CustomFormFieldComponentsExample />,
  parameters: {
    ...withCustomSource(CustomFormFieldComponentsSource),
  },
};

export const FormsInExpanders: Story = {
  ...Simple,
  argTypes: {
    ...Simple.argTypes,
    ...disableArgTypes(['children']),
  },
  render: (args) => <FormExpanders {...args} />,
  parameters: {
    ...withTransformedRawSource(
      FormExpandersSource,
      'IressFormProps<FieldValues>',
      ['children'],
    ),
  },
};

export const UseWatch: Story = {
  ...Simple,
  render: (args) => <UseWatchForm {...args} />,
  parameters: {
    ...withTransformedRawSource(
      UseWatchFormSource,
      'IressFormProps<FieldValues>',
      ['children'],
    ),
  },
};

export const Watch: Story = {
  render: (args) => <WatchForm {...args} />,
  parameters: {
    ...withCustomSource(WatchFormSource),
  },
};
