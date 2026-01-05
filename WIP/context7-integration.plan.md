# Context7 Integration Plan for IDS Documentation

**Created:** 5 January 2026
**Status:** Planning

## Executive Summary

Integrate Context7 documentation scraping while maintaining Storybook's interactive UI with minimal code duplication by using markdown as the single source of truth for documentation text, while keeping stories for interactivity.

---

## Current State Analysis

### Documentation Structure

- **Format:** MDX files (`.docs.mdx`) with embedded JSX
- **Examples:** Stories files (`.stories.tsx`) with live React components
- **Pattern:** Separate `.docs.mdx` and `.stories.tsx` files per component
- **Location:** `packages/components/src/components/[ComponentName]/`

### Pain Points for Context7

- MDX with JSX is not scrapable by Context7
- Code examples embedded in stories, not easily extractable
- Duplication between MDX documentation and story implementations
- No structured API documentation output

---

## Proposed Architecture

### 1. Documentation Strategy: Single Source of Truth

**New File Structure:**

```
packages/components/src/components/Button/
├── Button.tsx                      # Component implementation
├── Button.test.tsx                 # Tests
├── Button.stories.tsx              # Storybook stories (visual examples)
├── Button.md                       # PRIMARY documentation (Context7 + Storybook)
└── examples/
    ├── index.ts                    # Exports all examples
    ├── basic-usage.example.tsx     # Reusable code examples
    ├── modes.example.tsx
    └── loading.example.tsx
```

**Key Principles:**

- `.md` files = Documentation text + code examples (Context7 readable)
- `.stories.tsx` = Interactive runtime components (Storybook playground)
- `examples/*.example.tsx` = Reusable, importable code snippets
- Zero duplication between documentation sources

### 2. Markdown Format for Dual Purpose

**Template Structure:**

````markdown
# ComponentName

Brief description.

## Installation

```bash
npm install @iress-oss/ids-components
```

## Basic Usage

```tsx
import { IressComponent } from '@iress-oss/ids-components';

function MyComponent() {
  return <IressComponent prop="value">Content</IressComponent>;
}
```

## Examples

### Feature Name

Description of the feature.

<!-- Interactive example: FeatureStoryName -->

```tsx
import { IressComponent } from '@iress-oss/ids-components';

export default function Example() {
  return <IressComponent feature="enabled">Example</IressComponent>;
}
```

## Props

[Auto-generated from TypeDoc - see API Reference section]

## API Reference

See [full API documentation](./api/ComponentName.md) for complete TypeScript definitions.
````

### 3. Code Examples Strategy

**Extract reusable example components:**

```tsx
// Button/examples/modes.example.tsx
import { IressButton, IressInline } from '@iress-oss/ids-components';

export const ModesExample = () => (
  <IressInline gap="md">
    <IressButton mode="primary">Primary</IressButton>
    <IressButton mode="secondary">Secondary</IressButton>
    <IressButton mode="tertiary">Tertiary</IressButton>
  </IressInline>
);
```

**Usage:**

- **Storybook:** Import and render the example component
- **Context7:** Source code included in markdown via build script
- **Both:** Single source of truth for the example

### 4. Storybook Integration

**Create MarkdownDocs component:**

```tsx
// packages/storybook-config/src/components/MarkdownDocs.tsx
import { Meta } from '@storybook/addon-docs';

interface MarkdownDocsProps {
  markdown: string; // Raw markdown content
  stories: Record<string, any>; // Story exports for interactivity
  examples?: Record<string, React.ComponentType>; // Example components
}

export const MarkdownDocs = ({
  markdown,
  stories,
  examples,
}: MarkdownDocsProps) => {
  // 1. Parse markdown
  // 2. Find <!-- Interactive example: StoryName --> markers
  // 3. Render markdown sections
  // 4. Inject interactive stories with controls
  // 5. Show code + live component side-by-side

  return (
    <>
      {/* Parsed markdown with interactive story injection */}
      {/* Maintains all current Storybook interactivity */}
    </>
  );
};
```

**Updated stories file:**

```tsx
// Button.stories.tsx
import { Meta, StoryObj } from '@storybook/react-vite';
import { IressButton } from './Button';
import { MarkdownDocs } from '@iress-oss/ids-storybook-config';
import ButtonDocs from './Button.md?raw';
import * as Examples from './examples';

export default {
  title: 'Components/Button',
  component: IressButton,
  parameters: {
    docs: {
      page: () => (
        <MarkdownDocs
          markdown={ButtonDocs}
          stories={meta}
          examples={Examples}
        />
      ),
    },
  },
} as Meta;

// Interactive stories remain unchanged
export const Default: StoryObj = {
  args: { children: 'Button' },
};

export const Modes: StoryObj = {
  render: () => <Examples.ModesExample />,
};
```

### 5. Context7 Configuration

**Create configuration file:**

```json
// context7.config.json (root of monorepo)
{
  "name": "@iress-oss/ids-components",
  "version": "auto",
  "sources": [
    {
      "type": "markdown",
      "name": "Component Documentation",
      "pattern": "packages/components/src/components/**/*.md",
      "exclude": ["**/node_modules/**", "**/dist/**", "**/coverage/**"]
    },
    {
      "type": "markdown",
      "name": "Pattern Documentation",
      "pattern": "packages/components/src/patterns/**/*.md"
    },
    {
      "type": "code-examples",
      "name": "Usage Examples",
      "pattern": "packages/components/src/**/examples/*.example.tsx",
      "language": "typescript"
    },
    {
      "type": "api-docs",
      "name": "API Reference",
      "pattern": "docs/api/**/*.md",
      "metadata": {
        "generated": "typedoc"
      }
    },
    {
      "type": "markdown",
      "name": "Design Tokens",
      "pattern": "packages/tokens/**/*.md"
    }
  ],
  "metadata": {
    "library": "@iress-oss/ids-components",
    "homepage": "https://design.wm.iress.com",
    "repository": "https://github.com/iress/design-system",
    "framework": "react",
    "typescript": true
  }
}
```

---

## TypeDoc Integration

### Why TypeDoc?

**✅ TypeDoc is a core part of this solution**

**Benefits for Context7 & AI:**

1. **Structured API docs** - Props, types, interfaces auto-documented
2. **Type information** - AI gets full TypeScript type definitions
3. **JSDoc comments** - Descriptions, examples, param docs
4. **Markdown output** - TypeDoc can generate markdown (Context7 compatible)
5. **Always up-to-date** - Generated from source code, never stale
6. **Reduced manual work** - No need to manually document every prop
7. **Better IntelliSense** - IDEs and AI get rich type information

### TypeDoc Configuration

```json
// typedoc.json (root of monorepo)
{
  "entryPoints": ["packages/components/src/main.ts"],
  "out": "docs/api",
  "plugin": ["typedoc-plugin-markdown"],
  "outputFileStrategy": "members",
  "hideGenerator": true,
  "excludePrivate": true,
  "excludeInternal": true,
  "readme": "none",
  "navigation": {
    "includeCategories": true,
    "includeFolders": true
  },
  "categorizeByGroup": true,
  "categoryOrder": ["Components", "Patterns", "Utilities", "Types", "*"]
}
```

### Enhanced Component Documentation with TypeDoc

**Component source with JSDoc:**

````tsx
// Button.tsx
/**
 * A button is a clickable item used to perform an action.
 *
 * @example
 * ```tsx
 * <IressButton mode="primary" onClick={handleClick}>
 *   Click me
 * </IressButton>
 * ```
 *
 * @see {@link https://design.wm.iress.com/components/button | Button Documentation}
 */
export interface IressButtonProps {
  /**
   * Controls the visual appearance and priority of the button.
   *
   * - **Primary:** Main call to action (limit to one per view)
   * - **Secondary:** Secondary calls to action
   * - **Tertiary:** Extra affordance between secondary actions
   *
   * @default 'primary'
   */
  mode?: 'primary' | 'secondary' | 'tertiary';

  /**
   * Applies a visual status to the button.
   *
   * - **Success:** Positive actions (Confirm, Buy)
   * - **Danger:** Destructive actions (Delete, Remove)
   *
   * @default 'default'
   */
  status?: 'default' | 'success' | 'danger';

  /**
   * Shows loading state and disables click events.
   *
   * @default false
   */
  loading?: boolean;

  /**
   * Accessible text announced when in loading state.
   *
   * @default 'Loading...'
   */
  loadingText?: string;
}
````

**Generated TypeDoc markdown** (auto-included in Context7):

```markdown
# IressButton

A button is a clickable item used to perform an action.

## Props

### mode

• `Optional` **mode**: `"primary"` | `"secondary"` | `"tertiary"`

Controls the visual appearance and priority of the button.

- **Primary:** Main call to action (limit to one per view)
- **Secondary:** Secondary calls to action
- **Tertiary:** Extra affordance between secondary actions

**Default:** `'primary'`

### status

• `Optional` **status**: `"default"` | `"success"` | `"danger"`

Applies a visual status to the button.

- **Success:** Positive actions (Confirm, Buy)
- **Danger:** Destructive actions (Delete, Remove)

**Default:** `'default'`

[... etc ...]
```

### Integration with Main Documentation

**Reference TypeDoc from main docs:**

```markdown
# Button

A button is a clickable item used to perform an action.

[... usage examples ...]

## Props

For complete API reference including all props, types, and TypeScript definitions, see the [Button API Documentation](../api/components/Button.md).

### Quick Reference

| Prop    | Type                                     | Default     |
| ------- | ---------------------------------------- | ----------- |
| mode    | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` |
| status  | `'default' \| 'success' \| 'danger'`     | `'default'` |
| loading | `boolean`                                | `false`     |

See full API documentation for detailed descriptions and examples.
```

### Build Script Integration

```json
// package.json
{
  "scripts": {
    "docs:api": "typedoc",
    "docs:build": "yarn docs:api",
    "prebuild": "yarn docs:api",
    "dev": "concurrently \"yarn docs:api --watch\" \"yarn storybook\""
  },
  "devDependencies": {
    "typedoc": "^0.26.0",
    "typedoc-plugin-markdown": "^4.0.0"
  }
}
```

### What Context7 & AI Get

**From TypeDoc:**

- Complete type definitions
- All props with types and defaults
- JSDoc descriptions and examples
- Interface inheritance and composition
- Generic type parameters
- Utility types and helpers

**From Markdown Docs:**

- High-level usage patterns
- Real-world examples
- Best practices and guidelines
- Visual examples (via Storybook links)
- Design rationale and decisions

**Combined Result:**

- AI has both conceptual understanding AND precise API knowledge
- Can generate correct code with proper types
- Understands component relationships and composition
- Has examples for common use cases
- Never suggests deprecated or invalid props

---

## Migration Path

### Phase 1: Infrastructure Setup (1-2 days)

**Tasks:**

- [ ] Install TypeDoc and typedoc-plugin-markdown packages
- [ ] Configure TypeDoc for markdown output (typedoc.json)
- [ ] Test TypeDoc generation and review output quality
- [ ] Create MarkdownDocs component in storybook-config
- [ ] Add Vite plugin to import `.md` files as raw strings
- [ ] Create example component conventions and templates
- [ ] Set up Context7 configuration file
- [ ] Add build scripts for API docs generation (docs:api)
- [ ] Integrate TypeDoc into dev workflow (watch mode)

**Deliverables:**

- TypeDoc installed and configured with markdown plugin
- TypeDoc successfully generating API docs for all components
- Working MarkdownDocs component that integrates TypeDoc output
- Vite config supporting `.md?raw` imports
- Documentation templates and examples with JSDoc standards
- Build scripts for generating and watching API docs

### Phase 2: Template Components (1 day)

**Tasks:**

- [ ] Add comprehensive JSDoc comments to Button component (template)
- [ ] Generate TypeDoc output for Button and review quality
- [ ] Create Button.md with references to TypeDoc API docs
- [ ] Migrate Button to new documentation pattern
- [ ] Repeat for Badge component
- [ ] Repeat for Text component
- [ ] Create example components for each (examples/\*.example.tsx)
- [ ] Test Context7 scraping locally (markdown + TypeDoc output)
- [ ] Verify Storybook rendering maintains interactivity
- [ ] Document migration process and JSDoc standards for team

**Deliverables:**

- 3 fully migrated components with comprehensive JSDoc
- High-quality TypeDoc API documentation for template components
- Migration guide document with JSDoc standards
- Team training materials covering TypeDoc best practices
- JSDoc comment style guide and examples

### Phase 3: Gradual Component Migration (2-4 weeks)

**Tasks:**

- [ ] Migrate remaining components incrementally (priority order)
- [ ] Add/update JSDoc comments to all component interfaces and props
- [ ] Generate and review TypeDoc output for each component
- [ ] Create component.md files linking to TypeDoc API reference
- [ ] Maintain both old and new patterns during transition
- [ ] Continuously review and improve TypeDoc output quality
- [ ] Create component-specific example libraries
- [ ] Remove old `.docs.mdx` files after migration
- [ ] Update CONTRIBUTING.md with new patterns and JSDoc requirements

**Priority Migration Order:**

1. Core components (Button, Input, Text, etc.)
2. Form components (Select, Checkbox, Radio, etc.)
3. Layout components (Stack, Inline, Grid, etc.)
4. Complex components (Table, Modal, etc.)
5. Utility components and patterns

### Phase 4: Automation & Quality (1 day)

**Tasks:**

- [ ] Create CLI script to generate component boilerplate with JSDoc templates
- [ ] Add ESLint rules for JSDoc comment requirements (all public APIs)
- [ ] Set up CI checks for TypeDoc generation success
- [ ] Set up CI checks for documentation completeness
- [ ] Add TypeDoc to pre-build and pre-commit hooks
- [ ] Add documentation coverage reporting (JSDoc + TypeDoc)
- [ ] Set up automated Context7 syncing (if available)
- [ ] Create TypeDoc output validation tests

**Deliverables:**

- Component generator CLI with JSDoc templates
- ESLint rules enforcing JSDoc standards
- CI/CD pipeline updates with TypeDoc generation
- Documentation coverage reports
- Automated TypeDoc validation

---

## File Structure (Final State)

```
packages/
├── components/
│   └── src/
│       ├── components/
│       │   ├── Button/
│       │   │   ├── Button.tsx              # With comprehensive JSDoc
│       │   │   ├── Button.test.tsx
│       │   │   ├── Button.stories.tsx      # Imports Button.md
│       │   │   ├── Button.md               # Primary docs (Context7 + SB)
│       │   │   └── examples/
│       │   │       ├── index.ts
│       │   │       ├── basic.example.tsx
│       │   │       ├── modes.example.tsx
│       │   │       └── loading.example.tsx
│       │   └── [OtherComponents]/
│       │       └── ... (same pattern)
│       └── patterns/
│           └── Form/
│               ├── FormRecipes.md
│               └── examples/
│                   └── ...
├── storybook-config/
│   └── src/
│       └── components/
│           └── MarkdownDocs.tsx            # Renders MD in Storybook
└── tokens/
    └── ... (similar pattern)

docs/
└── api/                                     # TypeDoc generated
    ├── index.md
    ├── components/
    │   ├── Button.md
    │   └── ...
    └── types/
        └── ...

context7.config.json                         # Context7 configuration
typedoc.json                                 # TypeDoc configuration
```

---

## Benefits Summary

### Single Source of Truth

- ✅ No duplication between Context7 and Storybook
- ✅ Markdown as primary documentation format
- ✅ TypeDoc auto-generates API docs from source code (always in sync)
- ✅ JSDoc comments in code become structured documentation
- ✅ Examples are reusable code components

### Context7 Integration

- ✅ Pure markdown is directly scrapable
- ✅ Code examples easily extractable
- ✅ TypeDoc provides structured API information
- ✅ AI gets both conceptual and technical knowledge

### Storybook Compatibility

- ✅ Maintains all interactive features
- ✅ Controls panel still works
- ✅ Canvas/Docs tabs unchanged
- ✅ Visual examples preserved

### Developer Experience

- ✅ Easier to maintain (less duplication, single source)
- ✅ Better tooling (markdown + TypeScript + TypeDoc)
- ✅ Auto-generated API docs (always current, never stale)
- ✅ Write documentation once in JSDoc, get multiple outputs
- ✅ Clearer separation of concerns
- ✅ More accessible to contributors
- ✅ Better IDE support with rich JSDoc comments

### AI & Documentation Quality

- ✅ AI assistants get rich context
- ✅ Type-safe code generation
- ✅ Consistent documentation format
- ✅ Better search and discovery
- ✅ Version-tracked documentation

---

## Risks & Mitigation

### Risk: Initial Migration Effort

- **Mitigation:** Incremental migration, maintain both patterns during transition
- **Timeline:** 4-6 weeks for full migration

### Risk: Team Learning Curve

- **Mitigation:** Comprehensive templates, CLI generators, team training
- **Timeline:** 1 week onboarding per developer

### Risk: Storybook Rendering Complexity

- **Mitigation:** Well-tested MarkdownDocs component, fallback to current approach if needed
- **Prototype:** Build PoC before full migration

### Risk: TypeDoc Output Quality

- **Mitigation:** Invest in JSDoc comment quality, customize TypeDoc templates if needed
- **Review:** Manual review of generated docs in Phase 2

### Risk: Context7 Scraping Issues

- **Mitigation:** Test scraping early, adjust markdown format as needed
- **Validation:** Verify Context7 integration in Phase 2

---

## Success Criteria

### Technical

- [ ] All components have comprehensive JSDoc comments
- [ ] TypeDoc generates complete API reference for all public APIs
- [ ] All components have markdown documentation
- [ ] Context7 successfully scrapes all documentation (markdown + TypeDoc)
- [ ] Storybook maintains full interactivity
- [ ] No documentation duplication
- [ ] CI/CD validates documentation completeness and TypeDoc generation
- [ ] TypeDoc builds successfully in CI without errors

### Quality

- [ ] All components have usage examples
- [ ] API documentation is comprehensive
- [ ] Code examples are tested and working
- [ ] Documentation is searchable in Context7
- [ ] AI assistants can generate correct code

### Process

- [ ] Migration guide is clear and followed
- [ ] Team is trained on new patterns
- [ ] Contributing guide is updated
- [ ] Automation reduces manual work

---

## Next Steps

1. **Review & Approval:** Get team buy-in on approach (markdown + TypeDoc strategy)
2. **TypeDoc Setup:** Install, configure, and validate API doc generation
3. **JSDoc Standards:** Define and document JSDoc comment standards for team
4. **PoC Development:** Build MarkdownDocs component and migrate 1 component with TypeDoc
5. **Team Training:** Workshop on new documentation patterns and JSDoc best practices
6. **Incremental Migration:** Execute Phase 3 over 2-4 weeks (JSDoc first, then markdown)
7. **Context7 Integration:** Configure and test scraping (both markdown and TypeDoc)
8. **Automation:** Build tools to enforce JSDoc standards and generate docs

---

## Questions to Resolve

- [ ] Context7 account setup and API access
- [ ] TypeDoc template customization requirements (if any)
- [ ] JSDoc comment standards and review process
- [ ] TypeDoc plugin configuration for optimal markdown output
- [ ] Migration timeline and team availability
- [ ] Documentation review process (JSDoc + markdown)
- [ ] Rollout strategy (feature flag? gradual? big bang?)
- [ ] TypeDoc integration with existing build pipeline
- [ ] Handling of private/internal APIs in TypeDoc output

---

## References

- [TypeDoc Documentation](https://typedoc.org/)
- [TypeDoc Markdown Plugin](https://github.com/tgreyuk/typedoc-plugin-markdown)
- [Context7 Documentation](https://context7.dev/)
- [Storybook MDX to CSF Migration](https://storybook.js.org/docs/writing-docs/mdx)
