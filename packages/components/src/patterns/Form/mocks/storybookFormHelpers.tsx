import {
  IressAlert,
  IressButton,
  IressFormField,
  type IressFormProps,
  IressInline,
  IressInput,
  IressText,
} from '@/main';
import {
  SUPPORTED_FORM_FIELDS,
  withRenderSnippet,
} from './supportedFormFields';
import { addToStorybookCategory } from '@iress-storybook/helpers';
import { type FieldValues } from 'react-hook-form';

const alertOptions = {
  none: undefined,
  basicAlert: (
    <IressAlert status="danger">
      There are some problems with your form!
    </IressAlert>
  ),
};

const childrenOptions = {
  none: undefined,
  simple: [
    <IressText key="description" element="p">
      This form is a simple example of how to use <code>IressFormField</code>{' '}
      with <code>IressInput</code>.
    </IressText>,
    <IressFormField
      key="name"
      name="name"
      label="Name"
      rules={{ required: 'Name is required' }}
      render={(controlledProps) => (
        <IressInput {...controlledProps} data-component="IressInput" />
      )}
    />,
    <IressFormField
      key="email"
      name="email"
      label="Email address"
      rules={{
        required: 'Email is required',
        minLength: { value: 6, message: 'Use a longer email address' },
      }}
      render={(controlledProps) => (
        <IressInput {...controlledProps} data-component="IressInput" />
      )}
    />,
  ],
  supportedControls: [
    <IressText key="description" element="p">
      This form showcases all the different components you can use within{' '}
      <code>IressFormField</code>.
    </IressText>,
    ...Object.values(SUPPORTED_FORM_FIELDS).map((field) => field.formField),
  ],
  readOnly: [
    <IressFormField
      key="name"
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
    />,
    <IressFormField
      key="email"
      name="email"
      label="Email address"
      rules={{
        required: 'Email is required',
        minLength: { value: 6, message: 'Use a longer email address' },
      }}
      render={(controlledProps) => (
        <IressInput {...controlledProps} data-component="IressInput" />
      )}
    />,
  ],
};

const actionOptions = {
  none: undefined,
  submit: (
    <IressButton type="submit" mode="primary">
      Submit
    </IressButton>
  ),
  save: (
    <IressInline gap="sm">
      <IressButton>Cancel</IressButton>
      <IressButton type="submit" mode="primary">
        Save
      </IressButton>
    </IressInline>
  ),
};

export const formArgs = {
  actions: actionOptions.submit,
  children: childrenOptions.supportedControls,
};

export const formArgTypes = {
  actions: {
    control: {
      type: 'select',
      labels: {
        Heading: 'With Custom Actions',
      },
    },
    options: Object.keys(actionOptions),
    mapping: actionOptions,
  },
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
  ...addToStorybookCategory<IressFormProps<FieldValues>>('React Hook Forms', [
    'context',
    'criteriaMode',
    'defaultValues',
    'delayError',
    'mode',
    'progressive',
    'resetOptions',
    'resolver',
    'reValidateMode',
    'shouldUseNativeValidation',
    'shouldUnregister',
    'values',
  ]),
};

export const formParameters = {
  parameters: {
    ...withRenderSnippet(),
  },
};
