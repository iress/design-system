# Solution 7: Design Tokens Integration - Implementation Plan

## 🎯 Current Status: Phase 1-5 Complete, Phase 2 & 4 Pending

### ✅ Completed (Ready to Test)

- **Phase 1**: Storybook documentation enhanced with usage guidelines, best practices, anti-patterns
- **Phase 3**: MCP server implementation complete with tokenHandlers, comprehensive tests
- **Phase 5 (Both)**:
  - Documentation updated (README, workflow guide)
  - Optional component handler enhancements (token usage hints, cross-references)

### ⏳ Pending

- **Phase 2**: Need to regenerate docs from Storybook (run doc generation)
- **Phase 4**: Integration testing with actual generated docs

### 🚀 Next Steps

1. Run Storybook doc generation to create updated markdown files
2. Verify generated files contain enhanced content
3. Test MCP server tools with real generated docs
4. Manual validation of AI code generation improvements

---

## 🔍 Issues & Gaps Identified

### Critical Issues

1. **Doc Generation Not Run**: Enhanced Storybook MDX files exist but haven't been regenerated into `packages/mcp-server/generated/docs/`
   - Impact: MCP server will read old/missing documentation files
   - Fix: Run doc generation command (need to identify exact command)

2. **Token Name Inconsistency in Spacing.mdx**: Documentation references incorrect token names
   - Issue: Used `spacing.100`, `spacing.1200` instead of correct `spacing.1`, `spacing.10`
   - Impact: AI might generate incorrect spacing token references
   - Fix: Update [Spacing.mdx](packages/components/docs/StylingProps/070-Spacing.mdx#L115-L119) with correct token names

3. **Missing Test Execution**: Unit tests created but not run
   - Tests: `tokenHandlers.test.ts` (71 test cases)
   - Impact: Unknown if implementation actually works
   - Fix: Run `yarn test:coverage tokenHandlers.test.ts` in mcp-server package

### Minor Gaps

4. **No Elevation/Radius Documentation Yet**: Tool supports these categories but no Storybook docs exist
   - Categories: elevation, radius
   - Impact: `get_design_tokens_usage` will return empty for these categories
   - Fix: Create elevation.mdx and radius.mdx in StylingProps (future enhancement)

5. **Optional Component Handler Enhancement Implemented** ✅ (Phase 5 - Optional)
   - `handleGetComponentProps()` - now adds token usage hints for components with styling props
   - `handleGetUsageExamples()` - now references styling props and token best practices
   - Impact: Enhanced - provides proactive guidance to AI assistants
   - Status: Complete

6. **No Interactive Comparison Stories**: Plan mentioned creating comparison stories
   - Stories showing "wrong vs right" token usage side-by-side
   - Impact: Low - existing stories demonstrate correct usage
   - Status: Existing stories deemed sufficient; comparison stories optional

### Documentation Gaps

7. **Storybook Integration Note Missing**: Plan mentioned adding note about MCP server integration
   - Location: Styling props docs should mention AI assistant consumption
   - Impact: Low - developer-facing only
   - Fix: Add callout box in Reference.mdx about AI/MCP integration

8. **Doc Generation Command Unknown**: Workflow doc says "exact command TBD"
   - Need to document: `yarn generate:docs` or equivalent
   - Impact: Blocks Phase 2 completion
   - Fix: Investigate and document actual command

### Recommendations

**High Priority**:

1. ✅ Fix spacing token names in Spacing.mdx
2. ✅ Identify and run doc generation command
3. ✅ Run unit tests to verify implementation
4. ✅ Test MCP server tools end-to-end with real generated docs

**Medium Priority**: 5. Create elevation.mdx and radius.mdx for completeness 6. Add MCP integration callout to Storybook docs

**Low Priority (Optional)**: 7. Create interactive comparison stories for visual learning 8. Enhance component handlers with token usage hints

---

## Problem Summary

AI assistants frequently generate code with hardcoded values instead of using IDS design tokens, leading to:

- **Inconsistent spacing**: Uses `padding: '16px'` instead of `spacing.md` tokens
- **Wrong colors**: Uses `#000000` instead of semantic color tokens like `text.primary`
- **Hardcoded font sizes**: Uses `fontSize: '16px'` instead of typography tokens or `IressText` variants
- **Non-themeable code**: Hardcoded values don't respond to theme changes
- **Maintenance issues**: Updates require changing hardcoded values across multiple files

## Root Cause

1. **Lack of token documentation in MCP responses**: Current MCP server doesn't emphasize token usage
2. **No usage examples**: AI doesn't see correct vs incorrect token usage patterns
3. **Incomplete context**: AI gets component props but not styling best practices
4. **No token discovery**: AI can't easily find available tokens for specific use cases

## Current State Analysis

### ✅ What Already Exists

1. **`get_design_tokens` tool** - Already implemented in MCP server
   - Location: `packages/mcp-server/src/searchHandlers.ts`
   - Supports filtering by type: `colors`, `spacing`, `typography`, `breakpoints`, `all`
   - Reads from generated markdown files in `packages/mcp-server/generated/docs/`
2. **Comprehensive token documentation files** (already generated):
   - `tokens_colour-docs.md` - Color tokens with WCAG contrast ratios
   - `tokens_spacing-docs.md` - Spacing scale (xs, sm, md, lg, xl)
   - `tokens_typography-docs.md` - Typography tokens
   - `tokens_elevation-docs.md` - Shadow/elevation tokens
   - `tokens_radius-docs.md` - Border radius tokens

3. **Styling props documentation** (already exists):
   - `components_styling-props-reference-docs.md` - Complete styling props reference
   - `components_styling-props-spacing-docs.md` - Spacing prop usage
   - `components_styling-props-colour-docs.md` - Color prop usage
   - `components_styling-props-typography-docs.md` - Typography prop usage
   - Includes migration guides from utility classes

4. **Token implementation**: Tokens are properly documented with:
   - Semantic naming (e.g., `colour.primary.fill`, `spacing.400`)
   - Aliases (e.g., `xs` for `spacing.100`, `md` for `spacing.400`)
   - Actual pixel values
   - WCAG accessibility ratings for colors

### ❌ What's Missing

1. **Usage guidance in tool responses**: The current `get_design_tokens` tool only extracts token names/sections, but doesn't provide:
   - ✅ DO / ❌ DON'T examples
   - Context on when to use tokens vs hardcoded values
   - Common usage patterns with components
   - Anti-pattern examples

2. **Token-aware component examples**: Existing component documentation doesn't emphasize token usage
   - Component examples may still show hardcoded values
   - No explicit guidance to use tokens over inline styles
   - Missing connection between component props and design tokens

3. **Styling props integration**: While styling props are documented, the connection to design tokens isn't emphasized in tool responses

4. **Proactive token recommendations**: No automatic suggestions when components are queried

## Solution Approach

**Strategy: Add token usage documentation to Storybook, not MCP server**

The MCP server should NEVER hardcode documentation - it should always read from `generated/docs/`.

Since we already have:

- `get_design_tokens` tool that reads from generated markdown files
- Comprehensive token docs (colors, spacing, typography, etc.)
- Styling props documentation structure in `packages/components/docs/StylingProps/`
- Storybook as the source of truth for all documentation

We should:

1. **Create new Storybook documentation** for token usage patterns in `packages/components/docs/StylingProps/`
   - Add new MDX files with ✅ DO / ❌ DON'T examples
   - Add interactive stories showing correct token usage
   - Include anti-patterns and common mistakes
   - Create comprehensive usage guides

2. **Generate documentation** from Storybook into `packages/mcp-server/generated/docs/`
   - Leverage existing Storybook doc generation infrastructure
   - Generated files follow naming pattern: `components_styling-props-usage-*.md`

3. **Enhance MCP server** to read and serve the generated usage documentation
   - Enhance `handleGetDesignTokens()` to include usage guidance from generated docs
   - Create new tool `get_design_tokens_usage` that reads from generated usage docs
   - MCP server is purely a documentation reader, not a documentation writer

This approach maintains Storybook as the single source of truth and follows the existing pattern.

## Implementation Checklist

### Phase 1: Enhance Existing Storybook Documentation

**Location: `packages/components/docs/StylingProps/`**

Instead of creating 5 new pages, enhance the existing documentation with usage examples and best practices.

#### File: `packages/components/docs/StylingProps/010-Reference.mdx` (ENHANCED)

- [x] **Add "Best Practices" section** ✅
  - [x] When to use styling props vs iressCss() vs custom CSS
  - [x] When styling props are the best choice (most cases)
  - [x] When to use iressCss() (non-IDS components, complex reusable styles)
  - [x] When to use custom CSS (custom components, complex selectors)
  - [x] Decision guide for choosing approach
  - [x] Added CSS-in-JS section with cssVars usage examples

- [x] **Add "Common Anti-Patterns" section** ✅
  - [x] ❌ Anti-pattern 1: Using inline styles instead of styling props
    - [x] Example: `style={{ padding: '16px' }}` vs `p="md"`
  - [x] ❌ Anti-pattern 2: Hardcoded colors instead of tokens
    - [x] Example: `style={{ backgroundColor: '#13213F' }}` vs `bg="colour.primary.fill"`
  - [x] ❌ Anti-pattern 3: Using className for basic styling
    - [x] Example: `className="my-padding"` vs `p="lg"`
  - [x] ❌ Anti-pattern 4: Arbitrary spacing values
    - [x] Example: `style={{ padding: '17px' }}` vs `p="md"` (stick to scale)
  - [x] When hardcoded values ARE acceptable (rare edge cases)

#### File: `packages/components/docs/StylingProps/010-Reference.stories.tsx` (ENHANCED)

- [x] **Fixed Story component types** ✅
  - [x] Added proper args spreading for DiffViewer stories
  - [x] Fixed Story imports to use correct type

#### File: `packages/components/docs/StylingProps/020-Colour.mdx` (ENHANCED)

- [x] **Add "Usage Guidelines" section** ✅
  - [x] ✅ DO: Use semantic color tokens (`colour.primary.text`, `colour.system.success.text`)
  - [x] ✅ DO: Use special value `"alt"` for alternate backgrounds
  - [x] ✅ DO: Pair `bg` and `color` props together for accessibility
  - [x] ❌ DON'T: Use hardcoded hex values (`#000000`, `#13213F`)
  - [x] ❌ DON'T: Use inline styles for colors
  - [x] Added cssVars usage examples for CSS-in-JS

- [x] **Add cross-reference to token documentation** ✅
  - [x] Link to Tokens documentation for complete color reference
  - [x] Button link to /?path=/docs/tokens_colour--docs
  - [x] Listed most common color tokens with descriptions

#### File: `packages/components/docs/StylingProps/020-Colour.stories.tsx` (ENHANCED)

- [x] **Stories already exist** ✅
  - Note: Existing stories (bg, color) demonstrate token usage - no additional comparison stories needed at this time

#### File: `packages/components/docs/StylingProps/070-Spacing.mdx` (ENHANCED)

- [x] **Add "Usage Guidelines" section** ✅
  - [x] ✅ DO: Use spacing token aliases (`xs`, `sm`, `md`, `lg`, `xl`)
  - [x] ✅ DO: Use full token names (`spacing.100`, `spacing.400`, etc.)
  - [x] ✅ DO: Use directional props for precise control (`px="lg"`, `py="sm"`)
  - [x] ❌ DON'T: Use hardcoded pixel values (`padding: '24px'`)
  - [x] ❌ DON'T: Use inline styles for spacing (`style={{ margin: '16px 0' }}`)
  - [x] ❌ DON'T: Use arbitrary values - stick to the spacing scale
  - [x] Added cssVars usage examples for CSS-in-JS

- [x] **Add cross-reference to complete spacing scale** ✅
  - [x] Button link to /?path=/docs/tokens_spacing--docs
  - [x] Listed most commonly used spacing tokens with pixel values
  - Note: Fixed token names (spacing.1 not spacing.100, spacing.10 not spacing.1200)

#### File: `packages/components/docs/StylingProps/070-Spacing.stories.tsx` (ENHANCED)

- [x] **Stories already exist** ✅
  - Note: Existing comprehensive stories (padding, margin, responsive, negative, noGutter) demonstrate token usage

#### File: `packages/components/docs/StylingProps/080-Typography.mdx` (ENHANCED)

- [x] **Add "Usage Guidelines" section** ✅
  - [x] ✅ DO (PREFERRED): Use `IressText` component for text content
  - [x] ✅ DO (ALTERNATIVE): Use `textStyle` prop with typography tokens
  - [x] ❌ DON'T: Use inline styles for typography
  - [x] ❌ DON'T: Use hardcoded font properties (`fontSize: '16px'`, `fontWeight: 'bold'`)
  - [x] When to use IressText vs textStyle prop
  - [x] Added cssVars usage examples for CSS-in-JS

- [x] **Add cross-reference to token documentation** ✅
  - [x] Button link to /?path=/docs/tokens_typography--docs
  - [x] Listed available typography tokens
  - [x] Emphasized IressText component as preferred approach

#### File: `packages/components/docs/StylingProps/080-Typography.stories.tsx` (ENHANCED)

- [x] **Stories already exist** ✅
  - Note: Existing stories (textStyle, textAlign) demonstrate token usage

### Phase 2: Generate Documentation from Storybook

**These files will be auto-generated into `packages/mcp-server/generated/docs/`**

The existing styling props documentation files will be updated when regenerated:

- [ ] **Run Storybook doc generation**
  - [ ] Ensure doc generation captures enhanced MDX content
  - [ ] Expected regenerated files:
    - [ ] `components_styling-props-reference-docs.md` (enhanced with best practices & anti-patterns)
    - [ ] `components_styling-props-colour-docs.md` (enhanced with usage guidelines)
    - [ ] `components_styling-props-spacing-docs.md` (enhanced with usage guidelines)
    - [ ] `components_styling-props-typography-docs.md` (enhanced with usage guidelines)

- [ ] **Validate generated content**
  - [ ] Check that ✅/❌ examples are preserved
  - [ ] Verify code examples are properly formatted
  - [ ] Ensure tables and references are readable
  - [ ] Verify best practices sections are included

### Phase 3: Create MCP Server Tool to Read Usage Documentation

**MCP server ONLY reads from generated docs, never hardcodes content**

#### File: `packages/mcp-server/src/tools.ts`

- [x] **Add new tool `get_design_tokens_usage`** ✅
  - [x] Added tool definition with comprehensive description
  - [x] Supports categories: colour/color/colors, spacing, typography, elevation, radius, best-practices, all
  - [x] Defaults to 'all' category
  - [x] Clear description emphasizing AI code generation use case

#### File: `packages/mcp-server/src/tokenHandlers.ts` (NEW)

- [x] **Create `tokenHandlers.ts` that READS from generated docs** ✅
  - [x] Export `handleGetDesignTokensUsage()`
  - [x] Export `handleGetDesignTokens()` (moved from searchHandlers)
  - [x] Reads from `generated/docs/components_styling-props-*.md` files
  - [x] Supports category filtering: colors, spacing, typography, elevation, radius, best-practices, all
  - [x] Returns formatted content from generated files
  - [x] NO hardcoded examples - everything comes from Storybook or @iress-oss/ids-tokens
  - [x] Added comprehensive token extraction from @iress-oss/ids-tokens package

- [x] **Implement file reading logic** ✅
  - [x] `readGeneratedDoc()` function reads from generated/docs/
  - [x] Maps categories to file names:
    - [x] `colors/color/colour` → `components_styling-props-colour-docs.md`
    - [x] `spacing` → `components_styling-props-spacing-docs.md`
    - [x] `typography` → `components_styling-props-typography-docs.md`
    - [x] `elevation` → `components_styling-props-elevation-docs.md`
    - [x] `radius` → `components_styling-props-radius-docs.md`
    - [x] `best-practices` → `components_styling-props-reference-docs.md`
    - [x] `all` → combine all relevant sections
  - [x] `extractUsageGuidelines()` extracts full content from styling props docs
  - [x] `extractBestPractices()` extracts Best Practices & Anti-Patterns sections
  - [x] Format output for AI consumption
  - [x] Add cross-references to related tools (get_design_tokens, component tools)
  - [x] **Enhanced get_design_tokens implementation**:
    - [x] Extracts tokens directly from @iress-oss/ids-tokens package
    - [x] Supports aliases (colors → colour, padding/margin/gap → spacing, etc.)
    - [x] Groups tokens by category with descriptions
    - [x] Includes token aliases (xs, sm, md, lg, xl for spacing)
    - [x] Includes AA compliant combinations for color tokens
    - [x] Formatted output with proper token organization

#### File: `packages/mcp-server/src/toolHandler.ts`

- [x] **Wire up new tool handler** ✅
  - [x] Import token handlers from './tokenHandlers.js'
  - [x] Add case for `get_design_tokens_usage` in switch statement
  - [x] Call `handleGetDesignTokensUsage(args)`
  - [x] Updated `get_design_tokens` to use tokenHandlers version

#### File: `packages/mcp-server/src/tokenHandlers.test.ts` (NEW)

- [x] **Comprehensive test coverage** ✅
  - [x] 39 test cases for handleGetDesignTokensUsage
  - [x] 32 test cases for handleGetDesignTokens
  - [x] Tests category filtering (colors, spacing, typography, elevation, radius, best-practices, all)
  - [x] Tests alias handling (color/colors → colour, padding/margin → spacing, etc.)
  - [x] Tests error handling (missing files, invalid categories)
  - [x] Tests content extraction (best practices, usage guidelines)
  - [x] Tests cross-references to related tools
  - [x] Tests token extraction with groups, descriptions, aliases, AA compliance

### Phase 4: Enhance Existing `get_design_tokens` Tool

#### File: `packages/mcp-server/src/searchHandlers.ts`

- [x] **Moved `handleGetDesignTokens()` to tokenHandlers.ts** ✅
  - [x] Removed old implementation from searchHandlers
  - [x] Updated searchHandlers.test.ts to remove get_design_tokens tests
  - [x] New implementation in tokenHandlers reads from @iress-oss/ids-tokens package
  - [x] Includes cross-reference to `get_design_tokens_usage` tool
  - [x] Enhanced with token organization, grouping, and metadata

### Phase 5: Optional - Enhance Component Handlers

#### File: `packages/mcp-server/src/componentHandlers.ts`

- [x] **Update `handleGetComponentProps()` (optional enhancement)** ✅
  - [x] When showing component props that accept tokens, add token usage hint
  - [x] Add "See also: get_design_tokens_usage" reference
  - [x] Detects components with styling props automatically
  - [x] Shows ✅ DO / ❌ DON'T examples in hint

#### File: `packages/mcp-server/src/searchHandlers.ts`

- [x] **Update `handleGetUsageExamples()` (optional enhancement)** ✅
  - [x] Add note about token usage best practices
  - [x] Reference styling props documentation
  - [x] Added "Styling Best Practices" section with token usage guidelines
  - [x] Cross-references to `get_design_tokens_usage` tool

### Phase 3: Integration and Cross-References

**All integration happens in MCP server by reading generated docs**

- [ ] **Test generated documentation quality**
  - [ ] Verify ✅/❌ examples are clear in generated markdown
  - [ ] Check code blocks are properly formatted
  - [ ] Ensure cross-references between docs work

- [ ] **Add cross-references in MCP tool responses**
  - [ ] `get_design_tokens` → Link to `get_design_tokens_usage` for practical examples
  - [ ] `get_design_tokens_usage` → Link to `get_design_tokens` for token reference
  - [ ] Component tools → Reference styling props and tokens from generated docs
  - [ ] Add "Related Tools" section to all token-related responses

- [ ] **Verify MCP server file reading**
  - [ ] Ensure tokenHandlers correctly reads from generated/docs/
  - [ ] Test category filtering works with generated files
  - [ ] Verify 'all' category combines multiple generated files correctly

### Phase 4: Testing

- [ ] **Storybook tests**
  - [ ] Verify new usage documentation renders correctly
  - [ ] Test interactive stories work as expected
  - [ ] Validate accessibility of examples
  - [ ] Check that anti-pattern examples are clearly marked

- [ ] **Doc generation tests**
  - [ ] Verify Storybook generates correct markdown files
  - [ ] Test file naming follows pattern: `components_styling-props-usage-*.md`
  - [ ] Ensure generated content preserves formatting
  - [ ] Check that code examples are properly escaped

- [ ] **Unit tests for MCP server token handlers**
  - [ ] Test `handleGetDesignTokensUsage()` with each category
  - [ ] Test 'all' category returns complete reference with examples
  - [ ] Test file reading from generated/docs/ works
  - [ ] Test category mapping to file names is correct
  - [ ] Test error handling when generated files are missing

- [ ] **Integration tests for enhanced existing tools**
  - [ ] Test `get_design_tokens` includes cross-reference to usage tool
  - [ ] Test `get_design_tokens_usage` returns generated content
  - [ ] Test both tools work together for complete token guidance

- [ ] **Example validation tests**
  - [ ] Verify all Storybook examples use tokens correctly
  - [ ] Verify no hardcoded values in new examples
  - [ ] Verify examples are copy-paste ready
  - [ ] Verify styling prop examples work with real components

### Phase 5: Documentation

- [x] **Update MCP Server README** ✅
  - [x] Reorganized Available Tools section with categories
  - [x] Documented enhanced `get_design_tokens` tool with all supported types
  - [x] Documented new `get_design_tokens_usage` tool
  - [x] Added "Design Token Usage Quick Start" section
  - [x] Added "Best Practices for AI Code Generation" section with 5 key principles
  - [x] Added "CSS-in-JS Usage" section with cssVars examples
  - [x] Cross-references between tools
  - [x] Practical examples for each category

- [x] **Update package.json** ✅
  - [x] Added @iress-oss/ids-tokens dependency (^6.0.0-alpha.5)
  - [x] Fixed dev:kill script port numbers

- [x] **Create workflow documentation** ✅
  - [x] Created `WIP/token-usage-workflow.md`
  - [x] Explains Storybook → Doc Gen → MCP Server flow
  - [x] Documents file organization and naming conventions
  - [x] Provides step-by-step guide for adding new token usage docs
  - [x] Includes troubleshooting section

## Files to Modify

### Storybook Files (ENHANCED - Not New)

These existing files will be enhanced with usage guidelines and examples:

- `packages/components/docs/StylingProps/010-Reference.mdx` - Add best practices & anti-patterns sections (ENHANCED)
- `packages/components/docs/StylingProps/010-Reference.stories.tsx` - Add comparison stories (ENHANCED)
- `packages/components/docs/StylingProps/020-Colour.mdx` - Add usage guidelines section (ENHANCED)
- `packages/components/docs/StylingProps/020-Colour.stories.tsx` - Add comparison stories (ENHANCED)
- `packages/components/docs/StylingProps/070-Spacing.mdx` - Add usage guidelines & quick reference (ENHANCED)
- `packages/components/docs/StylingProps/070-Spacing.stories.tsx` - Add comparison stories (ENHANCED)
- `packages/components/docs/StylingProps/080-Typography.mdx` - Add usage guidelines section (ENHANCED)
- `packages/components/docs/StylingProps/080-Typography.stories.tsx` - Add comparison stories (ENHANCED)

### Generated Files (AUTO-REGENERATED from Storybook)

These existing files will be regenerated with enhanced content from Storybook:

- `packages/mcp-server/generated/docs/components_styling-props-reference-docs.md` - Regenerated with best practices
- `packages/mcp-server/generated/docs/components_styling-props-colour-docs.md` - Regenerated with usage guidelines
- `packages/mcp-server/generated/docs/components_styling-props-spacing-docs.md` - Regenerated with usage guidelines
- `packages/mcp-server/generated/docs/components_styling-props-typography-docs.md` - Regenerated with usage guidelines

### MCP Server Files (MODIFIED)

These files read from generated documentation. They do NOT hardcode content.

- `packages/mcp-server/src/tools.ts` - Add `get_design_tokens_usage` tool definition (MODIFIED)
- `packages/mcp-server/src/handlers/tokenHandlers.ts` - Token usage handlers that READ from generated docs (NEW)
- `packages/mcp-server/src/handlers/tokenHandlers.test.ts` - Token handler tests (NEW)
- `packages/mcp-server/src/handlers/index.ts` - Export token handlers (MODIFIED)
- `packages/mcp-server/src/toolHandler.ts` - Wire up token usage tool (MODIFIED)
- `packages/mcp-server/src/searchHandlers.ts` - Enhance `handleGetDesignTokens()` with cross-reference (MODIFIED)
- `packages/mcp-server/README.md` - Document token tools and usage (MODIFIED)

### Documentation Files (NEW)

- `packages/mcp-server/docs/token-usage-workflow.md` - Explains Storybook → Doc Gen → MCP Server flow (NEW)
- Developer guide for adding token usage examples (NEW)

## Token Categories and Examples

### Colors

**Semantic Tokens:**

- `colour.primary.fill`, `colour.primary.onFill`, `colour.primary.text`, `colour.primary.surface`
- `colour.neutral.10`, `colour.neutral.20`, `colour.neutral.80`, etc.
- `colour.system.success.text`, `colour.system.danger.text`, `colour.system.warning.text`
- Special value: `"alt"` for alternate backgrounds

**Usage Example:**

```tsx
// ✅ CORRECT - Using styling props with color tokens
<IressText color="colour.primary.text">Primary text</IressText>
<IressPanel bg="colour.primary.fill" color="colour.primary.onFill">
  Featured content
</IressPanel>

// ❌ INCORRECT - Hardcoded hex values
<IressText style={{ color: '#000000' }}>Content</IressText>
<div style={{ backgroundColor: '#13213F' }}>Content</div>
```

### Spacing

**Token Scale (with aliases):**

- `spacing.100` / `xs`: 4px
- `spacing.200` / `sm`: 8px
- `spacing.400` / `md`: 16px
- `spacing.600` / `lg`: 24px
- `spacing.1200` / `xl`: 48px

**Usage Example:**

```tsx
// ✅ CORRECT - Using aliases with styling props
<IressPanel p="xl">Extra large padding</IressPanel>
<IressStack spacing="md">Items with medium gap</IressStack>

// ✅ CORRECT - Using full token names
<IressPanel p="spacing.1200">Same as xl</IressPanel>

// ✅ CORRECT - Directional spacing
<IressPanel px="lg" py="sm">Horizontal lg, vertical sm</IressPanel>

// ❌ INCORRECT - Hardcoded pixel values
<div style={{ padding: '24px', gap: '16px' }}>Content</div>
```

### Typography

**Preferred Approach - Use IressText Component:**

```tsx
// ✅ CORRECT - Use IressText (recommended)
<IressText>Default body text</IressText>
<IressText element="h1">Heading as h1</IressText>

// ❌ INCORRECT - Hardcoded typography
<h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Heading</h1>
<p style={{ fontSize: '16px' }}>Content</p>
```

**Using textStyle Prop (when needed):**

```tsx
// ✅ CORRECT - Using textStyle prop with token
<IressPanel textStyle="typography.body.lg">Panel with large text</IressPanel>

// Available typography tokens:
// typography.body.sm, typography.body.md, typography.body.lg
// typography.heading.sm, typography.heading.md, typography.heading.lg
```

## Success Criteria

### Token Usage Metrics

- **AI-generated code using tokens**: 20% → 80%
- **Hardcoded values in AI responses**: 80% → 20%
- **Correct token selection**: 40% → 85%
- **Theme-aware code generation**: 30% → 90%

### Developer Satisfaction

- **"AI generates themeable code"**: 3/5 → 4.5/5
- **"Easy to find the right token"**: 2.5/5 → 4/5
- **"Token examples are helpful"**: N/A → 4.5/5

### Code Quality

- **Consistency score** (token usage vs hardcoded): 30% → 85%
- **Accessibility compliance**: 60% → 90% (semantic colors)
- **Theme compatibility**: 40% → 95%

## Risk Assessment

### Risk Level: **LOW-MEDIUM**

### Potential Risks

1. **Token documentation becoming outdated**
   - **Mitigation**: Automate token extraction from `@iress-oss/ids-tokens` package
   - **Mitigation**: Add validation tests that compare docs to actual tokens

2. **AI still generates hardcoded values**
   - **Mitigation**: Include strong anti-pattern examples
   - **Mitigation**: Add token recommendations in all component examples
   - **Mitigation**: Make token examples prominent in responses

3. **Token discovery confusion**
   - **Mitigation**: Clear categorization and search
   - **Mitigation**: Contextual recommendations
   - **Mitigation**: Visual examples showing token values

4. **Performance impact from additional tool**
   - **Impact**: Minimal (documentation lookup only)
   - **Mitigation**: Cache token documentation
   - **Mitigation**: Optimize token search algorithms

### Rollback Plan

- New tool is additive; can be disabled without affecting existing functionality
- Existing tools enhanced with tokens can fall back to original behavior
- Storybook documentation is standalone; removal won't break components

## Dependencies

### Internal Dependencies

- `@iress-oss/ids-tokens` package (token source of truth)
- `@iress-oss/ids-components` (component styling patterns)
- Storybook documentation infrastructure

### External Dependencies

- `iressCss` function from `@iress-oss/ids-components` (for styling examples)
- TypeScript (for type-safe token references)

## Testing Strategy

### Unit Tests

```typescript
describe('handleGetDesignTokensUsage', () => {
  it('returns color token examples', () => {
    const result = handleGetDesignTokensUsage({ category: 'colors' });
    expect(result.content[0].text).toContain('colour.primary.fill');
    expect(result.content[0].text).toContain('colour.primary.onFill');
    expect(result.content[0].text).toContain('colour.system.success.text');
  });

  it('returns spacing token examples', () => {
    const result = handleGetDesignTokensUsage({ category: 'spacing' });
    expect(result.content[0].text).toContain('spacing.400');
    expect(result.content[0].text).toContain('md');
    expect(result.content[0].text).toContain('p=\"xl\"');
  });

  it('includes anti-patterns', () => {
    const result = handleGetDesignTokensUsage({ category: 'all' });
    expect(result.content[0].text).toContain('❌ INCORRECT');
    expect(result.content[0].text).toContain('#000000');
    expect(result.content[0].text).toContain('style={{');
  });
});
```

## Implementation Timeline

### Week 1: Enhance Storybook Documentation (Days 1-5)

- Days 1-2: Enhance 010-Reference.mdx with best practices & anti-patterns, add stories
- Days 3: Enhance 020-Colour.mdx with usage guidelines, add comparison stories
- Day 4: Enhance 070-Spacing.mdx with usage guidelines & quick reference, add stories
- Day 5: Enhance 080-Typography.mdx with usage guidelines, add comparison stories

### Week 2: Doc Generation & MCP Server Integration (Days 6-10)

- Days 1-2: Run doc generation, verify output, test regenerated markdown quality
- Days 3-4: Create tokenHandlers.ts that reads from regenerated docs, add tool definition
- Day 5: Wire up tool in toolHandler.ts, enhance handleGetDesignTokens() with cross-refs

### Week 3: Integration, Testing & Documentation (Days 11-15)

- Days 1-2: Integration testing, cross-references between tools
- Days 3-4: Complete documentation (README, workflow guide)
- Day 5: Manual testing, validation, and refinements

**Total Timeline: 3 weeks (15 working days)**

## Validation Checklist

Before marking as complete:

- [ ] **Storybook Documentation**
  - [ ] Enhanced MDX files render correctly in Storybook
  - [ ] Interactive stories demonstrate correct vs incorrect token usage
  - [ ] ✅/❌ examples are clear and comprehensive
  - [ ] All code examples use actual IDS tokens and props

- [ ] **Doc Generation**
  - [ ] Storybook regenerates markdown files into `packages/mcp-server/generated/docs/`
  - [ ] Regenerated files include enhanced usage guidelines sections
  - [ ] Generated content preserves formatting, code blocks, and examples
  - [ ] All 4 styling props files are regenerated (reference, colour, spacing, typography)

- [ ] **MCP Server Integration**
  - [ ] New `get_design_tokens_usage` tool reads from regenerated docs (NOT hardcoded)
  - [ ] Tool returns correct content for each category filter (colors/spacing/typography/best-practices/all)
  - [ ] Enhanced `get_design_tokens` includes cross-reference to usage tool
  - [ ] All tests passing (unit + integration)
  - [ ] Error handling when generated files are missing

- [ ] **Documentation**
  - [ ] README documents both tools with examples
  - [ ] Workflow documentation explains Storybook → Doc Gen → MCP Server pipeline
  - [ ] Developer guide for adding new token usage examples
  - [ ] Cross-references between related tools working correctly

- [ ] **Manual Testing**
  - [ ] AI generates code using tokens instead of hardcoded values
  - [ ] Token usage examples are accessible via MCP tools
  - [ ] Documentation is accurate and helpful
  - [ ] Success metrics baseline established (measure current token usage rate)

## Key Principles

1. **Storybook is the source of truth** - All token usage documentation lives in Storybook MDX files
2. **MCP server is a documentation reader** - It NEVER hardcodes content, always reads from generated/docs/
3. **Doc generation is the bridge** - Storybook MDX → Generated Markdown → MCP Server
4. **Consistency with existing patterns** - Follows the same approach as existing token and component docs

## Next Steps After Completion

1. **Monitor AI token usage** in real-world scenarios
2. **Gather feedback** from developers using the MCP server
3. **Iterate on token recommendations** based on usage patterns
4. **Expand token categories** if new tokens are added to IDS
5. **Create advanced token usage patterns** (theming, customization)

## Notes

- This solution is **HIGH PRIORITY** as it directly impacts code quality and consistency
- **Key Insight**: Most infrastructure already exists - we need to add usage guidance layer
- Token documentation is already comprehensive and generated from Storybook
- Focus should be on **practical examples** and **anti-patterns** to guide AI behavior
- Styling props documentation already exists and is thorough - leverage it
- Integration with existing tools is more important than creating new documentation
- Token names and values are authoritative from generated docs - no need to re-document
- This coordinates well with Solution 10 (Styling Props Reference) - both enhance the same area
