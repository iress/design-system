import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'input', description: 'The underlying radio input element' },
  { suffix: 'radioMark', description: 'The visual radio indicator' },
];

export default {
  heading: 'Radio',
  href: '/?path=/docs/components-radio--docs',
  tags: ['form', 'selection', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
