import { ALWAYS_VISIBLE_TAG } from '../constants';

export const isSidebarItemVisible = (
  item: {
    type: 'story' | 'docs';
    tags?: string[];
  },
  visibleStories?: boolean,
) => {
  const isAlwaysVisible =
    // eslint-disable-next-line sonarjs/argument-type
    item.type !== 'story' || !!item.tags?.includes(ALWAYS_VISIBLE_TAG);
  return visibleStories ? true : isAlwaysVisible;
};
