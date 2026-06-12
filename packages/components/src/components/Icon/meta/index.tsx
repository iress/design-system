import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the icon',
    query: <code>getByRole('img')</code>,
    testId: 'icon',
  },
];

export default {
  heading: 'Icon',
  description: 'Renders an SVG icon from the design system icon set.',
  tags: ['visual', 'symbol', 'graphic'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
