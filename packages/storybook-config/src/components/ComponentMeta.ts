import type { FC, LazyExoticComponent, ReactNode } from 'react';
import type { TestComponentMeta } from './TestTable';

/**
 * Shared component metadata interface.
 * Each component's `meta/index.tsx` exports a default object matching this shape.
 * This is the single source of truth for all documentation and tooling.
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
  /**
   * The import statement displayed in documentation.
   * Can be a string or ReactNode for custom formatting.
   * @example "import { IressAlert } from '@iress-oss/ids-components';"
   * @example <><code>import {'{'} IressAlert {'}'} from '@iress-oss/ids-components';</code></>
   */
  import?: ReactNode;
  /** GitHub links for this component */
  github?: {
    /** Source code URL */
    source?: string;
    /** Edit the guidelines content */
    guidelines?: string;
    /** Edit the Storybook stories */
    storybook?: string;
    /** Report a bug for this component */
    reportIssue?: string;
    /** Request a feature for this component */
    requestFeature?: string;
  };
  /** Storybook/Chromatic documentation URL */
  storybook?: string;
  /** Live guidelines site URL */
  guidelines?: string;
  /** Figma design file URL */
  figma?: string;
  /**
   * Sub-components whose props should be included in this component's AI documentation.
   * Each entry is the exported component name (e.g. 'IressFormField', 'IressFormFieldset').
   * The translate pipeline will extract and append their props tables to the parent doc.
   */
  subComponents?: string[];
  /**
   * Additional props that react-docgen-typescript can't resolve (e.g. conditional/discriminated union props).
   * These are appended to the generated props table.
   */
  additionalProps?: Array<{
    name: string;
    type: string;
    required?: boolean;
    default?: string;
    description: string;
    condition?: string;
  }>;
}
