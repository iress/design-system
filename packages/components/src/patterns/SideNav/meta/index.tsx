import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Side Nav',
  description: 'Provides a vertical navigation menu typically used in application sidebars.',
  tags: ['navigation', 'sidebar', 'rail', 'menu'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
