import { type Meta, type StoryObj } from '@storybook/react';
import {
  IressForm,
  IressFormField,
  type IressFormFieldProps,
  IressInput,
} from '@/main';
import {
  addToStorybookCategory,
  disableArgTypes,
  mergeStorybookConfig,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressFormField>;

export default {
  title: 'Components/Form/FormField',
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
        'optional',
      ]),
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
