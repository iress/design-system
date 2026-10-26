import { lazy } from 'react';

export default {
  heading: 'Avatar',
  description:
    'Avatars display user identity in a circular frame, with optional badge and type indicators.',
  href: '/?path=/docs/components-avatar--docs',
  tags: ['data-display', 'user', 'profile', 'initials'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
