import type { ReactNode } from 'react';

interface MdxLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function MdxLayout({ children, title, description }: MdxLayoutProps) {
  return (
    <article>
      <header>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </header>
      <div>{children}</div>
    </article>
  );
}
