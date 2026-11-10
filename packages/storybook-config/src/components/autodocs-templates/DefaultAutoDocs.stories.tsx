import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryStub } from '../mocks/StoryStub';
import type { ParametersConfig } from '../../types';

type Story = StoryObj<typeof StoryStub>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof StoryStub> = {
  title: 'Components/AutoDocs/Default',
  component: StoryStub,
  parameters: {
    idsConfig: {
      autodocsTemplate: 'default',
    } satisfies ParametersConfig['idsConfig'],
  },
};

export default meta;

export const Example: Story = {
  render: (args) => <StoryStub {...args} />,
};

export const Example2: Story = {
  render: (args) => <StoryStub {...args} />,
};
