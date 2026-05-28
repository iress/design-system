import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Progress',
  description: 'Visualises the completion status of a task or process as a progress bar.',
  tags: ['data-display', 'feedback', 'loading'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
