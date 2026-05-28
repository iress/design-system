import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Stack',
  description: 'Lays out children vertically with consistent spacing between items.',
  tags: ['layout', 'spacing', 'container'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
