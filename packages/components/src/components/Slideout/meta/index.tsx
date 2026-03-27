import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

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
  href: '/?path=/docs/components-slideout--docs',
  tags: ['overlay', 'navigation', 'panel'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
