import { StoryObj, Meta } from '@storybook/react';
import { disableArgTypes } from '@iress-storybook/helpers';

import { IressToggle, TOGGLE_LAYOUTS } from '.';
import { IressRow } from '../Row';
import { IressCol } from '../Col';
import { IressPanel } from '../Panel';

type Story = StoryObj<typeof IressToggle>;

export default {
  title: 'Components/Toggle',
  component: IressToggle,
} as Meta<typeof IressToggle>;

export const Default: Story = {
  args: {
    children: 'Toggle',
    checked: false,
    hiddenLabel: false,
    layout: 'inline',
  },
};

export const HiddenLabel: Story = {
  args: {
    ...Default.args,
    hiddenLabel: true,
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
};

export const Layout: Story = {
  args: {
    layout: 'inline',
  },
  argTypes: disableArgTypes(['label', 'checked', 'hiddenLabel', 'layout']),
  render: (args) => (
    <IressRow gutter="lg">
      {TOGGLE_LAYOUTS.map((layout, index) => (
        <IressCol span="12" key={layout}>
          <IressPanel background={IressPanel.Background.Alt}>
            <IressToggle {...args} layout={layout} checked={Boolean(index % 2)}>
              Toggle
            </IressToggle>
          </IressPanel>
        </IressCol>
      ))}
    </IressRow>
  ),
};
