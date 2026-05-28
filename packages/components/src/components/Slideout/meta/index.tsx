import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'heading', description: 'The slideout heading' },
  {
    suffix: 'close-button__button',
    description: 'The close button',
  },
  { suffix: 'content', description: 'The slideout content area' },
  { suffix: 'footer', description: 'The slideout footer' },
];

export default {
  heading: 'Slideout',
  description: 'Displays supplementary content in a panel that slides in from the edge of the viewport.',
  tags: ['overlay', 'navigation', 'panel'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
