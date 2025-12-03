import { type Meta, type StoryObj } from '@storybook/react';
import { IressMenuText } from './MenuText';

type Story = StoryObj<typeof IressMenuText>;

export default {
  title: 'Components/Menu/MenuItem/Text',
  component: IressMenuText,
} as Meta<typeof IressMenuText>;

export const Text: Story = {
  args: {
    children: 'Menu text',
  },
};
