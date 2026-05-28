import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Skeleton',
  description: 'Renders placeholder shapes to indicate content is loading.',
  tags: ['loading', 'placeholder', 'feedback'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
