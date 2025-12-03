import { type Meta, type StoryObj } from '@storybook/react';
import {
  IressAlert,
  type IressAlertProps,
  IressButton,
  IressText,
  type SystemValidationStatus,
} from '@/main';
import {
  disableArgTypes,
  STORYBOOK_ONLY_CATEGORY,
} from '@iress-oss/ids-storybook-config';

type CustomArgs = Partial<IressAlertProps> & {
  messages: Record<SystemValidationStatus, string>;
};
type Story = StoryObj<CustomArgs>;

export default {
  title: 'Components/Alert',
  component: IressAlert,
} as Meta<typeof IressAlert>;

export const Default: Story = {
  args: {
    children: 'This is a simple info alert',
    status: IressAlert.Status.Info,
    heading: '',
    footer: '',
  },
};

const statuses = Object.values(IressAlert.Status);
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
    <div className="iress-u-stack iress--gutter--md">
      {statuses.map((status) => (
        <IressAlert {...args} status={status} key={status}>
          {messages[status]}
        </IressAlert>
      ))}
    </div>
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
    footer: <IressButton>Close</IressButton>,
  },
};
