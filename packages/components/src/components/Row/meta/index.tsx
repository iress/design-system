import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Row',
  description: 'Arranges children in a horizontal row within a grid or flex layout.',
  tags: ['layout', 'grid', 'container'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
