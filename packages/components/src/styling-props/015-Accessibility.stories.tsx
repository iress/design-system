import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressText } from '@/main';

type Story = StoryObj<typeof IressText>;

export default {
  title: 'Styling props/Accessibility',
  component: IressText,
  parameters: {
    idsConfig: {
      autodocsTemplate: 'default',
    }
  }
} as Meta<typeof IressText>;

export const focusable: Story = {
  args: {
    children:
      'This element will have focus styles applied when it is focused. This is useful for accessibility and keyboard navigation.',
    focusable: 'true',
    tabIndex: 0,
  },
  parameters: {
    controls: { include: ['focusable', 'srOnly'] },
  },
};

export const focusableInset: Story = {
  args: {
    children:
      'This element uses an inset focus ring, which renders inside the element boundary.',
    focusable: 'inset',
    tabIndex: 0,
    p: 'spacing.4',
    bg: 'colour.neutral.20',
  },
  parameters: {
    controls: { include: ['focusable'] },
  },
};

export const srOnly: Story = {
  ...focusable,
  args: {
    srOnly: true,
    children: 'Hello screen readers',
  },
};

export const srOnlyResponsive: Story = {
  ...focusable,
  args: {
    children: 'This content is visible on large screens and screen readers',
    srOnly: { base: true, lg: false },
  },
};
