import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root wrapper element (a div with no role)',
    query: (
      <>
        No role-based query — use <code>getByTestId('field')</code>. To query
        the child input, use{' '}
        <code>getByRole('textbox', {'{'} name: '...' {'}'})</code> or{' '}
        <code>getByLabelText('...')</code>
      </>
    ),
    testId: 'field',
  },
  {
    part: 'label',
    description: 'The field label element',
    query: <code>getByText('...')</code>,
    testId: 'field__label',
  },
  {
    part: 'hint',
    description: 'The hint text below the label',
    query: <code>getByText('...')</code>,
    testId: 'field__hint',
  },
  {
    part: 'error',
    description: 'The error message container',
    query: <code>getByText('...')</code>,
    testId: 'field__error',
  },
];

export default {
  heading: 'Field',
  description: 'Wraps a form control with its label, description, and validation message.',
  tags: ['form', 'wrapper', 'validation'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressField } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Field',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/field.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Field/Field.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=field&title=[Field]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=field,enhancement&title=[Field]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-field--docs',
} satisfies ComponentMeta;
