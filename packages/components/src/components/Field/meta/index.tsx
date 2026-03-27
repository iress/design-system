import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'label', description: 'The field label element' },
  { suffix: 'hint', description: 'The hint text below the label' },
  { suffix: 'error', description: 'The error message container' },
];

export default {
  heading: 'Field',
  href: '/?path=/docs/components-field--docs',
  tags: ['form', 'wrapper', 'validation'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
