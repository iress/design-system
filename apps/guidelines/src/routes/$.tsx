import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  IressStack,
  IressText,
  IressLink,
  IressSkeleton,
} from '@iress-oss/ids-components';

interface MdxModule {
  default: React.ComponentType;
  meta?: { title: string; description?: string; category?: string };
}

// Load all MDX from content subfolders
const allContent = import.meta.glob<MdxModule>('../../content/**/*.mdx', {
  eager: true,
});

function getPage(splat: string): MdxModule | undefined {
  return allContent[`../../content/${splat}.mdx`];
}

export const Route = createFileRoute('/$')({
  component: SplatRoute,
});

interface Suggestion {
  title: string;
  url: string;
}

async function fetchSuggestions(splat: string): Promise<Suggestion[]> {
  try {
    const pagefind = await import(
      /* @vite-ignore */ `${import.meta.env.BASE_URL}pagefind/pagefind.js`
    );
    await pagefind.init();
    const slug = splat.split('/').pop() ?? splat;
    const search = await pagefind.search(slug);
    const results = await Promise.all(
      search.results
        .slice(0, 6)
        .map(
          (r: {
            data: () => Promise<{ url: string; meta?: { title?: string } }>;
          }) => r.data(),
        ),
    );
    return results.map((r: { url: string; meta?: { title?: string } }) => ({
      title: r.meta?.title ?? r.url,
      url: r.url,
    }));
  } catch {
    return [];
  }
}

function SplatRoute() {
  const { _splat: splat } = Route.useParams();
  const page = getPage(splat ?? '');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(!page);

  useEffect(() => {
    if (!page && splat) {
      setLoading(true);
      fetchSuggestions(splat).then((s) => {
        setSuggestions(s);
        setLoading(false);
      });
    }
  }, [page, splat]);

  if (!page) {
    return (
      <IressStack gap="lg">
        <IressText element="h1">Page not found</IressText>
        <IressText element="p" color="colour.neutral.70">
          No page found for &ldquo;{splat}&rdquo;.
        </IressText>
        {loading && (
          <IressStack gap="md">
            <IressSkeleton textStyle="typography.heading.2" width="200px" />
            <IressSkeleton width="150px" />
            <IressSkeleton width="150px" />
          </IressStack>
        )}
        {!loading && suggestions.length > 0 && (
          <IressStack gap="sm">
            <IressText element="h2">You might be looking for</IressText>
            <IressStack element="ul" gap="xs">
              {suggestions.map((s) => (
                <li key={s.url}>
                  <IressLink element={Link} to={s.url?.split('#')[1] as string}>
                    {s.title}
                  </IressLink>
                </li>
              ))}
            </IressStack>
          </IressStack>
        )}
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
