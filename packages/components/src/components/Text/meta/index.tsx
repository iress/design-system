import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the text',
    query: <code>getByText('...')</code>,
    testId: 'text',
  },
];

export default {
  heading: 'Text',
  description: 'Renders styled text with consistent typography from the design system.',
  tags: ['typography', 'content', 'display'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
