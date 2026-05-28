import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Text',
  description: 'Renders styled text with consistent typography from the design system.',
  tags: ['typography', 'content', 'display'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
