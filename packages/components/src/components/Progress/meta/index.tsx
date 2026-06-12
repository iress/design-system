import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the progress',
    query: (
      <>
        <code>getByRole('meter')</code> when min, max, and value are all
        provided, otherwise <code>getByRole('progressbar')</code>
      </>
    ),
    testId: 'progress',
  },
];

export default {
  heading: 'Progress',
  description: 'Visualises the completion status of a task or process as a progress bar.',
  tags: ['data-display', 'feedback', 'loading'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
