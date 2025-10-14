import { lazy } from 'react';

export default {
  heading: 'Loading',
  href: '/?path=/docs/patterns-loading--docs',
  tags: ['loading', 'skeleton', 'progress'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
