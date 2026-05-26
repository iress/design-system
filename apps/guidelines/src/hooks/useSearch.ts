import { useState, useMemo } from 'react';
import FlexSearch from 'flexsearch';

interface MdxModule {
  meta?: { title: string; description?: string };
}

interface SearchResult {
  title: string;
  path: string;
  description?: string;
}

const modules = import.meta.glob<MdxModule>('../../content/**/*.mdx', { eager: true });

const index = new FlexSearch.Index({ tokenize: 'forward' });
const pages: SearchResult[] = [];

Object.entries(modules).forEach(([key, mod], i) => {
  const path = key.replace('../../content/', '').replace('.mdx', '');
  const title = mod.meta?.title ?? path.split('/').pop()!;
  const description = mod.meta?.description;
  pages.push({ title, path, description });
  index.add(i, `${title} ${description ?? ''}`);
});

export function useSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const ids = index.search(query, 10) as number[];
    return ids.map((id) => pages[id]);
  }, [query]);

  return { query, setQuery, results };
}
