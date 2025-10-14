import {
  IressInline,
  IressStack,
  IressTable,
  LabelValueMeta,
  IressFilter,
  IressFilterProps,
  IressButton,
  IressDivider,
} from '@/main';
import { useMemo, useState } from 'react';
import { searchStarWarsCharacters } from '@/mocks/starWars';

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

export const FilterSearchTable = (args: IressFilterProps<false>) => {
  const [name, setName] = useState<LabelValueMeta | undefined>();
  const [status, setStatus] = useState<LabelValueMeta | undefined>();
  const [location, setLocation] = useState<LabelValueMeta | undefined>();
  const [gender, setGender] = useState<LabelValueMeta | undefined>(undefined);

  const columns = [
    { key: 'user', label: 'User' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'location', label: 'Location' },
    { key: 'gender', label: 'Gender' },
  ];

  const rows = useMemo(() => {
    const match = (filterItem?: LabelValueMeta, detail?: string): boolean =>
      (filterItem?.value ?? filterItem?.label) === detail;

    return USERS.filter(
      (user) =>
        match(name, user.name) &&
        match(status, user.status) &&
        match(location, user.location) &&
        match(gender, user.gender),
    );
  }, [name, status, location, gender]);

  const handleReset = () => {
    setName(undefined);
    setStatus(undefined);
    setLocation(undefined);
    setGender(undefined);
  };

  return (
    <IressStack gap="md">
      <IressInline gap="md">
        <IressFilter
          {...args}
          label="Name"
          options={searchStarWarsCharacters}
          value={name}
          onChange={setName}
          onReset={() => setName(undefined)}
        />
        <IressFilter
          {...args}
          label="Status"
          options={getUniqueValues('status')}
          value={status}
          onChange={setStatus}
          onReset={() => setStatus(undefined)}
        />
        <IressFilter
          {...args}
          label="Location"
          options={getUniqueValues('location')}
          value={location}
          onChange={setLocation}
          onReset={() => setLocation(undefined)}
        />
        <IressFilter
          {...args}
          label="Gender"
          options={getUniqueValues('gender')}
          value={gender}
          onChange={setGender}
          onReset={() => setGender(undefined)}
        />
        <IressButton onClick={handleReset} mode="tertiary">
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
