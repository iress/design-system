import { IressDropdownMenu } from '@/main';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

const INITIAL_VALUE = {
  label: 'Any character',
  value: undefined,
};

export const ControlledDropdownMenuAsync = () => (
  <IressDropdownMenu
    label="Select a Star Wars character"
    options={async (query: string) => {
      if (!query) return [];

      const data = await fetch(
        `https://swapi.py4e.com/api/people/?search=${query}`,
      ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

      const results = data.results.map((character: StarWarsCharacter) => ({
        label: character.name,
        value: character.name,
        meta: character.gender,
      }));

      return [INITIAL_VALUE, ...results];
    }}
    selected={INITIAL_VALUE}
  />
);
