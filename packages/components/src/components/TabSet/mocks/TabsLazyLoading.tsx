import {
  IressButton,
  IressStack,
  IressTab,
  IressTabSet,
  type IressTabSetProps,
} from '@/main';
import { useState } from 'react';

export const TabsLazyLoading = (args: IressTabSetProps) => {
  const [loadTabs, setLoadTabs] = useState<boolean>();

  return (
    <IressStack gutter="md">
      <IressButton onClick={() => setLoadTabs(!loadTabs)}>
        Toggle tabs
      </IressButton>
      <IressTabSet {...args}>
        {loadTabs && (
          <>
            <IressTab label="Address" value="address">
              Address information goes here
            </IressTab>
            <IressTab label="Employment" value="employment">
              Employment information goes here
            </IressTab>
            <IressTab label="Medical history" value="medical">
              Medical history goes here
            </IressTab>
          </>
        )}
      </IressTabSet>
    </IressStack>
  );
};
