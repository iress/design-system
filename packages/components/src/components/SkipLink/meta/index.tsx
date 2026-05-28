import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'SkipLink',
  description: 'Provides a keyboard-accessible link to skip to the main content area.',
  tags: ['accessibility', 'navigation', 'link'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
