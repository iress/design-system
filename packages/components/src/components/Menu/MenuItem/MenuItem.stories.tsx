import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressMenuItem } from './MenuItem';
import { IressMenu } from '../Menu';
import { IressIcon, IressPanel, IressPill, IressPopover } from '@/main';
import { RoutingLinkMenu } from './mocks/RoutingLinkMenu';
import RoutingLinkMenuSource from './mocks/RoutingLinkMenu.tsx?raw';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  reactNodeArgType,
  stylingProps,
  withSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressMenuItem>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the menu item',
    query: <code>getByRole('menuitem')</code>,
    testId: 'menu-item',
  },
];

export default {
  title: 'Components/Menu/MenuItem',
  component: IressMenuItem,
  tags: ['updated'],
  argTypes: {
    append: reactNodeArgType,
    children: reactNodeArgType,
    prepend: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressMenuItem>;

export const Default: Story = {
  args: {
    children: 'Menu item',
  },
};

export const Unselected: Story = {
  args: {
    children: 'Menu item',
  },
};

export const Selected: Story = {
  args: {
    children: 'Menu item',
    selected: true,
  },
};

export const Value: Story = {
  args: {
    children: 'Menu item with value',
    value: 9,
  },
  render: (args) => (
    <IressMenu role="listbox">
      <IressMenuItem {...args} />
    </IressMenu>
  ),
};

export const CanToggle: Story = {
  ...Value,
  args: {
    children: 'Menu item',
    value: 9,
    canToggle: true,
  },
};

export const Divider: Story = {
  args: {
    children: 'Menu item with divider',
    divider: true,
  },
  tags: ['hideInSidebar'],
};

export const PrependAndAppend: Story = {
  args: {
    children: 'Menu item',
    prepend: <IressIcon name="home" />,
    append: <IressPill mode="70">New</IressPill>,
  },
};

export const MultiSelect: Story = {
  ...Value,
  render: (args) => (
    <IressMenu role="listbox" multiSelect>
      <IressMenuItem {...args} />
      <IressMenuItem {...args} />
    </IressMenu>
  ),
};

export const Element: Story = {
  render: (args) => <RoutingLinkMenu {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(RoutingLinkMenuSource, { stripImports: true }),
  },
};

export const PopoverActivator: Story = {
  args: {
    children: 'Open sub-menu',
  },
  render: (args) => (
    <IressMenu role="menu">
      <IressPopover activator={<IressMenuItem {...args} />}>
        <IressPanel>I'm a sub-menu that opens from a MenuItem</IressPanel>
      </IressPopover>
    </IressMenu>
  ),
};
