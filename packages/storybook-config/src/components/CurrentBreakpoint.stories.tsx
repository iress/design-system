import type { Meta, StoryObj } from '@storybook/react-vite';
import { CurrentBreakpoint } from './CurrentBreakpoint';
import { IressPanel } from '@iress-oss/ids-components';

type Story = StoryObj<typeof CurrentBreakpoint>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CurrentBreakpoint> = {
  title: 'Components/Breakpoint',
  component: CurrentBreakpoint,
  tags: ['autodocs'],
};

export default meta;

export const Breakpoint: Story = {};

export const As: Story = {
  args: {
    as: 'em',
  },
};

export const AndAbove: Story = {
  args: {
    renderLabel: 'and-above',
  },
};

export const Container: Story = {
  args: {
    renderLabel: 'container',
  },
};

export const ContainerFluid: Story = {
  args: {
    renderLabel: 'container-fluid',
  },
};

export const MaxWidth: Story = {
  args: {
    renderLabel: 'max-width',
  },
};

export const Viewing: Story = {
  args: {
    renderLabel: 'viewing',
  },
};

export const RenderCustomLabel: Story = {
  args: {
    renderLabel: ({ breakpoint }) => {
      return (
        <IressPanel bg="colour.neutral.20">
          You are currently in the <strong>{breakpoint}</strong> breakpoint
        </IressPanel>
      );
    },
  },
};
