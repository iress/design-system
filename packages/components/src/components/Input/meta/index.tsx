import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Input',
  description: 'Renders a single-line text input for capturing user data.',
  tags: ['form', 'data-entry', 'text'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
