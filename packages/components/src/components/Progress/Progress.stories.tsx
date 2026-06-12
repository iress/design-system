import { type Meta, type StoryObj } from '@storybook/react-vite';

import { IressProgress } from '.';
import { componentStoryMeta, withSource } from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

import { ProgressExamples } from './mocks/ProgressExamples';
import ProgressExamplesSource from './mocks/ProgressExamples.tsx?raw';

type Story = StoryObj<typeof IressProgress>;

export default {
  title: 'Components/Progress',
  component: IressProgress,
  ...componentStoryMeta(componentMeta),
} as Meta<typeof IressProgress>;

export const Default: Story = {
  args: {
    min: 10,
    max: 30,
    value: 20,
  },
};

export const ProgressExamplesStory: Story = {
  name: 'ProgressExamples',
  render: (args) => <ProgressExamples {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ProgressExamplesSource, { stripImports: true, stripExportFunction: true }),
  },
};
