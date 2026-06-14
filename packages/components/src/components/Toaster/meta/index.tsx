import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description:
      'The visible toast list container (rendered inside the aria-live region)',
    testId: 'toaster',
  },
  {
    part: 'toast',
    description: 'An individual toast notification within the Toaster',
    query: <code>getByRole('alert')</code>,
    testId: 'toast',
  },
];

export default {
  heading: 'Toaster',
  description:
    'Manages and displays temporary toast notifications to the user.',
  tags: ['feedback', 'notification', 'toast'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
