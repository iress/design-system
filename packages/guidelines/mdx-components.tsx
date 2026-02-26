import type { MDXComponents } from 'mdx/types';
import { TypeTable } from '@/components/type-table';

/**
 * Custom MDX components for documentation pages.
 * Text elements use IressText from the design system.
 * Structural styles (spacing, borders) come from .docs-prose in global.css.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    // h1: MdxH1,
    // h2: MdxH2,
    // h3: MdxH3,
    // h4: MdxH4,
    // h5: MdxH5,
    // h6: MdxH6,
    // p: MdxP,
    // strong: MdxStrong,
    // em: MdxEm,
    // blockquote: MdxBlockquote,
    TypeTable,
    ...components,
  };
}
