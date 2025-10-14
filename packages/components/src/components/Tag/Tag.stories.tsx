import { Meta, StoryObj } from '@storybook/react-vite';
import { IressTag } from '.';
import { TagDeletion } from './mocks/TagDeletion';
import TagDeletionSource from './mocks/TagDeletion.tsx?raw';
import { withCustomSource } from '@iress-storybook/helpers';
import { IressPopover } from '../Popover';
import { IressButton } from '../Button';
import { IressIcon } from '../Icon';
import { IressPanel } from '../Panel';

type Story = StoryObj<typeof IressTag>;

export default {
  title: 'Components/Tag',
  component: IressTag,
  tags: ['updated'],
} as Meta<typeof IressTag>;

export const Tag: Story = {
  args: {
    children: 'Tag',
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
    ...Tag.args,
    deleteButton: (
      <IressPopover
        activator={
          <IressButton mode="tertiary">
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
