import { IressTab, IressTabSet } from '@/main';
import { useState } from 'react';

export function TabSetDynamicLabels() {
  const [selected, setSelected] = useState(0);

  return (
    <IressTabSet
      selected={selected}
      onChange={({ index }) => setSelected(index)}
    >
      {['Overview', 'Summary', 'Details'].map((label, index) => (
        <IressTab
          key={label}
          label={selected === index ? `${label} (AUD)` : label}
        />
      ))}
    </IressTabSet>
  );
}
