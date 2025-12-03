import { type Meta, type StoryObj } from '@storybook/react';
import { IressSkeleton } from './Skeleton';
import { SkeletonCard } from './mocks/SkeletonCard';
import SkeletonCardSource from './mocks/SkeletonCard.tsx?raw';

type Story = StoryObj<typeof IressSkeleton>;

export default {
  title: 'Components/Skeleton/Recipes',
  component: IressSkeleton,
} as Meta<typeof IressSkeleton>;

export const Card: Story = {
  render: (args) => <SkeletonCard {...args} />,
  parameters: {
    docs: {
      source: {
        code: SkeletonCardSource,
        language: 'tsx',
      },
    },
  },
};
