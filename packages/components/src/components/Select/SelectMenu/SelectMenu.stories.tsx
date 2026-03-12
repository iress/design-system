import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSelectMenu, type IressSelectMenuProps } from './SelectMenu';
import { MOCK_LABEL_VALUES } from '../../../mocks/generateLabelValues';
import { addToStorybookCategory } from '@iress-oss/ids-storybook-config';
import { reactNodeArgType, stylingProps } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressSelectMenu>;

export default {
  title: 'Components/Select/Subcomponents/Menu',
  component: IressSelectMenu,
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
    ...addToStorybookCategory<IressSelectMenuProps>('Menu props', [
      'changeOnBlur',
      'fluid',
      'id',
      'layout',
      'noWrap',
    ]),
  },
} as Meta<typeof IressSelectMenu>;

export const Results: Story = {
  args: {
    heading: 'Search results',
    items: MOCK_LABEL_VALUES,
    noResults: 'No results found',
    fluid: true,
  },
};

export const NoResults: Story = {
  args: {
    ...Results.args,
    items: [],
  },
};

export const GroupedOptions: Story = {
  args: {
    heading: 'Select a food',
    items: [
      {
        label: 'Fruits',
        children: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
          { label: 'Strawberry', value: 'strawberry' },
        ],
      },
      {
        label: 'Vegetables',
        children: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Broccoli', value: 'broccoli' },
          { label: 'Spinach', value: 'spinach' },
        ],
      },
      {
        label: 'Grains',
        children: [
          { label: 'Rice', value: 'rice' },
          { label: 'Wheat', value: 'wheat' },
          { label: 'Oats', value: 'oats' },
        ],
      },
    ],
    fluid: true,
  },
};

export const GroupedWithSelection: Story = {
  args: {
    ...GroupedOptions.args,
    selected: { label: 'Apple', value: 'apple' },
  },
};

export const GroupedWithDividers: Story = {
  args: {
    heading: 'Select a food',
    items: [
      {
        label: 'Fruits',
        divider: true,
        children: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ],
      },
      {
        label: 'Vegetables',
        divider: true,
        children: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Broccoli', value: 'broccoli' },
        ],
      },
    ],
    fluid: true,
  },
};

export const MixedFlatAndGrouped: Story = {
  args: {
    heading: 'Select an option',
    items: [
      { label: 'All items', value: 'all' },
      { label: 'None', value: 'none' },
      {
        label: 'Favorites',
        divider: true,
        children: [
          { label: 'Favorite 1', value: 'fav1' },
          { label: 'Favorite 2', value: 'fav2' },
        ],
      },
      {
        label: 'Recent',
        children: [
          { label: 'Recent 1', value: 'rec1' },
          { label: 'Recent 2', value: 'rec2' },
        ],
      },
    ],
    fluid: true,
  },
};
