import { type Meta, type StoryObj } from '@storybook/react';
import { IressTagInput } from './TagInput';

type Story = StoryObj<typeof IressTagInput>;

export default {
  title: 'Components/Tag/TagInput',
  component: IressTagInput,
  tags: ['beta: '],
} as Meta<typeof IressTagInput>;

export const TagInput: Story = {
  args: {
    defaultValue: ['Tag'],
  },
};
