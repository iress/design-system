import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressPanel } from '@/main';

type Story = StoryObj<typeof IressPanel>;

export default {
  title: 'Styling props/Scrollable',
  component: IressPanel,
} as Meta<typeof IressPanel>;

export const scrollable: Story = {
  args: {
    scrollable: 'y',
    style: { height: '200px' },
  },
  parameters: {
    controls: { include: ['scrollable'] },
  },
  render: (args) => (
    <IressPanel layerStyle="elevation.raised" px="sm">
      <IressPanel {...args}>
        <h1>History of Iress</h1>

        <p>
          <strong>Iress Limited</strong> (originally “Iress Market Technology”)
          is an Australian-based software company that provides technology
          solutions to the financial services industry. Its clients span sectors
          including wealth management, financial advice, trading, investment
          management, mortgages, and superannuation.
        </p>

        <section>
          <h2>Early Years (1993 – 2000)</h2>
          <p>
            Iress was founded in <strong>1993</strong> in Melbourne, Australia.
            The company's initial product offerings focused on market data and
            trading software for financial institutions and professionals
            needing live pricing and analytics tools.
          </p>
          <p>
            In <strong>2000</strong>, Iress listed on the{' '}
            <strong>Australian Stock Exchange (ASX)</strong> under the ticker{' '}
            <strong>IRE</strong>, signaling its growth beyond market data
            services.
          </p>
        </section>
      </IressPanel>
    </IressPanel>
  ),
};
