import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the label',
    query: <code>getByText('...')</code>,
    testId: 'label',
  },
  {
    part: 'text',
    description: 'The label text content',
    testId: 'label__text',
  },
];

export default {
  heading: 'Label',
  description: 'Provides an accessible text label for a form control.',
  tags: ['form', 'text', 'accessibility'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
