import { Link } from '@tanstack/react-router';
import type { SideNavItem } from '@iress-oss/ids-components';

export const NAV_ITEMS: SideNavItem[] = [
  {
    key: 'get-started',
    icon: 'rocket_launch',
    label: 'Get Started',
    href: '/get-started/develop',
    element: Link,
    children: [
      { key: 'develop', label: 'Develop', href: '/get-started/develop', element: Link },
    ],
  },
  {
    key: 'foundations',
    icon: 'foundation',
    label: 'Foundations',
    href: '/foundations/principles',
    element: Link,
    children: [
      { key: 'principles', label: 'Principles', href: '/foundations/principles', element: Link },
      { key: 'accessibility', label: 'Accessibility', href: '/foundations/accessibility', element: Link },
    ],
  },
  {
    key: 'components',
    icon: 'widgets',
    label: 'Components',
    href: '/components/button',
    element: Link,
    children: [
      { key: 'button', label: 'Button', href: '/components/button', element: Link },
      { key: 'input', label: 'Input', href: '/components/input', element: Link },
      { key: 'select', label: 'Select', href: '/components/select', element: Link },
    ],
  },
  {
    key: 'patterns',
    icon: 'dashboard',
    label: 'Patterns',
    href: '/patterns/form',
    element: Link,
    children: [
      { key: 'form', label: 'Form', href: '/patterns/form', element: Link },
    ],
  },
  {
    key: 'styling-props',
    icon: 'palette',
    label: 'Styling Props',
    href: '/styling-props/styling-props',
    element: Link,
  },
];
