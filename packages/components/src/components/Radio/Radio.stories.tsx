import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressRadio, type IressRadioProps } from '.';
import { IressStack } from '../Stack';
import {
  disableArgTypes,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import { type FormControlValue } from '@/types';

type Story = StoryObj<typeof IressRadio>;

export default {
  title: 'Components/Radio',
  component: IressRadio,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
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

export const Variants: Story = {
  argTypes: {
    ...disableArgTypes(['children', 'variant', 'heading']),
  },
  render: (args) => (
    <IressStack gap="lg">
      <IressRadio {...args} variant="card" heading="Widget">
        A description of the widget
      </IressRadio>
      <IressRadio
        {...(args as IressRadioProps<FormControlValue, 'touch'>)}
        variant="touch"
      >
        Touch variant
      </IressRadio>
    </IressStack>
  ),
};
