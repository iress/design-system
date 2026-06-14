import { useRef, useEffect, useState, type ReactNode } from 'react';
import { IressTabSet, IressTab } from '@iress-oss/ids-components';

const TAB_HEADINGS = ['Design', 'Develop', 'Specifications'];

interface Section {
  title: string;
  content: HTMLElement[];
}

/**
 * Renders MDX content with tabs when `## Design`, `## Develop`, or `## Specifications`
 * headings are detected. Content before any tab heading renders above the tabs.
 */
export function TabbedContent({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<Section[] | null>(null);
  const [preamble, setPreamble] = useState<HTMLElement[]>([]);

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
  }, []);

  if (sections === null) {
    // No tab headings found or first render — show as-is
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
      <IressTabSet panelStyle={{ py: 'spacing.4' }}>
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
