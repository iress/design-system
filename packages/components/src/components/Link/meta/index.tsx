import { lazy } from 'react';

export default {
  heading: 'Link',
  href: '/?path=/docs/components-link--docs',
  tags: ['navigation', 'text', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
