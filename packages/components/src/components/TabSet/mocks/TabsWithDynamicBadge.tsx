import {
  IressButton,
  IressPill,
  IressStack,
  IressTab,
  IressTabSet,
  IressText,
  type IressTabSetProps,
} from '@/main';
import { useState } from 'react';

export const TabsWithDynamicBadge = (args: IressTabSetProps) => {
  const [showBadge, setShowBadge] = useState(true);

  return (
    <IressStack gap="md">
      <IressStack gap="xs">
        <IressText element="p" textStyle="typography.body.md">
          Toggle the pill on the <strong>Address</strong> tab — the active
          indicator will resize and reposition to match the new tab width.
        </IressText>
        <IressButton alignSelf="start" onClick={() => setShowBadge((v) => !v)}>
          {showBadge ? 'Remove pill' : 'Add pill'}
        </IressButton>
      </IressStack>
      <IressTabSet {...args}>
        <IressTab
          key="address"
          label={
            showBadge ? (
              <>
                Address <IressPill ml="xs">3</IressPill>
              </>
            ) : (
              'Address'
            )
          }
        >
          Address information goes here
        </IressTab>
        <IressTab key="employment" label="Employment">
          Employment information goes here
        </IressTab>
        <IressTab key="history" label="History">
          Medical history goes here
        </IressTab>
      </IressTabSet>
    </IressStack>
  );
};
