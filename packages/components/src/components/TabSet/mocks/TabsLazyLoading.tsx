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
    <IressStack gap="md">
      <IressButton onClick={() => setLoadTabs(!loadTabs)}>
        Toggle tabs
      </IressButton>
      <IressTabSet {...args}>
        {loadTabs && (
          <>
            <IressTab label="Address">Address information goes here</IressTab>
            <IressTab label="Employment">
              Employment information goes here
            </IressTab>
            <IressTab label="Medical history">
              Medical history goes here
            </IressTab>
          </>
        )}
      </IressTabSet>
    </IressStack>
  );
};
