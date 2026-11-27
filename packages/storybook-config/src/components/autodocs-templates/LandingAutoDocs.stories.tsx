import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryStub } from '../mocks/StoryStub';
import type { ParametersConfig } from '../../types';

type Story = StoryObj<typeof StoryStub>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof StoryStub> = {
  title: 'Components/AutoDocs/Landing',
  component: StoryStub,
  parameters: {
    idsConfig: {
      autodocsTemplate: 'landing',
    } satisfies ParametersConfig['idsConfig'],
  },
};

export default meta;

export const Playground: Story = {
  render: () => <>Hello, I should take up the whole page</>,
  parameters: {
    layout: 'fullscreen',
  },
};
