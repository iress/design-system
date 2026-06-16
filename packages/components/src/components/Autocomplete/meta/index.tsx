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
  import: "import { IressAutocomplete } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Autocomplete',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/autocomplete.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Autocomplete/Autocomplete.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=autocomplete&title=[Autocomplete]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=autocomplete,enhancement&title=[Autocomplete]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-autocomplete--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/autocomplete',
} satisfies ComponentMeta;
