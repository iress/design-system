import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Pre-generate search index at build time (required for static export)
export const revalidate = false;
export const { staticGET: GET } = createFromSource(source);
