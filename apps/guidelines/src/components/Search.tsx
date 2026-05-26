import { Link } from '@tanstack/react-router';
import { useSearch } from '../hooks/useSearch';

export function Search() {
  const { query, setQuery, results } = useSearch();

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="search"
        aria-label="Search guidelines"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search…"
      />
      {query.trim() && results.length > 0 && (
        <ul style={{ position: 'absolute', listStyle: 'none', padding: 0, margin: 0 }}>
          {results.map((r) => (
            <li key={r.path}>
              <Link to={`/${r.path}` as string}>{r.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
