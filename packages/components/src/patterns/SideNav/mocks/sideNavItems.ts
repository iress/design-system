import type { SideNavItem, SideNavPanelItem } from '../SideNav';

/**
 * Default mock navigation items with flat children (simple mode).
 * Modelled after the Figma prototype: Hubs, My Links, Portfolios, Research, Admin.
 */
export const MOCK_SIDE_NAV_ITEMS: SideNavItem[] = [
  {
    key: 'hubs',
    icon: 'hub',
    label: 'Hubs',
    href: '/hubs',
    onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
    children: [
      { key: 'basic', label: 'Basic Details', href: '/hubs/basic-details' },
      { key: 'dependants', label: 'Dependants', href: '/hubs/dependants' },
      { key: 'individual', label: 'Individual', href: '/hubs/individual' },
      { key: 'employment', label: 'Employment', href: '/hubs/employment' },
      { key: 'tax', label: 'Tax Details', href: '/hubs/tax' },
    ],
  },
  {
    key: 'links',
    icon: 'share',
    label: 'My Links',
    href: '/links',
    onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
    children: [
      { key: 'entities', label: 'Entities', href: '/links/entities' },
      { key: 'tax', label: 'Tax Details', href: '/links/tax' },
      { key: 'compliance', label: 'Compliance', href: '/links/compliance' },
    ],
  },
  {
    key: 'portfolios',
    icon: 'bar_chart',
    label: 'Portfolios',
    href: '/portfolios',
    onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
    divider: true,
    children: [
      {
        key: 'returns',
        label: 'Investment Returns',
        href: '/portfolios/returns',
      },
      { key: 'strategy', label: 'Strategy', href: '/portfolios/strategy' },
      { key: 'holdings', label: 'Holdings', href: '/portfolios/holdings' },
      {
        key: 'transactions',
        label: 'Transactions',
        href: '/portfolios/transactions',
      },
    ],
  },
  {
    key: 'research',
    icon: 'search',
    label: 'Research',
    href: '/research',
    onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
    children: [
      { key: 'reports', label: 'Reports', href: '/research/reports' },
      { key: 'analysis', label: 'Analysis', href: '/research/analysis' },
    ],
  },
  {
    key: 'admin',
    icon: 'admin_panel_settings',
    label: 'Admin',
    href: '/admin',
    onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
    // No children — direct navigation only
  },
];

/**
 * Mock items with grouped children — each rail item's children
 * contain MenuGroup drawers (Screenshot 1 from Figma).
 */
export const MOCK_GROUPED_ITEMS: SideNavItem[] = [
  {
    key: 'hubs',
    icon: 'hub',
    label: 'Hubs',
    href: '/hubs',
    onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
    children: [
      {
        key: 'client-details',
        label: 'Client Details',
        active: true,
        children: [
          {
            key: 'basic',
            label: 'Basic Details',
            href: '/hubs/basic-details',
          },
          {
            key: 'dependants',
            label: 'Dependants',
            href: '/hubs/dependants',
          },
          {
            key: 'individual',
            label: 'Individual',
            href: '/hubs/individual',
          },
        ],
      },
      {
        key: 'financial',
        label: 'Financial Information',
        children: [
          { key: 'income', label: 'Income', href: '/hubs/income' },
          { key: 'expenses', label: 'Expenses', href: '/hubs/expenses' },
          { key: 'assets', label: 'Assets', href: '/hubs/assets' },
        ],
      },
    ],
  },
  {
    key: 'links',
    icon: 'share',
    label: 'My Links',
    href: '/links',
    onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
  },
  {
    key: 'portfolios',
    icon: 'bar_chart',
    label: 'Portfolios',
    href: '/portfolios',
    onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
    divider: true,
  },
  {
    key: 'research',
    icon: 'search',
    label: 'Research',
    onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
    href: '/research',
  },
  {
    key: 'admin',
    icon: 'admin_panel_settings',
    label: 'Admin',
    href: '/admin',
    onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
  },
];

/**
 * Rail-only items without children (for override stories).
 */
export const MOCK_RAIL_ONLY_ITEMS: SideNavItem[] = [
  { key: 'hubs', icon: 'hub', label: 'Hubs', href: '/hubs' },
  { key: 'links', icon: 'share', label: 'My Links', href: '/links' },
  {
    key: 'portfolios',
    icon: 'bar_chart',
    label: 'Portfolios',
    href: '/portfolios',
    divider: true,
  },
  { key: 'research', icon: 'search', label: 'Research', href: '/research' },
  {
    key: 'admin',
    icon: 'admin_panel_settings',
    label: 'Admin',
    href: '/admin',
  },
];

/**
 * Mock sideMenuItems override with grouped content.
 */
export const MOCK_SIDE_MENU_OVERRIDE: SideNavPanelItem[] = [
  {
    key: 'client-details',
    label: 'Client Details',
    active: true,
    children: [
      { key: 'basic', label: 'Basic Details', href: '/hubs/basic-details' },
      { key: 'dependants', label: 'Dependants', href: '/hubs/dependants' },
      {
        key: 'individual',
        label: 'Individual',
        href: '/hubs/individual',
        active: true,
      },
    ],
  },
  {
    key: 'financial',
    label: 'Financial Information',
    children: [
      { key: 'income', label: 'Income', href: '/hubs/income' },
      { key: 'expenses', label: 'Expenses', href: '/hubs/expenses' },
      { key: 'assets', label: 'Assets', href: '/hubs/assets' },
    ],
  },
];
