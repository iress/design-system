import { IressFilter, type IressFilterProps } from '@/main';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

export const FilterUsingAsync = (args: IressFilterProps) => (
  <IressFilter
    {...args}
    options={async (query: string) => {
      if (!query) return [];

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
