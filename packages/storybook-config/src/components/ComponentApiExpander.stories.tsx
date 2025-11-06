import type { Meta, StoryObj } from '@storybook/react-vite';
import * as StoryStub from './mocks/StoryStub.stories';
import { disableArgTypes } from '~/helpers/disableArgTypes';
import { ComponentApiExpander } from './ComponentApiExpander';

type Story = StoryObj<typeof ComponentApiExpander>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ComponentApiExpander> = {
  title: 'Components/ApiExpander',
  component: ComponentApiExpander,
  tags: ['autodocs'],
  args: {
    of: StoryStub.IsStub,
  },
  parameters: {
    ...disableArgTypes(['of']),
    relativeCsfPaths: ['mocks/StoryStub.stories'],
  },
};

export default meta;

export const ApiExpander: Story = {};

export const Heading: Story = {
  args: {
    heading: 'I am the heading for this expander',
  },
};

export const HeadingLevel: Story = {
  args: {
    headingLevel: 3,
    headingId: 'custom-heading-level',
  },
};
