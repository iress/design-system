import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTag } from '.';
import { TagDeletion } from './mocks/TagDeletion';
import TagDeletionSource from './mocks/TagDeletion.tsx?raw';
import { IressPopover } from '../Popover';
import { IressButton } from '../Button';
import { IressIcon } from '../Icon';
import { IressPanel } from '../Panel';
import {
  withCustomSource,
  withJsxTransformer,
  disableArgTypes,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import { IressInline } from '@/main';
import { STATUSES } from '@/constants';
import componentMeta from './meta';

type Story = StoryObj<typeof IressTag>;
const BADGE_MODES = [10, 20, 30, 40, 50, 60, 70, 80, 90] as const;

export default {
  title: 'Components/Tag',
  component: IressTag,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    deleteButton: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressTag>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const Mode: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: (args) => (
    <IressInline gap="sm">
      {BADGE_MODES.map((mode) => (
        <IressTag {...args} key={mode} mode={mode}>
          {mode}
        </IressTag>
      ))}
    </IressInline>
  ),
};

export const Status: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: (args) => (
    <IressInline gap="sm">
      {STATUSES.map((status) => (
        <IressTag {...args} key={status} mode={status}>
          {status}
        </IressTag>
      ))}
    </IressInline>
  ),
};

export const Bordered: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['mode', 'bordered']),
  },
  render: (args) => (
    <IressInline gap="sm">
      <IressTag {...args} bordered>
        No mode
      </IressTag>
      {BADGE_MODES.map((mode) => (
        <IressTag {...args} key={mode} mode={mode} bordered>
          {mode}
        </IressTag>
      ))}
      {STATUSES.map((status) => (
        <IressTag {...args} key={status} mode={status} bordered>
          {status}
        </IressTag>
      ))}
    </IressInline>
  ),
};

export const ClickableTag: Story = {
  args: {
    children: 'Tag',
    bordered: true,
    onClick: () => {
      console.log('Tag clicked');
    },
  },
  parameters: {
    ...withJsxTransformer({
      showFunctions: true,
    }),
  },
};

export const LinkTag: Story = {
  args: {
    children: 'Link Tag',
    element: 'a',
    href: '#',
  },
};

export const Compact: Story = {
  args: {
    ...Default.args,
    compact: true,
    onDelete: () => {
      console.log('Tag deleted');
    },
  },
  parameters: {
    ...withJsxTransformer({
      showFunctions: true,
    }),
  },
};

export const DeletingTags: Story = {
  render: (args) => <TagDeletion {...args} />,
  parameters: {
    ...withCustomSource(TagDeletionSource),
  },
};

export const CustomButton: Story = {
  args: {
    ...Default.args,
    deleteButton: (
      <IressPopover
        activator={
          <IressButton mode="muted">
            <IressIcon name="chevron-circle-down" screenreaderText="Actions" />
          </IressButton>
        }
        align="bottom-start"
      >
        <IressPanel>Some actions go in here</IressPanel>
      </IressPopover>
    ),
  },
};
