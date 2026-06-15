import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';

export default {
  heading: 'Search & Selection',
  description:
    'Decision guide for choosing between Autocomplete, Select, DropdownMenu, InputPopover, and Popover.',
  tags: ['pattern', 'search', 'selection', 'decision'],
  Thumbnail: lazy(() => import('./Thumbnail')),
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/patterns/SearchSelection',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/patterns/search-selection.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/patterns/SearchSelection/SearchSelection.stories.tsx',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-search-selection--docs',
} satisfies ComponentMeta;
