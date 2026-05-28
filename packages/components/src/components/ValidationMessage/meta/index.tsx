import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'error', description: 'An individual error message' },
];

export default {
  heading: 'ValidationMessage',
  description: 'Displays a validation error or helper message associated with a form field.',
  tags: ['form', 'feedback', 'validation'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
