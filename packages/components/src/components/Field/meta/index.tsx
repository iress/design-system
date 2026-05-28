import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'label', description: 'The field label element' },
  { suffix: 'hint', description: 'The hint text below the label' },
  { suffix: 'error', description: 'The error message container' },
];

export default {
  heading: 'Field',
  description: 'Wraps a form control with its label, description, and validation message.',
  tags: ['form', 'wrapper', 'validation'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
