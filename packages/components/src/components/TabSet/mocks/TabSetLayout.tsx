import { IressPanel, IressStack, IressTab, IressTabSet, IressText } from '@/main';

export function TabSetLayout() {
  return (
    <IressStack gap="md">
      <IressPanel>
        <IressText element="h2">top-left</IressText>
        <IressTabSet layout="top-left">
          <IressTab label="Address">Address information goes here</IressTab>
          <IressTab label="Employment">Employment information goes here</IressTab>
          <IressTab label="History">Medical history goes here</IressTab>
        </IressTabSet>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">top-center</IressText>
        <IressTabSet layout="top-center">
          <IressTab label="Address">Address information goes here</IressTab>
          <IressTab label="Employment">Employment information goes here</IressTab>
          <IressTab label="History">Medical history goes here</IressTab>
        </IressTabSet>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">top-right</IressText>
        <IressTabSet layout="top-right">
          <IressTab label="Address">Address information goes here</IressTab>
          <IressTab label="Employment">Employment information goes here</IressTab>
          <IressTab label="History">Medical history goes here</IressTab>
        </IressTabSet>
      </IressPanel>
    </IressStack>
  );
}
