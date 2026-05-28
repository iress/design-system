import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Contextual Menu',
  description: 'Displays a context-sensitive menu of actions triggered by user interaction.',
  tags: ['menu', 'actions', 'overflow'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
