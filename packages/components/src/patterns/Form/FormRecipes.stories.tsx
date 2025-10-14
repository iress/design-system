import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressForm } from './Form';
import { WithReadonlyDataForm } from './mocks/WithReadonlyDataForm';
import WithReadonlyDataFormSource from './mocks/WithReadonlyDataForm.tsx?raw';
import { withCustomSource } from '@iress-storybook/helpers';
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
import {
  formArgs,
  formArgTypes,
  formParameters,
} from './mocks/storybookFormHelpers';
import { HiddenInputsForm } from './mocks/HiddenInputsForm';
import HiddenInputsFormSource from './mocks/HiddenInputsForm.tsx?raw';
import ValidationDependOnOtherFieldsSource from './mocks/ValidationDependOnOtherFields.tsx?raw';
import { ValidationDependOnOtherFields as ValidationDependOnOtherFieldsExample } from './mocks/ValidationDependOnOtherFields';
import { CustomFormFieldComponents as CustomFormFieldComponentsExample } from './mocks/CustomFormFieldComponents';
import CustomFormFieldComponentsSource from './mocks/CustomFormFieldComponents.tsx?raw';

type Story = StoryObj<typeof IressForm>;

export default {
  title: 'Patterns/Form/Recipes',
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

export const WithReadonlyData: Story = {
  render: (args) => <WithReadonlyDataForm {...args} />,
  parameters: {
    ...withCustomSource(WithReadonlyDataFormSource),
  },
};

export const SwitchEditReadonly: Story = {
  render: (args) => <SwitchEditReadonlyForm {...args} />,
  parameters: {
    ...withCustomSource(SwitchEditReadonlyFormSource),
  },
};

export const NativeValidation: Story = {
  render: (args) => <NativeValidationForm {...args} />,
  parameters: {
    ...withCustomSource(NativeValidationFormSource),
  },
};

export const NestedForms: Story = {
  render: (args) => <NestedFormsExample {...args} />,
  parameters: {
    ...withCustomSource(NestedFormsSource),
  },
};

export const FormGroups: Story = {
  render: (args) => <FormGroupsExample {...args} />,
  parameters: {
    ...withCustomSource(FormGroupsSource),
  },
};

export const FormsInExpanders: Story = {
  render: (args) => <FormExpanders {...args} />,
  parameters: {
    ...withCustomSource(FormExpandersSource),
  },
};

export const UseWatch: Story = {
  render: (args) => <UseWatchForm {...args} />,
  parameters: {
    ...withCustomSource(UseWatchFormSource),
  },
};

export const HiddenInputs: Story = {
  render: (args) => <HiddenInputsForm {...args} />,
  parameters: {
    ...withCustomSource(HiddenInputsFormSource),
  },
};

export const ValidationDependOnOtherFields: Story = {
  render: (args) => <ValidationDependOnOtherFieldsExample {...args} />,
  parameters: {
    ...withCustomSource(ValidationDependOnOtherFieldsSource),
  },
};

export const CustomFormFieldComponents: Story = {
  render: (args) => <CustomFormFieldComponentsExample {...args} />,
  parameters: {
    ...withCustomSource(CustomFormFieldComponentsSource),
  },
};
