import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressContainer, IressPanel } from '@/main';

type Story = StoryObj<typeof IressPanel>;

export default {
  title: 'Styling props/Sizing',
  component: IressPanel,
  parameters: {
    idsConfig: {
      autodocsTemplate: 'default',
    }
  },
} as Meta<typeof IressPanel>;

export const inputWidths: Story = {
  args: {
    bg: 'alt',
    children: 'Credit card number wide panel',
    width: 'input.16',
  },
  parameters: {
    controls: { include: ['maxWidth', 'width'] },
  },
};

export const containerWidths: Story = {
  ...inputWidths,
  args: {
    maxWidth: 'overlay.lg',
  },
  render: (args) => (
    <IressContainer {...args} bg="alt" fluid p="lg">
      This container has maxWidth set to <code>overlay.lg</code>.
    </IressContainer>
  ),
};
