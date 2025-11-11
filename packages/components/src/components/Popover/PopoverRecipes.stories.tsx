import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressButton,
  IressCol,
  IressMenu,
  type IressMenuProps,
  IressPopover,
  IressRow,
  IressStack,
  IressToggle,
} from '@/main';
import { MENU_CHILDREN_OPTIONS } from '../Menu/mocks/menuChildrenOptions';
import { MenuInPopoverRoleDescription } from './mocks/MenuInPopoverRoleDescription';
import { type ComponentProps, type ReactNode, useState } from 'react';
import { UsePopoverExample } from './mocks/UsePopoverExample';
import UsePopoverExampleSource from './mocks/UsePopoverExample.tsx?raw';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import { withCustomSource } from '@iress-oss/ids-storybook-sandbox';

type IressPopoverPropsAndCustomArgs = ComponentProps<typeof IressPopover> & {
  menuChildren: ReactNode;
};
type Story = StoryObj<IressPopoverPropsAndCustomArgs>;

const MENU_ROLES: IressMenuProps['role'][] = ['listbox', 'menu', 'list'];

export default {
  title: 'Components/Popover/Recipes',
  component: IressPopover,
  argTypes: {
    ...disableArgTypes(['children']),
    menuChildren: {
      control: {
        type: 'select',
      },
      options: Object.keys(MENU_CHILDREN_OPTIONS),
      mapping: MENU_CHILDREN_OPTIONS,
    },
  },
} as Meta<typeof IressPopover>;

export const WithMenu: Story = {
  args: {
    menuChildren: 'selectable',
  },
  argTypes: {
    ...disableArgTypes(['activator', 'children', 'role', 'type']),
  },
  render: ({ menuChildren, ...args }) => {
    const [multiSelect, setMultiSelect] = useState(false);

    return (
      <IressStack gap="md" maxWidth="container.lg" px="lg" mx="auto">
        {MENU_ROLES.map((role) => (
          <IressRow gutter="lg" key={role} verticalAlign="middle">
            <IressCol span={2}>
              <IressPopover
                {...args}
                activator={<IressButton fluid>role={role}</IressButton>}
                container={document.body}
                type={role === 'listbox' || role === 'menu' ? role : undefined}
              >
                <IressMenu
                  role={role}
                  defaultSelected={3}
                  multiSelect={multiSelect && role === 'listbox'}
                >
                  {menuChildren}
                </IressMenu>
              </IressPopover>
            </IressCol>
            <IressCol>
              <MenuInPopoverRoleDescription role={role}>
                {role === 'listbox' && (
                  <IressToggle
                    mb="md"
                    checked={multiSelect}
                    onChange={() => setMultiSelect(!multiSelect)}
                  >
                    Multi-select
                  </IressToggle>
                )}
              </MenuInPopoverRoleDescription>
            </IressCol>
          </IressRow>
        ))}
      </IressStack>
    );
  },
};

export const FocusableChildren: Story = {
  render: (args) => <UsePopoverExample {...args} />,
  parameters: {
    ...withCustomSource(UsePopoverExampleSource),
  },
};
