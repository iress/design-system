import { disableArgTypes, withCustomSource } from '@iress-storybook/helpers';
import { AutocompleteSearchTable } from './mocks/AutocompleteSearchTable';
import { Meta, StoryObj } from '@storybook/react';
import { AutocompleteSearchHookProps } from './Autocomplete.types';
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
