import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Form',
  description: 'Manages form state, validation, and submission for a group of input fields.',
  tags: ['form', 'crud'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
