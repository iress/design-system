import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressPanel, IressStack } from '@/main';

type Story = StoryObj<typeof IressPanel>;

export default {
  title: 'Styling props/Layout',
  component: IressPanel,
} as Meta<typeof IressPanel>;

export const alignSelf: Story = {
  args: {
    alignSelf: 'end',
  },
  parameters: {
    controls: {
      include: ['alignSelf'],
    },
  },
  render: ({ alignSelf }) => (
    <IressStack gap="md" horizontalAlign="center">
      <IressPanel bg="alt">First panel (no alignSelf)</IressPanel>
      <IressPanel bg="colour.primary.surface" alignSelf={alignSelf}>
        Panel with alignSelf prop
      </IressPanel>
      <IressPanel bg="alt">Third panel (no alignSelf)</IressPanel>
    </IressStack>
  ),
};
