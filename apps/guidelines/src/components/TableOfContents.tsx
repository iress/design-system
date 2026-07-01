import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouterState } from '@tanstack/react-router';
import {
  IressMenu,
  IressMenuItem,
  IressMenuHeading,
  IressStack,
} from '@iress-oss/ids-components';
import './TableOfContents.css';

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

/**
 * Reads h2/h3 headings from the main content area and renders a
 * table of contents using IressMenu. Only visible on xl+ screens
 * and only on tabbed pages (Design/Develop tabs).
 */
export function TableOfContents() {
  const [headings, setHeadings] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [visibleTab, setVisibleTab] = useState<string>('');
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const rescanTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const getScrollContainer = useCallback((): HTMLElement | null => {
    const main = document.getElementById('main-content');
    if (!main) return null;
    let el = main.parentElement;
    while (el) {
      const style = getComputedStyle(el);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }, []);

  // Track active tab — empty string means no tabs on this page
  useEffect(() => {
    const updateTab = () => {
      const params = new URLSearchParams(
        window.location.hash.split('?')[1] ?? '',
      );
      const tab = params.get('tab');
      // Only show TOC on pages with Design/Develop/Specifications tabs
      const tabButtons = Array.from(document.querySelectorAll('[role="tab"]'));
      const hasComponentTabs = tabButtons.some(
        (btn) => btn.textContent?.trim() === 'Design' || btn.textContent?.trim() === 'Develop',
      );
      setVisibleTab(hasComponentTabs ? (tab ?? 'design') : '');
    };
    const timer = setTimeout(updateTab, 200);
    window.addEventListener('hashchange', updateTab);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', updateTab);
    };
  }, [pathname]);

  const scanHeadings = useCallback(() => {
    const main = document.getElementById('main-content');
    if (!main) return;

    const elements = main.querySelectorAll('h2[id], h3[id]');
    const entries: TocEntry[] = [];
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.style.display === 'none') return;
      if (htmlEl.closest('[style*="display: none"]')) return;
      entries.push({
        id: el.id,
        text: el.textContent?.trim() ?? '',
        level: el.tagName === 'H2' ? 2 : 3,
      });
    });
    setHeadings(entries);
    setActiveId(entries[0]?.id ?? '');
  }, []);

  // Extract headings after render, re-scan on tab change
  useEffect(() => {
    const timer = setTimeout(scanHeadings, 150);

    const main = document.getElementById('main-content');
    if (main) {
      const observer = new MutationObserver(() => {
        clearTimeout(rescanTimer.current);
        rescanTimer.current = setTimeout(scanHeadings, 50);
      });
      observer.observe(main, {
        attributes: true,
        subtree: true,
        attributeFilter: ['style'],
      });
      return () => {
        clearTimeout(timer);
        clearTimeout(rescanTimer.current);
        observer.disconnect();
      };
    }

    return () => clearTimeout(timer);
  }, [pathname, scanHeadings]);

  // Scroll spy
  useEffect(() => {
    if (headings.length === 0) return;

    const scrollContainer = getScrollContainer();
    if (!scrollContainer) return;

    const handleScroll = () => {
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const offset = 120;

      let current = headings[0]?.id ?? '';
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (el) {
          const elTop = el.getBoundingClientRect().top - containerTop;
          if (elTop <= offset) {
            current = heading.id;
          }
        }
      }
      if (current !== activeId) {
        setActiveId(current);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [headings, getScrollContainer]);

  const scrollToHeading = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      const scrollContainer = getScrollContainer();
      if (el && scrollContainer) {
        const containerTop = scrollContainer.getBoundingClientRect().top;
        const elTop = el.getBoundingClientRect().top - containerTop;
        scrollContainer.scrollBy({ top: elTop - 20, behavior: 'smooth' });
        setActiveId(id);
      }
    },
    [getScrollContainer],
  );

  // Only show on tabbed pages with Design or Develop active, and with enough headings
  if (!visibleTab || visibleTab === 'specifications') return null;
  if (headings.length < 2) return null;

  return (
      <IressStack gap="xs" py="md" px="sm" srOnly={{ base: true, xl: false }} className="toc">
        <IressMenuHeading>
          On this page
        </IressMenuHeading>
        <IressMenu fluid>
          {headings.map((heading) => (
            <IressMenuItem
              key={heading.id}
              selected={activeId === heading.id}
              onClick={() => scrollToHeading(heading.id)}
            >
              {heading.text}
            </IressMenuItem>
          ))}
        </IressMenu>
      </IressStack>
  );
}
