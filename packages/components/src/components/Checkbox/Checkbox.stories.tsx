import { type Meta, type StoryObj } from '@storybook/react-vite';

import { IressCheckbox } from '.';
import { IressCheckboxMark } from '../CheckboxMark';
import { disableArgTypes, withJsxTransformer } from '@iress-storybook/helpers';
import { IressPanel } from '../Panel';
import { IressTable } from '../Table';
import { IressStack } from '../Stack';

type Story = StoryObj<typeof IressCheckbox>;

export default {
  title: 'Components/Checkbox',
  component: IressCheckbox,
  subcomponents: { IressCheckboxMark },
  tags: ['updated'],
} as Meta<typeof IressCheckbox>;

export const Default: Story = {
  args: {
    children: 'A checkbox',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    children: 'A checkbox which is checked and in controlled mode',
  },
};

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
    children: 'A checkbox which is initially checked',
  },
};

export const HiddenLabel: Story = {
  args: {
    hiddenLabel: true,
    children:
      "A checkbox with a hidden label (if you're reading this, you're pretty clever)",
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    children: 'A checkbox which is initially in an indeterminate state',
  },
};

export const HiddenControl: Story = {
  args: {
    hiddenControl: true,
    children: <IressPanel bg="transparent">Hidden checkbox</IressPanel>,
  },
  argTypes: {
    ...disableArgTypes(['children']),
  },
};

export const WithTableData: Story = {
  args: {
    hiddenLabel: true,
    children: 'Toggle row',
  },
  render: (args) => (
    <IressTable
      caption="List of investments"
      columns={[
        {
          format: (value: boolean) => (
            <IressCheckbox {...args} defaultChecked={value} />
          ),
          key: 'select',
          label: 'Select',
          sort: true,
        },
        { key: 'name', label: 'Name' },
        { key: 'date', label: 'Date' },
        { key: 'cost', label: 'Cost' },
      ]}
      rows={[
        {
          select: false,
          name: 'Artemis Fund Managers Limited',
          date: '2019-09-23',
          cost: 23898.12,
        },
        {
          select: true,
          name: 'CASH.CASH',
          date: '2020-06-28',
          cost: 49751.43,
        },
      ]}
    />
  ),
  parameters: {
    ...withJsxTransformer({
      functionValue: () =>
        `(value: boolean) => <IressCheckbox defaultChecked={value} hiddenLabel>Toggle row</IressCheckbox>`,
      showFunctions: true,
    }),
  },
};

export const ReadOnly: Story = {
  args: {
    children: 'I agree to the terms and conditions',
    readOnly: true,
    value: 'readOnly',
  },
  argTypes: {
    ...disableArgTypes(['checked', 'readOnly']),
  },
  render: (args) => (
    <IressStack>
      <IressCheckbox {...args} defaultChecked />
      <IressCheckbox {...args} />
    </IressStack>
  ),
};

export const Touch: Story = {
  args: {
    ...Default.args,
    children: 'Checkbox with touch styles',
    touch: true,
  },
};
