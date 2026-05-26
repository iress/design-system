import { createFileRoute, Link } from '@tanstack/react-router';

interface MdxModule {
  default: React.ComponentType;
  meta?: { title: string; description?: string; category?: string };
}

// Load all MDX from content subfolders
const allContent = import.meta.glob<MdxModule>('../../content/**/*.mdx', { eager: true });

function getPage(splat: string): MdxModule | undefined {
  return allContent[`../../content/${splat}.mdx`];
}

interface NavItem {
  section: string;
  slug: string;
  path: string;
  title: string;
}

function getAllPages(): NavItem[] {
  return Object.entries(allContent).map(([k, v]) => {
    const rel = k.replace('../../content/', '').replace('.mdx', '');
    const parts = rel.split('/');
    const section = parts.length > 1 ? parts[0] : '';
    const slug = parts[parts.length - 1];
    return {
      section,
      slug,
      path: rel,
      title: v.meta?.title ?? slug,
    };
  });
}

export const Route = createFileRoute('/$')({
  component: SplatRoute,
});

function SplatRoute() {
  const { _splat: splat } = Route.useParams();
  const page = getPage(splat);

  if (!page) {
    const all = getAllPages();
    const sections = [...new Set(all.map((p) => p.section))].sort();
    return (
      <div>
        <h1>Page not found</h1>
        <p>No page found for &ldquo;{splat}&rdquo;.</p>
        {sections.map((section) => (
          <div key={section}>
            <h2>{section || 'Pages'}</h2>
            <ul>
              {all
                .filter((p) => p.section === section)
                .map((p) => (
                  <li key={p.path}>
                    <Link to={`/${p.path}`}>{p.title}</Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  const Content = page.default;
  return (
    <article>
      <Content />
    </article>
  );
}
