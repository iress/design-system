import { IressAutocomplete, type IressAutocompleteProps } from '@/main';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

export const AutocompleteUsingAsync = (args: IressAutocompleteProps) => (
  <IressAutocomplete
    {...args}
    options={async (query: string) => {
      if (query === 'error') {
        throw new Error('This is an error');
      }

      const data = await fetch(
        `https://swapi.py4e.com/api/people/?search=${query}`,
      ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

      return data.results.map((character: StarWarsCharacter) => ({
        label: character.name,
        value: character.name,
        meta: character.gender,
      }));
    }}
  />
);
