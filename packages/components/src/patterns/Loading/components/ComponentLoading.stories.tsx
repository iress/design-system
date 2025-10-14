import { Meta, StoryObj } from '@storybook/react';
import { ComponentLoading } from './ComponentLoading';
import { LoadingGraph } from '../mocks/LoadingGraph';
import LoadingGraphSource from '../mocks/LoadingGraph.tsx?raw';
import { withCustomSource } from '@iress-storybook/helpers';
import { FC } from 'react';

// This is a pattern for IressLoading, hence we change the name
(ComponentLoading as FC).displayName = 'IressLoading';

type Story = StoryObj<typeof ComponentLoading>;

export default {
  title: 'Patterns/Loading/Patterns/Component',
  component: ComponentLoading,
  tags: ['beta: '],
} as Meta<typeof ComponentLoading>;

export const Component: Story = {
  render: () => <LoadingGraph />,
  parameters: {
    ...withCustomSource(LoadingGraphSource),
  },
};
