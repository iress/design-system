import { lazy } from 'react';

export default {
  heading: 'Panel',
  href: '/?path=/docs/components-panel--docs',
  tags: ['layout', 'container', 'content'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
