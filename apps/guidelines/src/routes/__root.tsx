import {
  createRootRoute,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import {
  IressStack,
  IressText,
  IressContainer,
  IressSideNav,
  IressStyled,
} from '@iress-oss/ids-components';
import { Search } from '../components/Search';
import { AiPanel } from '../components/AiPanel';
import { NAV_ITEMS } from '../nav';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeKey =
    NAV_ITEMS.find((item) => pathname.startsWith(`/${item.key}`))?.key ??
    NAV_ITEMS[0].key;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <IressSideNav items={NAV_ITEMS} activeItemKey={activeKey} />
      <IressStack gap="none" style={{ flex: 1, overflow: 'auto' }}>
        <header>
          <IressContainer py="sm">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <IressText element="h1">IDS Guidelines</IressText>
              <Search />
            </div>
          </IressContainer>
        </header>
        <IressContainer py="md">
          <IressStyled
            element="main"
            flex="1"
            focusable="true"
            data-pagefind-body
            tabIndex={-1}
            p="sm"
            borderRadius="radius.system.button"
          >
            <IressText>
              <Outlet />
            </IressText>
          </IressStyled>
        </IressContainer>
      </IressStack>
      <AiPanel />
    </div>
  );
}
