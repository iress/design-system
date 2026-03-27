import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'checkboxMark', description: 'The visual checkbox indicator' },
];

export default {
  heading: 'Checkbox',
  href: '/?path=/docs/components-checkbox--docs',
  tags: ['form', 'selection', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
