import { IressSelect, IressStack } from '@/main';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export function SelectSizing() {
  return (
    <IressStack gap="md">
      <IressSelect options={options} placeholder="2" width="2" aria-label="Select option (width: 2)" />
      <IressSelect options={options} placeholder="4" width="4" aria-label="Select option (width: 4)" />
      <IressSelect options={options} placeholder="6" width="6" aria-label="Select option (width: 6)" />
      <IressSelect options={options} placeholder="8" width="8" aria-label="Select option (width: 8)" />
      <IressSelect options={options} placeholder="10" width="10" aria-label="Select option (width: 10)" />
      <IressSelect options={options} placeholder="12" width="12" aria-label="Select option (width: 12)" />
      <IressSelect options={options} placeholder="16" width="16" aria-label="Select option (width: 16)" />
      <IressSelect options={options} placeholder="25%" width="25%" aria-label="Select option (width: 25%)" />
      <IressSelect options={options} placeholder="50%" width="50%" aria-label="Select option (width: 50%)" />
      <IressSelect options={options} placeholder="75%" width="75%" aria-label="Select option (width: 75%)" />
      <IressSelect options={options} placeholder="100%" width="100%" aria-label="Select option (width: 100%)" />
    </IressStack>
  );
}
