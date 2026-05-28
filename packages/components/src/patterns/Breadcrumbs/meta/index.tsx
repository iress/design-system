import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Breadcrumbs',
  description: 'Shows the current location within a navigational hierarchy.',
  tags: ['navigation', 'breadcrumb', 'hierarchy'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
