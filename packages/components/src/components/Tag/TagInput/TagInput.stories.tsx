import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTagInput } from './TagInput';
import { stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressTagInput>;

export default {
  title: 'Components/Tag/TagInput',
  component: IressTagInput,
  tags: ['updated'],
  args: stylingProps,
} as Meta<typeof IressTagInput>;

export const TagInput: Story = {
  args: {
    defaultValue: ['Tag'],
    placeholder: 'Type and hit enter to add a tag',
    tagLimit: 999,
  },
};
