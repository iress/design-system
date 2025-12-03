import { type Meta, type StoryObj } from '@storybook/react';
import { IressSkeleton, SKELETON_MODES } from '.';
import { IressStack } from '../Stack';
import { IressInline } from '@/main';
import { SkeletonRect } from './mocks/SkeletonRect';
import SkeletonRectSource from './mocks/SkeletonRect.tsx?raw';
import { SkeletonCircle } from './mocks/SkeletonCircle';
import SkeletonCircleSource from './mocks/SkeletonCircle.tsx?raw';
import { SkeletonText } from './mocks/SkeletonText';
import SkeletonTextSource from './mocks/SkeletonText.tsx?raw';
import {
  disableArgTypes,
  withTransformedRawSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressSkeleton>;

export default {
  title: 'Components/Skeleton',
  component: IressSkeleton,
} as Meta<typeof IressSkeleton>;

export const Default: Story = {};

export const Mode: Story = {
  argTypes: {
    ...disableArgTypes(['mode', 'width', 'height']),
  },
  render: (args) => (
    <IressStack gutter="md">
      <IressSkeleton {...args} mode="text" />
      <IressSkeleton {...args} mode="rect" height="100px" />
      <IressSkeleton mode="circle" height="100px" width="100px" />
    </IressStack>
  ),
};

export const Text: Story = {
  args: {
    mode: 'text',
  },
  argTypes: {
    ...disableArgTypes(['textVariant']),
  },
  render: (args) => <SkeletonText {...args} />,
  parameters: {
    ...withTransformedRawSource(SkeletonTextSource, 'IressSkeletonProps'),
  },
};

export const Rect: Story = {
  args: {
    mode: 'rect',
    width: '250',
    height: '150',
  },
  render: (args) => <SkeletonRect {...args} />,
  parameters: {
    ...withTransformedRawSource(SkeletonRectSource, 'IressSkeletonProps'),
  },
};

export const Circle: Story = {
  args: {
    mode: 'circle',
    width: '150',
    height: '150',
  },
  render: (args) => <SkeletonCircle {...args} />,
  parameters: {
    ...withTransformedRawSource(SkeletonCircleSource, 'IressSkeletonProps'),
  },
};

export const Size: Story = {
  args: {
    width: '150',
    height: '150',
  },
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: (args) => (
    <IressInline gutter="md">
      {SKELETON_MODES.map((mode) => (
        <IressSkeleton key={mode} {...args} mode={mode} />
      ))}
    </IressInline>
  ),
};
