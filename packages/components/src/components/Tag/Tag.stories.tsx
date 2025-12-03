import { type Meta, type StoryObj } from '@storybook/react';
import { IressTag } from '.';
import { TagDeletion } from './mocks/TagDeletion';
import TagDeletionSource from './mocks/TagDeletion.tsx?raw';

type Story = StoryObj<typeof IressTag>;

export default {
  title: 'Components/Tag',
  component: IressTag,
} as Meta<typeof IressTag>;

export const Tag: Story = {
  args: {
    children: 'Tag',
  },
};

export const DeletingTags: Story = {
  render: (args) => <TagDeletion {...args} />,
  parameters: {
    docs: {
      source: {
        code: TagDeletionSource,
        language: 'tsx',
      },
    },
  },
};
