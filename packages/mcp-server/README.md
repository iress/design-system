# IDS Component Library MCP Server

> **⚠️ DEPRECATED** — This package is deprecated. AI context is now provided via static `.ai/` folders and `.agents/skills/` files in the repository. These deliver the same information without runtime dependencies, Playwright, or Storybook.
>
> **Use agent skills instead:**
>
> ```bash
> npx skills add iress/design-system
> ```
>
> Available skills: `figma-to-ids`, `token-usage`, `ui-doctor`, `ui-translation`
>
> See the [skills CLI documentation](https://github.com/vercel-labs/skills) for installation options, or browse the replacement files directly:
>
> - `packages/components/.ai/` — component and guide documentation
> - `packages/tokens/.ai/` — design token documentation
> - `.agents/skills/` — agent skill definitions

---

<details>
<summary>Legacy documentation (archived)</summary>

A Model Context Protocol (MCP) server specifically designed for the **Iress Design System (IDS)** component library. This server provides AI assistants and MCP clients with contextual information about IDS components, design tokens, usage patterns, and implementation details to help engineers build consistent user interfaces.

## Features

- **Component Discovery**: Find IDS components and patterns by name or functionality
- **Props & API Reference**: Get detailed component prop information and usage examples
- **Usage Examples**: Real-world React code examples and implementation patterns
- **Design Tokens**: Access to IDS design tokens (colors, spacing, typography)
- **Smart Search**: Search across all IDS documentation with context-aware results
- **Categorized Resources**: Organized by Components, Patterns, Foundations, and Resources
- **Engineer-Focused**: Tools designed specifically for UI development workflows

## Installation

### Quick Setup (VS Code)

**🚀 One-Click Installation**: Click the link below to automatically add the IDS MCP server to your VS Code settings:

[**Add IDS MCP Server to VS Code**](vscode:mcp/install?%7B%22name%22%3A%22iress-design-system%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22%40iress-oss%2Fids-mcp-server%22%5D%7D)

This will automatically configure VS Code to use the IDS Component Library MCP Server with your AI assistant.

### Manual Setup (VS Code)

Alternatively, you can manually add the server to your VS Code settings:

1. Open VS Code Settings (⌘/Ctrl + ,)
2. Search for "MCP"
3. Add the following server configuration:

```json
"mcp": {
  "servers": {
    "iress-design-system": {
      "command": "npx",
      "args": ["@iress-oss/ids-mcp-server"]
    }
  }
}
```

### Other MCP Clients

For other MCP clients or manual configuration, use this server configuration:

```json
{
  "command": "npx",
  "args": ["@iress-oss/ids-mcp-server"]
}
```

## Available Tools

### Component Discovery & Implementation

1. **find_component**: Find IDS components and patterns by name or functionality - supports both components and patterns (e.g., IressForm, IressButton)
2. **get_component_props**: Get detailed prop information and API reference for specific components
3. **get_usage_examples**: Get real-world React code examples and implementation patterns
4. **get_iress_component_info**: Get comprehensive information about Iress components mentioned by their full name (e.g., IressButton, IressInput)
5. **analyze_component_mentions**: Analyze text to find all Iress component mentions and provide information about each one

### Design Tokens & Styling

6. **get_design_tokens**: Access IDS design tokens (colors, spacing, typography, etc.) with token definitions and values
7. **get_design_tokens_usage**: Get token usage examples, best practices, and anti-patterns with ✅ DO / ❌ DON'T examples
   - Shows when to use tokens vs hardcoded values
   - Demonstrates proper styling prop usage
   - Includes accessibility guidelines for colors
   - Covers spacing scale and directional props
   - Explains IressText vs textStyle prop for typography
8. **get_styling_props_reference**: Get comprehensive reference for IDS styling props including spacing, colors, typography, visual effects, and sizing
   - Shows available props by category (spacing, colors, typography, visual, sizing, utility)
   - Includes usage examples and token values
   - Explains when to use style props vs iressCss() vs CSS-in-JS
   - Provides component-specific styling guidance

### Documentation & Guidelines

9. **search_ids_docs**: Search across all IDS documentation with context-aware results
10. **list_components**: List all available components organized by category
11. **get_design_guidelines**: Get IDS design guidelines covering core principles, visual standards, and accessibility requirements

## Design Token Usage Quick Start

The IDS MCP Server provides comprehensive guidance on using design tokens correctly:

### Using `get_design_tokens_usage`

```typescript
// Get color token usage examples
get_design_tokens_usage({ category: 'colors' });
// Returns: Semantic color tokens, ✅ DO/❌ DON'T examples, accessibility guidelines

// Get spacing token usage examples
get_design_tokens_usage({ category: 'spacing' });
// Returns: Spacing scale (xs, sm, md, lg, xl), directional props, responsive patterns

// Get typography usage examples
get_design_tokens_usage({ category: 'typography' });
// Returns: IressText component usage, textStyle prop examples

// Get best practices and anti-patterns
get_design_tokens_usage({ category: 'best-practices' });
// Returns: When to use styling props vs iressCss() vs custom CSS, common mistakes

// Get all usage guidance
get_design_tokens_usage({ category: 'all' });
// Returns: Complete guide with all categories
```

### Best Practices for AI Code Generation

When generating code with the IDS component library:

1. **Always use design tokens** instead of hardcoded values:
   - ✅ `<IressPanel p="md" bg="colour.primary.fill">`
   - ❌ `<IressPanel style={{ padding: '16px', backgroundColor: '#13213F' }}>`

2. **Prefer styling props** over inline styles or custom CSS:
   - ✅ `<IressPanel p="lg" color="colour.primary.text">`
   - ❌ `<div className="custom-padding" style={{ color: '#000' }}>`

3. **Use IressText** for text content (preferred over textStyle prop):
   - ✅ `<IressText element="h1">Heading</IressText>`
   - ❌ `<h1 style={{ fontSize: '24px' }}>Heading</h1>`

4. **Pair bg and color props** for accessibility:
   - ✅ `<IressPanel bg="colour.primary.fill" color="colour.primary.onFill">`
   - ❌ `<IressPanel bg="colour.primary.fill">` (missing color)

5. **For CSS-in-JS, use cssVars from @iress-oss/ids-tokens**:
   - ✅ `background: ${cssVars.colour.primary.fill}; padding: ${cssVars.spacing[400]};`
   - ❌ `background: '#13213F'; padding: '16px';`

Use `get_design_tokens_usage` to see practical examples and anti-patterns for each category.

## Styling Props Quick Start

The IDS MCP Server provides comprehensive reference for using styling props across all components:

### Using `get_styling_props_reference`

```typescript
// Get all styling props documentation
get_styling_props_reference({ category: 'all' });
// Returns: Complete reference + styling approach decision guide

// Get spacing props (padding, margin, textAlign, stretch)
get_styling_props_reference({ category: 'spacing' });
// Returns: p, px, py, m, mx, my + token values

// Get color props
get_styling_props_reference({ category: 'colors' });
// Returns: bg, color props with semantic color tokens

// Get typography props
get_styling_props_reference({ category: 'typography' });
// Returns: textStyle prop usage

// Get visual props (elevation, radius)
get_styling_props_reference({ category: 'visual' });
// Returns: layerStyle, borderRadius, focusable props

// Get sizing props
get_styling_props_reference({ category: 'sizing' });
// Returns: width, maxWidth props

// Get utility props (screen readers, scrollable, responsive)
get_styling_props_reference({ category: 'utility' });
// Returns: hideFrom, hideBelow, srOnly, scrollable, noGutter props

// Get component-specific styling info
get_styling_props_reference({ component: 'IressButton' });
// Returns: Which styling props IressButton supports
```

### When to Use Different Styling Approaches

The `get_styling_props_reference` tool includes comprehensive best practices from the IDS documentation (see the "Best Practices" section in the reference docs):

1. **Style Props (Recommended)**: Use on IDS components for type-safe, theme-compatible inline styles
   - `<IressButton p="md" bg="colour.primary.fill">`

2. **iressCss() Function**: Use on non-IDS elements to apply styling props anywhere
   - `<div className={iressCss({ p: 'xs', bg: 'neutral.alt' })}>`

3. **IressStyled Component**: Use when you need styled wrapper without creating a component
   - `<IressStyled p="md" bg="alt"><YourContent /></IressStyled>`

4. **CSS-in-JS with cssVars**: Use with CSS-in-JS libraries (styled-components, emotion, etc.)
   - `background: ${cssVars.colour.primary.fill};`

5. **Custom CSS**: Use for complex styling, animations, pseudo-selectors
   - When styling props aren't sufficient

Use `get_styling_props_reference({ category: 'all' })` to see the complete reference including detailed best practices, decision guide with flowchart, common anti-patterns, and when to use each approach.

### CSS-in-JS Usage

When using CSS-in-JS libraries (styled-components, emotion, vanilla-extract, etc.), always use the `cssVars` object from `@iress-oss/ids-tokens`:

```typescript
import { cssVars } from '@iress-oss/ids-tokens';
import styled from 'styled-components';

// ✅ CORRECT - Using cssVars in CSS-in-JS
const StyledComponent = styled.div`
  padding: ${cssVars.spacing[400]}; /* md - 16px */
  background-color: ${cssVars.colour.primary.fill};
  color: ${cssVars.colour.primary.onFill};
  font-family: ${cssVars.typography.fontFamily.body};
`;

// ❌ INCORRECT - Hardcoded values
const BadComponent = styled.div`
  padding: 16px;
  background-color: #13213f;
`;
```

**Available cssVars categories:**

- `cssVars.colour.*` - All color tokens (primary, neutral, system)
- `cssVars.spacing[*]` - Spacing scale (100, 200, 400, 600, 1200, etc.)
- `cssVars.typography.*` - Font families, sizes, weights, line heights
- `cssVars.radius[*]` - Border radius tokens
- `cssVars.elevation.*` - Shadow and elevation tokens

## Available Resources

All IDS component documentation files are exposed as categorized resources:

- **Components**: Button, Input, Table, Modal, etc. (`components-*-docs.md`)
- **Patterns**: Form, HookForm, etc. (`patterns-*-docs.md`)
- **Foundations**: Colors, Typography, Spacing, etc. (`foundations-*-docs.md`)
- **Resources**: Changelog, Guidelines, etc. (`resources-*-docs.md`)

## Documentation Structure

The server works with the IDS component library documentation in the `generated/docs/` directory:

**Components** (50+ UI components):

- `components-button-docs.md` - IressButton component
- `components-input-docs.md` - IressInput component
- `components-table-docs.md` - IressTable component
- `components-modal-docs.md` - IressModal component
- `components-*-recipes-docs.md` - Usage patterns and recipes

**Patterns** (Composite patterns and workflows):

- `patterns-form-docs.md` - IressForm pattern
- `patterns-hookform-docs.md` - IressHookForm pattern

**Foundations** (Guidelines and tokens):

- `foundations-colours-docs.md` - Color palette and usage
- `foundations-typography-docs.md` - Text styles and hierarchy
- `foundations-spacing-docs.md` - Layout and spacing tokens

**Resources** (Supporting documentation):

- `resources-changelog-docs.md` - Version history and updates
- `introduction-docs.md` - Getting started guide

</details>
