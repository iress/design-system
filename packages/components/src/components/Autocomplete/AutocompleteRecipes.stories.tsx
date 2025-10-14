import { disableArgTypes, withCustomSource } from '@iress-storybook/helpers';
import { AutocompleteSearchTable } from './mocks/AutocompleteSearchTable';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type AutocompleteSearchHookProps } from './hooks/useAutocompleteSearch';
import AutocompleteSearchTableSource from './mocks/AutocompleteSearchTable.tsx?raw';

type Story = StoryObj<AutocompleteSearchHookProps>;

export default {
  title: 'Components/Autocomplete/Recipes',
  component: AutocompleteSearchTable,
  argTypes: {
    ...disableArgTypes([
      'debounceThreshold',
      'initialOptions',
      'options',
      'query',
    ]),
  },
} as Meta<typeof AutocompleteSearchTable>;

export const Table: Story = {
  parameters: {
    ...withCustomSource(AutocompleteSearchTableSource),
  },
};
