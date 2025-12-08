import { type Meta, type StoryObj } from '@storybook/react';
import {
  IressButton,
  IressCol,
  IressContainer,
  IressMenu,
  IressPopover,
  IressRow,
  IressToggle,
  MENU_ROLES,
} from '@/main';
import { MENU_CHILDREN_OPTIONS } from '../Menu/mocks/menuChildrenOptions';
import { MenuInPopoverRoleDescription } from './mocks/MenuInPopoverRoleDescription';
import { type ReactNode, useState } from 'react';
import { UsePopoverExample } from './mocks/UsePopoverExample';
import UsePopoverExampleSource from './mocks/UsePopoverExample.tsx?raw';
import {
  disableArgTypes,
  withCustomSource,
} from '@iress-oss/ids-storybook-config';

type IressPopoverPropsAndCustomArgs = React.ComponentProps<
  typeof IressPopover
> & {
  menuChildren: ReactNode;
};
type Story = StoryObj<IressPopoverPropsAndCustomArgs>;

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
      <IressContainer className="iress-u-stack iress--gutter--md">
        {MENU_ROLES.map((role) => (
          <IressRow
            gutter={IressRow.Gutter.Lg}
            key={role}
            verticalAlign={IressRow.VerticalAlign.Middle}
          >
            <IressCol span={IressCol.Span.Two}>
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
                    className="iress-mb--md"
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
      </IressContainer>
    );
  },
};

export const FocusableChildren: Story = {
  render: (args) => <UsePopoverExample {...args} />,
  parameters: {
    ...withCustomSource(UsePopoverExampleSource),
  },
};
