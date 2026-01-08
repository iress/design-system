# Custom Storybook Translator Plan - Review & Recommendations

**Date:** 7 January 2026  
**Reviewer:** AI Assistant  
**Document:** custom-storybook-translator.plan.md

---

## Executive Summary

The plan is **solid overall** with a clear vision and approach. However, there are **formatting issues, gaps in implementation details, and missing edge case handling** that need to be addressed before starting implementation.

**Overall Assessment:** 7.5/10 - Good foundation, needs refinement

---

## Critical Issues (Must Fix)

### 1. Document Formatting Corruption ⚠️ HIGH PRIORITY

**Issue:** Multiple sections have corrupted/incomplete content:

**File Structure section (line ~570):**

```markdown
    ├── parsers/
    │   ├── mdx-parser.ts         # Parse .docs.mdx files
    │   ├── story-parser.ts       # Parse .stories.tsx files
    │   ├                         # ← INCOMPLETE LINE
```

**Migration Path - Phase 3 (lines ~720-760):**

- Duplicated checklist items
- "Add JSDoc comments to all component interfaces" appears under wrong phase
- JSON code blocks inserted in wrong locations

**Migration Path - Phase 4 (lines ~760-800):**

- Duplicated content
- Incomplete JSON blocks
- Missing closing braces

**Dependencies section (lines ~800-850):**

- Duplicated dependency lists
- Malformed JSON with incomplete strings

**Recommendation:**
✅ **Fix document formatting completely before proceeding**
✅ **Remove all duplicate sections**
✅ **Complete all incomplete code blocks**

### 2. Phase 4 Translation Script Inconsistency ⚠️ HIGH PRIORITY

**Issue:** The `combineDocumentation` function has conflicting implementations:

**Version 1 (lines ~561-577):** Uses `props` parameter

```typescript
const markdown = combineDocumentation({
  name: component.name,
  content: mdxContent,
  stories,
  props, // ← Uses props
});
```

**Version 2 (lines ~578-595):** Uses `typeDocPath` parameter

```typescript
return `
📚 [${data.name} API Documentation](${data.typeDocPath})
                                     ^^^^^^^^^^^^^^^^
```

**Recommendation:**
✅ **Choose one approach and remove the other**
✅ **Recommendation: Use `typeDocPath` approach (aligns with TypeDoc integration)**

---

## Missing Implementation Details (Should Add)

### 3. MDX Parser Implementation Gaps

**Missing:**

- How to extract `description` from `<ComponentOverview>` props?
- How to map `of={ComponentStories.StoryName}` to actual story code?
- What if `<ComponentExample>` references a non-existent story?
- How to handle nested MDX components?

**Recommendation:**

```typescript
// Add to Phase 1: MDX Parser

interface ComponentOverviewProps {
  description: string;
  of: any; // Story reference
}

function extractComponentOverview(node: JSXElement): string {
  // 1. Find description attribute
  const descAttr = node.attributes.find((attr) => attr.name === 'description');

  // 2. Extract string value
  if (descAttr.value.type === 'StringLiteral') {
    return descAttr.value.value;
  }

  return '';
}

function extractStoryReference(node: JSXElement): string | null {
  // 1. Find 'of' attribute
  const ofAttr = node.attributes.find((attr) => attr.name === 'of');

  // 2. Extract story name from: ComponentStories.StoryName
  if (ofAttr.value.type === 'MemberExpression') {
    return ofAttr.value.property.name; // Returns "StoryName"
  }

  return null;
}
```

### 4. Story Code Extraction Edge Cases

**Missing:**

- Constants referenced in stories (e.g., `BADGE_MODES` array)
- Helper functions used in render
- Stories that import from other files
- Stories with complex destructuring

**Example Issue:**

```tsx
const BADGE_MODES = ['primary', 'success', 'warning', 'danger', 'neutral'];

export const Mode: Story = {
  render: () => (
    <IressInline gap="sm">
      {BADGE_MODES.map(
        (
          mode, // ← BADGE_MODES is referenced but not extracted
        ) => (
          <IressBadge mode={mode}>{mode}</IressBadge>
        ),
      )}
    </IressInline>
  ),
};
```

**Recommendation:**

```typescript
// Add to Phase 2: Story Parser

interface ExtractedStory {
  storyName: string;
  code: string;
  imports: string[];
  constants: string[]; // ← ADD THIS
  helpers: string[]; // ← ADD THIS
}

function extractReferencedConstants(ast, storyCode): string[] {
  const constants: string[] = [];

  // 1. Find all identifiers in story code
  const identifiers = findIdentifiers(storyCode);

  // 2. Look for matching const declarations in file
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
```

### 5. TypeDoc Integration Details Missing

**Missing:**

- Exact TypeDoc configuration for optimal AI consumption
- How to handle TypeDoc output variations?
- What if TypeDoc generates multiple files per component?
- How to link TypeDoc to translator output?

**Recommendation:**

Add detailed TypeDoc configuration section:

```json
// packages/components/typedoc.json - RECOMMENDED CONFIG
{
  "entryPoints": ["src/main.ts"],
  "out": "../../mcp-server/generated/api/components",
  "plugin": ["typedoc-plugin-markdown"],
  "outputFileStrategy": "modules", // ← Important: controls file structure
  "flattenOutputFiles": true, // ← Flattens nested structures
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

Add mapping strategy:

```typescript
// How to find TypeDoc output for a component
function getTypeDocPath(componentName: string): string {
  // TypeDoc might generate:
  // - components/interfaces/IressButtonProps.md
  // - components/IressButton.md
  // - Button.md

  const possiblePaths = [
    `api/components/${componentName}.md`,
    `api/components/interfaces/${componentName}Props.md`,
    `api/components/Iress${componentName}.md`,
  ];

  for (const path of possiblePaths) {
    if (fs.existsSync(path)) {
      return path;
    }
  }

  return null; // No TypeDoc found - use fallback
}
```

### 6. Patterns and Foundations Handling Missing

**Missing:** The plan focuses on Components but mentions Patterns and Foundations in config:

```typescript
input: {
  componentsDir: '../../components/src/components',
  patternsDir: '../../components/src/patterns',      // ← Not explained
  foundationsDir: '../../components/docs/Foundations', // ← Not explained
}
```

**Recommendation:**

```markdown
## Handling Non-Component Documentation

### Patterns (e.g., Form, HookForm)

Patterns follow the same structure as components:

- `Pattern.docs.mdx` - Pattern documentation
- `Pattern.stories.tsx` - Pattern examples
- No TypeDoc (patterns are compositions, not individual types)

**Translation approach:**

- Use same MDX + Story parsers
- Skip TypeDoc (no new types to document)
- Link to component TypeDoc for composed components

### Foundations (e.g., Colors, Typography, Spacing)

Foundations are pure documentation:

- `.mdx` files only (no stories)
- May reference design tokens

**Translation approach:**

- Parse MDX content only
- Extract embedded code examples
- Link to tokens TypeDoc documentation
- Handle embedded component usage (e.g., color swatches)
```

### 7. Error Handling Strategy Missing

**Missing:**

- What happens when MDX parsing fails?
- What if a story doesn't exist?
- What if TypeDoc fails to generate?
- How to report errors to user?

**Recommendation:**

```typescript
// Add error handling strategy

class TranslationError extends Error {
  constructor(
    public type: 'mdx' | 'story' | 'typedoc' | 'file',
    public component: string,
    message: string,
  ) {
    super(`[${type.toUpperCase()}] ${component}: ${message}`);
  }
}

function translateComponentSafely(component: Component): Result {
  const errors: TranslationError[] = [];
  let mdxContent = '';
  let stories: StoryCode[] = [];

  // 1. Try MDX parsing
  try {
    mdxContent = parseMDXFile(component.docsPath);
  } catch (error) {
    errors.push(new TranslationError('mdx', component.name, error.message));
    // Fallback: Use raw MDX with warning
    mdxContent = `⚠️ MDX parsing failed\n\n${fs.readFileSync(component.docsPath)}`;
  }

  // 2. Try story extraction
  try {
    stories = extractStoryCode(component.storiesPath);
  } catch (error) {
    errors.push(new TranslationError('story', component.name, error.message));
    // Fallback: Continue without stories
  }

  // 3. Check TypeDoc exists
  const typeDocPath = getTypeDocPath(component.name);
  if (!typeDocPath) {
    errors.push(
      new TranslationError(
        'typedoc',
        component.name,
        'TypeDoc output not found - run `yarn docs:api` first',
      ),
    );
  }

  return {
    markdown: combineDocumentation({ mdxContent, stories, typeDocPath }),
    errors,
  };
}
```

### 8. MCP Server Integration Changes Not Specified

**Missing:**

- Which MCP tools need updating?
- How to handle both translated docs + TypeDoc?
- File path changes in MCP server?

**Recommendation:**

```markdown
## MCP Server Integration Changes

### Updated File Structure

**Before (Playwright):**
```

generated/docs/
├── components-button-docs.md # All-in-one
├── components-badge-docs.md
└── ...

```

**After (Translator + TypeDoc):**
```

generated/
├── docs/ # Translator output
│ ├── components-button-docs.md # Usage examples only
│ └── ...
└── api/ # TypeDoc output
├── components/
│ ├── Button.md # Props/types only
│ └── ...
└── tokens/

````

### MCP Tool Updates Required

**1. `get_component_props` - Update to read TypeDoc:**

```typescript
// Before:
const content = readFileContent(`generated/docs/components-${name}-docs.md`);
const propsSection = extractSection(content, '## Props');

// After:
const typeDocPath = `generated/api/components/${name}.md`;
if (fs.existsSync(typeDocPath)) {
  return readFileContent(typeDocPath); // TypeDoc has all prop info
} else {
  // Fallback to translated docs
}
````

**2. `get_usage_examples` - Read from translated docs:**

```typescript
// Updated:
const usageDocsPath = `generated/docs/components-${name}-docs.md`;
const content = readFileContent(usageDocsPath);
const examplesSection = extractSection(content, '## Code Examples');
```

**3. `find_component` - Search both locations:**

```typescript
// Search both API and usage docs
const apiFiles = getMarkdownFiles('generated/api');
const usageFiles = getMarkdownFiles('generated/docs');
// Combine results...
```

````

---

## Minor Issues (Nice to Have)

### 9. Missing Code Formatting Strategy

**Issue:** Extracted code might have inconsistent formatting

**Recommendation:**
```typescript
import prettier from 'prettier';

function formatCode(code: string): string {
  return prettier.format(code, {
    parser: 'typescript',
    singleQuote: true,
    trailingComma: 'all',
  });
}
````

### 10. Missing Validation Step

**Issue:** No validation that generated markdown is correct

**Recommendation:**

```markdown
## Phase 2.5: Add Validation (0.5 days)

- [ ] Create markdown validator
  - [ ] Check all code blocks have language tags
  - [ ] Validate internal links work
  - [ ] Ensure TypeDoc references exist
  - [ ] Check for broken story references
- [ ] Add lint task for generated docs
```

### 11. Missing Watch Mode Details

**Issue:** "Add watch mode" mentioned but not detailed

**Recommendation:**

```typescript
// packages/mcp-server/scripts/watch.ts

import chokidar from 'chokidar';

export function watchDocumentation() {
  const watcher = chokidar.watch(
    [
      '../../components/src/**/*.docs.mdx',
      '../../components/src/**/*.stories.tsx',
    ],
    {
      ignored: /node_modules/,
    },
  );

  watcher.on('change', async (path) => {
    console.log(`File changed: ${path}`);

    // Determine which component changed
    const component = getComponentFromPath(path);

    // Re-translate only that component
    await translateComponent(component);

    console.log(`✓ Re-generated docs for ${component.name}`);
  });
}
```

### 12. Missing Incremental Build Strategy

**Issue:** Mentioned but not detailed

**Recommendation:**

```typescript
// Track last modified times
interface BuildCache {
  [componentName: string]: {
    mdxModified: number;
    storiesModified: number;
    outputModified: number;
  };
}

function shouldRebuild(component: Component, cache: BuildCache): boolean {
  const cached = cache[component.name];
  if (!cached) return true;

  const mdxTime = fs.statSync(component.docsPath).mtimeMs;
  const storiesTime = fs.statSync(component.storiesPath).mtimeMs;

  return mdxTime > cached.mdxModified || storiesTime > cached.storiesModified;
}
```

---

## Documentation Improvements

### 13. Add "How It Works" Flow Diagram

**Recommendation:** Add visual flow showing exact processing:

````markdown
## How It Works - Complete Flow

### Build Process

1. **TypeDoc runs first** (components & tokens packages)
   ```bash
   yarn workspace @iress-oss/ids-components run docs:api
   yarn workspace @iress-oss/ids-tokens run docs:api
   ```
````

**Output:** `mcp-server/generated/api/**/*.md`

2. **Translator runs second** (mcp-server package)

   ```bash
   yarn workspace @iress-oss/ids-mcp-server run docs:translate
   ```

   **Process:**
   - Find all `.docs.mdx` and `.stories.tsx` pairs
   - Parse MDX → Extract markdown + story references
   - Parse Stories → Extract code examples
   - Combine → Generate usage docs
   - Link to TypeDoc API docs

3. **MCP Server reads both**
   - API queries → Read TypeDoc output
   - Usage/example queries → Read translator output

````

### 14. Add Troubleshooting Section

```markdown
## Troubleshooting

### TypeDoc Issues

**Problem:** TypeDoc generates no output
- **Cause:** No JSDoc comments on exported interfaces
- **Solution:** Add JSDoc to at least one prop:
  ```typescript
  export interface IressButtonProps {
    /** Controls the button appearance */
    mode?: 'primary' | 'secondary';
  }
````

**Problem:** TypeDoc generates too many files

- **Cause:** `outputFileStrategy: 'members'` creates file per member
- **Solution:** Use `outputFileStrategy: 'modules'`

### MDX Parser Issues

**Problem:** MDX parsing fails with JSX errors

- **Cause:** Complex JSX that @mdx-js/mdx can't handle
- **Solution:** Add try-catch and fallback to raw content

**Problem:** Story reference not found

- **Cause:** Story name mismatch between MDX and Stories file
- **Solution:** Validate story names exist before referencing

```

---

## Recommendations Summary

### Must Do (Before Starting):
1. ✅ **Fix document formatting corruption**
2. ✅ **Resolve Phase 4 function inconsistency**
3. ✅ **Add detailed MDX parsing implementation**
4. ✅ **Add story extraction edge case handling**
5. ✅ **Specify TypeDoc configuration in detail**
6. ✅ **Add error handling strategy**
7. ✅ **Document MCP server integration changes**

### Should Do (During Implementation):
8. ✅ **Add code formatting with Prettier**
9. ✅ **Add validation step**
10. ✅ **Detail watch mode implementation**
11. ✅ **Detail incremental build strategy**
12. ✅ **Add Patterns and Foundations handling**

### Nice to Have (Post-MVP):
13. ✅ **Add flow diagrams**
14. ✅ **Add troubleshooting guide**
15. ✅ **Add example output comparisons**

---

## Revised Timeline Estimate

With these additions:

| Phase | Original | Revised | Reason |
|-------|----------|---------|--------|
| Phase 1 | 2 days | 2.5 days | TypeDoc config + edge cases |
| Phase 2 | 1-2 days | 2 days | Error handling + validation |
| Phase 3 | 1 day | 1 day | Same |
| Phase 4 | 1-2 days | 2 days | MCP integration changes |
| Phase 5 | Ongoing | 1 day | Watch + incremental builds |
| **Total** | **5-6 days** | **7.5-8.5 days** | More robust implementation |

---

## Final Verdict

**The plan is good but needs refinement before execution.**

**Strengths:**
- ✅ Clear problem statement
- ✅ Well-justified architectural choice (TypeDoc)
- ✅ Good benefit analysis
- ✅ Realistic risk assessment

**Weaknesses:**
- ❌ Formatting corruption (must fix)
- ❌ Missing implementation details for edge cases
- ❌ Insufficient error handling strategy
- ❌ MCP server integration underspecified

**Recommendation:**
**Spend 0.5-1 day fixing the plan document and adding missing details BEFORE starting Phase 1 implementation.**
```
