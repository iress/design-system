import type { FC, LazyExoticComponent, ReactNode } from 'react';

/** Testing guidance for a component's accessible parts and test IDs. */
export interface TestComponentMeta {
  part: string;
  description: string;
  query?: ReactNode;
  testId: string;
}

/** Shared metadata for guidelines, Storybook, and generated documentation. */
export interface ComponentMeta {
  /** Display name of the component. */
  heading: string;
  /** Short description of what the component does. */
  description: string;
  /** Searchable/filterable tags. */
  tags: string[];
  /** Recommended queries and test IDs. */
  testMeta?: TestComponentMeta[];
  /** Lazy thumbnail displayed on documentation index pages. */
  Thumbnail: LazyExoticComponent<FC> | null;
  /** Import statement displayed in documentation. */
  import?: ReactNode;
  /** Links to source and contribution workflows. */
  github?: {
    source?: string;
    guidelines?: string;
    storybook?: string;
    reportIssue?: string;
    requestFeature?: string;
  };
  /** Storybook documentation URL. */
  storybook?: string;
  /** Guidelines page URL. */
  guidelines?: string;
  /** Figma design URL. */
  figma?: string;
  /** Exported sub-component names whose props should be included. */
  subComponents?: string[];
  /** Props that cannot be resolved automatically by react-docgen-typescript. */
  additionalProps?: {
    name: string;
    type: string;
    required?: boolean;
    default?: string;
    description: string;
    condition?: string;
  }[];
}
