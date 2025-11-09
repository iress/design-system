import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressCol, IressContainer, IressPanel, IressRow } from '@/main';
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

export const stretch: Story = {
  args: {
    stretch: true,
  },
  render: ({ children, ...args }) => (
    <IressContainer bg="alt" py="xl" px="xl" borderRadius="none" fluid>
      <IressRow gutter="xl" verticalAlign="stretch">
        <IressCol>
          <IressPanel {...args}>
            {children ?? (
              <>
                {args.stretch
                  ? 'Panel is set to stretch, so it will fill the available space.'
                  : 'This panel is not set to stretch, so it will only take up the space it needs.'}
              </>
            )}
          </IressPanel>
        </IressCol>
        <IressCol>
          <IressPanel>
            <h1>History of Iress</h1>

            <p>
              <strong>Iress Limited</strong> (originally “Iress Market
              Technology”) is an Australian-based software company that provides
              technology solutions to the financial services industry. Its
              clients span sectors including wealth management, financial
              advice, trading, investment management, mortgages, and
              superannuation.
            </p>

            <section>
              <h2>Early Years (1993 – 2000)</h2>
              <p>
                Iress was founded in <strong>1993</strong> in Melbourne,
                Australia. The company's initial product offerings focused on
                market data and trading software for financial institutions and
                professionals needing live pricing and analytics tools.
              </p>
              <p>
                In <strong>2000</strong>, Iress listed on the{' '}
                <strong>Australian Stock Exchange (ASX)</strong> under the
                ticker <strong>IRE</strong>, signaling its growth beyond market
                data services.
              </p>
            </section>
          </IressPanel>
        </IressCol>
      </IressRow>
    </IressContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
