import { useState } from 'react';
import { IressField, IressInput, IressStack, IressToggle } from '@/main';

export function FieldSupplementary() {
  const [error, setError] = useState<string | undefined>();

  return (
    <IressStack gap="spacing.5">
      <IressToggle
        onChange={(checked) =>
          setError(checked ? 'This field is required' : undefined)
        }
        checked={error !== undefined}
      >
        Show error
      </IressToggle>
      <IressField
        label="First name"
        supplementary="I only show if there is no error"
        error={error}
      >
        <IressInput id="name" name="input1" required type="text" />
      </IressField>
    </IressStack>
  );
}
