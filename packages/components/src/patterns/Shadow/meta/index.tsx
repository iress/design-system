import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Shadow',
  description:
    'Applies an elevated shadow effect to visually separate content layers.',
  tags: ['shadow', 'microfrontend'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
