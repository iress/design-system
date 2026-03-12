import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressMenuDivider } from '@/main';
import { stylingProps } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressMenuDivider>;

export default {
  title: 'Components/Menu/MenuItem/Divider',
  component: IressMenuDivider,
  argTypes: stylingProps,
} as Meta<typeof IressMenuDivider>;

export const Divider: Story = {};
