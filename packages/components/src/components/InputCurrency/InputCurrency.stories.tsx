import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressInputCurrency } from './InputCurrency';
import {
  reactNodeArgType,
  stylingProps,
  withSource,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

import { ValidValueOnChage } from './mocks/ValidValueOnChage';
import ValidValueOnChageSource from './mocks/ValidValueOnChage.tsx?raw';
import { CurrencyInTable } from './mocks/CurrencyInTable';
import CurrencyInTableSource from './mocks/CurrencyInTable.tsx?raw';

type Story = StoryObj<typeof IressInputCurrency>;

export default {
  title: 'Components/InputCurrency',
  component: IressInputCurrency,
  tags: ['updated'],
  argTypes: {
    append: reactNodeArgType,
    prepend: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressInputCurrency>;

export const Default: Story = {
  args: {
    defaultValue: 12345.678,
    locale: 'en-AU',
    currencyCode: 'AUD',
  },
  tags: ['updated'],
};

export const InputCurrency: Story = {
  args: {
    ...Default.args,
    placeholder: 'Enter amount and dispay currency currency separator on blur',
  },
};

export const GBP: Story = {
  args: {
    ...Default.args,
    locale: 'en-GB',
    currencyCode: 'GBP',
    placeholder: 'Enter amount and dispay currency currency separator on blur',
  },
};

export const JPY: Story = {
  args: {
    ...Default.args,
    defaultValue: 12345678,
    locale: 'ja-JP',
    currencyCode: 'JPY',
    placeholder: 'Enter amount and dispay currency currency separator on blur',
  },
};

export const WithSymbol: Story = {
  args: {
    ...Default.args,
    withSymbol: true,
    placeholder: 'Enter amount and dispay currency symbol on blur',
  },
};

export const FormatOptions: Story = {
  args: {
    ...Default.args,
    placeholder:
      'Pass and play around with other native Intl.NumberFormat options to the code sandbox',
    formatOptions: { minimumFractionDigits: 2, maximumFractionDigits: 4 },
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
    alignRight: true,
    withSymbol: true,
  },
};

export const AlignRight: Story = {
  args: {
    ...Default.args,
    alignRight: true,
  },
};

export const CurrencyInTableRecipe: Story = {
  name: 'CurrencyInTable',
  tags: ['recipe'],
  render: (args) => <CurrencyInTable {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(CurrencyInTableSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const ValidValueOnChageRecipe: Story = {
  name: 'ValidValueOnChage',
  tags: ['recipe'],
  render: (args) => <ValidValueOnChage {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ValidValueOnChageSource, { stripImports: true, stripExportFunction: true }),
  },
};
