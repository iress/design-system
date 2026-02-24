import { useCallback, useEffect, useState } from 'react';
import { useControlledState } from '@/hooks/useControlledState';
import type { SideNavItem, SideNavPanelItem } from '../SideNav';
import type { ReactNode } from 'react';

export interface UseSideNavStateProps {
  /** Array of navigation items defining the rail. */
  items: SideNavItem[];

  /**
   * Key of the active rail item.
   * Sets the initial selection and can be updated externally.
   * Internal state is maintained for click-driven navigation.
   */
  activeItemKey?: string;

  /** Callback fired when the active item changes via rail click. */
  onActiveItemKeyChange?: (key: string) => void;

  /** Override: content for the side panel (same type as children). */
  sideMenuItems?: SideNavPanelItem[];

  /** Override: label for the side panel heading. */
  sideMenuLabel?: ReactNode;

  /** Controlled expanded state. */
  expanded?: boolean;

  /** Default expanded state (uncontrolled). */
  defaultExpanded?: boolean;

  /** Callback when expanded state changes. */
  onExpandedChange?: (expanded: boolean) => void;
}

export interface UseSideNavStateReturn {
  /** Whether the panel is currently expanded. */
  isExpanded: boolean;

  /** Toggle the expanded state. */
  toggleExpanded: () => void;

  /** The resolved active item key. */
  resolvedActiveItemKey: string | undefined;

  /** Set the active item key (used by rail click handlers). */
  setActiveItemKey: (key: string) => void;

  /** The currently active item from items array. */
  activeItem: SideNavItem | undefined;

  /** Content entries to render in the side panel. */
  panelContent: SideNavPanelItem[];

  /** Resolved label for the side panel heading. */
  panelLabel: ReactNode;

  /** Whether the panel has any content to show. */
  hasPanelContent: boolean;
}

/**
 * Internal hook that manages the SideNav expanded/collapsed state
 * and resolves which content to display in the side panel.
 */
export const useSideNavState = ({
  items,
  activeItemKey,
  onActiveItemKeyChange,
  sideMenuItems,
  sideMenuLabel,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
}: UseSideNavStateProps): UseSideNavStateReturn => {
  // --- Expanded state (controlled / uncontrolled via useControlledState) ---
  const {
    value: isExpanded,
    setValue: setIsExpanded,
    isControlled: isExpandedControlled,
  } = useControlledState<boolean>({
    component: 'IressSideNav',
    defaultValue: defaultExpanded,
    onChange: onExpandedChange as (selected?: boolean) => void,
    propName: 'expanded',
    value: expanded,
  });

  // --- Active item key (Expander-style: useState + useEffect sync) ---
  const [internalActiveItemKey, setInternalActiveItemKey] =
    useState(activeItemKey);

  useEffect(() => {
    setInternalActiveItemKey(activeItemKey);
  }, [activeItemKey]);

  // Find the active item
  const activeItem = internalActiveItemKey
    ? items.find((item) => item.key === internalActiveItemKey)
    : undefined;

  // Resolve panel content: sideMenuItems overrides children
  const panelContent: SideNavPanelItem[] =
    sideMenuItems ?? activeItem?.children ?? [];

  // Resolve panel label
  const panelLabel = sideMenuLabel ?? activeItem?.label;

  const hasPanelContent = panelContent.length > 0;

  const setActiveItemKey = useCallback(
    (key: string) => {
      setInternalActiveItemKey(key);
      onActiveItemKeyChange?.(key);

      // Auto-expand when selecting an item with children (uncontrolled only)
      if (!isExpandedControlled) {
        const item = items.find((i) => i.key === key);
        const itemHasContent =
          (sideMenuItems ?? item?.children ?? []).length > 0;
        if (itemHasContent) {
          setIsExpanded(true);
        }
      }
    },
    [
      items,
      sideMenuItems,
      isExpandedControlled,
      setIsExpanded,
      onActiveItemKeyChange,
    ],
  );

  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded, setIsExpanded]);

  return {
    isExpanded: !!isExpanded,
    toggleExpanded,
    resolvedActiveItemKey: internalActiveItemKey,
    setActiveItemKey,
    activeItem,
    panelContent,
    panelLabel,
    hasPanelContent,
  };
};
