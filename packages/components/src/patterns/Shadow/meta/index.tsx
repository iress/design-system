import { lazy } from 'react';

export default {
  heading: 'Shadow',
  href: '/?path=/docs/patterns-shadow--docs',
  tags: ['shadow', 'microfrontend'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
