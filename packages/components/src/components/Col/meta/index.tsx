import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Col',
  description: 'Defines a column within a grid row layout.',
  tags: ['layout', 'grid', 'container'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
