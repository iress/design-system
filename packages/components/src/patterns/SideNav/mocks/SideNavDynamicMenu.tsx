import { useState } from 'react';
import { IressSideNav, type SideNavPanelItem } from '@/main';

const menusBySection: Record<string, SideNavPanelItem[]> = {
  hubs: [
    {
      key: 'client-details',
      label: 'Client Details',
      active: true,
      children: [
        { key: 'basic', label: 'Basic Details', href: '/hubs/basic-details' },
        { key: 'dependants', label: 'Dependants', href: '/hubs/dependants' },
        { key: 'individual', label: 'Individual', href: '/hubs/individual' },
      ],
    },
    {
      key: 'financial',
      label: 'Financial Information',
      children: [
        { key: 'employment', label: 'Employment', href: '/hubs/employment' },
        { key: 'tax', label: 'Tax Details', href: '/hubs/tax' },
      ],
    },
  ],
  portfolios: [
    {
      key: 'investments',
      label: 'Investments',
      active: true,
      children: [
        { key: 'holdings', label: 'Holdings', href: '/portfolios/holdings' },
        { key: 'returns', label: 'Returns', href: '/portfolios/returns' },
      ],
    },
    {
      key: 'trading',
      label: 'Trading',
      children: [
        { key: 'orders', label: 'Orders', href: '/portfolios/orders' },
        { key: 'history', label: 'History', href: '/portfolios/history' },
      ],
    },
  ],
};

const labels: Record<string, string> = {
  hubs: 'Client Hub',
  portfolios: 'Portfolio Manager',
};

export function SideNavDynamicMenu() {
  const [activeKey, setActiveKey] = useState('hubs');

  return (
    <IressSideNav
      activeItemKey={activeKey}
      expanded
      numbered
      width="300px"
      sideMenuLabel={labels[activeKey] ?? 'Navigation'}
      sideMenuItems={menusBySection[activeKey]}
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          onClick: () => {
            setActiveKey('hubs');
          },
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          divider: true,
          onClick: () => {
            setActiveKey('portfolios');
          },
        },
        {
          key: 'admin',
          label: 'Admin',
          icon: 'admin_panel_settings',
          href: '/admin',
          onClick: () => {
            setActiveKey('admin');
          },
        },
      ]}
    />
  );
}
