import { IressCol, IressField, IressRow, IressRichSelect } from '@/main';

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

export const SelectAsyncMinLength = () => (
  <IressRow gutter="md">
    <IressCol>
      <IressField
        label="Default behavior (1 character)"
        htmlFor="default-select"
      >
        <IressRichSelect
          container={document.body}
          options={options}
          id="default-select"
          placeholder="Type any character..."
        />
      </IressField>
    </IressCol>
    <IressCol>
      <IressField
        label="Search requires 3+ characters"
        htmlFor="min-length-select"
      >
        <IressRichSelect
          container={document.body}
          options={options}
          id="min-length-select"
          minSearchLength={3}
          placeholder="Type at least 3 characters..."
        />
      </IressField>
    </IressCol>
  </IressRow>
);
