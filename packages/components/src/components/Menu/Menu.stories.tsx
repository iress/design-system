import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressMenu, IressMenuItem, type IressMenuProps } from '.';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressStack } from '../Stack';
import { IressText } from '../Text';
import { MENU_CHILDREN_OPTIONS } from './mocks/menuChildrenOptions';
import { IressInline } from '../Inline';
import { useArgs } from 'storybook/preview-api';
import { MenuRoleDescription } from './mocks/MenuRoleDescription';
import { IressToggle } from '../Toggle';

type Story = StoryObj<typeof IressMenu>;

export default {
  title: 'Components/Menu',
  component: IressMenu,
  tags: ['updated'],
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
    maxWidth: 'input.25perc',
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
    <IressStack gap="lg">
      <IressText>
        <h3>Stack (default)</h3>
        <IressMenu {...args} layout="stack" />
      </IressText>
      <IressText>
        <h3>Inline</h3>
        <IressMenu {...args} layout="inline" />
      </IressText>
      <IressText>
        <h3>Inline Equal Width</h3>
        <IressMenu {...args} layout="inline-equal-width" />
      </IressText>
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
    <IressInline>
      <IressMenu {...args} maxWidth="input.12">
        <IressMenuItem>Menu item with some text that wraps</IressMenuItem>
      </IressMenu>
      <IressMenu {...args} maxWidth="input.12" noWrap>
        <IressMenuItem>Non wrapping menu item with some text</IressMenuItem>
      </IressMenu>
    </IressInline>
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
        <IressInline gap="md" verticalAlign="stretch">
          <div style={{ minWidth: 200 }}>
            <Story />
          </div>
          <MenuRoleDescription
            role={options.args.role ?? 'list'}
            style={{ flex: 1 }}
          >
            {options.args.role === 'listbox' && (
              <IressToggle
                mb="md"
                checked={multiSelect}
                onChange={() =>
                  updateArgs({ multiSelect: !multiSelect as never })
                }
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
