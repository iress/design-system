import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressRadio } from '.';
import { IressPanel } from '../Panel';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressStack } from '../Stack';

type Story = StoryObj<typeof IressRadio>;

export default {
  title: 'Components/Radio',
  component: IressRadio,
  tags: ['updated'],
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
    children: <IressPanel bg="transparent">Hidden radio button</IressPanel>,
  },
  argTypes: {
    ...disableArgTypes(['children']),
  },
};

export const ReadOnly: Story = {
  ...Default,
  args: {
    ...Default.args,
    readOnly: true,
  },
  render: (args) => (
    <IressStack gap="sm">
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
