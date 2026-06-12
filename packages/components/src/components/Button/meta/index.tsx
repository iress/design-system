import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the button',
    query: <code>getByRole('button', {'{'} name: '...' {'}'})</code>,
    testId: 'button',
  },
];

export default {
  heading: 'Button',
  description: 'A clickable element used to perform an action.',
  tags: ['form', 'action', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
