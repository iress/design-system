import type { MDXComponents } from 'mdx/types';
import { TypeTable } from '@/components/type-table';
import { ComponentLinks } from '@/components/component-links';
import { ComponentTabs, DevelopmentTab, DesignTab, APITab } from '@/components/component-tabs';
import { StorybookEmbed } from '@/components/storybook-embed';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    TypeTable,
    ComponentLinks,
    ComponentTabs,
    DevelopmentTab,
    DesignTab,
    APITab,
    StorybookEmbed,
    ...components,
  };
}
