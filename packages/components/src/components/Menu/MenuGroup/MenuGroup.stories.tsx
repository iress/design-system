import type { Meta, StoryObj } from '@storybook/react';
import { IressMenuGroup, type IressMenuGroupProps } from './MenuGroup';
import { IressMenu } from '../Menu';
import { IressMenuItem } from '../MenuItem/MenuItem';
import { IressPanel } from '@/main';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the menu group',
    query: <code>getByRole('group')</code>,
    testId: 'menu-group',
  },
  {
    part: 'activator',
    description: 'The activator element for subdraw variant',
    testId: 'menu-group__activator',
  },
  {
    part: 'subdraw',
    description: 'The subdraw container',
    testId: 'menu-group__subdraw',
  },
];

export default {
  title: 'Components/Menu/MenuGroup',
  component: IressMenuGroup,
  parameters: {
    idsConfig: { testMeta },
    layout: 'centered',
  },
} satisfies Meta<typeof IressMenuGroup>;

type Story = StoryObj<IressMenuGroupProps>;

export const Default: Story = {
  render: (args) => (
    <IressMenu>
      <IressMenuGroup {...args}>
        <IressMenuItem>Option 1</IressMenuItem>
        <IressMenuItem>Option 2</IressMenuItem>
        <IressMenuItem>Option 3</IressMenuItem>
      </IressMenuGroup>
    </IressMenu>
  ),
  args: {
    label: 'Group Label',
  },
};

export const MultipleGroups: Story = {
  render: (args) => (
    <IressMenu>
      <IressMenuGroup {...args} label="Fruits">
        <IressMenuItem>Apple</IressMenuItem>
        <IressMenuItem>Banana</IressMenuItem>
        <IressMenuItem>Orange</IressMenuItem>
      </IressMenuGroup>
      <IressMenuGroup {...args} label="Vegetables" divider>
        <IressMenuItem>Carrot</IressMenuItem>
        <IressMenuItem>Broccoli</IressMenuItem>
      </IressMenuGroup>
    </IressMenu>
  ),
};

export const WithDivider: Story = {
  render: (args) => (
    <IressMenu>
      <IressMenuGroup {...args}>
        <IressMenuItem>Option 1</IressMenuItem>
        <IressMenuItem>Option 2</IressMenuItem>
      </IressMenuGroup>
      <IressMenuGroup label="Another Group">
        <IressMenuItem>Option 3</IressMenuItem>
        <IressMenuItem>Option 4</IressMenuItem>
      </IressMenuGroup>
    </IressMenu>
  ),
  args: {
    label: 'Group with Divider',
    divider: true,
  },
};

export const Selectable: Story = {
  render: (args) => (
    <IressMenu role="listbox">
      <IressMenuGroup {...args} label="Recent">
        <IressMenuItem value="file1">Document 1.pdf</IressMenuItem>
        <IressMenuItem value="file2">Spreadsheet.xlsx</IressMenuItem>
      </IressMenuGroup>
      <IressMenuGroup {...args} label="All Files" divider>
        <IressMenuItem value="file3">Presentation.pptx</IressMenuItem>
        <IressMenuItem value="file4">Notes.txt</IressMenuItem>
      </IressMenuGroup>
    </IressMenu>
  ),
};

export const SubdrawVariant: Story = {
  render: (args) => (
    <IressPanel>
      <IressMenu>
        <IressMenuItem>Regular Item</IressMenuItem>
        <IressMenuGroup {...args} label="More Options" variant="subdraw">
          <IressMenuItem>Submenu Item 1</IressMenuItem>
          <IressMenuItem>Submenu Item 2</IressMenuItem>
          <IressMenuItem>Submenu Item 3</IressMenuItem>
        </IressMenuGroup>
        <IressMenuItem>Another Item</IressMenuItem>
      </IressMenu>
    </IressPanel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The subdraw variant renders the group label as a clickable menu item that opens a fly-over submenu. Click the "More Options" item to see the submenu.',
      },
    },
  },
};

export const SubdrawWithDividers: Story = {
  render: (args) => (
    <IressPanel>
      <IressMenu>
        <IressMenuGroup {...args} label="File" variant="subdraw" divider>
          <IressMenuItem>New</IressMenuItem>
          <IressMenuItem>Open</IressMenuItem>
          <IressMenuItem>Save</IressMenuItem>
        </IressMenuGroup>
        <IressMenuGroup {...args} label="Edit" variant="subdraw" divider>
          <IressMenuItem>Cut</IressMenuItem>
          <IressMenuItem>Copy</IressMenuItem>
          <IressMenuItem>Paste</IressMenuItem>
        </IressMenuGroup>
        <IressMenuItem>Exit</IressMenuItem>
      </IressMenu>
    </IressPanel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple subdraw groups with dividers. Each group opens its own fly-over submenu.',
      },
    },
  },
};

export const NestedSubdraw: Story = {
  render: (args) => (
    <IressPanel>
      <IressMenu role="menu">
        <IressMenuGroup {...args} label="Settings" variant="subdraw">
          <IressMenuItem>General</IressMenuItem>
          <IressMenuGroup {...args} label="Advanced" variant="subdraw">
            <IressMenuItem>Developer Options</IressMenuItem>
            <IressMenuItem>Debug Mode</IressMenuItem>
            <IressMenuGroup {...args} label="Experimental" variant="subdraw">
              <IressMenuItem>Feature A</IressMenuItem>
              <IressMenuItem>Feature B</IressMenuItem>
            </IressMenuGroup>
          </IressMenuGroup>
          <IressMenuItem>About</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>
    </IressPanel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Subdraw groups can be nested to create multi-level submenus. Click through Settings → Advanced → Experimental to see all levels.',
      },
    },
  },
};
