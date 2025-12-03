import { type Meta, type StoryObj } from '@storybook/react';
import {
  IressDivider,
  IressInput,
  IressStack,
  SYSTEM_VALIDATION_STATUSES,
  type SystemValidationStatuses,
} from '@/main';
import { type IressValidationLinkProps } from './ValidationLink.types';
import { IressValidationLink } from './ValidationLink';
import {
  disableArgTypes,
  STORYBOOK_ONLY_CATEGORY,
} from '@iress-oss/ids-storybook-config';

type CustomArgs = Partial<IressValidationLinkProps> & {
  messages: Record<SystemValidationStatuses, string>;
};
type Story = StoryObj<CustomArgs>;

export default {
  title: 'Components/ValidationMessage/ValidationLink',
  component: IressValidationLink,
} as Meta<typeof IressValidationLink>;

export const ValidationLink: Story = {
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
    <IressStack gutter="md">
      <IressStack>
        {SYSTEM_VALIDATION_STATUSES.map((status) => (
          <IressValidationLink
            {...args}
            key={status}
            status={status}
            linkToTarget={args.linkToTarget ?? ''}
          >
            {messages[status]}
          </IressValidationLink>
        ))}
      </IressStack>
      <IressDivider />
      <IressInput id={args.linkToTarget} />
    </IressStack>
  ),
};
