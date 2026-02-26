'use client';

import type { TableOfContents } from 'fumadocs-core/server';

export interface DocsTocProps {
  toc: TableOfContents;
}

/**
 * Renders a table of contents for the current page,
 * linking to heading anchors.
 */
export function DocsToc({ toc }: DocsTocProps) {
  if (!toc || toc.length === 0) return null;

  return (
    <aside className="docs-toc" aria-label="On this page">
      <p
        style={{
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.75rem',
          color: 'var(--ids-semantic-foreground-subtle)',
        }}
      >
        On this page
      </p>
      <ul className="toc-list">
        {toc.map((item) => (
          <li key={item.url} className="toc-item" data-depth={item.depth}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
