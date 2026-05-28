import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Loading',
  description: 'Displays a loading state to indicate content is being fetched or processed.',
  tags: ['loading', 'skeleton', 'progress'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
