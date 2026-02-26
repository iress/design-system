'use client';

import { usePathname } from 'next/navigation';
import { useBreadcrumb } from 'fumadocs-core/breadcrumb';
import type { PageTree } from 'fumadocs-core/page-tree';
import { Fragment } from 'react';
import Link from 'next/link';

export interface DocsBreadcrumbProps {
  tree: PageTree.Root;
}

export function DocsBreadcrumb({ tree }: DocsBreadcrumbProps) {
  const pathname = usePathname();
  const items = useBreadcrumb(pathname, tree);

  if (items.length === 0) return null;

  return (
    <nav className="docs-breadcrumb" aria-label="Breadcrumb">
      <Link href="/docs">Docs</Link>
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="separator" aria-hidden>
            ›
          </span>
          {item.url ? (
            <Link href={item.url}>{item.name}</Link>
          ) : (
            <span>{item.name}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
