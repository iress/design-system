import { type Meta, type StoryObj } from '@storybook/react';
import { IressNavbar } from '.';
import { IressText } from '../Text';
import { IressMenu, IressMenuItem } from '../Menu';
import { IressTooltip } from '../Tooltip';
import { IressIcon } from '../Icon';
import { IressStack } from '../Stack';
import { IressButton } from '../Button';
import { IressHide } from '../Hide';
import { IressInline } from '../Inline';
import { IressBadge } from '../Badge';
import { IressField } from '../Field';
import { IressInput } from '../Input';
import { IressPopover } from '../Popover';
import { IressPanel } from '../Panel';
import { ResponsiveNavbar } from './mocks/ResponsiveNavbar';
import ResponsiveNavbarSource from './mocks/ResponsiveNavbar.tsx?raw';
import { NavbarIconStrip } from './mocks/NavbarIconStrip';
import NavbarIconStripSource from './mocks/NavbarIconStrip.tsx?raw';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import { withCustomSource } from '@iress-oss/ids-storybook-sandbox';

type Story = StoryObj<typeof IressNavbar>;

export default {
  title: 'Components/Navbar/Recipes',
  component: IressNavbar,
} as Meta<typeof IressNavbar>;

export const CustomResponsiveNavbar: Story = {
  render: (args) => <ResponsiveNavbar {...args} />,
  argTypes: {
    ...disableArgTypes(['nav']),
  },
  parameters: {
    ...withCustomSource(ResponsiveNavbarSource),
  },
};

export const CustomConsumingNavbar: Story = {
  args: {
    horizontalAlign: 'between',
    children: (
      <IressInline verticalAlign="middle" horizontalAlign="between">
        <img src="assets/ids-logo.png" alt="Iress logo" />
        <IressInline gutter="md" verticalAlign="stretch">
          <IressPopover
            type="listbox"
            align="bottom-start"
            activator={
              <IressTooltip tooltipText="User">
                <IressButton
                  id="btn"
                  append={<IressIcon name="chevron-down" />}
                >
                  <IressHide hiddenOn={{ xs: true, md: false }}>
                    Barry George
                  </IressHide>
                  <IressHide hiddenOn={{ xs: false, md: true }}>
                    <IressIcon name="user" />
                  </IressHide>
                </IressButton>
              </IressTooltip>
            }
          >
            <IressMenu>
              <IressMenuItem>Person 1</IressMenuItem>
              <IressMenuItem>Person 2</IressMenuItem>
              <IressMenuItem>Person 3</IressMenuItem>
            </IressMenu>
          </IressPopover>
          <IressBadge
            pill
            mode="danger"
            host={
              <IressButton mode="tertiary">
                <IressIcon
                  name="bell"
                  screenreaderText="notifications"
                  size="2x"
                />
              </IressButton>
            }
          >
            4
          </IressBadge>
          <IressButton mode="tertiary">
            <IressIcon name="plus" screenreaderText="add details" size="2x" />
          </IressButton>
          <IressField label="Input" hiddenLabel>
            <IressInput
              name="test-input"
              prepend={<IressIcon name="search" />}
            ></IressInput>
          </IressField>
        </IressInline>
      </IressInline>
    ),
  },
};

export const NavbarWithSecondaryNavigation: Story = {
  render: (args) => (
    <div>
      <IressNavbar
        {...args}
        logo={<img src="assets/ids-logo.png" alt="IDS logo" />}
        nav={
          <IressMenu layout="inline" role="nav">
            <IressMenuItem href="#">Link 1</IressMenuItem>
            <IressMenuItem href="#" selected>
              Link 2
            </IressMenuItem>
            <IressMenuItem href="#">Link 3</IressMenuItem>
          </IressMenu>
        }
      ></IressNavbar>
      <IressPanel background="alt" padding="none" noBorderRadius>
        <nav aria-label="secondary navigation">
          <IressMenu layout="inline" role="nav">
            <IressMenuItem>Secondary link 1</IressMenuItem>
            <IressMenuItem>Secondary link 2</IressMenuItem>
            <IressMenuItem>Secondary link 3</IressMenuItem>
          </IressMenu>
        </nav>
      </IressPanel>
    </div>
  ),
  argTypes: { ...disableArgTypes(['logo', 'nav']) },
};

export const IconStrip: Story = {
  render: (args) => <NavbarIconStrip {...args} />,
  parameters: {
    layout: 'fullscreen',
    ...withCustomSource(NavbarIconStripSource),
  },
};

export const FixedNavigation: Story = {
  render: (args) => (
    <div className="mobile-mockup-wrapper">
      <IressNavbar
        {...args}
        horizontalAlign="between"
        logo={<img src="assets/ids-logo.png" alt="IDS logo" />}
        nav={
          <IressMenu layout="inline" role="nav">
            <IressTooltip align="bottom" tooltipText="User details">
              <IressMenuItem href="#">
                <IressIcon name="user" size="2x" />
              </IressMenuItem>
            </IressTooltip>
            <IressPopover
              type="dialog"
              style={
                {
                  '--iress-max-width': '12rem',
                } as React.CSSProperties
              }
              align="bottom-end"
              activator={
                <IressTooltip align="bottom" tooltipText="Settings">
                  <IressMenuItem>
                    <IressIcon name="cog" size="2x" />
                  </IressMenuItem>
                </IressTooltip>
              }
            >
              <IressPanel data-testid="about-page">
                <IressText>
                  <h2>About</h2>
                  <p>
                    Iress Uncaged is a portal of Iress software, detailing their
                    adherence to Iress Governance & Standards.
                  </p>
                  <p>
                    Software that is registered with Iress Uncaged will appear{' '}
                    <a href="/">here.</a>
                  </p>
                  <p>
                    In order to register your software with Uncaged, you will
                    need to create an Atlas YAML in the root of your repo, see
                    here for instructions. Once the YAML is available in your
                    main branch your software will appear in this dashboard
                    within 24 Hours.
                  </p>
                </IressText>
              </IressPanel>
            </IressPopover>
          </IressMenu>
        }
      ></IressNavbar>
      <IressPanel>
        <IressText>
          <h1>Page heading</h1>
        </IressText>
        <IressText>Some page content...</IressText>
      </IressPanel>
      <IressPanel
        padding="none"
        background="alt"
        style={{
          position: 'absolute',
          insetInlineStart: '0',
          insetInlineEnd: '0',
          insetBlockEnd: '0',
        }}
      >
        <nav aria-label="secondary navigation">
          <IressMenu layout="inline-equal-width" fluid>
            <IressMenuItem selected href="#">
              <IressStack>
                <IressIcon name="tachometer-alt" />
                <IressText>Dashboard</IressText>
              </IressStack>
            </IressMenuItem>
            <IressMenuItem href="#">
              <IressStack>
                <IressIcon name="chart-line" />
                <IressText>Analysis</IressText>
              </IressStack>
            </IressMenuItem>
            <IressMenuItem href="#">
              <IressStack>
                <IressIcon name="envelope" />
                <IressText>Messages</IressText>
              </IressStack>
            </IressMenuItem>
          </IressMenu>
        </nav>
      </IressPanel>
    </div>
  ),
  argTypes: { ...disableArgTypes(['logo', 'nav']) },
};
