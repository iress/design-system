import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressValidationMessage } from './ValidationMessage';
import { IressStack } from '../Stack';
import {
  IressDivider,
  IressInput,
  type IressValidationMessageProps,
  STATUSES,
  type Statuses,
} from '@/main';
import {
  componentStoryMeta,
  disableArgTypes,
  STORYBOOK_ONLY_CATEGORY,
  reactNodeArgType,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

interface CustomArgs {
  messages: Record<Statuses, string>;
}
type Story = StoryObj<Partial<IressValidationMessageProps> & CustomArgs>;
type LinkToTargetStory = StoryObj<
  Partial<IressValidationMessageProps<string>> & CustomArgs
>;

export default {
  title: 'Components/ValidationMessage',
  component: IressValidationMessage,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: reactNodeArgType,
      prefix: reactNodeArgType,
    },
  }),
} as Meta<typeof IressValidationMessage>;

export const Default: Story = {
  args: {
    children: 'Validation message',
  },
};

export const Status: Story = {
  ...Default,
  args: {},
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
  render: (args) => (
    <IressStack>
      <IressValidationMessage {...args} status="info">
        Something you should know.
      </IressValidationMessage>
      <IressValidationMessage {...args} status="danger">
        Something is wrong.
      </IressValidationMessage>
      <IressValidationMessage {...args} status="warning">
        Something could go wrong.
      </IressValidationMessage>
      <IressValidationMessage {...args} status="success">
        Something went right.
      </IressValidationMessage>
    </IressStack>
  ),
};

export const Prefix: Story = {
  ...Default,
  args: {
    prefix: 'Prefix: ',
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
  render: (args) => (
    <IressStack>
      <IressValidationMessage {...args} status="info">
        Something you should know.
      </IressValidationMessage>
      <IressValidationMessage {...args} status="danger">
        Something is wrong.
      </IressValidationMessage>
      <IressValidationMessage {...args} status="warning">
        Something could go wrong.
      </IressValidationMessage>
      <IressValidationMessage {...args} status="success">
        Something went right.
      </IressValidationMessage>
    </IressStack>
  ),
};

export const LinkToTarget: LinkToTargetStory = {
  args: {
    linkToTarget: 'input',
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
  render: (args) => (
    <IressStack gap="md">
      <IressStack>
        <IressValidationMessage {...args} status="info" linkToTarget="input">
          Something you should know.
        </IressValidationMessage>
        <IressValidationMessage {...args} status="danger" linkToTarget="input">
          Something is wrong.
        </IressValidationMessage>
        <IressValidationMessage {...args} status="warning" linkToTarget="input">
          Something could go wrong.
        </IressValidationMessage>
        <IressValidationMessage {...args} status="success" linkToTarget="input">
          Something went right.
        </IressValidationMessage>
      </IressStack>
      <IressDivider />
      <IressInput id="input" />
    </IressStack>
  ),
};
