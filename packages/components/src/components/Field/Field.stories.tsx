import { type StoryObj, type Meta } from '@storybook/react';

import { IressInput, type IressInputProps } from '../Input';
import { IressValidationMessage } from '../ValidationMessage';
import { IressField } from './Field';
import { IressIcon } from '../Icon';
import { IressButton } from '../Button';
import { IressReadonly } from '../Readonly';
import {
  disableArgTypes,
  STORYBOOK_ONLY_CATEGORY,
} from '@iress-oss/ids-storybook-config';

type IressFieldPropsAndCustomArgs = React.ComponentProps<typeof IressField> & {
  input: Omit<IressInputProps, 'onChange'>;
};

type Story = StoryObj<IressFieldPropsAndCustomArgs>;

const defaultInput = {
  id: 'name',
  name: 'input1',
  required: true,
  type: 'text',
};

export default {
  title: 'Components/Field',
  component: IressField,
  argTypes: {
    ...disableArgTypes(['children']),
    input: {
      name: 'Input settings',
      type: 'array',
      table: {
        category: STORYBOOK_ONLY_CATEGORY,
      },
      defaultValue: defaultInput,
    },
  },
} as Meta<typeof IressField>;

export const Default: Story = {
  args: {
    label: 'First name',
    input: defaultInput,
  },
  render: ({ input, ...args }) => (
    <IressField {...args}>
      <IressInput {...input} />
    </IressField>
  ),
};

export const Label: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: (
      <span>
        <IressIcon name="home" /> Find your address
      </span>
    ),
  },
  argTypes: {
    ...disableArgTypes(['label']),
  },
};

export const Hint: Story = {
  ...Default,
  args: {
    ...Default.args,
    hint: 'For us to be able to contact you in the future',
    label: 'Email address',
    input: {
      id: 'email',
      name: 'email',
      required: true,
      type: 'email',
    },
  },
};

export const ErrorMessage: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Error message',
    errorMessages: [
      {
        message: 'This field is required',
      },
    ],
    input: {
      id: 'name',
      name: 'name',
      required: true,
      append: (
        <IressButton
          data-testid="show-password-icon"
          mode="tertiary"
          prepend={
            <IressIcon
              name="fal fa-light fa-eye"
              size="sm"
              style={{ width: '18px' }}
              screenreaderText="Show"
            />
          }
        ></IressButton>
      ),
    },
  },
};

export const CustomError: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Custom error',
    error: (
      <IressValidationMessage>
        This is a custom error message
      </IressValidationMessage>
    ),
    input: {
      id: 'name',
      name: 'name',
      required: true,
    },
  },
};

export const HiddenLabel = {
  ...Default,
  args: {
    ...Default.args,
    label: 'This label is hidden',
    hint: 'This hint text is hidden',
    hiddenLabel: true,
  },
};

export const HiddenLabelWithError = {
  ...Default,
  args: {
    ...Default.args,
    label: 'This label is hidden',
    hint: 'This hint text is hidden',
    error: (
      <IressValidationMessage>
        Even fields with hidden labels will show their validation message
      </IressValidationMessage>
    ),
    hiddenLabel: true,
  },
};

export const Required = {
  ...Default,
  args: {
    ...Default.args,
    label: 'This field is required',
    required: true,
  },
};

export const Optional = {
  ...Default,
  args: {
    ...Default.args,
    label: 'This field is optional',
    optional: true,
  },
};

export const ReadonlyData: Story = {
  args: {
    label: 'First name',
    hint: 'This field is readonly',
    input: {
      ...defaultInput,
      value: 'Luke Skywalker',
    },
    readOnly: true,
    required: true,
  },
  render: ({ input, ...args }) => (
    <IressField {...args}>
      <IressReadonly {...input} />
    </IressField>
  ),
};
