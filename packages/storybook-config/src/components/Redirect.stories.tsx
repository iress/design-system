import type { Meta, StoryObj } from '@storybook/react-vite';
import { Redirect } from './Redirect';

type Story = StoryObj<typeof Redirect>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Redirect> = {
  title: 'Components/Redirect',
  component: Redirect,
};

export default meta;

export const ToIress: Story = {
  args: {
    to: 'https://iress.com',
  },
};
