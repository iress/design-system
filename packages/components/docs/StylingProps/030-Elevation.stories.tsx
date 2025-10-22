import { Meta, StoryObj } from '@storybook/react-vite';
import { IressPanel } from '@/main';

type Story = StoryObj<typeof IressPanel>;

export default {
  title: 'Styling props/Elevation',
  component: IressPanel,
} as Meta<typeof IressPanel>;

export const layerStyle: Story = {
  args: {
    children:
      'This panel is raised. This is useful for creating a visual hierarchy and drawing attention to important content.',
    layerStyle: 'elevation.raised',
  },
  parameters: {
    controls: { include: ['layerStyle'] },
  },
};

export const focusable: Story = {
  args: {
    children:
      'This element will have focus styles applied when it is focused. This is useful for accessibility and keyboard navigation.',
    focusable: 'true',
    tabIndex: 0,
  },
  parameters: {
    controls: { include: ['focusable'] },
  },
};
