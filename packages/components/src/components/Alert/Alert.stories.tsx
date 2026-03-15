import { type Meta, type StoryObj } from '@storybook/react-vite';

import {
  IressAlert,
  type IressAlertProps,
  IressStack,
  STATUSES,
  type Statuses,
} from '@/main';
import {
  disableArgTypes,
  STORYBOOK_ONLY_CATEGORY,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type CustomArgs = Partial<IressAlertProps> & {
  messages: Record<Statuses | 'neutral', string>;
};
type Story = StoryObj<CustomArgs>;

export default {
  title: 'Components/Alert',
  component: IressAlert,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    footer: reactNodeArgType,
    heading: reactNodeArgType,
    ...stylingProps,
  },
} as Meta<typeof IressAlert>;

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
      neutral:
        'This is a simple neutral alert. It is normally used for general information that does not fit into the other categories, such as a note about requesting cookie consent, advertising a new feature or an upcoming change.',
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
      {[...STATUSES, 'neutral'].map((status) => (
        <IressAlert {...args} status={status as never} key={status}>
          {messages[status as never]}
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
    status: 'danger',
    children: 'Are you sure you want to proceed with this action?',
    onClose: () => console.log('Alert dismissed'),
    actions: [
      {
        children: 'Action',
        mode: 'tertiary',
        onClick: () => 'Take me somewhere please',
      },
      {
        children: 'Action',
        mode: 'secondary',
        onClick: () => 'Take me somewhere please',
      },
    ],
  },
  argTypes: {
    ...disableArgTypes(['status']),
  },
  render: (args) => (
    <IressStack gap="md">
      <IressAlert {...args} status="danger" />
      <IressAlert {...args} status="info" />
      <IressAlert {...args} status="success" />
      <IressAlert {...args} status="warning" />
      <IressAlert {...args} status="neutral" />
    </IressStack>
  ),
};

export const MultiLine: Story = {
  args: {
    heading: 'Alert heading',
    status: 'danger',
    children:
      'Once you confirm, the system will begin re-indexing your entire library, which may temporarily limit access to certain collaborative features for approximately five to ten minutes depending on your connection speed. If you are currently working in a multi-user environment, other active contributors will be notified of these updates automatically. If you have any doubts regarding the integrity of the incoming data, we strongly recommend canceling this prompt and consulting your administrator.',
    multiLine: true,
    onClose: () => console.log('Alert dismissed'),
    actions: [
      {
        children: 'Action',
        mode: 'secondary',
        onClick: () => 'Take me somewhere please',
      },
      {
        children: 'Action',
        mode: 'tertiary',
        onClick: () => 'Take me somewhere please',
      },
    ],
  },
  argTypes: {
    ...disableArgTypes(['status']),
  },
  render: (args) => (
    <IressStack gap="md">
      <IressAlert {...args} status="danger" />
      <IressAlert {...args} status="info" />
      <IressAlert {...args} status="success" />
      <IressAlert {...args} status="warning" />
      <IressAlert {...args} status="neutral" />
    </IressStack>
  ),
};

export const Icon: Story = {
  args: {
    heading: 'Some information',
    multiLine: true,
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
      <IressAlert {...args} variant="full-width" />
    </IressStack>
  ),
};

export const Dismissable: Story = {
  args: {
    ...Default.args,
    onClose: () => {
      console.log(
        'Some logic to dismiss the alert, probably saving its dismissed state in local storage or in a database',
      );
    },
  },
  argTypes: {
    ...disableArgTypes(['status']),
  },
  render: (args) => (
    <IressStack gap="md">
      <IressAlert {...args} status="danger" />
      <IressAlert {...args} status="info" />
      <IressAlert {...args} status="success" />
      <IressAlert {...args} status="warning" />
      <IressAlert {...args} status="neutral" />
    </IressStack>
  ),
};
