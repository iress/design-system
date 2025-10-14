import { lazy } from 'react';

export default {
  heading: 'Image',
  href: '/?path=/docs/components-image--docs',
  tags: ['media', 'visual', 'content'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
