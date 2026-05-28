import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'text', description: 'The label text content' },
];

export default {
  heading: 'Label',
  description: 'Provides an accessible text label for a form control.',
  tags: ['form', 'text', 'accessibility'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
