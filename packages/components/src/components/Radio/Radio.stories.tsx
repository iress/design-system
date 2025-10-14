import { Meta, StoryObj } from '@storybook/react';
import { IressRadio } from '.';
import { IressPanel } from '../Panel';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressStack } from '../Stack';

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
