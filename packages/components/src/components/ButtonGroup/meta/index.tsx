import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'label', description: 'The group label element' },
];

export default {
  heading: 'ButtonGroup',
  description: 'Groups related buttons together with consistent spacing and alignment.',
  tags: ['form', 'action', 'group'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
