import { type Meta, type StoryObj } from '@storybook/react';
import { type FC } from 'react';
import { PageLoading } from './PageLoading';
import { LoadingDashboard } from '../mocks/LoadingDashboard';
import LoadingDashboardSource from '../mocks/LoadingDashboard.tsx?raw';
import { withCustomSource } from '@iress-oss/ids-storybook-config';

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
