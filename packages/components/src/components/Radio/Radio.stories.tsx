import { type Meta, type StoryObj } from '@storybook/react';
import { IressRadio } from '.';
import { IressPanel } from '../Panel';
import { IressStack } from '../Stack';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import { IressField } from '../Field';

type Story = StoryObj<typeof IressRadio>;

export default {
  title: 'Components/Radio',
  component: IressRadio,
} as Meta<typeof IressRadio>;

export const Default: Story = {
  args: {
    children: 'Radio button',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    children: 'Checked radio button',
  },
};

export const HiddenControl: Story = {
  args: {
    hiddenControl: true,
    children: <IressPanel>Hidden radio button</IressPanel>,
  },
  argTypes: {
    ...disableArgTypes(['children']),
  },
};

export const Readonly: Story = {
  ...Default,
  args: {
    ...Default.args,
    readOnly: true,
  },
  render: (args) => (
    <IressStack gutter="sm">
      <IressRadio {...args} defaultChecked />
      <IressRadio {...args} />
    </IressStack>
  ),
};

export const Touch: Story = {
  args: {
    ...Default.args,
    touch: true,
  },
};

export const Locked: Story = {
  args: {
    ...Default.args,
    readOnly: 'locked',
  },
  argTypes: {
    ...disableArgTypes(['readOnly', 'value', 'prepend', 'append']),
  },
  render: (args) => (
    <IressStack gutter="lg">
      <IressField label="Locked Radio (checked)" readOnly="locked">
        <IressRadio {...args} checked />
      </IressField>
      <IressField label="Locked Radio (unchecked)" readOnly="locked">
        <IressRadio {...args} checked={false} />
      </IressField>
    </IressStack>
  ),
};
