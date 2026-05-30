import { type Meta, type StoryObj } from '@storybook/react-vite';
import { withSource } from '@iress-oss/ids-storybook-config';
import { IressSideNav } from './SideNav';
import {
  MOCK_SIDE_NAV_ITEMS,
  MOCK_GROUPED_ITEMS,
  MOCK_RAIL_ONLY_ITEMS,
  MOCK_SIDE_MENU_OVERRIDE,
} from './mocks/sideNavItems';
import { SideNavControlled } from './mocks/SideNavControlled';
import SideNavControlledSource from './mocks/SideNavControlled.tsx?raw';
import { SideNavRouting } from './mocks/SideNavRouting';
import SideNavRoutingSource from './mocks/SideNavRouting.tsx?raw';
import { IressInput, IressText } from '@/main';
import componentMeta from './meta';

type Story = StoryObj<typeof IressSideNav>;

export default {
  title: 'Patterns/SideNav',
  component: IressSideNav,
  tags: ['beta'],
  args: {
    items: MOCK_SIDE_NAV_ITEMS,
  },
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof IressSideNav>;

/**
 * Default collapsed rail view with basic navigation items.
 */
export const Default: Story = {
  args: {
    activeItemKey: 'hubs',
  },
};

/**
 * Pre-expanded with `activeItemKey` showing children from items.
 */
export const Expanded: Story = {
  args: {
    ...Default.args,
    defaultExpanded: true,
  },
};

/**
 * Expanded with numbered drawer headers.
 */
export const Numbered: Story = {
  args: {
    activeItemKey: 'hubs',
    defaultExpanded: true,
    numbered: true,
  },
};

/**
 * Expanded with header (search bar) and footer content.
 */
export const WithHeaderFooter: Story = {
  args: {
    activeItemKey: 'portfolios',
    defaultExpanded: true,
    header: (
      <IressInput
        type="search"
        placeholder="Search navigation..."
        variant="search"
      />
    ),
    footer: <IressText element="small">v2.4.1</IressText>,
  },
};

/**
 * Demonstrating controlled `activeItemKey` + `expanded` state.
 * Click rail items to navigate between sections.
 */
export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
    ...withSource(SideNavControlledSource, { stripImports: true, stripExportFunction: true }),
  },
  render: (args) => <SideNavControlled {...args} />,
};

/**
 * Items whose children are grouped into expandable drawers.
 */
export const GroupedChildren: Story = {
  args: {
    items: MOCK_GROUPED_ITEMS,
    activeItemKey: 'hubs',
    defaultExpanded: true,
    numbered: true,
  },
};

/**
 * Using `sideMenuItems` override to show dynamically provided sub-items.
 */
export const DynamicSideMenu: Story = {
  args: {
    items: MOCK_RAIL_ONLY_ITEMS,
    activeItemKey: 'hubs',
    sideMenuItems: MOCK_SIDE_MENU_OVERRIDE,
    sideMenuLabel: 'Client Hub',
    defaultExpanded: true,
    numbered: true,
    width: '300px',
  },
};

/**
 * Example demonstrating the `element` prop for custom routing integration.
 * In a real app, you would use React Router's `Link` or Next.js `Link`.
 */
export const CustomRouting: Story = {
  parameters: {
    controls: { disable: true },
    ...withSource(SideNavRoutingSource, { stripImports: true, stripExportFunction: true }),
    docs: {
      description: {
        story:
          'Demonstrates how the `element` prop on each item can be used for third-party routing libraries like React Router or Next.js Link.',
      },
    },
  },
  render: (args) => <SideNavRouting {...args} />,
};
