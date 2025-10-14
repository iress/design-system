import { type Meta, type StoryObj } from '@storybook/react-vite';

import { disableArgTypes } from '@iress-storybook/helpers';
import { STORYBOOK_ONLY_CATEGORY } from '@iress-storybook/constants';
import {
  IressAlert,
  type IressAlertProps,
  IressStack,
  IressText,
  type SystemValidationStatuses,
} from '@/main';

type CustomArgs = Partial<IressAlertProps> & {
  messages: Record<SystemValidationStatuses, string>;
};
type Story = StoryObj<CustomArgs>;

export default {
  title: 'Components/Alert',
  component: IressAlert,
  tags: ['updated'],
} as Meta<typeof IressAlert>;

const statuses = ['danger', 'info', 'success', 'warning'] as const;

export const Default: Story = {
  args: {
    children: 'This is a simple info alert',
    status: 'info',
    heading: '',
    footer: '',
  },
};

export const Status: Story = {
  args: {
    ...Default.args,
    messages: {
      info: 'This is a simple info alert. It is used to provide context around a situation, such as rules around creating a compliant password, or a link to feature documentation or onboarding tips.',
      danger:
        'This is a simple danger alert. It is used for errors and malfunctions that must be resolved before moving forward, such as a summary of errors to correct in a Form.',
      warning:
        'This is a simple warning alert. It is used for a message requiring attention but not resolution in order to continue, such as noting data is not current or your password is about to expire.',
      success:
        'This is a simple success alert. It is used to communicate that an action has been successfully completed, such as saving changes in a Form.',
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
    <IressStack gap="md">
      {statuses.map((status) => (
        <IressAlert {...args} status={status} key={status}>
          {messages[status]}
        </IressAlert>
      ))}
    </IressStack>
  ),
};

export const Heading: Story = {
  args: {
    ...Default.args,
    heading: 'Alert heading',
  },
};

export const Footer: Story = {
  args: {
    heading: 'Alert heading',
    children: <IressText>Here is the warning</IressText>,
    actions: [
      {
        children: 'Action',
        onClick: () => 'Take me somewhere please',
      },
    ],
  },
};

export const Icon: Story = {
  args: {
    heading: 'Some information',
    icon: false,
    children: 'This is an alert without an icon',
  },
};

export const Variant: Story = {
  args: {
    heading: 'Did you know?',
    children: 'You can use the alert component in different ways.',
    icon: false,
    variant: 'sidebar',
  },
  render: (args) => (
    <IressStack gap="md">
      <IressAlert {...args} variant="sidebar" />
      <IressAlert {...args} variant="site-wide" />
    </IressStack>
  ),
};

export const Dismissable: Story = {
  args: {
    ...Default.args,
    onDismiss: () => {
      console.log(
        'Some logic to dismiss the alert, probably saving its dismissed state in local storage or in a database',
      );
    },
  },
};
