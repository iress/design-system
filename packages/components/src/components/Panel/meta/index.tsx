import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Panel',
  description: 'Provides a sectioned container for grouping related content with an optional heading.',
  tags: ['layout', 'container', 'content'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
