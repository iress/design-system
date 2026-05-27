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
  IressImage,
  IressDivider,
  IressInline,
} from '@iress-oss/ids-components';
import { Search } from '../components/Search';
import { AiPanel } from '../components/AiPanel';
import { NAV_ITEMS } from '../nav';
import { useState } from 'react';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeKey =
    NAV_ITEMS.find((item) => pathname.startsWith(`/${item.key}`))?.key ??
    NAV_ITEMS[0].key;
  const [navHeight, setNavHeight] = useState(0);

  return (
    <>
      <IressStyled
        element="header"
        ref={(element) => setNavHeight(element?.offsetHeight ?? 0)}
      >
        <IressInline
          px="spacing.3"
          p="spacing.2"
          gap="spacing.2"
          horizontalAlign="between"
        >
          <IressInline gap="spacing.2" verticalAlign="middle">
            <IressImage
              src={`${import.meta.env.BASE_URL}ids-logo-wealth.png`}
              alt="Iress Design System"
              maxWidth={125}
            />
            <IressText element="h2" srOnly>
              Guidelines
            </IressText>
          </IressInline>
          <IressInline gap="spacing.2" verticalAlign="middle">
            <Search />
            <AiPanel />
          </IressInline>
        </IressInline>
        <IressDivider />
      </IressStyled>
      <IressInline noWrap style={{ height: `calc(100vh - ${navHeight}px)` }}>
        <IressSideNav items={NAV_ITEMS} activeItemKey={activeKey} />
        <IressContainer py="md" flex="1" scrollable="y">
          <IressStyled
            element="main"
            flex="1"
            focusable="true"
            data-pagefind-body
            tabIndex={-1}
            p="sm"
            mx="-sm"
            borderRadius="radius.system.button"
          >
            <IressText>
              <Outlet />
            </IressText>
          </IressStyled>
        </IressContainer>
      </IressInline>
    </>
  );
}
