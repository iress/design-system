import { IressSideNav } from '@/main';

export function SideNavDefault() {
  return (
    <IressSideNav
      activeItemKey="hubs"
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          href: '/hubs',
          children: [
            { key: 'basic', label: 'Basic Details', href: '/hubs/basic-details' },
            { key: 'dependants', label: 'Dependants', href: '/hubs/dependants' },
            { key: 'employment', label: 'Employment', href: '/hubs/employment' },
          ],
          onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          href: '/portfolios',
          divider: true,
          children: [
            { key: 'holdings', label: 'Holdings', href: '/portfolios/holdings' },
            { key: 'transactions', label: 'Transactions', href: '/portfolios/transactions' },
          ],
          onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
        },
        {
          key: 'admin',
          label: 'Admin',
          icon: 'admin_panel_settings',
          href: '/admin',
        },
      ]}
    />
  );
}
