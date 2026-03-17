import { lazy } from 'react';

export default {
  heading: 'Feedback',
  href: '/?path=/docs/patterns-feedback--docs',
  tags: ['feedback', 'alert', 'toast', 'modal', 'notification'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
