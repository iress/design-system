import { lazy } from 'react';

export default {
  heading: 'Side Nav',
  href: '/?path=/docs/patterns-sidenav--docs',
  tags: ['navigation', 'sidebar', 'rail', 'menu'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
