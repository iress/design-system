import { Meta, StoryObj } from '@storybook/react';
import { IressValidationMessage } from './ValidationMessage';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressStack } from '../Stack';
import {
  IressValidationMessageProps,
  SYSTEM_VALIDATION_STATUSES,
  SystemValidationStatuses,
} from '@/main';
import { STORYBOOK_ONLY_CATEGORY } from '@iress-storybook/constants';

type CustomArgs = Partial<IressValidationMessageProps> & {
  messages: Record<SystemValidationStatuses, string>;
};
type Story = StoryObj<CustomArgs>;

export default {
  title: 'Components/ValidationMessage',
  component: IressValidationMessage,
} as Meta<typeof IressValidationMessage>;

export const Default: Story = {
  args: {
    children: 'Validation message',
  },
};

export const Status: Story = {
  ...Default,
  args: {
    messages: {
      info: 'Something you should know.',
      danger: 'Something is wrong.',
      warning: 'Something could go wrong.',
      success: 'Something went right.',
    },
  },
  argTypes: {
    ...disableArgTypes(['children', 'status']),
    messages: {
      control: 'object',
      description: 'Messages for each status',
      table: {
        category: STORYBOOK_ONLY_CATEGORY,
      },
    },
  },
  render: ({ messages, ...args }) => (
    <IressStack>
      {SYSTEM_VALIDATION_STATUSES.map((status) => (
        <IressValidationMessage {...args} key={status} status={status}>
          {messages[status]}
        </IressValidationMessage>
      ))}
    </IressStack>
  ),
};

export const Prefix: Story = {
  ...Default,
  args: {
    prefix: 'Prefix: ',
    messages: {
      info: 'Something you should know.',
      danger: 'Something is wrong.',
      warning: 'Something could go wrong.',
      success: 'Something went right.',
    },
    visiblePrefix: true,
  },
  argTypes: {
    ...disableArgTypes(['children', 'status']),
    messages: {
      control: 'object',
      description: 'Messages for each status',
      table: {
        category: STORYBOOK_ONLY_CATEGORY,
      },
    },
  },
  render: ({ messages, ...args }) => (
    <IressStack>
      {SYSTEM_VALIDATION_STATUSES.map((status) => (
        <IressValidationMessage {...args} key={status} status={status}>
          {messages[status]}
        </IressValidationMessage>
      ))}
    </IressStack>
  ),
};
