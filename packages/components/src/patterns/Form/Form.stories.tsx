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
import { IressFormField, IressFormValidationSummary, IressInput } from '@/main';
import {
  formArgs,
  formArgTypes,
  formParameters,
} from './mocks/storybookFormHelpers';
import {
  DiffViewer,
  disableArgTypes,
  withSource,
} from '@iress-oss/ids-storybook-config';
import { WithReadonlyDataForm } from './mocks/WithReadonlyDataForm';
import WithReadonlyDataFormSource from './mocks/WithReadonlyDataForm.tsx?raw';
import { SwitchEditReadonlyForm } from './mocks/SwitchEditReadonlyForm';
import SwitchEditReadonlyFormSource from './mocks/SwitchEditReadonlyForm.tsx?raw';
import { NativeValidationForm } from './mocks/NativeValidationForm';
import NativeValidationFormSource from './mocks/NativeValidationForm.tsx?raw';
import { NestedFormsExample } from './mocks/NestedForms';
import NestedFormsSource from './mocks/NestedForms.tsx?raw';
import { FormGroups as FormGroupsExample } from './mocks/FormGroups';
import FormGroupsSource from './mocks/FormGroups.tsx?raw';
import { FormExpanders } from './mocks/FormExpanders';
import FormExpandersSource from './mocks/FormExpanders.tsx?raw';
import { UseWatchForm } from './mocks/UseWatchForm';
import UseWatchFormSource from './mocks/UseWatchForm.tsx?raw';
import { HiddenInputsForm } from './mocks/HiddenInputsForm';
import HiddenInputsFormSource from './mocks/HiddenInputsForm.tsx?raw';
import ValidationDependOnOtherFieldsSource from './mocks/ValidationDependOnOtherFields.tsx?raw';
import { ValidationDependOnOtherFields as ValidationDependOnOtherFieldsExample } from './mocks/ValidationDependOnOtherFields';
import { CustomFormFieldComponents as CustomFormFieldComponentsExample } from './mocks/CustomFormFieldComponents';
import CustomFormFieldComponentsSource from './mocks/CustomFormFieldComponents.tsx?raw';
import SanitisedInputFormSource from './mocks/SanitisedInputForm.tsx?raw';
import { lazy } from 'react';
import { IressLoadingSuspense } from '../Loading';
import componentMeta from './meta';

import { FormRuleRequired } from './mocks/FormRuleRequired';
import FormRuleRequiredSource from './mocks/FormRuleRequired.tsx?raw';
import { FormRuleMaxLength } from './mocks/FormRuleMaxLength';
import FormRuleMaxLengthSource from './mocks/FormRuleMaxLength.tsx?raw';
import { FormRuleMinLength } from './mocks/FormRuleMinLength';
import FormRuleMinLengthSource from './mocks/FormRuleMinLength.tsx?raw';
import { FormRuleMax } from './mocks/FormRuleMax';
import FormRuleMaxSource from './mocks/FormRuleMax.tsx?raw';
import { FormRuleMin } from './mocks/FormRuleMin';
import FormRuleMinSource from './mocks/FormRuleMin.tsx?raw';
import { FormRulePattern } from './mocks/FormRulePattern';
import FormRulePatternSource from './mocks/FormRulePattern.tsx?raw';
import { FormRuleMinDate } from './mocks/FormRuleMinDate';
import FormRuleMinDateSource from './mocks/FormRuleMinDate.tsx?raw';
import { FormRuleMaxDate } from './mocks/FormRuleMaxDate';
import FormRuleMaxDateSource from './mocks/FormRuleMaxDate.tsx?raw';
import { FormRuleEmail } from './mocks/FormRuleEmail';
import FormRuleEmailSource from './mocks/FormRuleEmail.tsx?raw';
import { FormRuleValidate } from './mocks/FormRuleValidate';
import FormRuleValidateSource from './mocks/FormRuleValidate.tsx?raw';

const SanitisedInputForm = lazy(() =>
  import('./mocks/SanitisedInputForm').then((m) => ({
    default: m.SanitisedInputForm,
  })),
);

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
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
    idsConfig: {
      tabDescriptions: {
        rules:
          'Form validation rules are determined from React Hook Form. Here you can see how to use the built-in validation rules, how to add custom validation messages and how to use the `validate` option to create your own rules.',
      },
    },
    ...formParameters,
  },
} as Meta<typeof IressForm>;

export const Default: Story = {
  args: {
    heading: 'Contact details',
    pattern: 'short',
    children: [
      <IressFormField
        key="name"
        name="name"
        label="Name"
        rules={{ required: 'Name is required' }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />,
      <IressFormField
        key="email"
        name="email"
        label="Email address"
        rules={{ required: 'Email is required' }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />,
    ],
  },
};

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
    ...withSource(FormSubmissionSource, {
      stripImports: true,
      stripExportFunction: true,
      replacePropsType: 'IressFormProps<FieldValues>',
      removeProps: ['children'],
    }),
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
    ...withSource(CustomErrorHandlingFormSource, {
      stripImports: true,
      stripExportFunction: true,
      replacePropsType: 'IressFormProps<FieldValues>',
      removeProps: ['children'],
    }),
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
    ...withSource(ControlledFormSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
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
    ...withSource(DisableValidationFormSource, {
      stripImports: true,
      stripExportFunction: true,
      replacePropsType: 'IressFormProps<FieldValues>',
      removeProps: ['children'],
    }),
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
    ...withSource(FormResetSource, {
      stripImports: true,
      stripExportFunction: true,
      replacePropsType: 'IressFormProps<FieldValues>',
      removeProps: ['children'],
    }),
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
  parameters: {
    controls: { disable: true },
  },
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
import { useWatch } from 'react-hook-form';
import componentMeta from './meta';

const ConditionalFields = () => {
  // Instead of creating our own state, we can now use the form state via the useWatch hook, 
  // meaning we still have a single source of truth
  const show = useWatch({ name: 'show'});

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
  parameters: {
    controls: { disable: true },
  },
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

// Recipe stories (merged from FormRecipes.stories.tsx)

export const WithReadonlyData: Story = {
  tags: ['recipe'],
  render: (args) => <WithReadonlyDataForm {...args} />,
  parameters: {
    ...withSource(WithReadonlyDataFormSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const SwitchEditReadonly: Story = {
  tags: ['recipe'],
  render: (args) => <SwitchEditReadonlyForm {...args} />,
  parameters: {
    ...withSource(SwitchEditReadonlyFormSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const NativeValidation: Story = {
  tags: ['recipe'],
  render: (args) => <NativeValidationForm {...args} />,
  parameters: {
    ...withSource(NativeValidationFormSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const NestedForms: Story = {
  tags: ['recipe'],
  render: (args) => <NestedFormsExample {...args} />,
  parameters: {
    ...withSource(NestedFormsSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const FormGroups: Story = {
  tags: ['recipe'],
  render: (args) => <FormGroupsExample {...args} />,
  parameters: {
    ...withSource(FormGroupsSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const FormsInExpanders: Story = {
  tags: ['recipe'],
  render: (args) => <FormExpanders {...args} />,
  parameters: {
    ...withSource(FormExpandersSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const UseWatch: Story = {
  tags: ['recipe'],
  render: (args) => <UseWatchForm {...args} />,
  parameters: {
    ...withSource(UseWatchFormSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const HiddenInputs: Story = {
  tags: ['recipe'],
  render: (args) => <HiddenInputsForm {...args} />,
  parameters: {
    ...withSource(HiddenInputsFormSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const ValidationDependOnOtherFields: Story = {
  tags: ['recipe'],
  render: (args) => <ValidationDependOnOtherFieldsExample {...args} />,
  parameters: {
    ...withSource(ValidationDependOnOtherFieldsSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const CustomFormFieldComponents: Story = {
  tags: ['recipe'],
  render: (args) => <CustomFormFieldComponentsExample {...args} />,
  parameters: {
    ...withSource(CustomFormFieldComponentsSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const SanitisingInput: Story = {
  tags: ['recipe'],
  parameters: {
    controls: { disable: true },
    ...withSource(SanitisedInputFormSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
  render: () => (
    <IressLoadingSuspense>
      <SanitisedInputForm />
    </IressLoadingSuspense>
  ),
};

// Validation Rules (merged from FormRules.stories.tsx)

export const Required: Story = {
  tags: ['tab:rules'],
  render: (args) => <FormRuleRequired {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FormRuleRequiredSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const MaxLength: Story = {
  tags: ['tab:rules'],
  render: (args) => <FormRuleMaxLength {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FormRuleMaxLengthSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const MinLength: Story = {
  tags: ['tab:rules'],
  render: (args) => <FormRuleMinLength {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FormRuleMinLengthSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const Max: Story = {
  tags: ['tab:rules'],
  render: (args) => <FormRuleMax {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FormRuleMaxSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const Min: Story = {
  tags: ['tab:rules'],
  render: (args) => <FormRuleMin {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FormRuleMinSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const Pattern: Story = {
  tags: ['tab:rules'],
  render: (args) => <FormRulePattern {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FormRulePatternSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const MinDate: Story = {
  tags: ['tab:rules'],
  render: (args) => <FormRuleMinDate {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FormRuleMinDateSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const MaxDate: Story = {
  tags: ['tab:rules'],
  render: (args) => <FormRuleMaxDate {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FormRuleMaxDateSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const Email: Story = {
  tags: ['tab:rules'],
  render: (args) => <FormRuleEmail {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FormRuleEmailSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const Validate: Story = {
  tags: ['tab:rules'],
  render: (args) => <FormRuleValidate {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FormRuleValidateSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};
