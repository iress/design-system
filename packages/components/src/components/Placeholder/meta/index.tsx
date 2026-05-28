import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Placeholder',
  description: 'Renders a visual placeholder to represent future or missing content.',
  tags: ['layout', 'empty-state', 'content'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
