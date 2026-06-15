import { useRef, useEffect, useState, type ReactNode } from 'react';
import { IressTabSet, IressTab } from '@iress-oss/ids-components';

const TAB_HEADINGS = ['Design', 'Develop', 'Specifications'];

interface Section {
  title: string;
  content: HTMLElement[];
}

function getTabFromUrl(): string | undefined {
  const params = new URLSearchParams(window.location.hash.split('?')[1] ?? '');
  const tab = params.get('tab');
  if (tab && TAB_HEADINGS.map((t) => t.toLowerCase()).includes(tab.toLowerCase())) {
    return TAB_HEADINGS.find((t) => t.toLowerCase() === tab.toLowerCase());
  }
  return undefined;
}

/**
 * Renders MDX content with tabs when `## Design`, `## Develop`, or `## Specifications`
 * headings are detected. Content before any tab heading renders above the tabs.
 * Selected tab syncs with URL hash (e.g. #design, #develop, #specifications).
 */
export function TabbedContent({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<Section[] | null>(null);
  const [preamble, setPreamble] = useState<HTMLElement[]>([]);
  const [selectedTab, setSelectedTab] = useState<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const headings = Array.from(container.querySelectorAll('h2'));
    const tabHeadings = headings.filter((h) =>
      TAB_HEADINGS.includes(h.textContent?.trim() ?? ''),
    );

    if (tabHeadings.length === 0) {
      setSections(null);
      return;
    }

    const pre: HTMLElement[] = [];
    const tabs: Section[] = [];
    let currentSection: Section | null = null;

    for (const child of Array.from(container.children) as HTMLElement[]) {
      if (
        child.tagName === 'H2' &&
        TAB_HEADINGS.includes(child.textContent?.trim() ?? '')
      ) {
        currentSection = { title: child.textContent!.trim(), content: [] };
        tabs.push(currentSection);
      } else if (currentSection) {
        currentSection.content.push(child);
      } else {
        pre.push(child);
      }
    }

    setPreamble(pre);
    setSections(tabs);

    // Set initial tab from URL
    const urlTab = getTabFromUrl();
    if (urlTab) {
      const idx = tabs.findIndex((t) => t.title === urlTab);
      if (idx >= 0) setSelectedTab(idx);
    }
  }, []);

  // Listen for hash changes
  useEffect(() => {
    const onHashChange = () => {
      const urlTab = getTabFromUrl();
      if (urlTab && sections) {
        const idx = sections.findIndex((t) => t.title === urlTab);
        if (idx >= 0) setSelectedTab(idx);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [sections]);

  if (sections === null) {
    return (
      <div ref={containerRef}>
        {children}
      </div>
    );
  }

  return (
    <>
      <div>
        {preamble.map((el, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: el.outerHTML }} />
        ))}
      </div>
      <IressTabSet
        selected={selectedTab}
        onChange={(e) => {
          const idx = e.index;
          setSelectedTab(idx);
          const tab = sections[idx];
          if (tab) {
            const basePath = window.location.hash.split('?')[0];
            window.history.replaceState(null, '', `${basePath}?tab=${tab.title.toLowerCase()}`);
          }
        }}
      >
        {sections.map((section) => (
          <IressTab key={section.title} label={section.title}>
            <div
              dangerouslySetInnerHTML={{
                __html: section.content.map((el) => el.outerHTML).join(''),
              }}
            />
          </IressTab>
        ))}
      </IressTabSet>
    </>
  );
}
