import { IressSideNav } from '@/main';

export function SideNavGrouped() {
  return (
    <IressSideNav
      activeItemKey="hubs"
      defaultExpanded
      numbered
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          href: '/hubs',
          children: [
            {
              key: 'personal',
              label: 'Personal',
              active: true,
              children: [
                { key: 'basic', label: 'Basic Details', href: '/hubs/basic-details' },
                { key: 'dependants', label: 'Dependants', href: '/hubs/dependants' },
              ],
            },
            {
              key: 'financial',
              label: 'Financial',
              children: [
                { key: 'employment', label: 'Employment', href: '/hubs/employment' },
                { key: 'tax', label: 'Tax Details', href: '/hubs/tax' },
              ],
            },
          ],
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          href: '/portfolios',
          children: [
            { key: 'holdings', label: 'Holdings', href: '/portfolios/holdings' },
            { key: 'transactions', label: 'Transactions', href: '/portfolios/transactions' },
          ],
        },
      ]}
    />
  );
}
