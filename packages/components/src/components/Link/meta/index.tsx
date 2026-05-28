import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Link',
  description: 'Renders a navigational anchor styled consistently with the design system.',
  tags: ['navigation', 'text', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
