import { Meta, StoryObj } from '@storybook/react';

import { disableArgTypes } from '@iress-storybook/helpers';
import { IressInputPopover } from './InputPopover';
import { IressInput, IressMenu, IressMenuItem, IressPanel } from '@/main';

type Story = StoryObj<typeof IressInputPopover>;

const childrenOptions = {
  none: null,
  basic: (
    <IressPanel className="iress-u-text">
      A little more information about this area.
    </IressPanel>
  ),
  menu: (
    <IressMenu aria-label="Selectable listbox">
      <IressMenuItem value={0}>Item 1</IressMenuItem>
      <IressMenuItem value={1}>Item 2</IressMenuItem>
      <IressMenuItem value={2}>Item 3</IressMenuItem>
    </IressMenu>
  ),
};

export default {
  title: 'Components/Popover/InputPopover',
  component: IressInputPopover,
  argTypes: {
    ...disableArgTypes(['activator']),
    children: {
      control: {
        type: 'select',
        labels: {
          Heading: 'With Custom Children',
        },
      },
      options: Object.keys(childrenOptions),
      mapping: childrenOptions,
    },
  },
} as Meta<typeof IressInputPopover>;

export const Activator: Story = {
  args: {
    activator: <IressInput />,
    children: 'basic',
    container: document.body,
  },
};

export const Items: Story = {
  args: {
    activator: <IressInput />,
    children: 'menu',
  },
};
