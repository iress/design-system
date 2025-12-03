import { type Meta, type StoryObj } from '@storybook/react';
import { IressMenuHeading } from '@/main';

type Story = StoryObj<typeof IressMenuHeading>;

export default {
  title: 'Components/Menu/MenuItem/Heading',
  component: IressMenuHeading,
} as Meta<typeof IressMenuHeading>;

export const Heading: Story = {
  args: {
    children: 'Menu heading',
  },
};
