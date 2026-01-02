import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressForm,
  IressFormField,
  type IressFormFieldProps,
  IressInput,
  IressText,
} from '@/main';
import {
  disableArgTypes,
  mergeStorybookConfig,
  addToStorybookCategory,
} from '@iress-oss/ids-storybook-config';

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
  args: {
    label: 'Comment',
    name: 'comment',
    hint: 'Enter your feedback (max 200 characters)',
    render: (controlledProps) => (
      <IressInput
        {...controlledProps}
        rows={3}
        maxLength={200}
        placeholder="Type your comment here..."
      />
    ),
    renderSupplementary: ({ value }) => (
      <IressText textStyle="typography.body.sm" color="muted">
        {(value as string)?.length || 0} / 200 characters
      </IressText>
    ),
    rules: {
      maxLength: {
        value: 200,
        message: 'Comment must not exceed 200 characters',
      },
    },
  },
};
