import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSkeleton, type IressSkeletonProps } from '.';
import { SkeletonRect } from './mocks/SkeletonRect';
import SkeletonRectSource from './mocks/SkeletonRect.tsx?raw';
import { SkeletonCircle } from './mocks/SkeletonCircle';
import SkeletonCircleSource from './mocks/SkeletonCircle.tsx?raw';
import { SkeletonText } from './mocks/SkeletonText';
import SkeletonTextSource from './mocks/SkeletonText.tsx?raw';
import { SkeletonMode } from './mocks/SkeletonMode';
import SkeletonModeSource from './mocks/SkeletonMode.tsx?raw';
import { SkeletonSize } from './mocks/SkeletonSize';
import SkeletonSizeSource from './mocks/SkeletonSize.tsx?raw';
import { SkeletonCard } from './mocks/SkeletonCard';
import SkeletonCardSource from './mocks/SkeletonCard.tsx?raw';
import {
  withSource,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof IressSkeleton>;
type TextStory = StoryObj<IressSkeletonProps<'text'>>;
type RectStory = StoryObj<IressSkeletonProps<'rect'>>;
type CircleStory = StoryObj<IressSkeletonProps<'circle'>>;

export default {
  title: 'Components/Skeleton',
  component: IressSkeleton,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta: componentMeta.testMeta },
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressSkeleton>;

export const Default: Story = {};

export const Mode: Story = {
  render: (args) => <SkeletonMode {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SkeletonModeSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Text: TextStory = {
  render: (args) => <SkeletonText {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SkeletonTextSource, { stripImports: true }),
  },
};

export const Rect: RectStory = {
  render: (args) => <SkeletonRect {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SkeletonRectSource, { stripImports: true }),
  },
};

export const Circle: CircleStory = {
  render: (args) => <SkeletonCircle {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SkeletonCircleSource, { stripImports: true }),
  },
};

export const Size: Story = {
  render: (args) => <SkeletonSize {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SkeletonSizeSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Card: Story = {
  tags: ['recipe'],
  render: (args) => <SkeletonCard {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SkeletonCardSource, { stripImports: true }),
  },
};
