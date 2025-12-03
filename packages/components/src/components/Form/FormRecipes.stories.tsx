import { type Meta, type StoryObj } from '@storybook/react';
import { IressForm } from './Form';
import { addToReactHookFormsCategory } from './mocks/addToReactHookFormsCategory';
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
import { HiddenInputsForm } from './mocks/HiddenInputsForm';
import HiddenInputsFormSource from './mocks/HiddenInputsForm.tsx?raw';
import ValidationDependOnOtherFieldsSource from './mocks/ValidationDependOnOtherFields.tsx?raw';
import { ValidationDependOnOtherFields as ValidationDependOnOtherFieldsExample } from './mocks/ValidationDependOnOtherFields';
import { withCustomSource } from '@iress-oss/ids-storybook-sandbox';

type Story = StoryObj<typeof IressForm>;

export default {
  title: 'Components/Form/Recipes',
  component: IressForm,
  argTypes: {
    ...addToReactHookFormsCategory(),
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
