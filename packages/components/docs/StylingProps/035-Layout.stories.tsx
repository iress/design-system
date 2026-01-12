import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressCol,
  IressContainer,
  IressPanel,
  IressRow,
  IressStack,
} from '@/main';

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

export const flex1: Story = {
  args: {
    bg: 'alt',
    flex: '1',
  },
  render: ({ children, ...args }) => (
    <IressStack gap="md" horizontalAlign="center" style={{ height: 400 }}>
      <IressPanel bg="alt">First panel (no flex)</IressPanel>
      <IressPanel {...args}>
        {children ?? (
          <>
            {args.flex
              ? 'Panel with flex set to 1, so it will fill the available space.'
              : 'This panel is not set to flex, so it will only take up the space it needs.'}
          </>
        )}
      </IressPanel>
      <IressPanel bg="alt">Third panel (no flex)</IressPanel>
    </IressStack>
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
