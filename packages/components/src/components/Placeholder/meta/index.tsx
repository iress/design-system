import { lazy } from 'react';

export default {
  heading: 'Placeholder',
  href: '/?path=/docs/components-placeholder--docs',
  tags: ['layout', 'empty-state', 'content'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
