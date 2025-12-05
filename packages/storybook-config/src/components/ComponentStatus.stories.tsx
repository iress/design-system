import type { Meta, StoryObj } from '@storybook/react-vite';
import * as StoryStub from './mocks/StoryStub.stories';
import { disableArgTypes } from '../helpers/disableArgTypes';
import { ComponentStatus } from './ComponentStatus';
import { withCustomSource } from '~/helpers/withCustomSource';

type Story = StoryObj<typeof ComponentStatus>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ComponentStatus> = {
  title: 'Components/Status',
  component: ComponentStatus,
  tags: ['autodocs', 'updated'],
  parameters: {
    ...disableArgTypes(['meta', 'of']),
    relativeCsfPaths: ['mocks/StoryStub.stories'],
    ...withCustomSource('<ComponentStatus stories={StoryStub} />'),
  },
};

export default meta;

export const Updated: Story = {
  args: {
    meta: StoryStub,
  },
};

export const Beta: Story = {
  args: {
    of: StoryStub.Beta,
  },
};

export const BetaReplace: Story = {
  args: {
    of: StoryStub.BetaReplace,
  },
};

export const Caution: Story = {
  args: {
    of: StoryStub.Caution,
  },
};
