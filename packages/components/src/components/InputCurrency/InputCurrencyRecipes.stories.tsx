import { Meta, StoryObj } from '@storybook/react-vite';
import { IressInputProps, IressInputCurrency } from '../../main';
import { withCustomSource } from '@iress-storybook/helpers';
import { ValidValueOnChage as ValidValueOnChageExample } from './mocks/ValidValueOnChage';
import ValidValueOnChageSource from './mocks/ValidValueOnChage.tsx?raw';
import { CurrencyInTable as CurrencyInTableExample } from './mocks/CurrencyInTable';
import CurrencyInTableSource from './mocks/CurrencyInTable.tsx?raw';

type Story = StoryObj<IressInputProps>;

export default {
  title: 'Components/InputCurrency/Recipes',
  component: IressInputCurrency,
  tags: ['updated'],
} as Meta<typeof IressInputCurrency>;

export const CurrencyInTable: Story = {
  render: (args) => <CurrencyInTableExample {...args} />,
  parameters: {
    ...withCustomSource(CurrencyInTableSource),
  },
};

export const ValidValueOnChage: Story = {
  render: (args) => <ValidValueOnChageExample {...args} />,
  parameters: {
    ...withCustomSource(ValidValueOnChageSource),
  },
};
