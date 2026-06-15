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
  IressSkipLink,
  IressAlert,
} from '@iress-oss/ids-components';
import { Search } from '../components/Search';
import { AiPanel } from '../components/AiPanel';
import { NAV_ITEMS } from '../nav';
import {
  Component,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export const Route = createRootRoute({
  component: RootLayout,
});

class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <IressAlert
          status="danger"
          onClose={() => this.setState({ error: null })}
        >
          Something went wrong loading this page. Try navigating to a different
          page.
        </IressAlert>
      );
    }
    return this.props.children;
  }
}

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeKey =
    NAV_ITEMS.find((item) => pathname.startsWith(`/${item.key}`))?.key ??
    NAV_ITEMS[0].key;

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    children: item.children?.map((child) => ({
      ...child,
      active: 'href' in child && child.href === pathname,
    })),
  }));
  const [navHeight, setNavHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (headerRef.current) {
      setNavHeight(headerRef.current.offsetHeight + 10);
    }
  }, []);

  return (
    <>
      <IressSkipLink href="#main-content">Skip to content</IressSkipLink>
      <IressStyled element="header" ref={headerRef}>
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
        <IressSideNav items={navItems} activeItemKey={activeKey} defaultExpanded />
        <IressContainer py="md" flex="1" scrollable="y">
          <IressStyled
            element="main"
            id="main-content"
            flex="1"
            focusable="true"
            data-pagefind-body
            tabIndex={-1}
            p="sm"
            mx="-sm"
            borderRadius="radius.system.button"
          >
            <IressText>
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </IressText>
          </IressStyled>
        </IressContainer>
      </IressInline>
    </>
  );
}
