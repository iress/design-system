import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Divider',
  description: 'Renders a horizontal or vertical line to visually separate content.',
  tags: ['layout', 'separator', 'visual'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
