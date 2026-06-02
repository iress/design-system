import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressCheckboxMark } from '.';
import { stylingProps } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressCheckboxMark>;

export default {
  title: 'Components/Checkbox/CheckboxMark',
  component: IressCheckboxMark,
  argTypes: {
    ...stylingProps,
  },
} as Meta<typeof IressCheckboxMark>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const Small: Story = {
  args: {
    checked: true,
    size: 'sm',
  },
};
