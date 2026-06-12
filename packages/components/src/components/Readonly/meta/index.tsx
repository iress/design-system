import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the readonly',
    testId: 'readonly',
  },
  {
    part: 'input',
    description: 'The hidden input element',
    testId: 'readonly__input',
  },
];

export default {
  heading: 'Readonly',
  description: 'Displays a form value in a non-editable, read-only format.',
  tags: ['form', 'display', 'data'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
