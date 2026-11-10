import { IressInput, IressStack } from '@/main';

export function InputModes() {
  return (
    <IressStack gap="md">
      <IressInput inputMode="text" placeholder="Text mode" />
      <IressInput inputMode="tel" placeholder="Tel mode" />
      <IressInput inputMode="url" placeholder="Url mode" />
      <IressInput inputMode="email" placeholder="Email mode" />
      <IressInput inputMode="numeric" placeholder="Numeric mode" />
      <IressInput inputMode="decimal" placeholder="Decimal mode" />
      <IressInput inputMode="search" placeholder="Search mode" />
    </IressStack>
  );
}
