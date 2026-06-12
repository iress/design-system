import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the tag',
    query: (
      <>
        <code>getByRole('button', {'{'} name: '...' {'}'})</code> when
        interactive, or <code>getByRole('link', {'{'} name: '...' {'}'})</code>{' '}
        when rendered as a link
      </>
    ),
    testId: 'tag',
  },
  {
    part: 'delete button',
    description: 'The tag delete button',
    query: <code>getByRole('button', {'{'} name: 'Remove item' {'}'})</code>,
    testId: 'tag__delete-button__button',
  },
];

export default {
  heading: 'Tag',
  description: 'Displays a compact label for categorisation, filtering, or metadata.',
  tags: ['data-display', 'label', 'categorization'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
