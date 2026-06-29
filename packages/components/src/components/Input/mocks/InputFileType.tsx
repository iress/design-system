import { IressField, IressInput } from '@/main';

export function InputFileType() {
  return (
    <IressField label="File upload">
      <IressInput type="file" required />
    </IressField>
  );
}
