import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'text', description: 'The label text content' },
];

export default {
  heading: 'Label',
  href: '/?path=/docs/components-label--docs',
  tags: ['form', 'text', 'accessibility'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
