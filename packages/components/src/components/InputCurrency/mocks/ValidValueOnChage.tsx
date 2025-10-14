import { IressInputCurrency } from '@/main';
import { useState } from 'react';

export const ValidValueOnChage = () => {
  const [value, setValue] = useState('');

  return (
    <IressInputCurrency
      value={value}
      onChange={(_e, value) => {
        if (typeof value === 'string' && /^-?\d*(\.\d{0,2})?$/.test(value)) {
          console.log('Valid value:', value);
          setValue(value);
        }
      }}
    />
  );
};
