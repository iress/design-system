import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginSplash } from './LoginSplash';

type Story = StoryObj<typeof LoginSplash>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LoginSplash> = {
  title: 'LoginSplash',
  component: LoginSplash,
  tags: ['autodocs'],
};

export default meta;

export const Default: Story = {};
