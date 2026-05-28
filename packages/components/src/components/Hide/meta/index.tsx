import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Hide',
  description: 'Conditionally hides content based on responsive breakpoints.',
  tags: ['layout', 'responsive', 'utility'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
