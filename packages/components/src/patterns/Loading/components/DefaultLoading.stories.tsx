import { type Meta, type StoryObj } from '@storybook/react';
import { DefaultLoading } from './DefaultLoading';
import { type FC } from 'react';

// This is a pattern for IressLoading, hence we change the name
(DefaultLoading as FC).displayName = 'IressLoading';

type Story = StoryObj<typeof DefaultLoading>;

export default {
  title: 'Patterns/Loading/Patterns/Default',
  component: DefaultLoading,
  tags: ['beta: '],
} as Meta<typeof DefaultLoading>;

export const Default: Story = {
  args: {
    pattern: 'default',
  },
};
