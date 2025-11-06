import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentApi } from './ComponentApi';
import * as StoryStub from './mocks/StoryStub.stories';
import { disableArgTypes } from '~/helpers/disableArgTypes';

type Story = StoryObj<typeof ComponentApi>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ComponentApi> = {
  title: 'Components/Api',
  component: ComponentApi,
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

export const Api: Story = {};

export const Readonly: Story = {
  args: {
    readOnly: true,
  },
};

export const Details: Story = {
  args: {
    details: 'I am some extra details about the API',
  },
};

export const Heading: Story = {
  args: {
    heading: 'I am the heading for this table',
  },
};

export const Story: Story = {
  args: {
    story: StoryStub.IsStub,
  },
};
