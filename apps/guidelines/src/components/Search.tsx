import { useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  IressInput,
  IressInputPopover,
  IressMenu,
  IressMenuItem,
  IressText,
  IressStack,
  IressIcon,
  PopoverRef,
} from '@iress-oss/ids-components';

interface PagefindResult {
  url: string;
  excerpt?: string;
  meta?: { title?: string; description?: string };
}

interface PagefindAPI {
  options: (opts: { excerptLength?: number }) => Promise<void>;
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
  await pagefind!.options({ excerptLength: 15 });
  await pagefind!.init();
  return pagefind!;
}

export function Search() {
  const navigate = useNavigate();
  const [results, setResults] = useState<PagefindResult[]>([]);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const pf = await getPagefind();
      const search = await pf.search(query);
      const data = await Promise.all(
        search.results.slice(0, 8).map((r) => r.data()),
      );
      setResults(data);
    },
    [],
  );

  return (
    <IressInputPopover
      activator={
        <IressInput
          type="search"
          aria-label="Search guidelines"
          placeholder="Search..."
          onChange={handleChange}
          variant="search"
          width="16"
          append={<IressIcon name="search" />}
        />
      }
      contentStyle={{
        width: 'overlay.md',
      }}
      align="bottom-end"
    >
      {results.length > 0 ? (
        <IressMenu>
          {results.map((r) => (
            <IressMenuItem
              key={r.url}
              element={Link}
              to={r.url?.split('#')[1] as string}
              onClick={() => {
                navigate({ to: r.url?.split('#')[1] });
                document
                  .querySelector<HTMLElement>('[data-pagefind-body]')
                  ?.focus({
                    focusVisible: false,
                    preventScroll: true,
                  });
              }}
            >
              <IressStack gap="none">
                <IressText element="span">
                  {r.meta?.title ?? r.url?.split('#')[1]}
                </IressText>
                {r.excerpt && (
                  <IressText
                    textStyle="typography.body.sm"
                    color="colour.neutral.70"
                    dangerouslySetInnerHTML={{ __html: r.excerpt }}
                  />
                )}
              </IressStack>
            </IressMenuItem>
          ))}
        </IressMenu>
      ) : (
        <IressText py="sm" px="md" color="colour.neutral.70">
          No results found
        </IressText>
      )}
    </IressInputPopover>
  );
}
