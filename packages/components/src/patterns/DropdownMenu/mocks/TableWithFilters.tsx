import {
  IressInline,
  IressStack,
  IressTable,
  type LabelValueMeta,
  IressButton,
  IressDivider,
  IressDropdownMenu,
} from '@/main';
import { useMemo, useState } from 'react';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

const INITIAL_FILTER = {
  name: {
    label: 'Any name',
    value: undefined,
  },
  status: {
    label: 'Any status',
    value: undefined,
  },
  location: {
    label: 'Any location',
    value: undefined,
  },
  gender: {
    label: 'Any gender',
    value: undefined,
  },
};

const USERS = [
  {
    user: 'farmboy',
    name: 'Luke Skywalker',
    location: 'Temple Island',
    gender: 'male',
    status: 'Inactive',
  },
  {
    user: 'nevertellmetheodds',
    name: 'Han Solo',
    location: 'unknown',
    gender: 'male',
    status: 'Inactive',
  },
  {
    user: 'goldenrod',
    name: 'C-3PO',
    location: 'Space',
    gender: 'n/a',
    status: 'Active',
  },
  {
    user: 'whistles',
    name: 'R2-D2',
    location: 'Space',
    gender: 'n/a',
    status: 'Active',
  },
  {
    user: 'princess',
    name: 'Leia Organa',
    location: 'unknown',
    gender: 'female',
    status: 'Inactive',
  },
];

const getUniqueValues = (key: string): LabelValueMeta[] => {
  const unique: string[] = [];

  USERS.forEach((user) => {
    const propVal = user[key as never];
    if (!unique.includes(propVal)) unique.push(propVal);
  });

  return unique.map((item: string) => ({
    label: item,
    value: item,
  }));
};

async function searchStarWarsCharacters(query: string) {
  const data = await fetch(
    `https://swapi.py4e.com/api/people/?search=${query}`,
  ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

  return data.results.map((character: StarWarsCharacter) => ({
    label: character.name,
    value: character.name,
    meta: character.gender,
  }));
}

export const TableWithFilters = () => {
  const [name, setName] = useState<LabelValueMeta>(INITIAL_FILTER.name);
  const [status, setStatus] = useState<LabelValueMeta>(INITIAL_FILTER.status);
  const [location, setLocation] = useState<LabelValueMeta>(
    INITIAL_FILTER.location,
  );
  const [gender, setGender] = useState<LabelValueMeta>(INITIAL_FILTER.gender);

  const columns = [
    { key: 'user', label: 'User' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'location', label: 'Location' },
    { key: 'gender', label: 'Gender' },
  ];

  const rows = useMemo(() => {
    const match = (filterItem?: LabelValueMeta, detail?: string): boolean => {
      if (!filterItem?.value) return true;

      return (filterItem?.value ?? filterItem?.label) == detail;
    };

    return USERS.filter(
      (user) =>
        match(name, user.name) &&
        match(status, user.status) &&
        match(location, user.location) &&
        match(gender, user.gender),
    );
  }, [name, status, location, gender]);

  const handleReset = () => {
    setName(INITIAL_FILTER.name);
    setStatus(INITIAL_FILTER.status);
    setLocation(INITIAL_FILTER.location);
    setGender(INITIAL_FILTER.gender);
  };

  return (
    <IressStack gap="md">
      <IressInline gap="md">
        <IressDropdownMenu
          label="Filter by name"
          options={searchStarWarsCharacters}
          selected={name}
          onChange={setName}
          onReset={() => setName(INITIAL_FILTER.name)}
          visibleResetButton
        />
        <IressDropdownMenu
          label="Filter by status"
          options={getUniqueValues('status')}
          selected={status}
          onChange={setStatus}
          onReset={() => setStatus(INITIAL_FILTER.status)}
        />
        <IressDropdownMenu
          label="Filter by location"
          options={getUniqueValues('location')}
          selected={location}
          onChange={setLocation}
          onReset={() => setLocation(INITIAL_FILTER.location)}
        />
        <IressDropdownMenu
          label="Filter by gender"
          options={getUniqueValues('gender')}
          selected={gender}
          onChange={setGender}
          onReset={() => setGender(INITIAL_FILTER.gender)}
        />
        <IressButton onClick={handleReset} mode="quaternary">
          Reset filters
        </IressButton>
      </IressInline>
      <IressDivider />
      <IressTable
        caption="System users"
        columns={columns}
        rows={rows}
        empty={'No results found'}
      />
    </IressStack>
  );
};
