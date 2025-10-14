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

export const SelectAsync = () => (
  <IressRow gutter="md">
    <IressCol>
      <IressField label="Single select" htmlFor="single-select">
        <IressRichSelect
          container={document.body}
          options={options}
          id="single-select"
        />
      </IressField>
    </IressCol>
    <IressCol>
      <IressField label="Multi-select" htmlFor="multi-select">
        <IressRichSelect
          container={document.body}
          options={options}
          id="multi-select"
          multiSelect
        />
      </IressField>
    </IressCol>
  </IressRow>
);
