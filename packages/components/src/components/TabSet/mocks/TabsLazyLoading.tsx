import { IressButton, IressStack, IressTab, IressTabSet } from '@/main';
import { useState } from 'react';

export function TabsLazyLoading() {
  const [loadTabs, setLoadTabs] = useState<boolean>();

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setLoadTabs(!loadTabs)} alignSelf="start">
        Toggle tabs
      </IressButton>
      <IressTabSet>
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
}
