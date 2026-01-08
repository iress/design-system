import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressMenuItem } from './MenuItem';
import { IressMenu } from '../Menu';
import { IressBadge, IressIcon, IressPanel, IressPopover } from '@/main';
import { RoutingLinkMenu } from './mocks/RoutingLinkMenu';
import RoutingLinkMenuSource from './mocks/RoutingLinkMenu.tsx?raw';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressMenuItem>;

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
} as Meta<typeof IressMenuItem>;

export const Unselected: Story = {
  args: {
    children: 'Menu item',
  },
};

export const Selected: Story = {
  args: {
    ...Unselected.args,
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
    ...Value.args,
    canToggle: true,
  },
};

export const Divider: Story = {
  args: {
    ...Unselected.args,
    children: 'Menu item with divider',
    divider: true,
  },
  tags: ['hideInSidebar'],
};

export const PrependAndAppend: Story = {
  ...Unselected,
  args: {
    ...Unselected.args,
    prepend: <IressIcon name="home" />,
    append: <IressBadge mode="success">New</IressBadge>,
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
    docs: {
      source: {
        code: RoutingLinkMenuSource,
        language: 'tsx',
      },
    },
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
