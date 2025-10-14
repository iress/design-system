import { Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import { withCustomSource } from '@iress-storybook/helpers';
import { PageLoading } from './PageLoading';
import { LoadingDashboard } from '../mocks/LoadingDashboard';
import LoadingDashboardSource from '../mocks/LoadingDashboard.tsx?raw';

// This is a pattern for IressLoading, hence we change the name
(PageLoading as FC).displayName = 'IressLoading';

type Story = StoryObj<typeof PageLoading>;

export default {
  title: 'Patterns/Loading/Patterns/Page',
  component: PageLoading,
  tags: ['beta: '],
} as Meta<typeof PageLoading>;

export const Page: Story = {
  render: () => <LoadingDashboard />,
  parameters: {
    ...withCustomSource(LoadingDashboardSource),
  },
};
