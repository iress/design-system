import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the image',
    query: <code>getByRole('img')</code>,
    testId: 'image',
  },
];

export default {
  heading: 'Image',
  description: 'Renders a responsive image with optional fallback and loading behaviour.',
  tags: ['media', 'visual', 'content'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
