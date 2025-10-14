import { IressField, IressPanel, IressRichSelect } from '@/main';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

const options = async (query: string) => {
  if (!query) return [];

  if (query === 'error') {
    throw new Error();
  }

  const data = await fetch(
    `https://swapi.py4e.com/api/people/?search=${query}`,
  ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

  return data.results.map((character: StarWarsCharacter) => ({
    label: character.name,
    value: character.name,
    meta: character.gender,
  }));
};

export const SelectOptionsFooter = () => (
  <IressField
    label="Has a custom footer that uses render props"
    htmlFor="single-select"
  >
    <IressRichSelect
      container={document.body}
      options={options}
      id="single-select"
      renderOptionsFooter={({ results }) =>
        results.length > 0 && (
          <IressPanel noBorderRadius>Found {results.length} results</IressPanel>
        )
      }
    />
  </IressField>
);
