import { IressPanel } from '../../Panel';

export interface AutocompleteInstructionsProps {
  /**
   * The minimum number of characters required to search.
   */
  minSearchLength: number;
}

export const AutocompleteInstructions = ({
  minSearchLength,
}: AutocompleteInstructionsProps) => {
  const instructionText = `Type at least ${minSearchLength} character${minSearchLength === 1 ? '' : 's'} to search`;

  return <IressPanel>{instructionText}</IressPanel>;
};
