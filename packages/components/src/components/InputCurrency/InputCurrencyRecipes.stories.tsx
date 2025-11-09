import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type IressInputProps, IressInputCurrency } from '../../main';
import { ValidValueOnChage as ValidValueOnChageExample } from './mocks/ValidValueOnChage';
import ValidValueOnChageSource from './mocks/ValidValueOnChage.tsx?raw';
import { CurrencyInTable as CurrencyInTableExample } from './mocks/CurrencyInTable';
import CurrencyInTableSource from './mocks/CurrencyInTable.tsx?raw';
import { withCustomSource } from '@iress-oss/ids-storybook-sandbox';

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
