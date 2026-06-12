import { type Meta, type StoryObj } from '@storybook/react-vite';
import { componentStoryMeta, withSource } from '@iress-oss/ids-storybook-config';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import { IressSideNav } from './SideNav';
import { SideNavDefault } from './mocks/SideNavDefault';
import SideNavDefaultSource from './mocks/SideNavDefault.tsx?raw';
import { SideNavWithHeaderFooter } from './mocks/SideNavWithHeaderFooter';
import SideNavWithHeaderFooterSource from './mocks/SideNavWithHeaderFooter.tsx?raw';
import { SideNavGrouped } from './mocks/SideNavGrouped';
import SideNavGroupedSource from './mocks/SideNavGrouped.tsx?raw';
import { SideNavDynamicMenu } from './mocks/SideNavDynamicMenu';
import SideNavDynamicMenuSource from './mocks/SideNavDynamicMenu.tsx?raw';
import { SideNavControlled } from './mocks/SideNavControlled';
import SideNavControlledSource from './mocks/SideNavControlled.tsx?raw';
import { SideNavRouting } from './mocks/SideNavRouting';
import SideNavRoutingSource from './mocks/SideNavRouting.tsx?raw';
import componentMeta from './meta';

type Story = StoryObj<typeof IressSideNav>;

const testMeta: TestComponentMeta[] = [
  { part: 'main', description: 'The root navigation element', query: <code>getByRole('navigation')</code>, testId: 'sidenav' },
  { part: 'rail', description: 'The side rail', testId: 'sidenav__rail' },
  { part: 'panel', description: 'The navigation panel', testId: 'sidenav__panel' },
  { part: 'panel heading', description: 'The panel heading', query: <code>getByRole('heading')</code>, testId: 'sidenav__panel-heading' },
  { part: 'header', description: 'The header slot', testId: 'sidenav__header' },
  { part: 'footer', description: 'The footer slot', testId: 'sidenav__footer' },
];

export default {
  title: 'Patterns/SideNav',
  component: IressSideNav,
  tags: ['beta'],
  ...componentStoryMeta(componentMeta, {
    idsConfig: {
      testMeta,
    },
    parameters: {
      layout: 'fullscreen',
    },
  }),
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof IressSideNav>;

export const Default: Story = {
  render: (args) => <SideNavDefault {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SideNavDefaultSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const WithHeaderFooter: Story = {
  render: (args) => <SideNavWithHeaderFooter {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SideNavWithHeaderFooterSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const GroupedChildren: Story = {
  render: (args) => <SideNavGrouped {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SideNavGroupedSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const DynamicSideMenu: Story = {
  render: (args) => <SideNavDynamicMenu {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SideNavDynamicMenuSource, { stripImports: true }),
  },
};

export const Controlled: Story = {
  render: (args) => <SideNavControlled {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SideNavControlledSource, { stripImports: true }),
  },
};

export const CustomRouting: Story = {
  render: (args) => <SideNavRouting {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SideNavRoutingSource, { stripImports: true }),
  },
  tags: ['recipe'],
};
