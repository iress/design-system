import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Toaster',
  description: 'Manages and displays temporary toast notifications to the user.',
  tags: ['feedback', 'notification', 'toast'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
