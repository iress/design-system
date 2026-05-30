import { IressInput, IressStack } from '@/main';

export function InputTypes() {
  return (
    <IressStack gap="md">
      <IressInput type="text" placeholder="Text input" />
      <IressInput type="color" placeholder="Color input" />
      <IressInput type="date" placeholder="Date input" />
      <IressInput type="datetime-local" placeholder="Datetime-local input" />
      <IressInput type="email" placeholder="Email input" />
      <IressInput type="file" placeholder="File input" />
      <IressInput type="month" placeholder="Month input" />
      <IressInput type="number" placeholder="Number input" />
      <IressInput type="password" placeholder="Password input" />
      <IressInput type="search" placeholder="Search input" />
      <IressInput type="tel" placeholder="Tel input" />
      <IressInput type="time" placeholder="Time input" />
      <IressInput type="url" placeholder="Url input" />
      <IressInput type="week" placeholder="Week input" />
    </IressStack>
  );
}
