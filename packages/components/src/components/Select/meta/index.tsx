import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the select',
    query: (
      <>
        <code>getByRole('combobox')</code> for the activator, or{' '}
        <code>getByLabelText('...')</code> when inside a Field
      </>
    ),
    testId: 'select',
  },
  {
    part: 'hidden input',
    description: 'The hidden form input',
    testId: 'select__hidden-input',
  },
  {
    part: 'select',
    description: 'The native select element (when native mode is enabled)',
    testId: 'select__select',
  },
  {
    part: 'menu group',
    description: 'A grouped options heading',
    testId: 'select__menu-group',
  },
  {
    part: 'menu',
    description: 'The options dropdown (visible when open)',
    query: <code>getByRole('listbox')</code>,
    testId: 'select__menu',
  },
  {
    part: 'menu item',
    description: 'An individual menu option',
    query: <code>getByRole('option', {'{'} name: '...' {'}'})</code>,
    testId: 'select__menu-item',
  },
  {
    part: 'tag',
    description: 'A selected value tag (multi-select)',
    testId: 'select__tag',
  },
];

export default {
  heading: 'Select',
  description: 'Renders a dropdown select input for choosing one option from a list.',
  tags: ['form', 'data-entry', 'dropdown', 'rich-select'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressSelect } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Select',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/select.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Select/Select.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=select&title=[Select]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=select,enhancement&title=[Select]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-select--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/select',
  additionalProps: [
    {
      name: 'minSearchLength',
      type: 'number',
      description: 'Minimum number of characters required before search results are shown.',
      condition: 'Only when options is a function (async)',
    },
  ],
  figma: 'https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-23433',
} satisfies ComponentMeta;
