import React from 'react';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

export async function searchStarWarsCharacters(query: string) {
  const data = await fetch(
    `https://swapi.py4e.com/api/people/?search=${query}`,
  ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

  return data.results.map((character) => ({
    label: character.name,
    value: character.name,
    meta: character.gender,
  }));
}

export const SCOPE: {
  React: typeof React;
  searchStarWarsCharacters: typeof searchStarWarsCharacters;
} = {
  React,
  ...React,
  searchStarWarsCharacters,
};

export default SCOPE;
