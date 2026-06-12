import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the spinner',
    query: <code>getByLabelText('...')</code>,
    testId: 'spinner',
  },
];

export default {
  heading: 'Spinner',
  description: 'Displays an animated loading indicator to signal an ongoing process.',
  tags: ['feedback', 'loading', 'indicator'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
