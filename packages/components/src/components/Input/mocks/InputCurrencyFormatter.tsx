import { IressInput } from '@/main';

export function InputCurrencyFormatter() {
  const formatter = (value = '') => {
    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      return value;
    }

    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(numberValue);
  };

  return (
    <IressInput
      defaultValue="0.00"
      formatter={formatter}
      placeholder="Enter any number and it will show in currency format when the input is not focused"
      type="number"
    />
  );
}
