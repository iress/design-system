import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressBreadcrumbs } from '@/main';
import { disableArgTypes, withSource } from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';
import { BreadcrumbsAllConfigurations } from './mocks/BreadcrumbsAllConfigurations';
import BreadcrumbsAllConfigurationsSource from './mocks/BreadcrumbsAllConfigurations.tsx?raw';

type Story = StoryObj<typeof IressBreadcrumbs>;

export default {
  title: 'Patterns/Breadcrumbs',
  component: IressBreadcrumbs,
  tags: ['beta'],
  args: {
    overflowProps: {
      container: document.body,
    },
  },
  argTypes: {
    ...disableArgTypes(['items']),
  },
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
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
