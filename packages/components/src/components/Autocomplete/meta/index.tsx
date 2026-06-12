import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root wrapper element (no semantic role)',
    query: (
      <>
        No role-based query — use <code>getByTestId('autocomplete')</code>
      </>
    ),
    testId: 'autocomplete',
  },
  {
    part: 'input',
    description: 'The text input element',
    query: (
      <>
        <code>getByRole('combobox')</code> for the input, or{' '}
        <code>getByLabelText('...')</code> when inside a Field
      </>
    ),
    testId: 'autocomplete__input',
  },
  {
    part: 'menu',
    description: 'The suggestions menu',
    query: <code>getByRole('listbox')</code>,
    testId: 'autocomplete__menu',
  },
];

export default {
  heading: 'Autocomplete',
  description: 'Provides a text input with suggestions that filter as the user types.',
  tags: ['form', 'data-entry', 'search'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
