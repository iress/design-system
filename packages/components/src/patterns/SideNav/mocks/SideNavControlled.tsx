import { useState } from 'react';
import {
  IressCol,
  IressContainer,
  IressRow,
  IressSideNav,
  IressText,
  type SideNavItem,
} from '@/main';

const items: SideNavItem[] = [
  {
    key: 'hubs',
    icon: 'hub',
    label: 'Hubs',
    children: [
      { key: 'basic', label: 'Basic Details', href: '/hubs/basic-details' },
      { key: 'dependants', label: 'Dependants', href: '/hubs/dependants' },
      { key: 'individual', label: 'Individual', href: '/hubs/individual' },
    ],
  },
  {
    key: 'portfolios',
    icon: 'bar_chart',
    label: 'Portfolios',
    divider: true,
    children: [
      {
        key: 'returns',
        label: 'Investment Returns',
        href: '/portfolios/returns',
      },
      { key: 'strategy', label: 'Strategy', href: '/portfolios/strategy' },
      { key: 'holdings', label: 'Holdings', href: '/portfolios/holdings' },
    ],
  },
  {
    key: 'admin',
    icon: 'admin_panel_settings',
    label: 'Admin',
    href: '/admin',
  },
];

export const SideNavControlled = () => {
  const [activeKey, setActiveKey] = useState('hubs');
  const [expanded, setExpanded] = useState(true);

  return (
    <IressContainer fluid stretch px="spacing.2">
      <IressRow stretch gutter="spacing.4">
        <IressSideNav
          items={items}
          activeItemKey={activeKey}
          onActiveItemKeyChange={setActiveKey}
          expanded={expanded}
          onExpandedChange={setExpanded}
        />
        <IressCol p="spacing.4">
          <IressText>
            <h2>Active section: {activeKey}</h2>
            <p>
              Expanded: <strong>{expanded ? 'Yes' : 'No'}</strong>
            </p>
          </IressText>
        </IressCol>
      </IressRow>
    </IressContainer>
  );
};
