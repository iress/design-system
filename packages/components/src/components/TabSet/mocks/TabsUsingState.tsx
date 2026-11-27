import { IressButton, IressStack, IressTab, IressTabSet } from '@/main';
import { useState } from 'react';

export function TabsUsingState() {
  const [selected, setSelected] = useState<number>();

  return (
    <IressStack gap="md">
      <IressButton
        onClick={() => setSelected(selected === 2 ? 0 : 2)}
        alignSelf="start"
      >
        {selected === 2 ? `Back to first tab` : `Change to last tab`}
      </IressButton>
      <IressTabSet
        selected={selected}
        onChange={({ index }) => setSelected(index)}
      >
        <IressTab label="Address">Address information goes here</IressTab>
        <IressTab label="Employment">Employment information goes here</IressTab>
        <IressTab label="History">Medical history goes here</IressTab>
      </IressTabSet>
    </IressStack>
  );
}
