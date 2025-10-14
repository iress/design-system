import {
  IressButton,
  IressStack,
  IressTab,
  IressTabSet,
  IressTabSetProps,
} from '@/main';
import { useState } from 'react';

export const TabsUsingState = (args: IressTabSetProps) => {
  const [selected, setSelected] = useState<number>();

  return (
    <IressStack gutter={IressStack.Gutter.Md}>
      <IressButton onClick={() => setSelected(selected === 2 ? 0 : 2)}>
        {selected === 2 ? `Back to first tab` : `Change to last tab`}
      </IressButton>
      <IressTabSet
        {...args}
        selected={selected}
        onChange={({ index }) => setSelected(index)}
      >
        <IressTab label="Address">Address information goes here</IressTab>
        <IressTab label="Employment">Employment information goes here</IressTab>
        <IressTab label="History">Medical history goes here</IressTab>
      </IressTabSet>
    </IressStack>
  );
};
