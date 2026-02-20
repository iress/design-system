import type { Meta, StoryObj } from '@storybook/react';
import { IressMenuGroup } from './MenuGroup';
import { IressMenu } from '../Menu';
import { IressMenuItem } from '../MenuItem/MenuItem';

export default {
  title: 'Components/Menu/MenuGroup',
  component: IressMenuGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IressMenuGroup>;

type Story = StoryObj<typeof IressMenuGroup>;

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
