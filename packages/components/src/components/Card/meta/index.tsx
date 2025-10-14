import { lazy } from 'react';

export default {
  heading: 'Card',
  href: '/?path=/docs/components-card--docs',
  tags: ['layout', 'container', 'content'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
