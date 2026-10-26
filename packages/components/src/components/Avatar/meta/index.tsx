import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Avatar',
  description:
    'Avatars display user identity in a circular frame, with optional badge and type indicators.',
  storybook:
    'https://main--69166895eb243715fcd0d241.chromatic.com/?path=/docs/components-avatar--docs',
  tags: ['data-display', 'user', 'profile', 'initials'],
  testMeta: [
    {
      part: 'avatar',
      description:
        'The avatar image, named by its initials or accessible label',
      query: "getByRole('img', { name: /baron-cohen/i })",
      testId: 'avatar',
    },
  ],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
