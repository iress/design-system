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
  render: ({ maxWidth, width }) => (
    <IressContainer bg="alt" fluid maxWidth={maxWidth} width={width} p="lg">
      This container is extra readable cause its maxWidth is set to:{' '}
      <code>
        {typeof maxWidth === 'object'
          ? JSON.stringify(maxWidth)
          : maxWidth}
      </code>
      .
    </IressContainer>
  ),
};
