import type { Meta, StoryObj } from '@storybook/react-vite';
import * as StoryStub from './mocks/StoryStub.stories';
import { disableArgTypes } from '../helpers/disableArgTypes';
import { ComponentStatus } from './ComponentStatus';
import { withCustomSource } from '@iress-oss/ids-storybook-sandbox';

type Story = StoryObj<typeof ComponentStatus>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ComponentStatus> = {
  title: 'Components/Status',
  component: ComponentStatus,
  tags: ['autodocs'],
  parameters: {
    ...disableArgTypes(['stories', 'story']),
    relativeCsfPaths: ['mocks/StoryStub.stories'],
    ...withCustomSource('<ComponentStatus stories={StoryStub} />'),
  },
};

export default meta;

export const Updated: Story = {
  args: {
    stories: StoryStub as never,
  },
};

export const Beta: Story = {
  args: {
    story: StoryStub.Beta,
  },
};

export const BetaReplace: Story = {
  args: {
    story: StoryStub.BetaReplace,
  },
};

export const Caution: Story = {
  args: {
    story: StoryStub.Caution,
  },
};
