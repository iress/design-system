import { IressInput, IressSideNav, IressText } from '@/main';

export function SideNavWithHeaderFooter() {
  return (
    <IressSideNav
      activeItemKey="portfolios"
      defaultExpanded
      header={
        <IressInput
          type="search"
          placeholder="Search navigation..."
          variant="search"
        />
      }
      footer={<IressText element="small">v2.4.1</IressText>}
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          href: '/hubs',
          children: [
            { key: 'basic', label: 'Basic Details', href: '/hubs/basic-details' },
            { key: 'dependants', label: 'Dependants', href: '/hubs/dependants' },
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
