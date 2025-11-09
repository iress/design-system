import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressButton, IressText } from '@/main';
import { type ToastStatus, Toast } from './Toast';
import { capitalizeFirstLetter } from '@helpers/formatting/capitalizeFirstLetter';
import { IressStack } from '../../../Stack/Stack';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof Toast>;
const TOAST_STATUS: ToastStatus[] = ['success', 'error', 'info'];
const actionOptions = {
  none: null,
  TryAgain: (
    <IressButton key="test" status="danger">
      Try Again
    </IressButton>
  ),
};

const headingOptions = {
  none: null,
  Heading: <h2>Toast with a h2 tag</h2>,
  CustomHeading: (
    <IressText textStyle="typography.heading.5" noGutter>
      Toast heading with &quot;Heading5&quot; with no color
    </IressText>
  ),
};

const getMessageByStatus = (status: ToastStatus) => {
  if (status === 'error')
    return 'Error toasts are useful for when a user has tried to submit some data but the submit has failed, due to an api error or loss of internet connection, for example.';
  if (status === 'info')
    return 'Ideal for conveying updates or notifications that do not require immediate action, as well as gently inform users about events or changes within an application or interface.';
  return 'Use to communicate that an action has been successfully completed, such as saving changes in a form.';
};

export default {
  title: 'Components/Toaster/Toast',
  component: Toast,
  argTypes: {
    ...disableArgTypes(['onClose']),
    heading: {
      control: {
        type: 'select',
        labels: {
          Heading: 'With h2 tag',
          CustomHeading: 'With Custom Heading',
        },
      },
      options: Object.keys(headingOptions),
      mapping: headingOptions,
    },
    actions: {
      control: {
        type: 'select',
        labels: {
          TryAgain: 'With Action Button',
        },
      },
      options: Object.keys(actionOptions),
      mapping: actionOptions,
    },
    status: {
      defaultValue: 'error',
    },
  },
  tags: ['updated'],
} as Meta<typeof Toast>;

export const Default: Story = {
  args: {
    status: 'error',
    heading: 'Error',
    children:
      'Connection failure. Longer text description should wrap and look like this. Try to limit to 3 lines or less.',
  },
};

export const Standalone: Story = {
  ...Default,
};

export const Status: Story = {
  args: {
    ...Default.args,
    children: '',
    heading: '',
  },
  argTypes: {
    ...disableArgTypes(['status']),
  },
  render: ({ heading, children, ...args }) => (
    <IressStack gap="lg">
      {TOAST_STATUS.map((status) => (
        <Toast
          key={status}
          {...args}
          heading={heading === '' ? capitalizeFirstLetter(status) : heading}
          status={status}
        >
          {children === '' ? getMessageByStatus(status) : children}
        </Toast>
      ))}
    </IressStack>
  ),
};

export const Footer: Story = {
  args: {
    ...Default.args,
    actions: actionOptions.TryAgain,
  },
};

export const Heading: Story = {
  args: {
    ...Default.args,
    heading: headingOptions.Heading,
  },
};

export const Dismissible: Story = {
  args: {
    status: 'info',
    heading: 'Information',
    children: 'Information toast with dismiss button',
    dismissible: true,
  },
};
