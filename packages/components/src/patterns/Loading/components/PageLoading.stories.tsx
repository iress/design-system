import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type FC } from 'react';
import { PageLoading } from './PageLoading';
import { LoadingDashboard } from '../mocks/LoadingDashboard';
import LoadingDashboardSource from '../mocks/LoadingDashboard.tsx?raw';
import { LoadingDashboardError } from '../mocks/LoadingDashboardError';
import LoadingDashboardErrorSource from '../mocks/LoadingDashboardError.tsx?raw';
import {
  withSource,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

// This is a pattern for IressLoading, hence we change the name
(PageLoading as FC).displayName = 'IressLoading';

type Story = StoryObj<typeof PageLoading>;

export default {
  title: 'Patterns/Loading/Patterns/Page',
  component: PageLoading,
  tags: ['beta: '],
  argTypes: {
    critical: reactNodeArgType,
    error: reactNodeArgType,
    screenReaderText: reactNodeArgType,
    ...stylingProps,
  },
} as Meta<typeof PageLoading>;

export const Page: Story = {
  render: () => <LoadingDashboard />,
  parameters: {
    ...withSource(LoadingDashboardSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const PageError: Story = {
  render: () => <LoadingDashboardError />,
  parameters: {
    ...withSource(LoadingDashboardErrorSource, { stripImports: true, stripExportFunction: true }),
  },
};
