import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressBreadcrumbs } from '@/main';
import {
  componentStoryMeta,
  disableArgTypes,
  withSource,
} from '@iress-oss/ids-storybook-config';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';
import { BreadcrumbsAllConfigurations } from './mocks/BreadcrumbsAllConfigurations';
import BreadcrumbsAllConfigurationsSource from './mocks/BreadcrumbsAllConfigurations.tsx?raw';

type Story = StoryObj<typeof IressBreadcrumbs>;

const testMeta: TestComponentMeta[] = [
  { part: 'main', description: 'The root navigation element', query: <code>getByRole('navigation')</code>, testId: 'breadcrumbs' },
  { part: 'item', description: 'A breadcrumb link item', query: <code>getByRole('link', {'{'} name: '...' {'}'})</code>, testId: 'breadcrumbs__item-*' },
  { part: 'overflow', description: 'The overflow trigger button', query: <code>getByRole('button')</code>, testId: 'breadcrumbs__overflow' },
  { part: 'menu', description: 'The overflow menu', query: <code>getByRole('menu')</code>, testId: 'breadcrumbs__menu' },
];

export default {
  title: 'Patterns/Breadcrumbs',
  component: IressBreadcrumbs,
  tags: ['beta'],
  args: {
    overflowProps: {
      container: document.body,
    },
  },
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      ...disableArgTypes(['items']),
    },
    idsConfig: {
      testMeta,
    },
  }),
} as Meta<typeof IressBreadcrumbs>;

export const Default: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'Current Page' }],
  },
};

export const AllConfigurations: Story = {
  render: (args) => <BreadcrumbsAllConfigurations {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(BreadcrumbsAllConfigurationsSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};
