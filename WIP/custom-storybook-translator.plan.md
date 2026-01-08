# Custom Storybook Documentation Translator

**Created:** 7 January 2026  
**Status:** Planning  
**Purpose:** Replace Playwright-based documentation scraping with a custom translator that directly parses MDX and TSX files

---

## Executive Summary

Build a custom translator that parses `.docs.mdx` and `.stories.tsx` files directly, converting them into structured markdown for the MCP server. This eliminates the need for Playwright, speeds up builds, and provides more reliable documentation extraction.

---

## Current Architecture Analysis

### Current Approach (Playwright-based)

**Process:**

1. Launch Chromium browser via Playwright
2. Navigate to Storybook at `http://localhost:6006`
3. Scrape rendered HTML from each documentation page
4. Convert HTML to Markdown using Turndown
5. Save to `packages/mcp-server/generated/docs/`
6. MCP server reads these generated markdown files

**Pain Points:**

- ❌ Requires running Storybook server
- ❌ Slow (browser startup, page rendering, navigation)
- ❌ Unreliable (DOM selectors can break, timing issues)
- ❌ Resource intensive (headless Chrome)
- ❌ Complex debugging (browser automation issues)
- ❌ Can't extract source-level metadata easily

### Documentation Structure

```
packages/components/src/components/Button/
├── Button.tsx                 # Component implementation with TypeScript types
├── Button.docs.mdx            # MDX documentation (Markdown + JSX components)
├── Button.stories.tsx         # Storybook stories with code examples
└── Button.test.tsx            # Tests (not needed for docs)
```

**MDX File Structure:**

- Imports: ComponentOverview, ComponentExample from storybook-config
- Markdown content with headings and descriptions
- JSX components: `<ComponentOverview>`, `<ComponentExample>`
- References to stories via `of={ComponentStories.StoryName}`

**Stories File Structure:**

- Meta exports with title, component, tags
- Story exports (Default, Mode, Pill, etc.)
- Render functions with actual React components
- Args and argTypes for controls

---

## Proposed Architecture: Direct File Parser

### High-Level Approach

**Parse source files directly** → **Extract content** → **Generate structured markdown** → **MCP server consumes**

```
Source Files                Custom Translator              Output
━━━━━━━━━━━━               ━━━━━━━━━━━━━━━━━             ━━━━━━━━
Button.docs.mdx     ──→    MDX Parser           ──→    components-button-docs.md
Button.stories.tsx  ──→    TSX/AST Parser       ──→    (includes code examples)
Button.tsx          ──→    TypeScript Parser    ──→    (includes prop types)
```

### Benefits

✅ **No browser required** - Direct file parsing  
✅ **Faster builds** - No browser startup/rendering overhead  
✅ **More reliable** - No DOM selector brittleness  
✅ **Type-aware** - Can extract TypeScript types directly  
✅ **Better metadata** - Access to source-level information  
✅ **Easier debugging** - Plain file parsing vs browser automation  
✅ **CI/CD friendly** - No headless browser dependencies

---

## Implementation Strategy

### Phase 1: MDX Parser

**Goal:** Extract markdown content from `.docs.mdx` files while removing JSX components

**Libraries:**

- `@mdx-js/mdx` - Parse MDX to AST
- `unified` + `remark` - Transform markdown AST
- `mdast-util-to-markdown` - Convert AST back to markdown

**Process:**

```typescript
// 1. Parse MDX to AST
import { compile } from '@mdx-js/mdx';
import { visit } from 'unist-util-visit';

async function parseMDX(mdxContent: string): Promise<string> {
  // Parse MDX to AST
  const result = await compile(mdxContent, {
    outputFormat: 'function-body',
    development: false,
  });

  // Transform AST:
  // - Remove JSX elements (ComponentOverview, ComponentExample, etc.)
  // - Keep markdown content (headings, paragraphs, code blocks)
  // - Extract story references from JSX props

  // Convert back to plain markdown
  return cleanMarkdown;
}
```

**Transformation Rules:**

| MDX Element                             | Action                  | Output                       |
| --------------------------------------- | ----------------------- | ---------------------------- |
| `# Heading`                             | Keep as-is              | `# Heading`                  |
| `Plain text`                            | Keep as-is              | `Plain text`                 |
| ` ```code``` `                          | Keep as-is              | ` ```code``` `               |
| `<ComponentOverview description="...">` | Extract description     | Description text             |
| `<ComponentExample of={Story}>`         | Replace with story code | ` ```tsx\n{storyCode}\n``` ` |
| `import` statements                     | Remove                  | _(removed)_                  |

**Example Transformation:**

```mdx
// INPUT: Badge.docs.mdx
import { ComponentOverview, ComponentExample } from '@iress-oss/ids-storybook-config';
import \* as ComponentStories from './Badge.stories';

# Badge

<ComponentOverview
  description="Badges are used to highlight an item's status for quick recognition"
  of={ComponentStories.Default}
/>

## Examples

### Mode

The `mode` prop controls the colour scheme of the badge.

<ComponentExample of={ComponentStories.Mode} />
```

```markdown
// OUTPUT: components-badge-docs.md

# Badge

Badges are used to highlight an item's status for quick recognition

## Examples

### Mode

The `mode` prop controls the colour scheme of the badge.

**Example:**

\`\`\`tsx
import { IressBadge, IressInline } from '@iress-oss/ids-components';

const BADGE_MODES = ['primary', 'success', 'warning', 'danger', 'neutral'];

export const ModeExample = () => (
<IressInline gap="sm">
{BADGE_MODES.map((mode) => (
<IressBadge key={mode} mode={mode}>
{mode}
</IressBadge>
))}
</IressInline>
);
\`\`\`
```

### Phase 2: Story Code Extractor

**Goal:** Extract renderable code examples from `.stories.tsx` files

**Libraries:**

- `@babel/parser` - Parse TypeScript/TSX to AST
- `@babel/traverse` - Walk and query AST
- `@babel/generator` - Generate code from AST

**Process:**

```typescript
import * as babel from '@babel/core';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

interface StoryCode {
  storyName: string;
  code: string;
  imports: string[];
}

function extractStoryCode(storiesFilePath: string): StoryCode[] {
  const sourceCode = fs.readFileSync(storiesFilePath, 'utf-8');

  // Parse to AST
  const ast = parse(sourceCode, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  const stories: StoryCode[] = [];
  const imports: string[] = [];

  traverse(ast, {
    // Extract import statements
    ImportDeclaration(path) {
      if (path.node.source.value.includes('@iress-oss/ids-components')) {
        imports.push(generate(path.node).code);
      }
    },

    // Extract story exports
    ExportNamedDeclaration(path) {
      const declaration = path.node.declaration;
      if (declaration?.type === 'VariableDeclaration') {
        const storyName = declaration.declarations[0].id.name;
        const storyObject = declaration.declarations[0].init;

        // Extract render function or args
        const code = extractRenderCode(storyObject);

        stories.push({
          storyName,
          code,
          imports,
        });
      }
    },
  });

  return stories;
}
```

**Story Extraction Examples:**

```tsx
// INPUT: Badge.stories.tsx
export const Mode: Story = {
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: (args) => (
    <IressInline gap="sm">
      {BADGE_MODES.map((mode) => (
        <IressBadge {...args} key={mode} mode={mode}>
          {mode}
        </IressBadge>
      ))}
    </IressInline>
  ),
};
```

```typescript
// EXTRACTED:
{
  storyName: 'Mode',
  code: `<IressInline gap="sm">
  {BADGE_MODES.map((mode) => (
    <IressBadge key={mode} mode={mode}>
      {mode}
    </IressBadge>
  ))}
</IressInline>`,
  imports: [
    "import { IressBadge, IressInline } from '@iress-oss/ids-components';"
  ]
}
```

**Handling Different Story Formats:**

```typescript
function extractRenderCode(storyObject): string {
  // Case 1: Story with render function
  if (storyObject.properties.render) {
    return extractFromRenderFunction(storyObject.properties.render);
  }

  // Case 2: Story with just args (use Default story)
  if (storyObject.properties.args) {
    return generateFromArgs(storyObject.properties.args);
  }

  // Case 3: Story extends another story
  if (storyObject.properties.spread) {
    return extractFromParentStory(storyObject);
  }

  return '';
}
```

### Phase 3: TypeDoc Integration (SIMPLIFIED!)

**Goal:** Use TypeDoc to automatically generate API documentation

**Why TypeDoc Instead of Custom Parser:**
✅ **Battle-tested** - Mature library handles all TypeScript edge cases  
✅ **Comprehensive** - Extracts types, interfaces, JSDoc, generics, inheritance  
✅ **Less code** - No custom AST parsing needed  
✅ **Better output** - Professional formatting and documentation  
✅ **Maintainable** - TypeDoc handles TypeScript updates

**Setup:**

1. **Add TypeDoc to packages/components and packages/tokens:**

```json
// packages/components/package.json
{
  "scripts": {
    "docs:api": "typedoc",
    "docs:api:watch": "typedoc --watch"
  },
  "devDependencies": {
    "typedoc": "^0.26.0",
    "typedoc-plugin-markdown": "^4.0.0"
  }
}
```

2. **Configure TypeDoc:**

```json
// packages/components/typedoc.json
{
  "entryPoints": ["src/main.ts"],
  "out": "../../mcp-server/generated/api",
  "plugin": ["typedoc-plugin-markdown"],
  "outputFileStrategy": "members",
  "hideGenerator": true,
  "excludePrivate": true,
  "excludeInternal": true,
  "readme": "none"
}
```

**Integration with Translator:**

```typescript
// Option 1: Reference TypeDoc files directly
function combineDocumentation(data): string {
  return `
# ${data.name}

${data.content}

## Props

See [API Reference](../api/components/${data.name}.md) for complete prop documentation.

## Code Examples
${data.stories.map(...).join('\n')}
  `.trim();
}

// Option 2: Extract specific sections from TypeDoc output
function extractPropsFromTypeDoc(componentName: string): string {
  const typeDocPath = `generated/api/components/${componentName}.md`;
  const content = fs.readFileSync(typeDocPath, 'utf-8');

  // Extract props section from TypeDoc markdown
  return extractSection(content, '## Properties');
}
```

**TypeDoc Output Example:**

TypeDoc automatically generates comprehensive API docs like:

```markdown
# IressButton

A button is a clickable item used to perform an action.

## Properties

### mode

• `Optional` **mode**: `"primary"` | `"secondary"` | `"tertiary"`

Controls the visual appearance and priority of the button.

**Default:** `'primary'`

### status

• `Optional` **status**: `"default"` | `"success"` | `"danger"`

Applies a visual status to the button.

**Default:** `'default'`
```

**Benefits:**

- ✅ No custom type parsing code needed
- ✅ Handles complex TypeScript (generics, unions, intersections)
- ✅ Extracts JSDoc comments automatically
- ✅ Generates clean, consistent markdown
- ✅ MCP server can consume TypeDoc output directly

### Phase 4: Combine Everything

**Main Translator Script:**

```typescript
// packages/mcp-server/scripts/translate.ts

interface TranslateOptions {
  componentsDir: string;
  outputDir: string;
  verbose?: boolean;
}

export async function translateDocumentation(options: TranslateOptions) {
  const components = findAllComponents(options.componentsDir);

  for (const component of components) {
    console.log(`Translating ${component.name}...`);

    // 1. Parse MDX documentation
    const mdxContent = await parseMDXFile(component.docsPath);

    // 2. Extract story code examples
    const stories = extractStoryCode(component.storiesPath);

    // 3. Extract TypeScript props
    const props = extractComponentProps(component.componentPath);

    // 4. Combine into structured markdown
    const markdown = combineDocumentation({
      name: component.name,
      content: mdxContent,
      stories,
      props,
    });

    // 5. Write to output directory
    const outputPath = path.join(
      options.outputDir,
      `components-${component.name.toLowerCase()}-docs.md`,
    );
    fs.writeFileSync(outputPath, markdown);

    console.log(`✓ Generated ${outputPath}`);
  }
}

function combineDocumentation(data): string {
  return `
# ${data.name}

${data.content}

## Code Examples

${data.stories
  .map(
    (story) => `
### ${story.storyName}

\`\`\`tsx
${story.imports.join('\n')}

${story.code}
\`\`\`
`,
  )
  .join('\n')}

## Props Reference

For complete API reference including all props, types, and TypeScript definitions, see:

📚 [${data.name} API Documentation](${data.typeDocPath})

**Quick Reference:**

The full prop documentation with types, descriptions, and default values is available in the API reference above.
  `.trim();
}
```

---

## File Structure

### New Files to Create

```
packages/mcp-server/
└── scripts/
    ├── translate.ts              # Main translator script
    ├── parsers/
    │   ├── mdx-parser.ts         # Parse .docs.mdx files
    │   ├── story-parser.ts       # Parse .stories.tsx files
    │   ├
├── components/
│   ├── typedoc.json              # TypeDoc configuration
│   └── src/components/...        # Components with JSDoc comments
├── tokens/
│   ├── typedoc.json              # TypeDoc configuration
│   └── src/...                   # Token definitions with JSDoc
└── mcp-server/
    ├── generated/
    │   ├── api/                  # TypeDoc-generated API docs
    │   │   ├── components/
    │   │   │   ├── Button.md
    │   │   │   └── ...
    │   │   └── tokens/
    │   └── docs/                 # Translator-generated usage docs
    │       ├── components-button-docs.md
    │       └── ...
    └── scripts/
        ├── translate.ts              # Main translator script
        ├── parsers/
        │   ├── mdx-parser.ts         # Parse .docs.mdx files
        │   ├── story-parser.ts       # Parse .stories.tsx files
        │   └── utils.ts              # Shared utilities
        ├── transformers/
        │   ├── mdx-transformer.ts    # Transform MDX AST
        │   ├── story-transformer.ts  # Transform story code
        │   └── markdown-builder.ts   # Build final markdown
        └── translate.config.ts       # Configuration
```

### Configuration File

```typescript
// packages/mcp-server/scripts/translate.config.ts

export default {
  input: {
    componentsDir: '../../components/src/components',
    patternsDir: '../../components/src/patterns',
    foundationsDir: '../../components/docs/Foundations',
  },
  output: {
    dir: '../generated/docs',
  },
  parsing: {
    extractJSDoc: true,
    extractDefaultValues: true,
    includePrivateProps: false,
  },
  stories: {
    maxExamplesPerComponent: 10,
    includeControls: false,
    formatCode: true,
  },
};
```

---

## Migration Path

### Phase 1: Setup TypeDoc & Build Core Parsers (2 days) ⚡ SIMPLIFIED

- [ ] **Set up TypeDoc** (packages/components & packages/tokens)
  - [ ] Install typedoc and typedoc-plugin-markdown
  - [ ] Create typedoc.json configuration files
  - [ ] Configure output to `mcp-server/generated/api/`
  - [ ] Add JSDoc comments to 2-3 sample components (Button, Badge)
  - [ ] Test TypeDoc generation and verify markdown output
  - [ ] Add `docs:api` scripts to package.json
- [ ] Set up project structure in `scripts/`
- [ ] Install dependencies (@mdx-js/mdx, @babel/parser)
- [ ] Implement MDX parser
  - [ ] Parse MDX to AST
  - [ ] Remove JSX components
  - [ ] Keep markdown content
- [ ] Implement Story parser
  - [ ] Parse TSX with Babel
  - [ ] Extract story exports
  - [ ] Extract render functions
  - [ ] Handle different story formats
- [ ] ~~Implement Type parser~~ ✅ **REPLACED BY TYPEDOC**
- [ ] Write unit tests for parsers

### Phase 2: Build Transformers (1-2 days) ⚡ FASTER

- [ ] Implement MDX transformer
  - [ ] Replace `<ComponentOverview>` with description
  - [ ] Replace `<ComponentExample>` with story code
  - [ ] Handle edge cases (nested components, etc.)
- [ ] Implement Story transformer
  - [ ] Format extracted code
  - [ ] Add necessary imports
  - [ ] Create complete examples
- [ ] Implement Markdown builder
  - [ ] Combine MDX content + Story examples + TypeDoc reference
  - [ ] Add links to TypeDoc API documentation
  - [ ] Format sections consistently
  - [ ] Handle cross-references
- [ ] Write integration tests

### Phase 3: Test with Sample Components (1 day)

- [ ] Ensure TypeDoc generates API docs for Button, Badge, Alert
- [ ] Run translator on Button component
- [ ] Run translator on Badge component
- [ ] Run translator on Alert component
- [ ] Compare output with current Playwright-generated docs
- [ ] Verify MCP server can read:
  - [ ] Translated documentation (with examples)
  - [ ] TypeDoc API reference
- [ ] Test prop lookups in MCP server

### Phase 4: Full Migration (1-2 days)

- [ ] Add JSDoc comments to all component interfaces
- [ ] Update package.json scripts
  ```json
  {
    "scripts": {
      "docs:api": "yarn workspace @iress-oss/ids-components run docs:api && yarn workspace @iress-oss/ids-tokens run docs:api",
      "docs:translate": "tsx scripts/translate.ts",
      "docs:build": "yarn docs:api && yarn docs:translate",
      "docs:collect": "echo 'Deprecated - use docs:build'",
      "docs:generate": "echo 'Deprecated - use docs:build'"
    }
  }
  ```
- [ ] Run TypeDoc on all components and tokens
- [ ] Run translator on all components
- [ ] Verify all generated markdown files
- [ ] Update MCP server to read both:
  - [ ] Translated docs (usage, examples)
  - [ ] TypeDoc API reference (props, types)
- [ ] Update CI/CD pipelines
- [ ] Remove Playwright dependencies
- [ ] Update documentation in README
- [ ] Archive old scripts (collect.ts, generate.ts)

### Phase 5: Optimization & Enhancements (ongoing)

- [ ] Add incremental builds (only regenerate changed files)
- [ ] Add watch mode for development
- [ ] Add validation for generated markdown
- [ ] Optimize build performance

---

## Dependencies

### Dependencies to Add

**For packages/components and packages/tokens:**

```json
{
  "devDependencies": {
    "typedoc": "^0.26.0",
    "typedoc-plugin-markdown": "^4.0.0"
  }
}
```

**For packages/mcp-server:**

```json
{
  "dependencies": {
    "@mdx-js/mdx": "^3.0.0",
    "@babel/parser": "^7.23.0",
    "@babel/traverse": "^7.23.0",
    "@babel/generator": "^7.23.0",
    "@babel/types": "^7.23.0",
    "unified": "^11.0.0",
    "remark": "^15.0.0",
    "remark-parse": "^11.0.0",
    "remark-stringify": "^11.0.0",
    "mdast-util-to-markdown": "^2.1.0",
    "unist-util-visit": "^5.0.0"
  },
  "devDependencies": {
    "@types/babel__core": "^7.20.0",
    "@types/babel__traverse": "^7.20.0"
  }
}
```

**Removed (TypeDoc replaces these):**

- ~~`ts-morph`~~ - Not needed, TypeDoc handles type extraction

### Dependencies to Remove

```json
{
  "dependencies": {
    "playwright": "REMOVE",
    "turndown": "REMOVE",
    "turndown-plugin-gfm": "REMOVE"
  }
}
```

---

## Comparison: Before vs After

### Build Time

| Approach              | Time           | Notes                                       |
| --------------------- | -------------- | ------------------------------------------- |
| **Playwright**        | ~2-3 minutes   | Browser startup, page rendering, navigation |
| **Custom Translator** | ~10-20 seconds | Direct file parsing, no browser             |

### Resource Usage

| Approach              | Memory | CPU           | Disk I/O |
| --------------------- | ------ | ------------- | -------- |
| **Playwright**        | ~500MB | High (Chrome) | Low      |
| **Custom Translator** | ~100MB | Low (Node)    | Medium   |

### Reliability

| Aspect            | Playwright                    | Custom Translator        |
| ----------------- | ----------------------------- | ------------------------ |
| **DOM Changes**   | ❌ Breaks on selector changes | ✅ Not applicable        |
| **Timing Issues** | ❌ Race conditions            | ✅ Synchronous           |
| **Dependencies**  | ❌ Chrome, Storybook server   | ✅ Just Node.js          |
| **CI/CD**         | ❌ Requires headless browser  | ✅ Standard Node process |

### Maintainability

| Aspect             | Playwright                      | Custom Translator        |
| ------------------ | ------------------------------- | ------------------------ |
| **Debugging**      | ❌ Complex (browser automation) | ✅ Simple (file parsing) |
| **Testing**        | ❌ E2E tests required           | ✅ Unit tests sufficient |
| **Error Messages** | ❌ Cryptic DOM errors           | ✅ Clear parse errors    |

---

## Example Output

### Input Files

**Button.docs.mdx:**

```mdx
import {
  ComponentOverview,
  ComponentExample,
} from '@iress-oss/ids-storybook-config';
import * as ComponentStories from './Button.stories';

# Button

<ComponentOverview
  description="A button is a clickable item used to perform an action."
  of={ComponentStories.Default}
/>

## Examples

### Modes

The `mode` prop controls the visual appearance.

<ComponentExample of={ComponentStories.Mode} />
```

**Button.stories.tsx:**

```tsx
export const Mode: Story = {
  render: (args) => (
    <IressInline gap="md">
      <IressButton mode="primary">Primary</IressButton>
      <IressButton mode="secondary">Secondary</IressButton>
    </IressInline>
  ),
};
```

### Output: components-button-docs.md

```markdown
# Button

A button is a clickable item used to perform an action.

## Examples

### Modes

The `mode` prop controls the visual appearance.

**Example:**

\`\`\`tsx
import { IressButton, IressInline } from '@iress-oss/ids-components';

export const ModesExample = () => (
<IressInline gap="md">
<IressButton mode="primary">Primary</IressButton>
<IressButton mode="secondary">Secondary</IressButton>
</IressInline>
);
\`\`\`

## Props

### mode

- **Type:** `'primary' | 'secondary' | 'tertiary'`
- **Default:** `'primary'`
- **Optional:** Yes

Controls the visual appearance and priority of the button.

### children

- **Type:** `ReactNode`
- **Optional:** No

Content for the button.
```

---

## Benefits Summary

### Development Experience

✅ **Faster feedback loop** - 10-20 seconds vs 2-3 minutes  
✅ **No browser dependencies** - Works in any CI/CD environment  
✅ **Better error messages** - Parse errors vs DOM selector failures  
✅ **Type-safe** - Leverages TypeScript AST  
✅ **Easier debugging** - File parsing vs browser automation

### Documentation Quality

✅ **Source-level accuracy** - Direct from TypeScript types  
✅ **Complete code examples** - Extracted from actual stories  
✅ **Consistent formatting** - Programmatic markdown generation  
✅ **Metadata extraction** - JSDoc, default values, etc.

### Maintenance

✅ **Fewer dependencies** - No Playwright, Chrome, Turndown  
✅ **Simpler codebase** - Pure Node.js file parsing  
✅ **Better testability** - Unit tests vs E2E tests  
✅ **More reliable** - No timing/rendering issues

---

## Risks & Mitigation

### Risk: MDX Parsing Complexity

**Issue:** MDX has complex JSX embedding that might be hard to parse  
**Mitigation:**

- Use official @mdx-js/mdx parser (well-tested)
- Focus on removing JSX, keeping markdown
- Fallback: Keep JSX as-is if parsing fails

### Risk: Story Code Extraction Edge Cases

**Issue:** Stories might have complex structures we don't handle  
**Mitigation:**

- Start with common patterns (render functions, args)
- Add fallbacks for complex cases
- Test on diverse story types
- Document unsupported patterns

### Risk: TypeDoc Output Variations

**Issue:** TypeDoc might generate different file structures for different components  
**Mitigation:**

- Use consistent TypeDoc configuration
- Implement flexible path resolution (check multiple locations)
- Fallback to inline props if TypeDoc missing
- Add validation step to verify TypeDoc output

### Risk: Breaking Changes in Dependencies

**Issue:** @mdx-js/mdx or Babel might change APIs  
**Mitigation:**

- Pin dependency versions
- Comprehensive test suite
- Monitor dependency changelogs

---

## Success Criteria

- [ ] All 50+ components translated successfully
- [ ] TypeDoc generates comprehensive API docs for all components and tokens
- [ ] All component interfaces have JSDoc comments
- [ ] Generated markdown matches Playwright output (95%+ similarity)
- [ ] Build time reduced from 2-3 minutes to <30 seconds
- [ ] Zero Playwright dependencies remaining
- [ ] MCP server consumes both:
  - [ ] Translated docs (usage examples, descriptions)
  - [ ] TypeDoc API reference (props, types, interfaces)
- [ ] CI/CD pipeline passes without headless browser
- [ ] Documentation is more accurate (props, types, examples)
- [ ] Team can easily debug and extend translator
- [ ] TypeDoc output is readable and comprehensive

---

## Next Steps

1. **Approval** - Review approach with team
2. **Setup TypeDoc** - Configure TypeDoc for components and tokens packages
3. **Add JSDoc** - Add JSDoc comments to Button, Badge, Alert as examples
4. **Test TypeDoc** - Verify TypeDoc generates good markdown output
5. **Prototype** - Build MDX and Story parsers for Button component
6. **Validate** - Compare output with current Playwright-generated docs
7. **Test** - Run on 3-5 sample components
8. **Migrate** - Full migration of all components
9. **Enhance** - Add watch mode, incremental builds, validation

---

## References

- [TypeDoc Documentation](https://typedoc.org/)
- [TypeDoc Markdown Plugin](https://github.com/tgreyuk/typedoc-plugin-markdown)
- [MDX Documentation](https://mdxjs.com/)
- [Babel Parser](https://babeljs.io/docs/en/babel-parser)
- [Unified/Remark](https://unifiedjs.com/)

---

## Summary of Changes with TypeDoc

### What Changed:

- ✅ **Removed:** Custom TypeScript parser (Phase 3) - replaced by TypeDoc
- ✅ **Added:** TypeDoc setup in packages/components and packages/tokens
- ✅ **Simplified:** Translator only handles MDX + Stories (not types)
- ✅ **Reduced:** Dependencies (removed ts-morph)
- ✅ **Faster:** Less code to write and maintain

### Timeline Impact:

- **Before:** ~7-8 days total
- **After:** ~5-6 days total (TypeDoc handles type extraction automatically)

### Architecture:

````
TypeDoc              Translator           MCP Server
━━━━━━━             ━━━━━━━━━━           ━━━━━━━━━━
Components    ──→   API Docs      ──→   Reads both:
+ JSDoc             (Props/Types)        - Usage docs
                                         - API docs

MDX + Stories ──→   Usage Docs    ──→
                    (Examples)
```

---

## Implementation Details

### MDX Parser Implementation

**Extracting ComponentOverview:**

```typescript
// packages/mcp-server/scripts/parsers/mdx-parser.ts

import { compile } from '@mdx-js/mdx';
import { visit } from 'unist-util-visit';

interface ComponentOverviewProps {
  description: string;
  of: any; // Story reference
}

function extractComponentOverview(ast): string {
  let description = '';

  visit(ast, 'mdxJsxFlowElement', (node) => {
    if (node.name === 'ComponentOverview') {
      const descAttr = node.attributes.find(
        (attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'description'
      );

      if (descAttr && descAttr.value) {
        description = descAttr.value;
      }
    }
  });

  return description;
}

function extractStoryReference(node): string | null {
  const ofAttr = node.attributes.find(
    (attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'of'
  );

  if (ofAttr && ofAttr.value) {
    // Extract story name from: ComponentStories.StoryName
    const match = ofAttr.value.match(/ComponentStories\.(\w+)/);
    return match ? match[1] : null;
  }

  return null;
}
```

### Story Code Extraction with Constants

**Handling referenced constants:**

```typescript
// packages/mcp-server/scripts/parsers/story-parser.ts

import * as babel from '@babel/core';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

interface ExtractedStory {
  storyName: string;
  code: string;
  imports: string[];
  constants: string[];  // Constants referenced in story
  helpers: string[];    // Helper functions
}

function extractReferencedConstants(ast, storyCode: string): string[] {
  const constants: string[] = [];
  const identifiers = findIdentifiersInCode(storyCode);

  traverse(ast, {
    VariableDeclaration(path) {
      if (path.node.kind === 'const') {
        const name = path.node.declarations[0].id.name;
        if (identifiers.includes(name)) {
          constants.push(generate(path.node).code);
        }
      }
    },
  });

  return constants;
}

function findIdentifiersInCode(code: string): string[] {
  const identifiers: string[] = [];
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  traverse(ast, {
    Identifier(path) {
      if (!path.isBindingIdentifier()) {
        identifiers.push(path.node.name);
      }
    },
  });

  return [...new Set(identifiers)];
}
```

### TypeDoc Configuration

**Recommended configuration for optimal AI consumption:**

```json
// packages/components/typedoc.json
{
  "entryPoints": ["src/main.ts"],
  "out": "../../mcp-server/generated/api/components",
  "plugin": ["typedoc-plugin-markdown"],
  "outputFileStrategy": "modules",
  "flattenOutputFiles": true,
  "hideGenerator": true,
  "excludePrivate": true,
  "excludeInternal": true,
  "excludeExternals": true,
  "readme": "none",
  "navigation": {
    "includeCategories": false,
    "includeFolders": false
  },
  "categorizeByGroup": false,
  "sort": ["source-order"],
  "kindSortOrder": ["Interface", "Type", "Function", "Variable"]
}
```

**TypeDoc path resolution:**

```typescript
// packages/mcp-server/scripts/parsers/utils.ts

function getTypeDocPath(componentName: string): string | null {
  // TypeDoc might generate different file structures
  const possiblePaths = [
    `generated/api/components/${componentName}.md`,
    `generated/api/components/interfaces/${componentName}Props.md`,
    `generated/api/components/Iress${componentName}.md`,
  ];

  for (const path of possiblePaths) {
    if (fs.existsSync(path)) {
      return path;
    }
  }

  return null; // No TypeDoc found - use fallback
}
```

### Error Handling Strategy

**Graceful degradation with fallbacks:**

```typescript
// packages/mcp-server/scripts/translate.ts

class TranslationError extends Error {
  constructor(
    public type: 'mdx' | 'story' | 'typedoc' | 'file',
    public component: string,
    message: string,
  ) {
    super(`[${type.toUpperCase()}] ${component}: ${message}`);
  }
}

interface TranslationResult {
  markdown: string;
  errors: TranslationError[];
}

function translateComponentSafely(component: Component): TranslationResult {
  const errors: TranslationError[] = [];
  let mdxContent = '';
  let stories: ExtractedStory[] = [];
  let typeDocPath: string | null = null;

  // 1. Try MDX parsing
  try {
    mdxContent = parseMDXFile(component.docsPath);
  } catch (error) {
    errors.push(new TranslationError('mdx', component.name, error.message));
    // Fallback: Use raw MDX with warning
    mdxContent = `⚠️ MDX parsing failed. Showing raw content:\n\n${fs.readFileSync(component.docsPath, 'utf-8')}`;
  }

  // 2. Try story extraction
  try {
    stories = extractStoryCode(component.storiesPath);
  } catch (error) {
    errors.push(new TranslationError('story', component.name, error.message));
    // Fallback: Continue without stories
  }

  // 3. Check TypeDoc exists
  typeDocPath = getTypeDocPath(component.name);
  if (!typeDocPath) {
    errors.push(
      new TranslationError(
        'typedoc',
        component.name,
        'TypeDoc output not found - run `yarn docs:api` first'
      )
    );
  }

  // 4. Combine documentation
  const markdown = combineDocumentation({
    name: component.name,
    content: mdxContent,
    stories,
    typeDocPath,
  });

  return { markdown, errors };
}
```

### MCP Server Integration Changes

**Updated file structure:**

```
generated/
├── docs/                          # Translator output
│   ├── components-button-docs.md  # Usage examples only
│   ├── components-badge-docs.md
│   └── ...
└── api/                           # TypeDoc output
    ├── components/
    │   ├── Button.md              # Props/types only
    │   ├── Badge.md
    │   └── ...
    └── tokens/
        ├── colors.md
        └── ...
```

**MCP tool updates required:**

```typescript
// Update get_component_props to read TypeDoc
export async function get_component_props(componentName: string) {
  const typeDocPath = `generated/api/components/${componentName}.md`;

  if (fs.existsSync(typeDocPath)) {
    // TypeDoc has all prop info
    return readFileContent(typeDocPath);
  }

  // Fallback to translated docs
  const usageDocsPath = `generated/docs/components-${componentName.toLowerCase()}-docs.md`;
  const content = readFileContent(usageDocsPath);
  return extractSection(content, '## Props');
}

// Update get_usage_examples to read translated docs
export async function get_usage_examples(componentName: string) {
  const usageDocsPath = `generated/docs/components-${componentName.toLowerCase()}-docs.md`;
  const content = readFileContent(usageDocsPath);
  return extractSection(content, '## Code Examples');
}

// Update find_component to search both locations
export async function find_component(query: string) {
  const apiFiles = getMarkdownFiles('generated/api');
  const usageFiles = getMarkdownFiles('generated/docs');

  const results = [
    ...searchFiles(apiFiles, query),
    ...searchFiles(usageFiles, query),
  ];

  return deduplicateResults(results);
}
```

### Handling Patterns and Foundations

**Patterns (e.g., Form, HookForm):**

Patterns follow the same structure as components:
- `Pattern.docs.mdx` - Pattern documentation
- `Pattern.stories.tsx` - Pattern examples
- No TypeDoc (patterns are compositions, not individual types)

**Translation approach:**
- Use same MDX + Story parsers
- Skip TypeDoc (no new types to document)
- Link to component TypeDoc for composed components

**Foundations (e.g., Colors, Typography, Spacing):**

Foundations are pure documentation:
- `.mdx` files only (no stories)
- May reference design tokens

**Translation approach:**
- Parse MDX content only
- Extract embedded code examples
- Link to tokens TypeDoc documentation
- Handle embedded component usage (e.g., color swatches)

---

## Success Criteria

- [ ] All 50+ components translated successfully
- [ ] TypeDoc generates comprehensive API docs for all components and tokens
- [ ] All component interfaces have JSDoc comments
- [ ] Generated markdown matches Playwright output (95%+ similarity)
- [ ] Build time reduced from 2-3 minutes to <30 seconds
- [ ] Zero Playwright dependencies remaining
- [ ] MCP server consumes both:
  - [ ] Translated docs (usage examples, descriptions)
  - [ ] TypeDoc API reference (props, types, interfaces)
- [ ] CI/CD pipeline passes without headless browser
- [ ] Documentation is more accurate (props, types, examples)
- [ ] Team can easily debug and extend translator
- [ ] TypeDoc output is readable and comprehensive

---

## Next Steps

1. **Approval** - Review approach with team
2. **Setup TypeDoc** - Configure TypeDoc for components and tokens packages
3. **Add JSDoc** - Add JSDoc comments to Button, Badge, Alert as examples
4. **Test TypeDoc** - Verify TypeDoc generates good markdown output
5. **Prototype** - Build MDX and Story parsers for Button component
6. **Validate** - Compare output with current Playwright-generated docs
7. **Test** - Run on 3-5 sample components
8. **Migrate** - Full migration of all components
9. **Enhance** - Add watch mode, incremental builds, validation

---

## Questions to Resolve

- [ ] Should we support MDX v1, v2, or v3? (Currently using v2)
- [ ] How to handle custom Storybook components beyond ComponentOverview/Example?
- [ ] Should we extract story controls/args for interactive examples?
- [ ] How to handle images and other assets referenced in MDX?
- [ ] Should we validate generated markdown (linting, format checking)?
- [ ] Do we need a migration guide for contributors?
- [ ] **TypeDoc-specific:**
  - [ ] Should TypeDoc output go to `mcp-server/generated/api/` or separate location?
  - [ ] How detailed should JSDoc comments be? (every prop vs just complex ones)
  - [ ] Should MCP server tools read TypeDoc directly or link to it?
  - [ ] Do we need custom TypeDoc templates for better AI consumption?

---

## References

- [TypeDoc Documentation](https://typedoc.org/)
- [TypeDoc Markdown Plugin](https://github.com/tgreyuk/typedoc-plugin-markdown)
- [MDX Documentation](https://mdxjs.com/)
- [Babel Parser](https://babeljs.io/docs/en/babel-parser)
- [Unified/Remark](https://unifiedjs.com/)
````
