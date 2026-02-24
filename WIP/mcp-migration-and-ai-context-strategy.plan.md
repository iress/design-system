# MCP Migration & AI Context Strategy

**Created:** 24 February 2026  
**Updated:** 25 February 2026  
**Status:** Planning  
**Purpose:** Migrate from custom MCP to embedded AI context, move to Fumadocs guidelines site, and simplify Storybook to autodocs

---

## Executive Summary

Transition from maintaining a custom MCP server and heavy Storybook customization to a cleaner architecture:

- **Fumadocs guidelines site** for documentation (replacing custom Storybook MDX)
- **Storybook autodocs** for component playground (lighter, less maintenance)
- **Embedded AI context** in distributed packages

This reduces maintenance burden and ensures AI agents have immediate access to IDS context when users install the packages.

**Why Fumadocs over raw Next.js + MDX?**

Fumadocs is a documentation framework built on Next.js App Router that provides:

- **Built-in `remarkAutoTypeTable`** — generates prop tables directly from TypeScript source via the TS Compiler API at MDX compile time (no TypeDoc build step, no RSC needed)
- **`@fumadocs/story`** — lightweight component previews with interactive controls, purpose-built for component library documentation
- **Built-in full-text search** (Orama) — no custom search implementation needed
- **Automatic navigation/sidebar** — generated from file structure
- **Table of Contents** — built-in per-page
- **Content source API** — loader, static params, structured data
- **MDX extensions** — rich built-in remark/rehype plugin set
- **i18n support** — built-in

This eliminates the need to build navigation, search, ToC, and type documentation from scratch.

**Key Goals:**

- Reduce maintenance by eliminating custom MCP server
- Simplify Storybook (autodocs only, no custom MDX overrides)
- Create Fumadocs guidelines site for better documentation UX
- Provide rich AI context through `fumadocs-typescript` API documentation (live type resolution from TS source)
- Embed documentation in distributed packages
- Create UI/Figma translation skills for AI agents

---

## Analysis: AI Context Strategy

### Current Architecture Issues

**Heavy Storybook Customization:**

- Custom MDX documentation overriding default layout
- Complex Storybook configuration
- Maintenance burden for custom components
- Performance impact from heavy customization

**Proposed Architecture:**

- **Fumadocs guidelines site** - Dedicated documentation with better UX, built-in search, live type resolution
- **Storybook autodocs** - Lightweight component playground (hosted on Chromatic)
- **Embedded `.ai/` context** - AI-consumable docs in distributed packages
- **Chromatic links** - AI agents provide links for users/orchestrators to explore

### Why No Custom MCP?

**Problems with MCP approach:**

- ❌ Requires local Storybook server running
- ❌ Requires users to install and configure MCP
- ❌ Storybook MCP doesn't support Chromatic-hosted instances
- ❌ Maintenance burden for custom MCP server
- ❌ Only useful for tiny audience (IDS developers with local setup)

**Better approach:**

- ✅ Embed docs in `.ai/` folder (works offline, zero config)
- ✅ Include Chromatic links in AI context
- ✅ AI agents can share links with users
- ✅ Users can explore via browser
- ✅ AI agents with browser tools (Chrome DevTools MCP, Playwright MCP) can navigate Chromatic directly

### Recommended Approach

**Strategy:** Fumadocs guidelines site + Storybook autodocs (Chromatic) + embedded `.ai/` documentation

**Architecture:**

```
┌─────────────────────────────────────────────────┐
│ Fumadocs Guidelines Site (Public)               │
│ - Component documentation with MDX              │
│ - Live prop tables via remarkAutoTypeTable          │
│ - Native component previews via @fumadocs/story │
│ - Built-in Orama search                         │
│ - Chromatic links for full Storybook experience │
│ - Patterns & best practices                     │
│ - Getting started guides                        │
└─────────────────────────────────────────────────┘
                    ↓ links to
┌─────────────────────────────────────────────────┐
│ Storybook on Chromatic (Public)                 │
│ - Stories with autodocs                         │
│ - Interactive playground                        │
│ - Visual testing                                │
│ - No custom MDX overrides                       │
│ - Publicly accessible URLs                      │
└─────────────────────────────────────────────────┘
                    ↓ generates
┌─────────────────────────────────────────────────┐
│ Embedded AI Context (.ai/ in packages)          │
│ - Parsed from Fumadocs MDX                      │
│ - Live type references via fumadocs-typescript   │
│ - Chromatic story links                         │
│ - Translation skills                            │
└─────────────────────────────────────────────────┘
```

**How AI Agents Use This:**

1. **Read embedded docs** from `.ai/` folder (offline, immediate)
2. **Share Chromatic links** with users for visual exploration
3. **Navigate Chromatic** using browser tools (Chrome DevTools MCP, Playwright MCP) when needed
4. **Reference guidelines** site for comprehensive documentation

This gives us:

- ✅ No MCP maintenance
- ✅ Lighter Storybook (autodocs only)
- ✅ Better documentation UX (Fumadocs with built-in search, navigation, ToC)
- ✅ Live type resolution (no stale TypeDoc output)
- ✅ Native component previews (no iframes)
- ✅ Clear separation: Storybook = playground, Guidelines = docs
- ✅ Embedded docs available in installed packages
- ✅ AI agents can access context without running servers
- ✅ AI agents can share visual examples via Chromatic links
- ✅ AI agents with browser tools can explore Storybook directly

---

## Implementation Plan

### Phase 0: Fumadocs Guidelines Site Setup

**Goal:** Create dedicated documentation site using Fumadocs framework to replace custom Storybook MDX

**Why Fumadocs?** Fumadocs is a documentation framework built on Next.js App Router. It provides search (Orama), navigation, ToC, MDX content sources, and crucially: `fumadocs-typescript` for live TypeScript type resolution and `@fumadocs/story` for native component previews — all out of the box. This eliminates the need to build these features from scratch.

#### 0.1 Initialize Fumadocs Project

```bash
# Create new Fumadocs app in monorepo
cd packages
yarn dlx create-fumadocs-app guidelines
```

Or manual setup:

```bash
mkdir packages/guidelines
cd packages/guidelines
yarn add fumadocs-ui fumadocs-core fumadocs-mdx fumadocs-typescript @fumadocs/story next react react-dom
yarn add -D @types/react @types/react-dom typescript
```

**Configuration:** `packages/guidelines/package.json`

```json
{
  "name": "@iress-oss/ids-guidelines",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postinstall": "fumadocs-mdx"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "fumadocs-ui": "^15.0.0",
    "fumadocs-core": "^15.0.0",
    "fumadocs-mdx": "^11.0.0",
    "fumadocs-typescript": "^4.0.0",
    "@fumadocs/story": "^1.0.0",
    "@iress-oss/ids-components": "workspace:*",
    "@iress-oss/ids-tokens": "workspace:*"
  }
}
```

**Environment Configuration:** `packages/guidelines/.env.local`

```bash
# Storybook URL (customizable for canary builds)
NEXT_PUBLIC_STORYBOOK_URL=https://main--691abcc79dfa560a36d0a74f.chromatic.com

# Guidelines URL (customizable for canary builds)
NEXT_PUBLIC_GUIDELINES_URL=https://iress.github.io/design-system

# For canary builds:
# NEXT_PUBLIC_STORYBOOK_URL=https://canary--691abcc79dfa560a36d0a74f.chromatic.com
# NEXT_PUBLIC_GUIDELINES_URL=https://iress.github.io/design-system/canary
```

#### 0.2 Configure Fumadocs MDX & Next.js

**File:** `packages/guidelines/source.config.ts`

```ts
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import {
  remarkAutoTypeTable,
  createGenerator,
  createFileSystemGeneratorCache,
} from 'fumadocs-typescript';

export const docs = defineDocs({
  dir: 'content/docs',
});

const generator = createGenerator({
  // Point to the components tsconfig so the TS Compiler API can resolve
  // component types referenced via ../../../packages/components/src/...
  tsconfigPath: '../../components/tsconfig.json',
  cache: createFileSystemGeneratorCache('.next/fumadocs-typescript'),
});

export default defineConfig({
  mdxOptions: {
    // remarkAutoTypeTable runs at MDX compile time (not at React render time)
    // This is the recommended approach for static export (output: 'export')
    remarkPlugins: [[remarkAutoTypeTable, { generator }]],
  },
});
```

**Why `remarkAutoTypeTable` instead of `AutoTypeTable` component?**

Fumadocs provides two ways to generate type tables:

| Approach                               | When it runs                                               | Static export safe?                           |
| -------------------------------------- | ---------------------------------------------------------- | --------------------------------------------- |
| `AutoTypeTable` React Server Component | During page rendering (build time with `output: 'export'`) | Yes, but relies on RSC executing during build |
| `remarkAutoTypeTable` remark plugin    | During MDX compilation (before page rendering)             | Yes — guaranteed, runs at compile time        |

We use the **remark plugin** because it processes TypeScript types during MDX compilation — earlier and more predictable than relying on RSC execution during static export. The trade-off is the MDX syntax uses `<auto-type-table>` (HTML-like) instead of `<AutoTypeTable>` (React component), and paths are relative to the MDX file.

**File:** `packages/guidelines/next.config.mjs`

```js
import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export', // Static export for GitHub Pages
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

const withMDX = createMDX();

export default withMDX(config);
```

**⚠️ Static Export Constraints:**

Since the site is statically generated (`output: 'export'`), there is no Node.js server at runtime. This means:

- **All pages are pre-rendered during `next build`** — React Server Components execute at build time only
- **Type tables generated at MDX compile time** — `remarkAutoTypeTable` remark plugin processes types before page rendering even starts, making it the safest approach for static export
- **No API routes at runtime** — the search API uses `staticGET` to pre-generate a JSON search index at build time; the client reads this static file
- **No `revalidate` / ISR** — content updates require a full rebuild and redeploy
- **No middleware** — static export does not support Next.js middleware
- **`notFound()` works** — pages not in `generateStaticParams()` produce a 404.html page
- **`fumadocs-typescript` works perfectly** — `remarkAutoTypeTable` processes types at MDX compile time via the TS Compiler API + file system access, and the output is baked into static HTML

#### 0.3 Configure Content Source & TypeScript Integration

**File:** `packages/guidelines/lib/source.ts`

```ts
import { docs } from 'fumadocs-mdx:collections/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});
```

**File:** `packages/guidelines/mdx-components.tsx`

```tsx
import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { TypeTable } from 'fumadocs-ui/components/type-table';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    // TypeTable is required for remarkAutoTypeTable output rendering
    TypeTable,
    ...components,
  };
}
```

> **Note:** We do NOT register `AutoTypeTable` as a component here. Instead, the `remarkAutoTypeTable` remark plugin (configured in `source.config.ts`) transforms `<auto-type-table>` tags at MDX compile time into `<TypeTable>` output. This is more robust for static export.
> };
> }

```

#### 0.4 Create Site Structure (App Router)

```

packages/guidelines/
├── app/
│ ├── layout.tsx # Root layout with Fumadocs + IressProvider
│ ├── page.tsx # Home page
│ ├── docs/
│ │ ├── layout.tsx # Docs layout (sidebar, ToC)
│ │ └── [[...slug]]/
│ │ └── page.tsx # Dynamic docs page
│ └── api/
│ └── search/
│ └── route.ts # Built-in Orama search API
├── content/
│ └── docs/
│ ├── index.mdx # Docs home
│ ├── meta.json # Navigation order
│ ├── components/
│ │ ├── meta.json # Component nav ordering
│ │ ├── button.mdx # Button documentation
│ │ ├── input.mdx # Input documentation
│ │ └── ...
│ ├── patterns/
│ │ ├── meta.json
│ │ ├── forms.mdx
│ │ └── navigation.mdx
│ └── guides/
│ ├── meta.json
│ ├── getting-started.mdx
│ └── design-tokens.mdx
├── components/
│ └── stories/ # @fumadocs/story definitions
│ ├── button.story.tsx
│ └── ...
├── lib/
│ ├── source.ts # Content source loader
│ └── story.ts # Story factory
├── mdx-components.tsx # MDX component overrides (TypeTable for remarkAutoTypeTable output)
├── source.config.ts # Fumadocs MDX config
├── next.config.mjs
├── .env.local
└── public/
└── images/

````

**Root Layout:** `packages/guidelines/app/layout.tsx`

```tsx
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import { IDSClientProvider } from '@/components/ids-client-provider';
import '@iress-oss/ids-components/style.css'; // IDS Panda CSS atomic styles

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider
          search={{
            options: {
              type: 'static', // Required for static export — reads pre-built index
            },
          }}
        >
          <IDSClientProvider>{children}</IDSClientProvider>
        </RootProvider>
      </body>
    </html>
  );
}
```

**IDS Client Provider (required):** `packages/guidelines/components/ids-client-provider.tsx`

`IressProvider` uses `createPortal` to inject font `<link>` tags into `document.head`, which requires browser DOM APIs. It cannot run in a React Server Component. This thin client wrapper solves that:

```tsx
'use client';

import { IressProvider } from '@iress-oss/ids-components';
import type { ReactNode } from 'react';

export function IDSClientProvider({ children }: { children: ReactNode }) {
  return <IressProvider>{children}</IressProvider>;
}
````

**Docs Layout:** `packages/guidelines/app/docs/layout.tsx`

```tsx
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout tree={source.getPageTree()}>{children}</DocsLayout>;
}
```

**Dynamic Docs Page:** `packages/guidelines/app/docs/[[...slug]]/page.tsx`

```tsx
import { DocsPage, DocsBody } from 'fumadocs-ui/layouts/docs/page';
import { source } from '@/lib/source';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsBody>
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}
```

**Search API (static):** `packages/guidelines/app/api/search/route.ts`

Since the site is statically exported (`output: 'export'`), the search index must be pre-generated at build time using `staticGET`:

```ts
import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Pre-generate search index at build time (required for static export)
export const revalidate = false;
export const { staticGET: GET } = createFromSource(source);
```

> **⚠️ Search Index Size:** Static search requires clients to download the full search index. With ~66 component docs + patterns + guides this should be fine (<100KB gzipped). Monitor the index size as documentation grows — if it exceeds ~500KB, consider migrating to Orama Cloud or Algolia for server-side search.

**Search client configuration:**

The built-in Fumadocs search dialog must be configured to use `static` mode (reads the pre-built index instead of making server requests):

```tsx
// In root layout or provider configuration
import { RootProvider } from 'fumadocs-ui/provider';

<RootProvider
  search={{
    options: {
      type: 'static',
      api: '/api/search',
    },
  }}
>
  {children}
</RootProvider>;
```

#### 0.5 Component Documentation: Hybrid Approach

Instead of iframe embeds for Storybook stories, use a **hybrid approach** for component examples:

**Strategy:**

1. **Simple examples** — render actual IDS components directly in MDX (native, fast, no iframe)
2. **Interactive exploration** — link to Chromatic (no iframe overhead)
3. **Complex component docs** — use `@fumadocs/story` for inline interactive controls

**Example Component Documentation:** `packages/guidelines/content/docs/components/button.mdx`

```mdx
---
title: Button
description: Buttons allow users to take actions and make choices with a single tap.
---

import { IressButton, IressStack } from '@iress-oss/ids-components';
import { story } from '@/components/stories/button.story';

## Usage

\`\`\`tsx
import { IressButton } from '@iress-oss/ids-components';

function MyComponent() {
return <IressButton mode="primary">Click me</IressButton>;
}
\`\`\`

## Live Examples

### Primary Button

<IressButton mode="primary">Primary Action</IressButton>

### Secondary Button

<IressButton mode="secondary">Secondary Action</IressButton>

### Interactive Playground

<story.WithControl />

[Open full playground in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components-button--primary)

## Props

<auto-type-table
  path="../../../packages/components/src/components/Button/Button.tsx"
  name="ButtonProps"
/>

## Best Practices

- Use primary buttons for main actions
- Limit to one primary button per section
- Use clear, action-oriented labels
```

**Fumadocs Story Definition:** `packages/guidelines/components/stories/button.story.tsx`

```tsx
import { defineStory } from '@/lib/story';
import { IressButton } from '@iress-oss/ids-components';

export const story = defineStory(import.meta.url, {
  Component: IressButton,
  args: {
    initial: {
      mode: 'primary',
      children: 'Click me',
    },
  },
});
```

**Story Factory:** `packages/guidelines/lib/story.ts`

```ts
import { createFileSystemCache, defineStoryFactory } from '@fumadocs/story';

export const { defineStory } = defineStoryFactory({
  // Cache is required for production builds (e.g., Vercel, GitHub Pages)
  cache:
    process.env.NODE_ENV === 'production'
      ? createFileSystemCache('.next/fumadocs-story')
      : undefined,
  tsc: {
    // TypeScript options for generating controls from component types
  },
});
```

> **Note:** `defineStoryFactory` creates the `defineStory` function with proper caching and TypeScript control generation. Do NOT import `defineStory` directly from `@fumadocs/story` — it must be created via the factory. Also note that the `Component` passed to `defineStory` **must be a client component** — verify IDS components work as client components in this context.

**Key Advantages Over iframe Embed:**

- \u2705 **Native rendering** — components render in the same React tree, no iframe overhead
- \u2705 **No height/styling issues** — no iframe dimension mismatch
- \u2705 **Live type tables** — `remarkAutoTypeTable` resolves props from TypeScript source at MDX compile time
- \u2705 **Interactive controls** — `@fumadocs/story` provides Storybook-like controls without Storybook
- \u2705 **Chromatic links** — users can click through to full Storybook for deeper exploration
- \u2705 **No CORS/CSP issues** — no cross-origin iframe rendering

#### 0.6 Migrate Documentation to Guidelines

**Goal:** Move all `.docs.mdx` files from components/tokens into Fumadocs content directory

**Approach:**

- One-time migration of all ~66 documentation files
- Documentation lives in guidelines package (clear separation)
- Simpler to maintain (no sync script needed)
- Transform Storybook-specific components to Fumadocs equivalents

**Migration Process:**

1. **Move component docs:**

```bash
# Move from components to guidelines content directory
packages/components/src/components/Button/Button.docs.mdx
  → packages/guidelines/content/docs/components/button.mdx

packages/components/src/components/Input/Input.docs.mdx
  → packages/guidelines/content/docs/components/input.mdx
```

2. **Move token docs:**

```bash
packages/tokens/src/tokens.docs.mdx
  → packages/guidelines/content/docs/tokens.mdx
```

3. **Transform content:**
   - Replace `<ComponentExample of={ComponentStories.StoryName} />` with:
     - **Simple cases:** Render actual IDS component inline (e.g., `<IressButton mode="primary">Click me</IressButton>`)
     - **Complex cases:** Use `<story.WithControl />` from `@fumadocs/story`
     - **Full playground:** Link to Chromatic URL
   - Replace `<ComponentOverview>` blocks with MDX frontmatter (`title`, `description`)
   - Remove `<Meta of={ComponentStories} />` blocks
   - Remove Storybook-specific imports (`@storybook/addon-docs/blocks`, `@iress-oss/ids-storybook-config`)
   - Replace prop documentation sections with `<auto-type-table path="..." name="..." />`
   - Add Fumadocs frontmatter (`---\ntitle: ...\ndescription: ...\n---`)
   - Keep all other MDX content as-is

**Example Transformation:**

**Before:** `packages/components/src/components/Button/Button.docs.mdx`

```mdx
import { Meta } from '@storybook/addon-docs/blocks';
import {
  ComponentOverview,
  ComponentExample,
} from '@iress-oss/ids-storybook-config';
import * as ComponentStories from './Button.stories';

<Meta of={ComponentStories} />

<ComponentOverview
  of={ComponentStories}
  description="Buttons allow users to take actions."
/>

## Examples

### Primary

<ComponentExample of={ComponentStories.Primary} />
```

**After:** `packages/guidelines/content/docs/components/button.mdx`

```mdx
---
title: Button
description: Buttons allow users to take actions.
---

import { IressButton } from '@iress-oss/ids-components';
import { story } from '@/components/stories/button.story';

## Examples

### Primary

<IressButton mode="primary">Primary</IressButton>

### Interactive Playground

<story.WithControl />

[Open in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components-button--primary)

## Props

<auto-type-table
  path="../../../packages/components/src/components/Button/Button.tsx"
  name="ButtonProps"
/>
```

**Benefits:**

- ✅ Simple and clear (no sync script)
- ✅ Documentation in one place (guidelines package)
- ✅ Native component rendering (no iframes)
- ✅ Type resolution at compile time (no stale TypeDoc output)
- ✅ Interactive controls via @fumadocs/story
- ✅ No build-time complexity

**Additional step — create Fumadocs stories:**

For each component with complex props, create a story file in `packages/guidelines/components/stories/`. Simple components (e.g., `<IressButton>`) can be rendered directly in MDX without a story file.

**After migration, delete:**

- All `.docs.mdx` files from `packages/components/src/components/*/`
- All `.docs.mdx` files from `packages/tokens/src/`

#### 0.7 Create Migration Script (Optional Helper)

**File:** `scripts/migrate-docs.ts` (in repo root, one-time use)

```ts
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

/**
 * Maps story export names to Chromatic story URLs.
 * e.g., ComponentStories.Primary in Button.stories.tsx
 *       → Chromatic link for interactive exploration
 */
function storyExportToUrl(componentName: string, exportName: string): string {
  const kebab = exportName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const storyId = `components-${componentName.toLowerCase()}--${kebab}`;
  return `https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/${storyId}`;
}

async function migrateDocs() {
  // Find all .docs.mdx files
  const componentDocs = await glob(
    'packages/components/src/components/**/*.docs.mdx',
  );
  const tokenDocs = await glob('packages/tokens/src/**/*.docs.mdx');

  // Migrate component docs
  for (const docPath of componentDocs) {
    const componentName = path.basename(path.dirname(docPath));
    const content = await fs.readFile(docPath, 'utf-8');

    // Extract description from ComponentOverview if present
    const descMatch = content.match(/description="([^"]+)"/);
    const description = descMatch
      ? descMatch[1]
      : `${componentName} component documentation`;

    let transformed = content
      // Remove <Meta of={...} /> blocks
      .replace(/<Meta\s+of=\{[^}]+\}\s*\/>/g, '')
      // Remove <ComponentOverview ... /> blocks (self-closing and wrapping)
      .replace(/<ComponentOverview[^>]*\/>/g, '')
      .replace(/<ComponentOverview[^>]*>[\s\S]*?<\/ComponentOverview>/g, '')
      // Transform <ComponentExample of={ComponentStories.ExportName} /> to Chromatic links
      .replace(
        /<ComponentExample\s+of=\{\w+\.(\w+)\}\s*\/>/g,
        (_, exportName) => {
          const url = storyExportToUrl(componentName, exportName);
          return `[Open ${exportName} in Storybook →](${url})`;
        },
      )
      // Remove Storybook-specific imports
      .replace(
        /import\s+\{[^}]*\}\s+from\s+['"]@storybook\/[^'"]+['"];?\n?/g,
        '',
      )
      .replace(
        /import\s+\{[^}]*\}\s+from\s+['"]@iress-oss\/ids-storybook-config['"];?\n?/g,
        '',
      )
      .replace(
        /import\s+\*\s+as\s+\w+\s+from\s+['"]\.\/[^'"]+\.stories['"];?\n?/g,
        '',
      )
      // Clean up multiple blank lines
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Add Fumadocs frontmatter at top
    const frontmatter = `---\ntitle: ${componentName}\ndescription: ${description}\n---\n\n`;
    transformed = frontmatter + transformed;

    // Add auto-type-table for props section (if not already present)
    if (!transformed.includes('auto-type-table')) {
      transformed += `\n\n## Props\n\n<auto-type-table path="../../../packages/components/src/components/${componentName}/${componentName}.tsx" name="${componentName}Props" />\n`;
    }

    // Write to Fumadocs content directory
    const targetDir = 'packages/guidelines/content/docs/components';
    await fs.mkdir(targetDir, { recursive: true });
    const targetPath = `${targetDir}/${componentName.toLowerCase()}.mdx`;
    await fs.writeFile(targetPath, transformed, 'utf-8');

    console.log(`✓ Migrated ${componentName}`);
  }

  // Migrate token docs
  for (const docPath of tokenDocs) {
    const content = await fs.readFile(docPath, 'utf-8');
    let transformed = content
      .replace(/<Meta\s+of=\{[^}]+\}\s*\/>/g, '')
      .replace(
        /<ComponentExample\s+of=\{\w+\.(\w+)\}\s*\/>/g,
        (_, exportName) =>
          `[Open ${exportName} in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/tokens--${exportName.toLowerCase()})`,
      )
      .replace(
        /import\s+\{[^}]*\}\s+from\s+['"]@storybook\/[^'"]+['"];?\n?/g,
        '',
      )
      .replace(
        /import\s+\{[^}]*\}\s+from\s+['"]@iress-oss\/ids-storybook-config['"];?\n?/g,
        '',
      )
      .replace(
        /import\s+\*\s+as\s+\w+\s+from\s+['"]\.\/[^'"]+\.stories['"];?\n?/g,
        '',
      )
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Add frontmatter
    transformed = `---\ntitle: Design Tokens\ndescription: IDS design tokens for colours, spacing, typography, and more.\n---\n\n${transformed}`;

    const targetDir = 'packages/guidelines/content/docs';
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(`${targetDir}/tokens.mdx`, transformed, 'utf-8');
    console.log(`✓ Migrated tokens`);
  }

  console.log(`\n✅ Migration complete!`);
  console.log(
    `Review the files in packages/guidelines/content/docs/ and delete originals when ready.`,
  );
  console.log(`\n⚠️  Manual review needed:`);
  console.log(`  - Add Fumadocs story definitions for complex components`);
  console.log(
    `  - Replace Chromatic links with native IDS component renders where simple`,
  );
  console.log(
    `  - Verify auto-type-table paths point to correct TypeScript source files`,
  );
  console.log(`  - Create meta.json files for navigation ordering`);
  console.log(
    `  - Review recipe files (e.g., PopoverRecipes.docs.mdx) for special handling`,
  );
}

migrateDocs().catch(console.error);
```

**Usage:**

```bash
# Run once to migrate all docs
tsx scripts/migrate-docs.ts

# Review migrated files
# Create @fumadocs/story definitions for complex components
# Add meta.json files for navigation ordering
# Delete original .docs.mdx files from components/tokens
```

### Phase 1: Live TypeScript API Documentation (fumadocs-typescript)

**Goal:** Provide comprehensive, always-accurate API documentation for components and tokens — without a separate build step

**Why fumadocs-typescript instead of TypeDoc?**

| Aspect          | TypeDoc → Markdown (old plan)                | fumadocs-typescript (new plan)                            |
| --------------- | -------------------------------------------- | --------------------------------------------------------- |
| Build step      | Separate `typedoc` build command             | None — resolved automatically during `next build`         |
| Staleness risk  | Output can be stale if not rebuilt           | Always reads from TypeScript source at build time         |
| Panda CSS noise | Generated types may produce verbose output   | TS Compiler API resolves actual types cleanly             |
| Integration     | Markdown files need to be wired into Next.js | `<auto-type-table>` tag in MDX, processed at compile time |
| Maintenance     | TypeDoc config + build scripts per package   | Single remark plugin setup in `source.config.ts`          |

#### 1.1 Install fumadocs-typescript (already included in Phase 0 dependencies)

```bash
cd packages/guidelines
yarn add fumadocs-typescript
```

This is already included in the `package.json` from Phase 0.

#### 1.2 remarkAutoTypeTable Configuration (already done in Phase 0)

The `source.config.ts` file from Phase 0.2 already sets up the `remarkAutoTypeTable` remark plugin with the TypeScript generator and FS cache. The `mdx-components.tsx` from Phase 0.3 registers the `TypeTable` component needed to render the output.

#### 1.3 Usage in MDX Documentation

In any component documentation file, use `<auto-type-table>` to render a prop table at compile time:

```mdx
## Props

<auto-type-table
  path="../../../packages/components/src/components/Button/Button.tsx"
  name="ButtonProps"
/>
```

> **Note:** With the remark plugin, the `path` is relative to the MDX file (not the project root). Use `../../../` to reach the packages directory from `content/docs/components/`.

**How it works:**

1. The `remarkAutoTypeTable` remark plugin runs during MDX compilation (at `next build` time)
2. It uses the TypeScript Compiler API to read the specified `.tsx` file
3. It resolves the named type/interface (e.g., `ButtonProps`)
4. It transforms the `<auto-type-table>` tag into a `<TypeTable>` component with the resolved type data
5. Results are cached to `.next/fumadocs-typescript/` for faster rebuilds
6. The output is baked into the static HTML — no runtime TypeScript resolution needed

**Why this is better for static export:** The remark plugin processes types during MDX _compilation_, which is earlier and more predictable than React Server Component execution. There's no ambiguity about whether the RSC will have file system access.

**Handling complex types (Panda CSS):**

The `remarkAutoTypeTable` remark plugin (configured in Phase 0.2) already handles compilation-time type resolution. If Panda CSS generates verbose types, you can target specific interfaces by using the `name` attribute:

```mdx
<!-- Only document the public-facing props, not internal Panda CSS types -->

<auto-type-table
  path="../../../packages/components/src/components/Button/Button.tsx"
  name="ButtonProps"
/>
```

Or create a simplified type alias in the component file:

```ts
// In Button.tsx — export a clean type alias for docs
export type ButtonProps = Pick<
  InternalButtonProps,
  'mode' | 'status' | 'disabled' | 'children'
>;
```

#### 1.4 Validate on Sample Components

Before migrating all ~66 docs:

1. Test `<auto-type-table>` on 2-3 components with varying complexity:
   - Simple component (e.g., Button — few props)
   - Complex component (e.g., RichSelect — many props, generics)
   - Panda CSS styled component (to verify type resolution isn't noisy)
2. Adjust paths and type names as needed
3. Verify output is clean and useful

#### 1.5 Token Documentation

For tokens, `<auto-type-table>` can document token type interfaces:

```mdx
<auto-type-table
  path="../../../packages/tokens/src/index.ts"
  name="DesignTokens"
/>
```

**No build scripts needed** — no `docs:api` script, no `typedoc.json`, no `typedoc-plugin-markdown`. The entire TypeDoc pipeline is replaced by a single remark plugin + MDX tag.

---

### Phase 2: Documentation Translator (Simplified)

**Goal:** Parse Fumadocs MDX files to create AI-consumable documentation

**Simpler than before:** Fumadocs MDX files use standard frontmatter, clean markdown, and native component rendering — no custom Storybook components to parse or iframe URLs to extract.

#### 2.1 Create Translator Package Structure

```
packages/guidelines/scripts/
├── translate-docs.ts          # Main translator script
├── parsers/
│   ├── mdx-parser.ts         # Parse Fumadocs MDX files (frontmatter + content)
│   ├── autodocs-parser.ts    # Parse Storybook autodocs metadata
│   └── types-parser.ts       # Extract TypeScript types (optional — remarkAutoTypeTable handles this on-site)
└── formatters/
    ├── markdown-formatter.ts  # Format for AI consumption
    └── skills-formatter.ts    # Format UI translation skills
```

#### 2.2 MDX Parser Implementation

**Purpose:** Extract documentation content from Fumadocs MDX files

**Key Features:**

- Parse MDX frontmatter (title, description from `---` blocks)
- Extract markdown content sections
- Identify Chromatic links
- Preserve code blocks
- Extract usage guidelines

**Dependencies:**

```bash
cd packages/guidelines
yarn add -D gray-matter
```

**Simpler than before:** Fumadocs MDX files are pure documentation with standard frontmatter. No `<StorybookEmbed>` components or iframe URLs to parse — just standard markdown with native component renders and Chromatic links.

**Output Format:**

```markdown
# Component: Button

## Overview

Buttons allow users to take actions and make choices with a single tap.

## Usage

[Usage guidelines with code examples]

## Visual Examples

Explore interactive examples on Storybook:

- [Primary Button](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components-button--primary)

Read full documentation:

- [Button Guidelines](https://iress.github.io/design-system/docs/components/button)

**For AI agents with browser tools:** You can navigate these URLs using Chrome DevTools MCP or Playwright MCP to inspect component behavior.

## Props

[Extracted from auto-type-table or TypeScript source directly]

## Best Practices

[Extracted guidelines]
```

#### 2.3 Autodocs Parser Implementation

**Purpose:** Extract component metadata from Storybook autodocs

**Key Features:**

- Parse component args/controls
- Extract prop types from autodocs
- Capture default values
- Identify component variants

**Dependencies:**

```bash
yarn add -D @storybook/docs-tools
```

**Output Format:**

```markdown
## Component Metadata

**Props:**

- mode: "primary" | "secondary" | "tertiary" | "quaternary" | "muted"
- status: "success" | "danger"
- disabled: boolean

**Default Values:**

- mode: "secondary"
```

#### 2.4 Build Integration

Add to `packages/guidelines/package.json`:

```json
{
  "scripts": {
    "docs:translate": "tsx scripts/translate-docs.ts",
    "docs:build": "yarn docs:translate && next build",
    "prebuild": "yarn docs:translate"
  }
}
```

**Output Location:**

- `packages/components/dist/.ai/` (for components)
- `packages/tokens/dist/.ai/` (for tokens)

This ensures documentation is built before package distribution.

---

### Phase 3: Embedded AI Context

**Goal:** Include AI-consumable documentation in distributed packages

#### 3.1 Documentation Bundle Structure

```
packages/components/dist/
├── index.js                    # Main exports
├── index.d.ts                  # TypeScript definitions
└── .ai/                        # AI context directory
    ├── components/             # Component documentation
    │   ├── Button.md
    │   ├── Input.md
    │   └── ...
    ├── patterns/               # Pattern documentation
    │   ├── forms.md
    │   └── navigation.md
    ├── skills/                 # AI skills
    │   ├── ui-translation.md
    │   └── figma-to-ids.md
    ├── chromatic-links.json    # Storybook story URLs
    └── index.json              # Manifest
```

#### 3.2 Manifest File Format

**Purpose:** Allow AI agents to discover available documentation and Chromatic links

`packages/components/dist/.ai/index.json`:

```json
{
  "package": "@iress-oss/ids-components",
  "version": "1.0.0",
  "urls": {
    "guidelines": "https://iress.github.io/design-system",
    "storybook": "https://main--691abcc79dfa560a36d0a74f.chromatic.com"
  },
  "storybook": {
    "baseUrl": "https://main--691abcc79dfa560a36d0a74f.chromatic.com",
    "stories": {
      "Button": {
        "primary": "https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components-button--primary",
        "secondary": "https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components-button--secondary"
      },
      "Input": {
        "default": "https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components-input--default"
      }
    }
  },
  "documentation": {
    "components": [
      {
        "name": "Button",
        "path": "components/Button.md",
        "category": "Actions",
        "guidelinesUrl": "https://iress.github.io/design-system/components/button",
        "storybookUrl": "https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-button--docs"
      }
    ],
    "patterns": [
      {
        "name": "Forms",
        "path": "patterns/forms.md",
        "guidelinesUrl": "https://iress.github.io/design-system/patterns/forms"
      }
    ],
    "skills": [
      {
        "name": "UI Translation",
        "path": "skills/ui-translation.md",
        "description": "Translate UI descriptions into IDS components"
      }
    ]
  },
  "api": {
    "source": "fumadocs-typescript (remarkAutoTypeTable remark plugin — resolved from TypeScript source at MDX compile time)",
    "guidelinesUrl": "https://iress.github.io/design-system/docs/components"
  }
}
```

**For Canary Builds:** `packages/components/dist/.ai/index.json` (canary)

```json
{
  "package": "@iress-oss/ids-components",
  "version": "1.0.0-canary.1",
  "urls": {
    "guidelines": "https://iress.github.io/design-system/canary",
    "storybook": "https://canary--691abcc79dfa560a36d0a74f.chromatic.com"
  },
  "storybook": {
    "baseUrl": "https://canary--691abcc79dfa560a36d0a74f.chromatic.com",
    "stories": {
      "Button": {
        "primary": "https://canary--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components-button--primary"
      }
    }
  }
}
```

**Build Script:** `packages/guidelines/scripts/generate-manifest.ts`

```ts
// Generate manifest with customizable URLs from environment variables
const storybookUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL;
const guidelinesUrl = process.env.NEXT_PUBLIC_GUIDELINES_URL;

const manifest = {
  urls: {
    guidelines: guidelinesUrl,
    storybook: storybookUrl,
  },
  // ... rest of manifest
};
```

#### 3.3 Package Configuration

Update `packages/components/package.json`:

```json
{
  "files": ["dist", "README.md", "LICENSE"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./.ai/*": "./dist/.ai/*"
  }
}
```

This allows AI agents to import documentation:

```javascript
// AI agent can access
import manifest from '@iress-oss/ids-components/.ai/index.json';
```

---

### Phase 4: UI Translation Skills

**Goal:** Create skills that help AI agents translate UI descriptions and Figma designs into IDS components

#### 4.1 UI Translation Skill

**File:** `packages/components/dist/.ai/skills/ui-translation.md`

**Content Structure:**

```markdown
# Skill: UI Translation

## Purpose

Translate natural language UI descriptions into IDS component implementations.

## Process

1. **Identify UI Elements**
   - Parse description for UI components (buttons, inputs, forms, etc.)
   - Map to IDS component names

2. **Determine Layout**
   - Identify layout patterns (grid, flex, stack)
   - Use IDS layout components (Box, Stack, Grid)

3. **Apply Styling**
   - Use design tokens for spacing, colors, typography
   - Reference: @iress-oss/ids-tokens

4. **Component Mapping**

| Description     | IDS Component              | Example                                                |
| --------------- | -------------------------- | ------------------------------------------------------ |
| "submit button" | IressButton mode="primary" | `<IressButton mode="primary">Submit</IressButton>`     |
| "text input"    | IressField + IressInput    | `<IressField label="Name"><IressInput /></IressField>` |
| "dropdown menu" | IressSelect                | `<IressSelect options={[...]} />`                      |

## Examples

### Input: "A login form with email and password fields and a submit button"

### Output:

\`\`\`tsx
import { IressButton, IressField, IressInput, IressStack } from '@iress-oss/ids-components';

function LoginForm() {
return (
<IressStack gap="md">
<IressField label="Email">
<IressInput type="email" />
</IressField>
<IressField label="Password">
<IressInput type="password" />
</IressField>
<IressButton mode="primary" type="submit">Login</IressButton>
</IressStack>
);
}
\`\`\`

## Best Practices

- Always use semantic HTML
- Include accessibility props (labels, aria-\*)
- Use design tokens for consistency
- Follow IDS composition patterns
```

#### 4.2 Figma to IDS Skill

**File:** `packages/components/dist/.ai/skills/figma-to-ids.md`

**Content Structure:**

```markdown
# Skill: Figma to IDS Translation

## Purpose

Translate Figma designs into IDS component implementations.

## Process

1. **Analyze Figma Structure**
   - Identify frames and auto-layout
   - Map to IDS layout components

2. **Component Recognition**
   - Match Figma components to IDS components
   - Use component names and properties

3. **Extract Design Tokens**
   - Colors → IDS color tokens
   - Typography → IDS text styles
   - Spacing → IDS spacing tokens

4. **Figma Property Mapping**

| Figma Property           | IDS Equivalent                   |
| ------------------------ | -------------------------------- |
| Auto-layout (vertical)   | IressStack (default vertical)    |
| Auto-layout (horizontal) | IressInline                      |
| Gap                      | IressStack gap / IressInline gap |
| Fill color               | colour token                     |
| Text style               | IressText component              |

## Examples

### Figma: Button Component

- Fill: Primary/500
- Text: "Submit"
- Padding: 12px 24px
- Border radius: 4px

### IDS Implementation:

\`\`\`tsx
<IressButton mode="primary">Submit</IressButton>
\`\`\`

(IDS IressButton already includes correct padding, radius from design tokens)

## Token Reference

### Colors

\`\`\`tsx
import { colour } from '@iress-oss/ids-tokens';

// Figma: Primary/500 → colour.primary[500]
// Figma: Neutral/100 → colour.neutral[100]
\`\`\`

### Spacing

\`\`\`tsx
import { spacing } from '@iress-oss/ids-tokens';

// Figma: 8px gap → spacing.sm
// Figma: 16px gap → spacing.md
// Figma: 24px gap → spacing.lg
\`\`\`

## Best Practices

- Prefer IDS components over custom styling
- Use design tokens instead of hardcoded values
- Maintain responsive behavior
- Preserve accessibility features
```

#### 4.3 Skills for Tokens Package

**File:** `packages/tokens/dist/.ai/skills/token-usage.md`

```markdown
# Skill: Design Token Usage

## Purpose

Guide AI agents on proper usage of IDS design tokens.

## Token Categories

### Colours

\`\`\`tsx
import { colour } from '@iress-oss/ids-tokens';

// Semantic colours
colour.primary[500] // Primary actions
colour.success[500] // Success states
colour.error[500] // Error states
colour.neutral[100] // Backgrounds
\`\`\`

### Spacing

\`\`\`tsx
import { spacing } from '@iress-oss/ids-tokens';

spacing.xs // 4px
spacing.sm // 8px
spacing.md // 16px
spacing.lg // 24px
spacing.xl // 32px
\`\`\`

### Typography

\`\`\`tsx
import { typography } from '@iress-oss/ids-tokens';

typography.heading1
typography.heading2
typography.body
typography.caption
\`\`\`

## Token Object

All tokens are also available as a single object:

\`\`\`tsx
import { designTokens } from '@iress-oss/ids-tokens';

designTokens.colour // All colour tokens
designTokens.spacing // All spacing tokens
designTokens.typography // All typography tokens
designTokens.radius // All border radius tokens
\`\`\`

## Usage Rules

1. **Always use tokens** - Never hardcode values
2. **Semantic naming** - Use purpose-based tokens (primary, success) not colour names (blue, green)
3. **Consistent spacing** - Use spacing scale, don't create custom values
4. **Responsive** - Tokens adapt to screen size automatically

## Examples

### ❌ Bad

\`\`\`tsx

<div style={{ color: '#0066CC', padding: '15px' }}>
\`\`\`

### ✅ Good

\`\`\`tsx

<div style={{ color: colour.primary[500], padding: spacing.md }}>
\`\`\`
```

---

### Phase 5: Storybook Simplification & Custom MCP Deprecation

**Goal:** Deprecate custom MCP server, simplify Storybook configuration

**Prerequisites:** Guidelines site must be production-ready before any Storybook simplification begins.

#### 5.0 Audit Storybook Custom Components

**Goal:** Categorise all custom storybook-config components into keep/remove/migrate

The `packages/storybook-config/src/components/` directory contains 10+ custom components. Before simplification, each must be assessed:

| Component                   | Purpose                                               | Action                                                        |
| --------------------------- | ----------------------------------------------------- | ------------------------------------------------------------- |
| `IressStorybook.tsx`        | Custom DocsContainer with MDX/IDS component mapping   | **Remove** (autodocs replaces)                                |
| `IressStorybookContext.tsx` | React context mapping for in-development components   | **Remove** (no longer needed)                                 |
| `ComponentOverview.tsx`     | Custom overview display (description, status, canvas) | **Remove** (migrated to guidelines)                           |
| `ComponentExample.tsx`      | Custom story rendering                                | **Remove** (migrated to guidelines)                           |
| `ComponentCanvas.tsx`       | Custom story canvas wrapper                           | **Remove** (autodocs replaces)                                |
| `ComponentApi.tsx`          | API documentation display                             | **Remove** (fumadocs-typescript remarkAutoTypeTable replaces) |
| `ComponentApiExpander.tsx`  | Expandable API sections                               | **Remove** (fumadocs-typescript remarkAutoTypeTable replaces) |
| `ComponentApiHeading.tsx`   | API section headings                                  | **Remove** (fumadocs-typescript remarkAutoTypeTable replaces) |
| `ComponentStatus.tsx`       | Status badges in navigation                           | **Evaluate** (may want to keep for story tags)                |
| `CodeSandbox.tsx`           | CodeSandbox integration                               | **Evaluate** (used in stories, may keep)                      |
| `DiffViewer.tsx`            | Code diff comparison                                  | **Evaluate** (used in stories, may keep)                      |
| `CurrentBreakpoint.tsx`     | Breakpoint display utility                            | **Keep** (useful for development)                             |
| `IDSStyles.tsx`             | IDS stylesheet injection                              | **Keep** (required for component rendering)                   |
| `Redirect.tsx`              | Story navigation redirect                             | **Remove** (no longer needed)                                 |
| `HideSidebar.tsx`           | Sidebar toggle utility                                | **Remove**                                                    |

**Storybook Composition Impact:**

The root Storybook composes the components and tokens Storybooks. Simplifying the components Storybook will affect composition. Address by:

- Testing composition still works with autodocs-only configuration
- Updating root Storybook `main.ts` to remove MDX-specific composition config
- Resetting Chromatic baselines after the migration (expect visual diff changes)

#### 5.1 Simplify Storybook Configuration

**Goal:** Remove custom MDX overrides and use autodocs

**File:** `packages/components/.storybook/main.ts`

```ts
// Remove custom MDX configuration
// Enable autodocs
export default {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
    // Remove custom addons for MDX handling
  ],
  docs: {
    autodocs: true, // Enable automatic documentation
  },
};
```

**Remove:**

- Custom `.docs.mdx` files (migrated to guidelines)
- Custom Storybook components (ComponentOverview, ComponentExample)
- MDX overrides in Storybook config

**Keep:**

- `.stories.tsx` files (for interactive examples)
- Autodocs configuration

#### 5.2 Documentation Updates

**File:** `docs/AI_INTEGRATION.md`

```markdown
# AI Integration with IDS

## For AI Agents

When users install IDS packages, you have access to comprehensive documentation:

### Accessing Embedded Documentation

\`\`\`javascript
// Read manifest
import manifest from '@iress-oss/ids-components/.ai/index.json';

// Access component docs
import buttonDocs from '@iress-oss/ids-components/.ai/components/Button.md';

// Access skills
import uiTranslation from '@iress-oss/ids-components/.ai/skills/ui-translation.md';

// Get Chromatic story links
const storybookLinks = manifest.storybook.stories;
\`\`\`

### Sharing Visual Examples

When users need to see interactive examples:

1. **Share Chromatic links** from the manifest
2. **Example:** "You can see this Button in action here: [Chromatic link]"
3. Users can explore the component interactively

### Using Browser Tools (Advanced)

If you have access to Chrome DevTools MCP or Playwright MCP:

1. Navigate to Chromatic URLs from the manifest
2. Inspect component behavior and DOM structure
3. Capture screenshots or interactions
4. Verify accessibility and responsive behavior

**Example:**
\`\`\`javascript
// Navigate to Button story
await page.goto(manifest.storybook.stories.Button.primary);

// Interact with the component
await page.click('button');

// Capture screenshot
await page.screenshot({ path: 'button-example.png' });
\`\`\`

## For Developers

### Documentation Sites

- **Guidelines:** https://iress.github.io/design-system - Full documentation (Fumadocs)
- **Storybook:** https://main--691abcc79dfa560a36d0a74f.chromatic.com - Component playground

**Canary Builds:**

- **Guidelines (Canary):** https://iress.github.io/design-system/canary
- **Storybook (Canary):** https://canary--691abcc79dfa560a36d0a74f.chromatic.com

### Benefits

- **Guidelines Site:** Rich documentation with Fumadocs (search, nav, ToC, live API tables)
- **Storybook on Chromatic:** Interactive component playground with autodocs
- **Embedded Docs:** Offline access in installed packages
- **Chromatic Links:** AI agents can share visual examples
- **Browser Tool Support:** AI agents can navigate and inspect components
- **No MCP Maintenance:** Zero custom server infrastructure
```

#### 5.3 Deprecation Plan

**Timeline:**

1. **Phase 1 (Month 1):** Implement Fumadocs guidelines site with fumadocs-typescript
2. **Phase 2 (Month 2):** Release packages with embedded docs and Chromatic links
3. **Phase 3 (Month 3):** Update documentation, announce custom MCP deprecation
4. **Phase 4 (Month 4):** Mark `@iress-oss/ids-mcp-server` as deprecated
5. **Phase 5 (Month 6):** Archive custom MCP server package

**Migration Guide:** `packages/mcp-server/MIGRATION.md`

```markdown
# Migration from Custom MCP

## What's Changing

The custom `@iress-oss/ids-mcp-server` is being deprecated in favor of:

1. Embedded `.ai/` documentation in packages
2. Chromatic links for visual exploration
3. Browser tool integration (Chrome DevTools MCP, Playwright MCP)

## Migration Steps

### For AI Agents

No MCP installation needed! Documentation is now embedded in packages:

1. **Read embedded docs:**
   \`\`\`javascript
   import manifest from '@iress-oss/ids-components/.ai/index.json';
   \`\`\`

2. **Share Chromatic links with users:**
   \`\`\`javascript
   const buttonLink = manifest.storybook.stories.Button.primary;
   // Share: "See the Button component here: [link]"
   \`\`\`

3. **Use browser tools (if available):**
   \`\`\`javascript
   // Navigate to Chromatic with Chrome DevTools MCP or Playwright MCP
   await page.goto(manifest.storybook.stories.Button.primary);
   \`\`\`

### For Developers

1. Uninstall custom MCP:
   \`\`\`bash
   yarn remove @iress-oss/ids-mcp-server

   # Remove from MCP settings

   \`\`\`

2. No replacement needed - documentation is in packages

## Benefits

- ✅ No MCP server to install or configure
- ✅ No local Storybook server required
- ✅ Embedded docs work offline
- ✅ Chromatic links always accessible
- ✅ Browser tools provide advanced inspection
- ✅ Zero maintenance
```

---

## Implementation Checklist

### Phase 0: Fumadocs Guidelines Site

- [ ] Initialize Fumadocs project in packages/guidelines (`create-fumadocs-app`)
- [ ] Configure `source.config.ts` with MDX content source and fumadocs-typescript
- [ ] Configure `next.config.mjs` with static export and GitHub Pages basePath
- [ ] Set up App Router layout with `DocsLayout`, `RootProvider` and IDS `IressProvider`
- [ ] Create docs page structure (`content/docs/components/`, `content/docs/patterns/`)
- [ ] Set up `mdx-components.tsx` with `TypeTable`, `@fumadocs/story`, and IDS component mapping
- [ ] Configure Fumadocs search API (Orama-based)
- [ ] Create hybrid component documentation approach (native renders + Chromatic links + @fumadocs/story)
- [ ] Create migration script (scripts/migrate-docs.ts)
- [ ] Run migration script to move ~66 .docs.mdx files to Fumadocs content directory
- [ ] Add `meta.json` files for navigation ordering
- [ ] Manually review migrated docs (verify auto-type-table paths, add @fumadocs/story definitions)
- [ ] Handle recipe files (e.g., PopoverRecipes.docs.mdx) — decide on guidelines structure
- [ ] Delete original .docs.mdx files from packages/components and packages/tokens
- [ ] Configure environment variables for customizable Chromatic/guidelines URLs
- [ ] Set up GitHub Pages deployment in CI/CD
- [ ] Configure canary build support (basePath, Chromatic URLs)

### Phase 0.5: Smoke Test (Before Full Migration)

- [ ] Set up 3 representative components: simple (Button), complex (RichSelect), Panda CSS styled
- [ ] Verify `<auto-type-table>` resolves types correctly (check `tsconfigPath` reaches component types)
- [ ] Verify `<story.WithControl />` renders IDS components (confirmed client-compatible, but validate end-to-end)
- [ ] Verify IDS Panda CSS styles render correctly in Fumadocs (import `style.css`, confirm atomic classes like `bg-c_colour.system.info.surface` work)
- [ ] Verify `IDSClientProvider` wrapper works in root layout (`IressProvider` needs `'use client'` due to `createPortal` to `document.head`)
- [ ] Verify static export produces correct HTML (`next build` → check `out/` directory)
- [ ] Verify Orama search index works in static mode
- [ ] Confirm all 3 test component pages look correct before proceeding to full migration

### Phase 1: Live TypeScript API Documentation (fumadocs-typescript)

- [ ] Verify fumadocs-typescript installed (included in Phase 0 dependencies)
- [ ] Test `<auto-type-table>` on a simple component (e.g., Button)
- [ ] Test `<auto-type-table>` on a complex component (e.g., RichSelect — many props, generics)
- [ ] Test `<auto-type-table>` on a Panda CSS styled component (verify type resolution isn't noisy)
- [ ] Adjust paths and type names as needed
- [ ] Test token documentation (`<auto-type-table>` on tokens package types)
- [ ] Verify FS cache works correctly (`.next/fumadocs-typescript/`)
- [ ] No separate build scripts needed — remarkAutoTypeTable runs at MDX compile time

### Phase 2: Documentation Translator

- [ ] Create translator script structure in guidelines
- [ ] Implement Fumadocs MDX parser (frontmatter + content extraction via gray-matter)
- [ ] Implement Storybook autodocs parser
- [ ] Implement types parser (optional — remarkAutoTypeTable handles this on-site)
- [ ] Create markdown formatter for AI consumption
- [ ] Test on sample components
- [ ] Integrate into build pipeline

### Phase 3: Embedded AI Context

- [ ] Design .ai directory structure
- [ ] Create manifest format
- [ ] Update package.json exports
- [ ] Generate documentation bundle
- [ ] Test package installation
- [ ] Verify AI agent access

### Phase 4: UI Translation Skills

- [ ] Write UI translation skill
- [ ] Write Figma to IDS skill
- [ ] Write token usage skill
- [ ] Create skill examples
- [ ] Test with AI agents
- [ ] Document skill usage

### Phase 5: Storybook Simplification & Custom MCP Deprecation

- [ ] Audit storybook-config custom components (keep/remove/migrate each)
- [ ] Test Storybook composition with autodocs-only config
- [ ] Remove custom MDX from Storybook
- [ ] Enable Storybook autodocs
- [ ] Remove identified custom Storybook components
- [ ] Simplify Storybook configuration
- [ ] Reset Chromatic baselines after migration
- [ ] Generate Chromatic links manifest with customizable URLs
- [ ] Generate GitHub Pages links in manifest
- [ ] Configure canary build manifests
- [ ] Write AI integration docs
- [ ] Create migration guide
- [ ] Update README files
- [ ] Announce custom MCP deprecation
- [ ] Mark custom MCP package as deprecated
- [ ] Archive custom MCP server

---

## Success Metrics

### Maintenance Reduction

- **Before:** Custom MCP server + custom Storybook MDX + documentation scraper
- **After:** Fumadocs guidelines + Storybook autodocs + static translator
- **Savings:** ~90% reduction in maintenance effort (no MCP server at all)

### Performance Improvements

- **Storybook:** Lighter and faster (no custom MDX overrides)
- **Guidelines:** Better UX with Fumadocs (built-in search, nav, ToC, faster page loads, better SEO)
- **Build Time:** Faster (no Playwright scraping, no MCP server, no TypeDoc build step)
- **API Docs:** No separate build step — fumadocs-typescript resolves types at build time from TypeScript source (during `next build`)

### AI Context Quality

- **API Coverage:** 100% of public APIs documented via fumadocs-typescript `remarkAutoTypeTable`
- **Component Coverage:** 100% of components with embedded docs
- **Visual Examples:** Chromatic links for all stories
- **Skills:** 3+ translation skills for UI/Figma conversion
- **Source:** Clean Fumadocs MDX (easier to parse and maintain)

### Developer Experience

- **Installation:** Single `yarn add @iress-oss/ids-components` includes all docs
- **Discovery:** AI agents automatically find embedded documentation
- **Visual Exploration:** Chromatic links always accessible
- **Advanced Inspection:** Browser tools can navigate Chromatic
- **Documentation:** Better UX with Fumadocs guidelines site (search, nav, ToC built-in)

### AI Agent Capabilities

- **Offline:** Read embedded docs without any server
- **Visual Sharing:** Provide Chromatic links to users
- **Browser Integration:** Navigate Chromatic with Chrome DevTools MCP or Playwright MCP
- **Zero Config:** No MCP installation or configuration needed

---

## Risks & Mitigations

### Risk: Chromatic Link Stability

**Mitigation:** Use stable Chromatic URLs; include fallback to guidelines site; version links in manifest

### Risk: Documentation Bundle Size

**Mitigation:** Markdown is lightweight; gzip compression; Chromatic links are just URLs

### Risk: AI Agent Compatibility

**Mitigation:** Standard markdown format; JSON manifest for discovery; test with multiple agents

### Risk: Build Time Increase

**Mitigation:** Translator runs in parallel; fumadocs-typescript uses FS cache (`.next/fumadocs-typescript/`); only rebuild on changes

### Risk: Browser Tool Availability

**Mitigation:** Chromatic links work without browser tools; browser tools are optional enhancement

### Risk: Storybook Composition Breakage

**Mitigation:** Test composition with autodocs-only config before removing custom components; update root Storybook config; reset Chromatic baselines

### Risk: remarkAutoTypeTable Type Resolution with Panda CSS

**Mitigation (UPDATED after code review):** This is a **moderate risk** that needs careful validation. IDS components have complex type structures:

- **`IressCSSProps`** (in `interfaces.ts`) has ~25+ styling props (`bg`, `color`, `m`, `p`, `textStyle`, etc.) each using `ResponsiveProp<T>` and `UtilityValues` types from Panda CSS's generated `styled-system/types/prop-type`. These are deep generics that `remarkAutoTypeTable` must resolve.
- **`ButtonProps`** uses advanced generics with conditional types: `ButtonElement<C extends ElementType | undefined, THref extends string | undefined>` — polymorphic component pattern with type-level inference.
- **`IressAlertProps`** extends `Omit<IressTextProps, 'element'>` — chained Omit types that must be resolved.
- **Panda CSS types** like `UtilityValues['color']` and `SpacingToken` are generated types from `styled-system/tokens` — the TS Compiler API must be able to follow these paths.

The `tsconfigPath` pointing to the components package tsconfig is essential (already configured). Use the `name` attribute to target specific exported interfaces. For complex components like `Button`, consider creating a simplified `ButtonDocProps` type alias that picks only the user-facing props. Test on Button (complex generics), Alert (chained Omit/extends), and a simple component early in Phase 0.5.

### Risk: Panda CSS Style Delivery in Fumadocs

**Mitigation (UPDATED after code review):** IDS components do **not** use Shadow DOM for rendering — they use standard Panda CSS atomic classes with a compiled `styles.css` stylesheet (via `import './styled-system/styles.css'` in `main.ts`). The Fumadocs guidelines site must import this stylesheet in its root layout or global CSS for components to render correctly. Additionally, `IressProvider` calls `createPortal(...)` to inject `<link>` tags into `document.head` for fonts — this requires a browser DOM, so `IressProvider` **cannot be used in a React Server Component**. It must be wrapped in a `'use client'` client component boundary. The root layout should import `@iress-oss/ids-components/style.css` (the built CSS output) and wrap `IressProvider` in a client component.

**Specific actions:**

1. Import the IDS stylesheet: `import '@iress-oss/ids-components/style.css'` in the root layout
2. Create a client wrapper: `'use client'` component that renders `<IressProvider>{children}</IressProvider>`
3. Use the client wrapper in the root layout instead of `<IressProvider>` directly
4. Validate in Phase 0.5 that Panda CSS atomic classes resolve correctly (e.g., `bg-c_colour.system.info.surface`)

### Risk: @fumadocs/story Client Component Requirement

**Mitigation (UPDATED after code review):** `@fumadocs/story` requires the `Component` option to be a client component. IDS components are confirmed to be client-compatible — the Panda CSS styled-system already uses `'use client'` in generated files (e.g., `create-style-context.mjs`), and components are standard React functional components using hooks (`useState`, `useRef`, `useCallback`, etc.) with no server-only APIs. No `'use client'` wrappers should be needed for `@fumadocs/story` integration. However, `IressProvider` uses `createPortal` to `document.head`, so it cannot be rendered in an RSC context — ensure it's in a client boundary (see Panda CSS Style Delivery risk above).

### Risk: Generator tsconfigPath Resolution

**Mitigation:** The `remarkAutoTypeTable` generator defaults to `./tsconfig.json` (the guidelines package tsconfig), but `<auto-type-table>` references component files via `../../../packages/components/src/...`. The generator must use the components package tsconfig (or a root composite tsconfig) to resolve these types. Misconfiguration produces empty/missing type tables silently. Validate early in Phase 0.5.

### Risk: Fumadocs Framework Lock-in

**Mitigation:** Fumadocs is built on standard Next.js App Router — content is standard MDX files with frontmatter. Migration away would only require replacing layout/navigation components, not rewriting content. MDX files remain portable.

### Risk: Migration Script Coverage

**Mitigation:** The 66 `.docs.mdx` files have varying formats (some use `ComponentOverview`, some have recipe files like `PopoverRecipes.docs.mdx`); manual review after migration is essential; budget time for edge cases

---

## Future Enhancements

### Phase 6: Interactive Examples

- Embed CodeSandbox links in documentation
- Provide runnable examples in AI context

### Phase 7: Visual Documentation

- Include component screenshots in embedded docs
- Provide visual reference for AI agents

### Phase 8: Semantic Search

- Fumadocs already provides Orama-based search for the guidelines site
- Add search index to .ai directory for embedded AI context
- Enable AI agents to query documentation efficiently

### Phase 9: Multi-Version Support

- Support multiple versions in GitHub Pages (e.g., /v1, /v2)
- Version-specific Chromatic links
- Version switcher in guidelines site

---

## Conclusion

This strategy achieves the goals of:

1. ✅ **Zero Maintenance:** No custom MCP server whatsoever
2. ✅ **Better Documentation UX:** Fumadocs guidelines site with built-in search, navigation, ToC, and live API tables
3. ✅ **Lighter Storybook:** Autodocs only, no custom MDX overrides
4. ✅ **Rich AI Context:** fumadocs-typescript (live API docs) + embedded docs + Chromatic links + skills
5. ✅ **Easy Discovery:** Documentation included in package installation
6. ✅ **Visual Examples:** Chromatic links for interactive exploration + native IDS renders in guidelines
7. ✅ **Browser Tool Support:** AI agents can navigate Chromatic directly
8. ✅ **Best Practices:** Skills guide AI agents on proper IDS usage
9. ✅ **No Separate Build Step for API Docs:** fumadocs-typescript resolves types during `next build` — no separate TypeDoc pipeline, no staleness risk

The approach (Fumadocs guidelines + Storybook autodocs + embedded `.ai/` + Chromatic links) provides:

- **Clear separation:** Guidelines for documentation, Storybook for playground/Chromatic
- **Zero infrastructure:** No MCP servers to maintain
- **Rich offline context:** AI agents access docs from installed packages
- **Visual sharing:** AI agents provide Chromatic links to users
- **Advanced capabilities:** Browser tools can inspect components on Chromatic
- **Better UX:** Fumadocs provides superior documentation experience (search, nav, ToC, live API tables)
- **No staleness:** API documentation always reflects current TypeScript source via fumadocs-typescript
- **Hybrid component docs:** Native IDS renders for simple examples, @fumadocs/story for interactive controls, Chromatic for full playground

This is simpler to implement and maintain than any MCP-based approach, while providing better outcomes for developers, users, and AI agents.
