import type { Meta, StoryObj } from '@storybook/react';
import { IressMenuGroup, type IressMenuGroupProps } from './MenuGroup';
import { IressMenu } from '../Menu';
import { IressMenuItem } from '../MenuItem/MenuItem';
import { IressPanel } from '@/main';

export default {
  title: 'Components/Menu/MenuGroup',
  component: IressMenuGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IressMenuGroup>;

type Story = StoryObj<IressMenuGroupProps<never, 'subdraw'>>;

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
  render: () => (
    <IressPanel>
      <IressMenu>
        <IressMenuItem>Regular Item</IressMenuItem>
        <IressMenuGroup label="More Options" variant="subdraw">
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
  render: () => (
    <IressPanel>
      <IressMenu>
        <IressMenuGroup label="File" variant="subdraw" divider>
          <IressMenuItem>New</IressMenuItem>
          <IressMenuItem>Open</IressMenuItem>
          <IressMenuItem>Save</IressMenuItem>
        </IressMenuGroup>
        <IressMenuGroup label="Edit" variant="subdraw" divider>
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
  render: () => (
    <IressPanel>
      <IressMenu>
        <IressMenuGroup label="Settings" variant="subdraw">
          <IressMenuItem>General</IressMenuItem>
          <IressMenuGroup label="Advanced" variant="subdraw">
            <IressMenuItem>Developer Options</IressMenuItem>
            <IressMenuItem>Debug Mode</IressMenuItem>
            <IressMenuGroup label="Experimental" variant="subdraw">
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
