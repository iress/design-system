import type { Meta, StoryObj } from '@storybook/react-vite';
import { DiffViewer } from './DiffViewer';

type Story = StoryObj<typeof DiffViewer>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DiffViewer> = {
  title: 'Components/Diff',
  component: DiffViewer,
  args: {
    oldValue: 'Hello World',
    newValue: 'Hello Storybook',
  },
  tags: ['autodocs'],
};

export default meta;

export const Diff: Story = {};

export const AllowModeChange: Story = {
  args: {
    allowModeChange: true,
  },
};
