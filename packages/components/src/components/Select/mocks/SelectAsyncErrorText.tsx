import {
  IressAlert,
  IressCol,
  IressField,
  IressRow,
  IressSelect,
} from '@/main';

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
    throw new Error('Failed to fetch results');
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

export const SelectAsyncErrorText = () => (
  <IressRow gutter="md">
    <IressCol>
      <IressField label="Custom error (ReactNode)" htmlFor="error-node">
        <IressSelect
          container={document.body}
          options={options}
          id="error-node"
          placeholder='Type "error" to see the custom error'
          errorText={
            <IressAlert status="danger" mb="none">
              Something went wrong. Please try again later.
            </IressAlert>
          }
        />
      </IressField>
    </IressCol>
    <IressCol>
      <IressField label="Custom error (render function)" htmlFor="error-fn">
        <IressSelect
          container={document.body}
          options={options}
          id="error-fn"
          placeholder='Type "error" to see the render function'
          errorText={(err) => (
            <IressAlert status="warning" mb="none" variant="full-width">Error: {String(err)}</IressAlert>
          )}
        />
      </IressField>
    </IressCol>
  </IressRow>
);
