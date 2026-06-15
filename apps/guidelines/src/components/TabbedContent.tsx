import {
  useRef,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import {
  IressButton,
  IressTabSet,
  IressTab,
  IressIcon,
} from '@iress-oss/ids-components';

const TAB_HEADINGS = ['Design', 'Develop', 'Specifications'];

function getTabFromUrl(): string | undefined {
  const params = new URLSearchParams(window.location.hash.split('?')[1] ?? '');
  const tab = params.get('tab');
  if (
    tab &&
    TAB_HEADINGS.map((t) => t.toLowerCase()).includes(tab.toLowerCase())
  ) {
    return TAB_HEADINGS.find((t) => t.toLowerCase() === tab.toLowerCase());
  }
  return undefined;
}

/**
 * Renders MDX content with tabs when `## Design`, `## Develop`, or `## Specifications`
 * headings are detected. Content before any tab heading renders above the tabs.
 * Uses CSS visibility to preserve React component lifecycle in all sections.
 * Selected tab syncs with URL hash (e.g. ?tab=design).
 */
export function TabbedContent({
  children,
}: {
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabHostRef = useRef<HTMLDivElement | null>(null);
  const [tabs, setTabs] = useState<string[]>([]);
  const [storybookUrl, setStorybookUrl] = useState<string | undefined>();
  const [selectedTab, setSelectedTab] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean up previous run
    if (tabHostRef.current) {
      tabHostRef.current.remove();
      tabHostRef.current = null;
    }
    for (const child of Array.from(container.children) as HTMLElement[]) {
      delete child.dataset.tabSection;
      child.style.display = '';
    }

    const headings = Array.from(container.querySelectorAll(':scope > h2'));
    const tabHeadings = headings.filter((h) =>
      TAB_HEADINGS.includes(h.textContent?.trim() ?? ''),
    );

    if (tabHeadings.length === 0) {
      setTabs([]);
      setSelectedTab(undefined);
      return;
    }

    setTabs(tabHeadings.map((h) => h.textContent!.trim()));

    // Extract storybook URL from Metadata component's rendered link
    const sbLink = container.querySelector<HTMLAnchorElement>('a[href*="chromatic.com"]');
    setStorybookUrl(sbLink?.href);

    // Insert a host element for the tab bar before the first tab heading
    const host = document.createElement('div');
    container.insertBefore(host, tabHeadings[0]);
    tabHostRef.current = host;

    // Mark DOM sections with data attributes for CSS-based show/hide
    let currentTab: string | null = null;
    for (const child of Array.from(container.children) as HTMLElement[]) {
      if (
        child.tagName === 'H2' &&
        TAB_HEADINGS.includes(child.textContent?.trim() ?? '')
      ) {
        currentTab = child.textContent!.trim();
        child.dataset.tabSection = currentTab;
        child.style.display = 'none';
      } else if (currentTab) {
        child.dataset.tabSection = currentTab;
      }
    }

    // Set initial tab from URL or first tab
    const urlTab = getTabFromUrl();
    const idx = urlTab
      ? tabHeadings.findIndex((h) => h.textContent?.trim() === urlTab)
      : 0;
    setSelectedTab(idx >= 0 ? idx : 0);
  }, [children]);

  // Apply visibility based on selected tab
  useEffect(() => {
    const container = containerRef.current;
    if (!container || tabs.length === 0 || selectedTab === undefined) return;

    const activeTab = tabs[selectedTab];
    for (const child of Array.from(container.children) as HTMLElement[]) {
      const section = child.dataset.tabSection;
      if (section) {
        if (child.tagName === 'H2') {
          child.style.display = 'none'; // Always hide tab headings
        } else {
          child.style.display = section === activeTab ? '' : 'none';
        }
      }
    }
  }, [selectedTab, tabs]);

  // Listen for hash changes
  useEffect(() => {
    const onHashChange = () => {
      const urlTab = getTabFromUrl();
      if (urlTab && tabs.length > 0) {
        const idx = tabs.findIndex((t) => t === urlTab);
        if (idx >= 0) setSelectedTab(idx);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [tabs]);

  return (
    <>
      <div ref={containerRef}>{children}</div>
      {tabs.length > 0 &&
        tabHostRef.current &&
        createPortal(
          <IressTabSet
            selected={selectedTab}
            onChange={(e) => {
              const idx = e.index;
              setSelectedTab(idx);
              const tab = tabs[idx];
              if (tab) {
                const basePath = window.location.hash.split('?')[0];
                window.history.replaceState(
                  null,
                  '',
                  `${basePath}?tab=${tab.toLowerCase()}`,
                );
              }
            }}
            mt="spacing.4"
            append={
              storybookUrl && (
                <IressButton
                  href={storybookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  mode="muted"
                  append={<IressIcon name="menu_book" />}
                >
                  Storybook (API reference)
                </IressButton>
              )
            }
          >
            {tabs.map((tab) => (
              <IressTab key={tab} label={tab} />
            ))}
          </IressTabSet>,
          tabHostRef.current,
        )}
    </>
  );
}
