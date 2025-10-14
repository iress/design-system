import { Meta, StoryObj } from '@storybook/react';
import { IressNavbar } from '.';
import { IressText } from '../Text';
import { IressMenu, IressMenuItem } from '../Menu';
import { IressTooltip } from '../Tooltip';
import { IressIcon } from '../Icon';
import { NavbarSink } from './mocks/NavbarSink';
import { IressStack } from '../Stack';

type Story = StoryObj<typeof IressNavbar>;

export default {
  title: 'Components/Navbar',
  component: IressNavbar,
} as Meta<typeof IressNavbar>;

export const Default: Story = {
  args: {
    children: <IressText>A very basic navbar</IressText>,
  },
};

export const Logos: Story = {
  args: {
    logo: <img src="assets/ids-logo.png" alt="Home" />,
  },
};

export const Align: Story = {
  render: () => (
    <IressStack gutter="lg">
      <IressNavbar
        horizontalAlign="start"
        logo={<img src="assets/ids-logo.png" alt="IDS logo" />}
        nav={<IressText>Nav slot content</IressText>}
      >
        <IressText>Align start</IressText>
      </IressNavbar>
      <IressNavbar
        horizontalAlign="between"
        logo={<img src="assets/ids-logo.png" alt="IDS logo" />}
        nav={<IressText>Nav slot content</IressText>}
      >
        <IressText>Align between</IressText>
      </IressNavbar>
      <IressNavbar
        horizontalAlign="end"
        logo={<img src="assets/ids-logo.png" alt="IDS logo" />}
        nav={<IressText>Nav slot content</IressText>}
      >
        <IressText>Align end</IressText>
      </IressNavbar>
    </IressStack>
  ),
};

export const Children: Story = {
  args: {
    logo: <img src="assets/ids-logo.png" alt="IDS logo" />,
    children: (
      <IressText>
        <h1>Children slot content</h1>
      </IressText>
    ),
    nav: <IressText>Nav slot content</IressText>,
  },
};

export const NavMenu: Story = {
  args: {
    logo: <img src="assets/ids-logo.png" alt="IDS logo" />,
    nav: (
      <IressMenu layout="inline" role="nav">
        <IressMenuItem href="#">Link 1</IressMenuItem>
        <IressMenuItem href="#" selected>
          Link 2
        </IressMenuItem>
        <IressMenuItem href="#">Link 3</IressMenuItem>
      </IressMenu>
    ),
  },
};

export const NavMenuAndChildren: Story = {
  args: {
    logo: <img src="assets/ids-logo.png" alt="IDS logo" />,
    children: (
      <IressText>
        <h1>Default slot content</h1>
      </IressText>
    ),
    nav: (
      <IressMenu layout="inline" role="nav">
        <IressMenuItem href="#">Link 1</IressMenuItem>
        <IressMenuItem href="#" selected>
          Link 2
        </IressMenuItem>
        <IressMenuItem href="#">Link 3</IressMenuItem>
      </IressMenu>
    ),
  },
};

export const Responsive: Story = {
  args: {
    breakpoint: 'sm',
    logo: <img src="assets/ids-logo.png" alt="IDS logo" />,
    nav: (
      <IressMenu layout="inline" role="nav">
        <IressMenuItem href="#">Link 1</IressMenuItem>
        <IressMenuItem href="#" selected>
          Link 2
        </IressMenuItem>
        <IressMenuItem href="#">Link 3</IressMenuItem>
        <IressMenuItem href="#">Link 4</IressMenuItem>
        <IressMenuItem href="#">Link 5</IressMenuItem>
      </IressMenu>
    ),
  },
};

export const Icons: Story = {
  args: {
    horizontalAlign: 'between',
    children: (
      <IressText>
        <h1>Iress Design System</h1>
      </IressText>
    ),
    nav: (
      <IressMenu layout="inline" role="nav">
        <IressTooltip align="bottom" tooltipText="User details">
          <IressMenuItem href="#">
            <IressIcon name="user" size="2x" />
          </IressMenuItem>
        </IressTooltip>
        <IressTooltip align="bottom" tooltipText="Add task">
          <IressMenuItem href="#" selected>
            <IressIcon name="plus" size="2x" />
          </IressMenuItem>
        </IressTooltip>
        <IressTooltip align="bottom" tooltipText="Settings">
          <IressMenuItem href="#">
            <IressIcon name="cog" size="2x" />
          </IressMenuItem>
        </IressTooltip>
      </IressMenu>
    ),
  },
};

export const Sink: Story = {
  render: () => <NavbarSink />,
};
