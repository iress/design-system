import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { IressStack, IressText, IressContainer, IressSideNav } from '@iress-oss/ids-components';
import { Search } from '../components/Search';
import { AiPanel } from '../components/AiPanel';
import { NAV_ITEMS } from '../nav';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeKey = NAV_ITEMS.find((item) =>
    pathname.startsWith(`/${item.key}`)
  )?.key;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <IressSideNav items={NAV_ITEMS} activeItemKey={activeKey} />
      <IressStack gap="0" style={{ flex: 1, overflow: 'auto' }}>
        <header>
          <IressContainer paddingY="sm">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <IressText variant="heading" size="sm">IDS Guidelines</IressText>
              <Search />
            </div>
          </IressContainer>
        </header>
        <main style={{ flex: 1 }}>
          <IressContainer paddingY="lg">
            <Outlet />
          </IressContainer>
        </main>
      </IressStack>
      <AiPanel />
    </div>
  );
}
