import { type Meta, type StoryObj } from '@storybook/react';
import { IressMenu } from '../Menu';
import { toArray } from '@helpers/formatting/toArray';
import { RoutingLinkMenuItem } from './mocks/RoutingLinkMenuItem';
import RoutingLinkMenuItemSource from './mocks/RoutingLinkMenuItem.tsx?raw';
import { IressIcon } from '@/main';

type Story = StoryObj<typeof RoutingLinkMenuItem>;

export default {
  title: 'Components/Menu/MenuItem/Recipes',
  component: RoutingLinkMenuItem,
  tags: ['hideInSidebar'],
} as Meta<typeof RoutingLinkMenuItem>;

export const CustomRoutingLink: Story = {
  args: {
    children: 'Custom routing link',
    className: 'iress-u-button',
    prepend: <IressIcon name="home" />,
    value: 'custom-routing-link',
  },
  render: (args) => (
    <IressMenu
      role="listbox"
      onChange={(value) =>
        alert(`Value changed to: ${toArray(value).join(', ')}`)
      }
    >
      <RoutingLinkMenuItem {...args} />
    </IressMenu>
  ),
  parameters: {
    docs: {
      source: {
        code: RoutingLinkMenuItemSource,
        language: 'tsx',
      },
    },
  },
};
