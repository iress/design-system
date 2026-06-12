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
} satisfies ComponentMeta;
