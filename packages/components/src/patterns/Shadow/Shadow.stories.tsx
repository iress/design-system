import { Meta, StoryObj } from '@storybook/react-vite';
import { IressShadow } from '.';
import { IressPanel } from '@/main';

type Story = StoryObj<typeof IressShadow>;

export default {
  title: 'Patterns/Shadow',
  component: IressShadow,
  tags: ['beta: '],
} as Meta<typeof IressShadow>;

export const Shadow: Story = {
  args: {
    children: <IressPanel>Content inside shadow DOM</IressPanel>,
  },
};
