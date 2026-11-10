import {
  IressButton,
  IressCheckbox,
  IressCheckboxGroup,
  IressStack,
} from '@/main';
import { useState } from 'react';

export function CheckboxGroupUsingState() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <IressStack gap="sm">
      <IressCheckboxGroup
        value={value}
        onChange={(newValue) => setValue(newValue ?? [])}
      >
        <IressCheckbox value="lemon-drizzle">Lemon drizzle</IressCheckbox>
        <IressCheckbox value="victoria-sponge">Victoria Sponge</IressCheckbox>
        <IressCheckbox value="carrot-cake">Carrot Cake</IressCheckbox>
      </IressCheckboxGroup>
      <IressButton onClick={() => setValue([])}>Clear</IressButton>
    </IressStack>
  );
}
