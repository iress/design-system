'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMemo, useState, useCallback } from 'react';
import type { PageTree } from 'fumadocs-core/page-tree';
import type { ReactNode } from 'react';

// IDS components are loaded dynamically via the provider — import types only
// and use dynamic import for the actual components
import dynamic from 'next/dynamic';

/**
 * Section parsed from the page tree (grouped by separator).
 */
interface Section {
  key: string;
  label: string;
  icon: string; // Material Symbol name
  items: Array<{
    key: string;
    label: string;
    href: string;
    active: boolean;
  }>;
}

/** Map separator names to Material Symbol icon names. */
const SECTION_ICONS: Record<string, string> = {
  Components: 'widgets',
  Patterns: 'dashboard_customize',
  Guides: 'menu_book',
};

/**
 * Parse a fumadocs PageTree.Root into sections separated by separator nodes.
 */
function parsePageTree(tree: PageTree.Root, currentPath: string): Section[] {
  const sections: Section[] = [];
  let currentSection: Section | null = null;

  for (const node of tree.children) {
    if (node.type === 'separator') {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        key: node.name.toLowerCase().replace(/\s+/g, '-'),
        label: node.name,
        icon: SECTION_ICONS[node.name] ?? 'article',
        items: [],
      };
    } else if (node.type === 'page' && currentSection) {
      currentSection.items.push({
        key: node.url,
        label: typeof node.name === 'string' ? node.name : 'Page',
        href: node.url,
        active: currentPath === node.url,
      });
    } else if (node.type === 'folder' && currentSection) {
      // Add folder index page if it exists
      if (node.index) {
        currentSection.items.push({
          key: node.index.url,
          label: typeof node.index.name === 'string' ? node.index.name : 'Page',
          href: node.index.url,
          active: currentPath === node.index.url,
        });
      }
      // Add all child pages
      for (const child of node.children) {
        if (child.type === 'page') {
          currentSection.items.push({
            key: child.url,
            label: typeof child.name === 'string' ? child.name : 'Page',
            href: child.url,
            active: currentPath === child.url,
          });
        }
      }
    }
  }
  if (currentSection) sections.push(currentSection);

  return sections;
}

/**
 * Determine which section the current path belongs to.
 */
function findActiveSection(sections: Section[]): string | undefined {
  for (const section of sections) {
    if (section.items.some((item) => item.active)) {
      return section.key;
    }
  }
  return sections[0]?.key;
}

// Dynamically import IDS SideNav to avoid SSR issues
const SideNavDynamic = dynamic(
  () =>
    import('@iress-oss/ids-components').then((mod) => mod.IressSideNav) as any,
  { ssr: false },
);

export interface DocsSidebarProps {
  tree: PageTree.Root;
}

export function DocsSidebar({ tree }: DocsSidebarProps) {
  const pathname = usePathname();

  const sections = useMemo(
    () => parsePageTree(tree, pathname),
    [tree, pathname],
  );

  const initialActiveSection = useMemo(
    () => findActiveSection(sections),
    [sections],
  );

  const [activeSection, setActiveSection] = useState(
    initialActiveSection ?? sections[0]?.key ?? '',
  );

  const handleActiveItemChange = useCallback((key: string) => {
    setActiveSection(key);
  }, []);

  // Build railway items for IressSideNav
  const railItems = useMemo(
    () =>
      sections.map((section) => ({
        key: section.key,
        icon: section.icon,
        label: section.label,
        children: section.items.map((item) => ({
          key: item.key,
          label: item.label,
          href: item.href,
          element: Link,
          active: item.active,
        })),
      })),
    [sections],
  );

  if (railItems.length === 0) return null;

  return (
    <SideNavDynamic
      items={railItems}
      activeItemKey={activeSection}
      onActiveItemKeyChange={handleActiveItemChange}
      defaultExpanded
      width="260px"
      aria-label="Documentation navigation"
    />
  );
}
