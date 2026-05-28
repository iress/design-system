import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Inline',
  description: 'Lays out children horizontally with consistent spacing between items.',
  tags: ['layout', 'spacing', 'alignment'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
