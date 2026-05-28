import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'input', description: 'The hidden input element' },
];

export default {
  heading: 'Readonly',
  description: 'Displays a form value in a non-editable, read-only format.',
  tags: ['form', 'display', 'data'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
