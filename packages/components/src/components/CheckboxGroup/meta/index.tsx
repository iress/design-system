import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'CheckboxGroup',
  description: 'Groups related checkboxes so users can select multiple options from a set.',
  tags: ['form', 'selection', 'group'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
