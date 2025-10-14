import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressPlaceholder } from '.';

type Story = StoryObj<typeof IressPlaceholder>;

export default {
  title: 'Components/Placeholder',
  component: IressPlaceholder,
  tags: ['updated'],
} as Meta<typeof IressPlaceholder>;

export const Placeholder: Story = {
  args: {
    children: 'Placeholder',
    width: '300',
    height: '300',
  },
};
