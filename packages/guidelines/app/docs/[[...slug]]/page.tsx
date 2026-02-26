import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import { DocsBreadcrumb } from '@/components/docs-breadcrumb';
import { DocsToc } from '@/components/docs-toc';
import type { Metadata } from 'next';
import { IressText } from '@iress-oss/ids-components';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const tree = source.getPageTree();
  const MDX = page.data.body;

  return (
    <div className="docs-content-wrapper">
      <article className="docs-content">
        <DocsBreadcrumb tree={tree} />
        <IressText>
          <h1>{page.data.title}</h1>
          {page.data.description && (
            <p
              style={{
                color: 'var(--ids-semantic-foreground-subtle)',
                fontSize: '1.125rem',
                marginBottom: '1.5rem',
              }}
            >
              {page.data.description}
            </p>
          )}
          <MDX components={getMDXComponents()} />
        </IressText>
      </article>
      <DocsToc toc={page.data.toc ?? []} />
    </div>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
