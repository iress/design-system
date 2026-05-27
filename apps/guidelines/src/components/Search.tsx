import { useCallback, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { IressAutocomplete, LabelValueMeta } from '@iress-oss/ids-components';

interface PagefindResult {
  url: string;
  meta?: { title?: string };
}

interface PagefindAPI {
  init: () => Promise<void>;
  search: (
    query: string,
  ) => Promise<{ results: { data: () => Promise<PagefindResult> }[] }>;
}

let pagefind: PagefindAPI | null = null;

async function getPagefind(): Promise<PagefindAPI> {
  if (pagefind) return pagefind;
  pagefind = await import(
    /* @vite-ignore */ `${import.meta.env.BASE_URL}pagefind/pagefind.js`
  );
  await pagefind!.init();
  return pagefind!;
}

async function searchOptions(query: string) {
  const pf = await getPagefind();
  const search = await pf.search(query);
  const results = await Promise.all(
    search.results.slice(0, 8).map((r) => r.data()),
  );
  return results.map((r) => ({
    label: r.meta?.title ?? r.url,
    value: r.url.split('#')[1] ?? r.url, // Use the hash as the value if it exists, otherwise use the URL
  }));
}

export function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleChange = useCallback(
    (_e: unknown, query = '', labelValue?: LabelValueMeta) => {
      if (!labelValue) {
        setQuery(query);
        return;
      }
      navigate({ to: labelValue.value as string });
    },
    [navigate],
  );

  return (
    <IressAutocomplete
      aria-label="Search guidelines"
      placeholder="Search…"
      options={searchOptions}
      onChange={handleChange}
      noResultsText="No results found"
      clearable
      debounceThreshold={0}
      variant="search"
      popoverProps={{
        contentStyle: {
          maxWidth: 'input.16',
        },
      }}
      value={query}
    />
  );
}
