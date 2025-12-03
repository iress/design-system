import { AutocompleteSearchTable } from './mocks/AutocompleteSearchTable';
import { type Meta, type StoryObj } from '@storybook/react';
import { type AutocompleteSearchHookProps } from './Autocomplete.types';
import AutocompleteSearchTableSource from './mocks/AutocompleteSearchTable.tsx?raw';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import { withCustomSource } from '@iress-oss/ids-storybook-sandbox';

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
