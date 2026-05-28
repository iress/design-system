import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'prepend', description: 'The prepend slot container' },
  { suffix: 'topRight', description: 'The top-right slot container' },
  { suffix: 'media', description: 'The media slot container' },
  { suffix: 'heading', description: 'The card heading container' },
  { suffix: 'body', description: 'The card body container' },
];

export default {
  heading: 'Card',
  description: 'Groups related content and actions into a contained, visually distinct surface.',
  tags: ['layout', 'container', 'content'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
