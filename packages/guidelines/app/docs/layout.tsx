import { source } from '@/lib/source';
import { DocsSidebar } from '@/components/docs-sidebar';
import type { ReactNode } from 'react';

export default function DocsLayout({ children }: { children: ReactNode }) {
  const tree = source.getPageTree();

  return (
    <div className="docs-layout">
      <div className="docs-sidebar-wrapper">
        <DocsSidebar tree={tree} />
      </div>
      <main className="docs-main">{children}</main>
    </div>
  );
}
