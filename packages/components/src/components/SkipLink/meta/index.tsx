import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the skip link',
    query: <code>getByRole('link')</code>,
    testId: 'skip-link',
  },
];

export default {
  heading: 'SkipLink',
  description: 'Provides a keyboard-accessible link to skip to the main content area.',
  tags: ['accessibility', 'navigation', 'link'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
