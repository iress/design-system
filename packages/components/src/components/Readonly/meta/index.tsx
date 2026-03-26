import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'input', description: 'The hidden input element' },
];

export default {
  heading: 'Readonly',
  href: '/?path=/docs/components-readonly--docs',
  tags: ['form', 'display', 'data'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
