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
      {STATUSES.map((status) => (
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
      {STATUSES.map((status) => (
        <IressValidationMessage {...args} key={status} status={status}>
          {messages[status]}
        </IressValidationMessage>
      ))}
    </IressStack>
  ),
};

export const LinkToTarget: LinkToTargetStory = {
  args: {
    linkToTarget: 'input',
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
    <IressStack gap="md">
      <IressStack>
        {STATUSES.map((status) => (
          <IressValidationMessage
            {...args}
            key={status}
            status={status}
            linkToTarget={args.linkToTarget ?? ''}
          >
            {messages[status]}
          </IressValidationMessage>
        ))}
      </IressStack>
      <IressDivider />
      <IressInput id={args.linkToTarget} />
    </IressStack>
  ),
};
