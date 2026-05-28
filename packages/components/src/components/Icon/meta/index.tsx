import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Icon',
  description: 'Renders an SVG icon from the design system icon set.',
  tags: ['visual', 'symbol', 'graphic'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
