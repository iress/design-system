import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  {
    suffix: 'delete-button__button',
    description: 'The tag delete button',
  },
];

export default {
  heading: 'Tag',
  description: 'Displays a compact label for categorisation, filtering, or metadata.',
  tags: ['data-display', 'label', 'categorization'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
