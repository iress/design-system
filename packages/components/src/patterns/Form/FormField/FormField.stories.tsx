import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressForm,
  IressFormField,
  type IressFormFieldProps,
  IressInput,
} from '@/main';
import {
  disableArgTypes,
  mergeStorybookConfig,
  addToStorybookCategory,
  reactNodeArgType,
  withSource,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import { FormFieldSupplementary } from './mocks/FormFieldSupplementary';
import FormFieldSupplementarySource from './mocks/FormFieldSupplementary.tsx?raw';

type Story = StoryObj<typeof IressFormField>;

export default {
  title: 'Patterns/Form/FormField',
  component: IressFormField,
  args: {
    label: 'Label',
    name: 'field',
    render: (controlledProps) => <IressInput {...controlledProps} />,
  },
  argTypes: {
    ...mergeStorybookConfig(
      disableArgTypes(['render']),
      addToStorybookCategory<IressFormFieldProps>('React Hook Forms', [
        'control',
        'defaultValue',
        'shouldUnregister',
      ]),
      addToStorybookCategory<IressFormFieldProps>('Field props', [
        'error',
        'errorMessages',
        'hiddenLabel',
        'hint',
      ]),
      {
        label: reactNodeArgType,
        error: reactNodeArgType,
        supplementary: reactNodeArgType,
        ...stylingProps,
      },
    ),
  },
  decorators: [
    (Story) => (
      <IressForm>
        <Story />
      </IressForm>
    ),
  ],
} as Meta<typeof IressFormField>;

export const Default: Story = {};

export const RenderSupplementary: Story = {
  name: 'Supplementary content',
  render: (args) => <FormFieldSupplementary {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FormFieldSupplementarySource, { stripImports: true }),
  },
};
