import {
  IressInline,
  IressStack,
  IressTable,
  type LabelValueMeta,
  IressFilter,
  type IressFilterProps,
  IressButton,
  IressDivider,
} from '@/main';
import { useMemo, useState } from 'react';
import { searchStarWarsCharacters } from '@/mocks/starWars';

const toArray = <T,>(item?: T | T[]): T[] => {
  if (Array.isArray(item)) {
    return item;
  }

  return item !== undefined ? [item] : [];
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

export const FilterSearchTable = (args: IressFilterProps) => {
  const [name, setName] = useState<LabelValueMeta[]>([]);
  const [status, setStatus] = useState<LabelValueMeta[]>([]);
  const [location, setLocation] = useState<LabelValueMeta[]>([]);
  const [gender, setGender] = useState<LabelValueMeta[]>([]);

  const columns = [
    { key: 'user', label: 'User' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'location', label: 'Location' },
    { key: 'gender', label: 'Gender' },
  ];

  const rows = useMemo(() => {
    const match = (filter: LabelValueMeta[], detail: string): boolean =>
      filter.length === 0 ||
      filter.some(
        (filterItem) => (filterItem.value ?? filterItem.label) === detail,
      );

    return USERS.filter(
      (user) =>
        match(name, user.name) &&
        match(status, user.status) &&
        match(location, user.location) &&
        match(gender, user.gender),
    );
  }, [name, status, location, gender]);

  const handleReset = () => {
    setName([]);
    setStatus([]);
    setLocation([]);
    setGender([]);
  };

  return (
    <IressStack gutter={IressStack.Gutter.Md}>
      <IressInline gutter={IressInline.Gutter.Md}>
        <IressFilter
          {...args}
          label="Name"
          options={searchStarWarsCharacters}
          value={name}
          onChange={(value) => setName(toArray(value))}
          onReset={() => setName([])}
        />
        <IressFilter
          {...args}
          label="Status"
          options={getUniqueValues('status')}
          value={status}
          onChange={(value) => setStatus(toArray(value))}
          onReset={() => setStatus([])}
        />
        <IressFilter
          {...args}
          label="Location"
          options={getUniqueValues('location')}
          value={location}
          onChange={(value) => setLocation(toArray(value))}
          onReset={() => setLocation([])}
        />
        <IressFilter
          {...args}
          label="Gender"
          options={getUniqueValues('gender')}
          value={gender}
          onChange={(value) => setGender(toArray(value))}
          onReset={() => setGender([])}
        />
        <IressButton onClick={handleReset} mode={IressButton.Mode.Tertiary}>
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
