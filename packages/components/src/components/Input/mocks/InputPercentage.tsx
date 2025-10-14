import { IressInput } from '@/main';

export const InputPercentage = () => (
  <IressInput<string | number>
    defaultValue="0.5"
    formatter={(value = '') => {
      if (value === '') return '';

      const numericValue = Number(value);

      if (Number.isNaN(numericValue)) {
        return String(value) ?? '';
      }

      return new Intl.NumberFormat('en-AU', {
        style: 'percent',
      }).format(numericValue);
    }}
    type="number"
  />
);
