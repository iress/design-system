import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Pill',
  description: 'Displays a small, rounded badge for categorisation or status indication.',
  tags: ['data-display', 'status', 'indicator', 'badge'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
