import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  {
    suffix: 'delete-button__button',
    description: 'The tag delete button',
  },
];

export default {
  heading: 'Tag',
  href: '/?path=/docs/components-tag--docs',
  tags: ['data-display', 'label', 'categorization'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
