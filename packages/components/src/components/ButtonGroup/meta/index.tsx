import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'label', description: 'The group label element' },
];

export default {
  heading: 'ButtonGroup',
  href: '/?path=/docs/components-buttongroup--docs',
  tags: ['form', 'action', 'group'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
