import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressInline, IressStack, IressStyled } from '@/main';
import { IressContextualMenu, type ContextualMenuItem } from './ContextualMenu';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof IressContextualMenu>;

const testMeta: TestComponentMeta[] = [
  { part: 'main', description: 'The root contextual menu element', testId: 'contextual-menu' },
  { part: 'activator', description: 'The trigger button', query: <code>getByRole('button')</code>, testId: 'contextual-menu__activator' },
  { part: 'menu', description: 'The menu container', query: <code>getByRole('menu')</code>, testId: 'contextual-menu__menu' },
];

const DEFAULT_ITEMS: ContextualMenuItem[] = [
  {
    key: 'edit',
    label: 'Edit',
    icon: 'edit',
    onClick: () => {
      alert('Edit action');
    },
  },
  {
    key: 'lock',
    label: 'Lock',
    icon: 'lock',
    divider: true,
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: 'delete',
  },
];

export default {
  title: 'Patterns/ContextualMenu',
  component: IressContextualMenu,
  tags: ['beta'],
  args: {
    container: document.body,
  },
  parameters: {
    idsConfig: { testMeta },
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressContextualMenu>;

export const Default: Story = {
  args: {
    items: DEFAULT_ITEMS,
  },
};

export const Sizes: Story = {
  args: {
    items: DEFAULT_ITEMS,
  },
  render: (args) => (
    <IressStack gap="sm">
      <IressContextualMenu {...args} size="small" />
      <IressContextualMenu {...args} size="medium" />
    </IressStack>
  ),
};

export const Align: Story = {
  args: {
    ...Default.args,
  },
  argTypes: {
    ...disableArgTypes(['align']),
  },
  render: (args) => (
    <IressStyled p="spacing.10">
      <IressStack gap="md">
        <IressInline horizontalAlign="center" gap="sm">
          <IressContextualMenu {...args} align="top-start" />
          <IressContextualMenu {...args} align="top" />
          <IressContextualMenu {...args} align="top-end" />
        </IressInline>
        <IressInline horizontalAlign="between">
          <IressStack gap="sm">
            <IressInline horizontalAlign="left">
              <IressContextualMenu {...args} align="left-start" />
            </IressInline>
            <IressInline horizontalAlign="left">
              <IressContextualMenu {...args} align="left" />
            </IressInline>
            <IressInline horizontalAlign="left">
              <IressContextualMenu {...args} align="left-end" />
            </IressInline>
          </IressStack>
          <IressStack gap="sm">
            <IressInline horizontalAlign="right">
              <IressContextualMenu {...args} align="right-start" />
            </IressInline>
            <IressInline horizontalAlign="right">
              <IressContextualMenu {...args} align="right" />
            </IressInline>
            <IressInline horizontalAlign="right">
              <IressContextualMenu {...args} align="right-end" />
            </IressInline>
          </IressStack>
        </IressInline>
        <IressInline horizontalAlign="center" gap="sm">
          <IressContextualMenu {...args} align="bottom-start" />
          <IressContextualMenu {...args} align="bottom" />
          <IressContextualMenu {...args} align="bottom-end" />
        </IressInline>
      </IressStack>
    </IressStyled>
  ),
};

export const Bordered: Story = {
  args: {
    items: DEFAULT_ITEMS,
  },
  render: (args) => (
    <IressInline gap="sm">
      <IressContextualMenu {...args} />
      <IressContextualMenu {...args} bordered />
    </IressInline>
  ),
};

export const Themes: Story = {
  args: {
    items: DEFAULT_ITEMS,
    theme: 'dark',
  },
  render: (args) => (
    <IressInline gap="sm" bg="alt" borderRadius="radius.system.layout" p="lg">
      <IressContextualMenu {...args} />
      <IressContextualMenu {...args} bordered />
    </IressInline>
  ),
};
