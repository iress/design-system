import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressInput, IressPanel } from '@/main';

type Story = StoryObj<typeof IressPanel>;

export default {
  title: 'Styling props/Radius',
  component: IressPanel,
} as Meta<typeof IressPanel>;

export const borderRadius: Story = {
  args: {
    borderRadius: 'radius.system.layout',
  },
  parameters: {
    controls: { include: ['borderRadius'] },
  },
  render: ({ borderRadius }) => (
    <IressInput
      borderRadius={borderRadius}
      p="spacing.4"
      textStyle="typography.body.lg"
      placeholder="Search everything"
    />
  ),
};

export const noBorderRadius: Story = {
  ...borderRadius,
  args: {
    borderRadius: 'none',
  },
  render: ({ borderRadius }) => (
    <IressPanel borderRadius={borderRadius} bg="alt">
      No radius here
    </IressPanel>
  ),
};
