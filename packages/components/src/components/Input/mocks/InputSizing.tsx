import { IressInput, IressStack } from '@/main';

export function InputSizing() {
  return (
    <IressStack gap="md">
      <IressInput width="2" placeholder="2" />
      <IressInput width="4" placeholder="4" />
      <IressInput width="6" placeholder="6" />
      <IressInput width="8" placeholder="8" />
      <IressInput width="10" placeholder="10" />
      <IressInput width="12" placeholder="12" />
      <IressInput width="16" placeholder="16" />
      <IressInput width="25%" placeholder="25%" />
      <IressInput width="50%" placeholder="50%" />
      <IressInput width="75%" placeholder="75%" />
      <IressInput width="100%" placeholder="100%" />
    </IressStack>
  );
}
