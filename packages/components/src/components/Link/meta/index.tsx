import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the link',
    query: <code>getByRole('link')</code>,
    testId: 'link',
  },
];

export default {
  heading: 'Link',
  description: 'Renders a navigational anchor styled consistently with the design system.',
  tags: ['navigation', 'text', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
