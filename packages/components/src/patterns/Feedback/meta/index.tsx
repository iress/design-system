import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Feedback',
  description: 'Displays transient feedback messages to communicate the result of an action.',
  tags: ['feedback', 'alert', 'toast', 'modal', 'notification'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
