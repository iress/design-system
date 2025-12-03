import { type Meta, type StoryObj } from '@storybook/react';
import { type FC } from 'react';
import { ValidateLoading } from './ValidateLoading';

// This is a pattern for IressLoading, hence we change the name
(ValidateLoading as FC).displayName = 'IressLoading';

type Story = StoryObj<typeof ValidateLoading>;

export default {
  title: 'Patterns/Loading/Patterns/Validate',
  component: ValidateLoading,
  tags: ['beta: '],
} as Meta<typeof ValidateLoading>;

export const Validate: Story = {
  args: {
    pattern: 'validate',
    loading: true,
  },
};
