import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Image',
  description: 'Renders a responsive image with optional fallback and loading behaviour.',
  tags: ['media', 'visual', 'content'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
