import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressMenu, IressMenuItem, type IressMenuProps } from '.';
import { IressInline } from '../Inline';
import {
  disableArgTypes,
  stylingProps,
  withSource,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

import { MenuBasic } from './mocks/MenuBasic';
import MenuBasicSource from './mocks/MenuBasic.tsx?raw';
import { MenuNavigation } from './mocks/MenuNavigation';
import MenuNavigationSource from './mocks/MenuNavigation.tsx?raw';
import { MenuSlots } from './mocks/MenuSlots';
import MenuSlotsSource from './mocks/MenuSlots.tsx?raw';
import { MenuLayout } from './mocks/MenuLayout';
import MenuLayoutSource from './mocks/MenuLayout.tsx?raw';
import { MenuVariants } from './mocks/MenuVariants';
import MenuVariantsSource from './mocks/MenuVariants.tsx?raw';
import { MenuComplex } from './mocks/MenuComplex';
import MenuComplexSource from './mocks/MenuComplex.tsx?raw';
import { MenuHeadings } from './mocks/MenuHeadings';
import MenuHeadingsSource from './mocks/MenuHeadings.tsx?raw';
import { MenuDividers } from './mocks/MenuDividers';
import MenuDividersSource from './mocks/MenuDividers.tsx?raw';
import { MenuExtraInformation } from './mocks/MenuExtraInformation';
import MenuExtraInformationSource from './mocks/MenuExtraInformation.tsx?raw';
import { MenuRoles } from './mocks/MenuRoles';
import MenuRolesSource from './mocks/MenuRoles.tsx?raw';

type Story = StoryObj<IressMenuProps>;

export default {
  title: 'Components/Menu',
  component: IressMenu,
  tags: ['updated'],
  argTypes: {
    ...stylingProps,
  },
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressMenu>;

export const Default: Story = {
  args: {
    children: [
      <IressMenuItem key="1" value="1">
        Menu item 1
      </IressMenuItem>,
      <IressMenuItem key="2" value="2">
        Menu item 2
      </IressMenuItem>,
      <IressMenuItem key="3" value="3">
        Menu item 3
      </IressMenuItem>,
    ],
  },
};

export const Basic: Story = {
  render: (args) => <MenuBasic {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(MenuBasicSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const SecondaryNavigation: Story = {
  render: (args) => <MenuNavigation {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(MenuNavigationSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Fluid: Story = {
  args: {
    children: [
      <IressMenuItem key="1" value="1">
        Menu item 1
      </IressMenuItem>,
      <IressMenuItem key="2" value="2">
        Menu item 2
      </IressMenuItem>,
    ],
    fluid: true,
  },
};

export const Layout: Story = {
  render: (args) => <MenuLayout {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(MenuLayoutSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const NoWrap: Story = {
  argTypes: {
    ...disableArgTypes(['children', 'noWrap']),
  },
  render: (args) => (
    <IressInline>
      <IressMenu {...args} width="input.12">
        <IressMenuItem>Menu item with some text that wraps</IressMenuItem>
      </IressMenu>
      <IressMenu {...args} width="input.12" noWrap>
        <IressMenuItem>Non wrapping menu item with some text</IressMenuItem>
      </IressMenu>
    </IressInline>
  ),
};

export const SlotProps: Story = {
  render: (args) => <MenuSlots {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(MenuSlotsSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Complex: Story = {
  render: (args) => <MenuComplex {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(MenuComplexSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Headings: Story = {
  render: (args) => <MenuHeadings {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(MenuHeadingsSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Dividers: Story = {
  render: (args) => <MenuDividers {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(MenuDividersSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const ExtraInformation: Story = {
  render: (args) => <MenuExtraInformation {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(MenuExtraInformationSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Roles: Story = {
  render: (args) => <MenuRoles {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(MenuRolesSource, { stripImports: true }),
  },
};

export const Variants: Story = {
  render: (args) => <MenuVariants {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(MenuVariantsSource, { stripImports: true, stripExportFunction: true }),
  },
};
