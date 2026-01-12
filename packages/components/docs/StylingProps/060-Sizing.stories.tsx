import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressContainer, IressPanel } from '@/main';
import { stringifyStorybookArgs } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressPanel>;

export default {
  title: 'Styling props/Sizing',
  component: IressPanel,
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
    maxWidth: 'container.md',
  },
  render: ({ maxWidth, width }) => (
    <IressContainer bg="alt" fluid maxWidth={maxWidth} width={width} p="xl">
      This container is extra readable cause its maxWidth is set to:{' '}
      <code>
        {typeof maxWidth === 'object'
          ? stringifyStorybookArgs(maxWidth)
          : maxWidth}
      </code>
      .
    </IressContainer>
  ),
};
