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
  IressTooltip,
} from '@iress-oss/ids-components';
import { Search } from '../components/Search';
import { AiPanel } from '../components/AiPanel';
import { TableOfContents } from '../components/TableOfContents';
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
            <IressTooltip tooltipText="Visit us on GitHub">
              <a
                href="https://github.com/iress/design-system"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (iress/design-system)"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </IressTooltip>
            <AiPanel />
          </IressInline>
        </IressInline>
        <IressDivider />
      </IressStyled>
      <IressInline noWrap style={{ height: `calc(100vh - ${navHeight}px)` }}>
        <IressSideNav items={navItems} activeItemKey={activeKey} defaultExpanded />
        <IressContainer py="md" flex="1" scrollable="y">
          <IressInline noWrap gap="md" verticalAlign="top">
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
            <TableOfContents />
          </IressInline>
        </IressContainer>
      </IressInline>
    </>
  );
}
