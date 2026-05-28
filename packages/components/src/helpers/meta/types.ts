import type { FC, LazyExoticComponent } from 'react';

/**
 * Shared component metadata interface.
 * Each component's `meta/index.tsx` exports a default object matching this shape.
 * Data-only fields are re-exported via `@iress-oss/ids-components/meta`.
 */
export interface ComponentMeta {
  /** Display name of the component (e.g. "Alert", "Button") */
  heading: string;
  /** Short description of what the component does */
  description: string;
  /** Searchable/filterable tags */
  tags: string[];
  /** Thumbnail for the component, to be displayed as cards on index pages */
  Thumbnail: LazyExoticComponent<FC> | null;
}
