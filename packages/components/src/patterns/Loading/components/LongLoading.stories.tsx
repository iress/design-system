import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type FC } from 'react';
import { LongLoading } from './LongLoading';
import { LoadingLongWithError } from '../mocks/LoadingLongWithError';
import LoadingLongWithErrorSource from '../mocks/LoadingLongWithError.tsx?raw';
import { withCustomSource } from '@iress-oss/ids-storybook-config';

// This is a pattern for IressLoading, hence we change the name
(LongLoading as FC).displayName = 'IressLoading';

type Story = StoryObj<typeof LongLoading>;

export default {
  title: 'Patterns/Loading/Patterns/Long',
  component: LongLoading,
  tags: ['beta: '],
} as Meta<typeof LongLoading>;

export const Long: Story = {
  args: {
    messageList: {
      3000: 'Processing transcript',
      5000: 'Noting key information',
      7000: 'Generating summary',
    },
    pattern: 'long',
  },
};

export const LongError: Story = {
  render: () => <LoadingLongWithError />,
  parameters: {
    ...withCustomSource(LoadingLongWithErrorSource),
  },
};
