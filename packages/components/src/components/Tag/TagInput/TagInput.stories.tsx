import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTagInput } from './TagInput';

type Story = StoryObj<typeof IressTagInput>;

export default {
  title: 'Components/Tag/TagInput',
  component: IressTagInput,
  tags: ['updated'],
} as Meta<typeof IressTagInput>;

export const TagInput: Story = {
  args: {
    defaultValue: ['Tag'],
    placeholder: 'Type and hit enter to add a tag',
    tagLimit: 999,
  },
};
