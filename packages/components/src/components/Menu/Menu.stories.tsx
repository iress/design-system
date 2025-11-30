import { type Meta, type StoryObj } from '@storybook/react';
import { IressMenu, IressMenuItem, type IressMenuProps, MENU_LAYOUTS } from '.';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import { IressStack } from '../Stack';
import { IressText } from '../Text';
import { MENU_CHILDREN_OPTIONS } from './mocks/menuChildrenOptions';
import { IressInline } from '../Inline';
import { MenuRoleDescription } from './mocks/MenuRoleDescription';
import { IressToggle } from '../Toggle';
import { useArgs } from 'storybook/internal/preview-api';

type Story = StoryObj<typeof IressMenu>;

export default {
  title: 'Components/Menu',
  component: IressMenu,
  argTypes: {
    ...disableArgTypes(['children']),
    children: {
      control: {
        type: 'select',
      },
      options: Object.keys(MENU_CHILDREN_OPTIONS),
      mapping: MENU_CHILDREN_OPTIONS,
    },
  },
} as Meta<typeof IressMenu>;

export const Basic: Story = {
  args: {
    children: 'basic',
    defaultSelected: '5',
  },
};

export const Complex: Story = {
  args: {
    children: 'complex',
  },
};

export const SecondaryNavigation: Story = {
  args: {
    children: 'navigation',
  },
  render: (args) => (
    <nav aria-label="Secondary">
      <IressMenu {...args} />
    </nav>
  ),
};

export const Headings: Story = {
  args: {
    children: 'headings',
  },
};

export const Dividers: Story = {
  args: {
    children: 'dividers',
  },
};

export const Fluid: Story = {
  args: {
    ...Basic.args,
    fluid: true,
  },
};

export const Layout: Story = {
  args: {
    ...Basic.args,
  },
  argTypes: {
    ...disableArgTypes(['children', 'layout']),
  },
  render: (args) => (
    <IressStack gutter="lg">
      {MENU_LAYOUTS.map((layout) => (
        <IressText key={layout}>
          <h3>{layout}</h3>
          <IressMenu {...args} layout={layout} />
        </IressText>
      ))}
    </IressStack>
  ),
};

export const NoWrap: Story = {
  args: {
    ...Basic.args,
  },
  argTypes: {
    ...disableArgTypes(['children', 'noWrap']),
  },
  render: (args) => (
    <div style={{ maxWidth: '300px', display: 'flex' }}>
      <IressMenu {...args}>
        <IressMenuItem>Menu item with some text that wraps</IressMenuItem>
      </IressMenu>
      <IressMenu {...args} noWrap>
        <IressMenuItem>Non wrapping menu item with some text</IressMenuItem>
      </IressMenu>
    </div>
  ),
};

export const SlotProps: Story = {
  args: {
    children: 'slots',
    role: 'menu',
  },
};

export const ExtraInformation: Story = {
  args: {
    children: 'extraInformation',
  },
};

export const ListRole: Story = {
  args: {
    children: 'basic',
    defaultSelected: 5,
  },
  decorators: [
    (Story, options) => {
      const [{ multiSelect }, updateArgs] = useArgs<IressMenuProps>();

      return (
        <IressInline gutter="md" verticalAlign="stretch">
          <div style={{ minWidth: 200 }}>
            <Story />
          </div>
          <MenuRoleDescription
            role={options.args.role ?? 'list'}
            style={{ flex: 1 }}
          >
            {options.args.role === 'listbox' && (
              <IressToggle
                className="iress-mb--md"
                checked={multiSelect}
                onChange={() => updateArgs({ multiSelect: !multiSelect })}
              >
                Multi-select
              </IressToggle>
            )}
          </MenuRoleDescription>
        </IressInline>
      );
    },
  ],
};

export const MenuRole: Story = {
  ...ListRole,
  args: {
    ...ListRole.args,
    role: 'menu',
  },
};

export const ListboxRole: Story = {
  ...ListRole,
  args: {
    ...ListRole.args,
    children: 'selectable',
    role: 'listbox',
    'aria-label': 'Selectable listbox',
  },
};

export const NavRole: Story = {
  ...ListRole,
  args: {
    ...ListRole.args,
    role: 'nav',
  },
};
