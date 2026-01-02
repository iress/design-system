import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressText } from '@/main';

type Story = StoryObj<typeof IressText>;

export default {
  title: 'Styling props/Screen readers',
  component: IressText,
} as Meta<typeof IressText>;

export const srOnly: Story = {
  args: {
    srOnly: true,
    children: 'Hello screen readers',
  },
  parameters: {
    controls: { include: ['hideFrom', 'hideBelow', 'srOnly'] },
  },
};

export const srOnlyResponsive: Story = {
  ...srOnly,
  args: {
    children: 'This content is visible on large screens and screen readers',
    srOnly: { base: true, lg: false },
  },
};

export const hideFrom: Story = {
  ...srOnly,
  args: {
    children: 'Only on mobile screens',
    hideFrom: 'lg',
  },
};

export const hideBelow: Story = {
  ...srOnly,
  args: {
    children: 'Only on large screens',
    hideBelow: 'lg',
  },
};
