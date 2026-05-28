import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Spinner',
  description: 'Displays an animated loading indicator to signal an ongoing process.',
  tags: ['feedback', 'loading', 'indicator'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
