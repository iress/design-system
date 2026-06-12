import type { FC, LazyExoticComponent } from 'react';
import type { TestComponentMeta } from './TestTable';

/**
 * Shared component metadata interface.
 * Each component's `meta/index.tsx` exports a default object matching this shape.
 */
export interface ComponentMeta {
  /** Display name of the component (e.g. "Alert", "Button") */
  heading: string;
  /** Short description of what the component does */
  description: string;
  /** Searchable/filterable tags */
  tags: string[];
  /** Test metadata to help users with testing the component */
  testMeta?: TestComponentMeta[];
  /** Thumbnail for the component, to be displayed as cards on index pages */
  Thumbnail: LazyExoticComponent<FC> | null;
}
