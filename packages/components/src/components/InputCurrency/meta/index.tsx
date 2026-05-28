import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'InputCurrency',
  description: 'Provides a text input formatted for entering monetary values.',
  tags: ['form', 'data-entry', 'currency'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
