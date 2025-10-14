import { Meta, StoryObj } from '@storybook/react';
import { IressInputCurrency } from './InputCurrency';

type Story = StoryObj<typeof IressInputCurrency>;

export default {
  title: 'Components/InputCurrency',
  component: IressInputCurrency,
} as Meta<typeof IressInputCurrency>;

export const Default: Story = {
  args: {
    defaultValue: 12345.678,
    currencyCode: 'AUD',
  },
};

export const InputCurrency: Story = {
  args: {
    ...Default.args,
    placeholder: 'Enter amount and dispay currency currency separator on blur',
  },
};

export const CurrencyCode: Story = {
  args: {
    ...Default.args,
    currencyCode: 'GBP',
    placeholder: 'Enter amount and dispay currency currency separator on blur',
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
