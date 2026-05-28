import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Container',
  description: 'Provides a max-width wrapper to constrain content within a page layout.',
  tags: ['layout', 'wrapper', 'responsive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
