import { Meta, StoryObj } from '@storybook/react-vite';
import { IressMenuDivider } from '@/main';

type Story = StoryObj<typeof IressMenuDivider>;

export default {
  title: 'Components/Menu/MenuItem/Divider',
  component: IressMenuDivider,
} as Meta<typeof IressMenuDivider>;

export const Divider: Story = {};
