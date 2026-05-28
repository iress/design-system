import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Filter',
  description: 'Presents a list of actions or options revealed by a trigger button.',
  tags: ['data-display', 'filtering', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
