import { Meta, StoryObj } from '@storybook/react';
import { IressPlaceholder } from '.';

type Story = StoryObj<typeof IressPlaceholder>;

export default {
  title: 'Components/Placeholder',
  component: IressPlaceholder,
} as Meta<typeof IressPlaceholder>;

export const Placeholder: Story = {
  args: {
    children: 'Placeholder',
    width: '300',
    height: '300',
  },
};
