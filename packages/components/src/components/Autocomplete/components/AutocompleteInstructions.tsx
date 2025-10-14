import { type AutocompleteInstructionsProps } from '../Autocomplete.types';
import { IressPanel } from '../../Panel';

export const AutocompleteInstructions = ({
  minSearchLength,
  styles,
}: AutocompleteInstructionsProps) => {
  const instructionText = `Type at least ${minSearchLength} character${minSearchLength === 1 ? '' : 's'} to search`;

  return (
    <IressPanel className={styles?.instructions ?? ''}>
      {instructionText}
    </IressPanel>
  );
};
