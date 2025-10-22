import { Meta, StoryObj } from '@storybook/react-vite';
import { IressPanel } from '@/main';

type Story = StoryObj<typeof IressPanel>;

export default {
  title: 'Styling props/Typography',
  component: IressPanel,
} as Meta<typeof IressPanel>;

export const textStyle: Story = {
  args: {
    bg: 'alt',
    children: 'A panel with large text',
    textStyle: 'typography.body.lg',
  },
  parameters: {
    controls: { include: ['textAlign', 'textStyle'] },
  },
};

export const textAlign: Story = {
  ...textStyle,
  args: {
    bg: 'alt',
    children: 'A panel with centered text',
    textAlign: 'center',
  },
};
