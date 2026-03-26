import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'label', description: 'The toggle label element' },
  { suffix: 'button__button', description: 'The toggle switch button' },
];

export default {
  heading: 'Toggle',
  href: '/?path=/docs/components-toggle--docs',
  tags: ['form', 'switch', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
