import { createFileRoute, Link } from '@tanstack/react-router';
import { IressStack, IressText, IressLink } from '@iress-oss/ids-components';

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
  const page = getPage(splat ?? '');

  if (!page) {
    const all = getAllPages();
    const sections = [...new Set(all.map((p) => p.section))].sort();
    return (
      <IressStack gap="lg">
        <IressText element="h1">Page not found</IressText>
        <IressText element="p" color="colour.neutral.70">
          No page found for &ldquo;{splat}&rdquo;.
        </IressText>
        {sections.map((section) => (
          <IressStack key={section} gap="sm">
            <IressText element="h2">{section || 'Pages'}</IressText>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {all
                .filter((p) => p.section === section)
                .map((p) => (
                  <li key={p.path}>
                    <IressLink element={Link} to={`/${p.path}` as string}>
                      {p.title}
                    </IressLink>
                  </li>
                ))}
            </ul>
          </IressStack>
        ))}
      </IressStack>
    );
  }

  const Content = page.default;
  return (
    <article>
      <Content />
    </article>
  );
}
