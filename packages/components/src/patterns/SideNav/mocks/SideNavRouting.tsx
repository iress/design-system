import { IressSideNav, type SideNavItem } from '@/main';
import { type HTMLAttributes, forwardRef } from 'react';

/**
 * This could be the `Link` component from `react-router-dom`, Next.js, or any other routing library.
 * It receives `href` and renders as an anchor internally.
 */
const Link = forwardRef<
  HTMLAnchorElement,
  HTMLAttributes<HTMLAnchorElement> & { href: string }
>(({ children, className, href, ...restProps }, ref) => (
  <a className={className} href={href} ref={ref} {...restProps}>
    {children}
  </a>
));

const items: SideNavItem[] = [
  {
    key: 'hubs',
    icon: 'hub',
    label: 'Hubs',
    href: '/hubs',
    element: Link,
    children: [
      {
        key: 'basic',
        label: 'Basic Details',
        href: '/hubs/basic-details',
        element: Link,
      },
      {
        key: 'dependants',
        label: 'Dependants',
        href: '/hubs/dependants',
        element: Link,
      },
      {
        key: 'individual',
        label: 'Individual',
        href: '/hubs/individual',
        element: Link,
      },
    ],
  },
  {
    key: 'portfolios',
    icon: 'bar_chart',
    label: 'Portfolios',
    href: '/portfolios',
    element: Link,
    divider: true,
    children: [
      {
        key: 'returns',
        label: 'Investment Returns',
        href: '/portfolios/returns',
        element: Link,
      },
      {
        key: 'strategy',
        label: 'Strategy',
        href: '/portfolios/strategy',
        element: Link,
      },
    ],
  },
  {
    key: 'admin',
    icon: 'admin_panel_settings',
    label: 'Admin',
    href: '/admin',
    element: Link,
  },
];

export const SideNavRouting = () => (
  <IressSideNav items={items} activeItemKey="hubs" defaultExpanded />
);
