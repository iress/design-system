import type { IressSideNavPanelItem, SideNavSideMenuGroup } from './SideNav';

/**
 * Type guard to check if a panel item is a group (has children).
 */
export const isSideNavGroup = (
  item: IressSideNavPanelItem,
): item is SideNavSideMenuGroup =>
  'children' in item && Array.isArray(item.children);
