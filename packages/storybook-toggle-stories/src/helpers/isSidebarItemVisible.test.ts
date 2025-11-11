import { ALWAYS_VISIBLE_TAG } from '../constants';
import { isSidebarItemVisible } from './isSidebarItemVisible';

describe('isSidebarItemVisible', () => {
  it('returns true if stories are always visible', () => {
    expect(isSidebarItemVisible({ type: 'story' }, true)).toBe(true);
    expect(isSidebarItemVisible({ type: 'docs' }, true)).toBe(true);
    expect(
      isSidebarItemVisible({ type: 'story', tags: [ALWAYS_VISIBLE_TAG] }, true),
    ).toBe(true);
  });

  it('returns false if stories are not visible, unless they are docs or tagged appropriately', () => {
    expect(isSidebarItemVisible({ type: 'story' })).toBe(false);
    expect(isSidebarItemVisible({ type: 'docs' })).toBe(true);
    expect(
      isSidebarItemVisible({ type: 'story', tags: [ALWAYS_VISIBLE_TAG] }),
    ).toBe(true);
  });
});
