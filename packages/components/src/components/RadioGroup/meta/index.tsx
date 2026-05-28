import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'RadioGroup',
  description: 'Groups related radio buttons so users can select one option from a set.',
  tags: ['form', 'selection', 'group'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
