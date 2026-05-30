import { IressIcon, IressInput, IressStack } from '@/main';

export function InputSlots() {
  return (
    <IressStack gap="md">
      <IressInput prepend={<IressIcon name="search" />} placeholder="Prepend slot" />
      <IressInput append={<IressIcon name="search" />} placeholder="Append slot" />
      <IressInput prepend={<IressIcon name="search" />} placeholder="Prepend slot" />
      <IressInput append={<IressIcon name="search" />} placeholder="Append slot" />
    </IressStack>
  );
}
