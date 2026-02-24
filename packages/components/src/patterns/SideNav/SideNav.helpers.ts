import type { SideNavPanelItem, SideNavSideMenuGroup } from './SideNav';

/**
 * Type guard to check if a panel item is a group (has children).
 */
export const isSideNavGroup = (
  item: SideNavPanelItem,
): item is SideNavSideMenuGroup =>
  'children' in item && Array.isArray(item.children);
