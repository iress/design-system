import {
  type FormControlValue,
  IressButton,
  IressCheckbox,
  IressCheckboxGroup,
  type IressCheckboxGroupProps,
  IressStack,
} from '@/main';
import { useState } from 'react';

export const CheckboxGroupUsingState = <T = FormControlValue,>(
  args: IressCheckboxGroupProps<T>,
) => {
  const [value, setValue] = useState<T[]>([]);

  return (
    <IressStack gap="sm">
      <IressCheckboxGroup
        {...args}
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
};
