# MCP Server Improvements Plan

## Problem Summary

Based on user feedback, the MCP server has the following issues when being used for IDS UI development:

1. **IressForm not found easily** - Component was moved to a pattern instead of a component
2. **Poor test generation for IressRichSelect** - Uses `findByText` instead of proper `findByRole('option')` patterns
3. **Cannot search multiple components** - Searching "IressForm IressSelect" finds nothing
4. **Inefficient UI generation** - AI requires multiple iterations to generate quality UI code with IDS components

## Root Cause Analysis

### Issue 1: IressForm Discovery

**Current behavior:**

- `mapIressComponentToFile()` searches for `components-{name}-docs.md` files
- IressForm is now a **pattern** (exported from `patterns/Form`) not a component
- Docs are likely generated as `patterns-form-docs.md` instead of `components-form-docs.md`
- The component mapping logic doesn't account for patterns

**Evidence:**

- Form pattern exports: `packages/components/src/patterns/Form/index.ts`
- Form stories: `title: 'Patterns/Form'` not `'Components/Form'`
- Main.ts exports: `export * from './patterns/Form';`

### Issue 2: Test Examples Quality

**Current behavior:**

- The MCP server extracts code examples from markdown docs using regex
- These examples may not include comprehensive testing patterns
- No dedicated "testing examples" section in the generated docs
- AI gets generic examples, not best-practice test patterns

**What's needed:**

- Include real test file examples from the codebase
- Show proper `findByRole('option')` patterns for RichSelect
- Include common testing patterns (user interactions, async operations, accessibility)

### Issue 3: Multi-Component Search

**Current behavior:**

- `handleFindComponent()` and search handlers treat input as a single query string
- No logic to split and search for multiple components
- Searching "IressForm IressSelect" looks for a component containing both words, finds nothing

**What's needed:**

- Detect multiple component names in a single query
- Return combined results for all mentioned components
- Smart detection of Iress component names (already have `extractIressComponents()`)

## Proposed Solutions

### Solution 1: Support Pattern-Based Components ⭐ PRIORITY

**Approach:** Extend component mapping to support both components and patterns

#### Storybook Responsibilities

- ✅ **Already exists**: Pattern documentation in Storybook (e.g., `Patterns/Form`)
- ✅ **Already exists**: Pattern stories with examples
- No additional Storybook work needed - documentation is already structured correctly

#### MCP Server Changes

1. **Update `mapIressComponentToFile()` in `utils.ts`:**

   ```typescript
   export function mapIressComponentToFile(
     componentName: string,
   ): string | null {
     const baseComponentName = componentName
       .replace(/^Iress/, '')
       .toLowerCase();
     const markdownFiles = getMarkdownFiles();

     // Try exact component match first
     let matchingFile = markdownFiles.find(
       (file) => file === `components-${baseComponentName}-docs.md`,
     );

     // Try exact pattern match
     matchingFile ??= markdownFiles.find(
       (file) => file === `patterns-${baseComponentName}-docs.md`,
     );

     // Try partial component matching
     matchingFile ??= markdownFiles.find(
       (file) =>
         file.startsWith(`components-${baseComponentName}`) &&
         file.endsWith('-docs.md'),
     );

     // Try partial pattern matching
     matchingFile ??= markdownFiles.find(
       (file) =>
         file.startsWith(`patterns-${baseComponentName}`) &&
         file.endsWith('-docs.md'),
     );

     // Try fuzzy component matching
     matchingFile ??= markdownFiles.find(
       (file) =>
         file.includes(baseComponentName) && file.startsWith('components-'),
     );

     // Try fuzzy pattern matching
     matchingFile ??= markdownFiles.find(
       (file) =>
         file.includes(baseComponentName) && file.startsWith('patterns-'),
     );

     return matchingFile ?? null;
   }
   ```

2. **Update `handleFindComponent()` scoring to prioritize patterns:**

   ```typescript
   function calculateRelevanceScore(
     file: string,
     content: string,
     query: string,
     lines: string[],
   ): number {
     // ... existing scoring logic ...

     // Add pattern-specific scoring
     if (file.startsWith('patterns-')) {
       relevanceScore += 25; // Boost patterns as they're often searched for
     }

     return relevanceScore;
   }
   ```

3. **Add comprehensive tests for pattern matching:**
   - Test IressForm maps to `patterns-form-docs.md`
   - Test IressHookForm maps correctly
   - Test pattern vs component disambiguation

**Impact:**

- ✅ IressForm becomes discoverable
- ✅ All pattern-based exports work correctly
- ✅ Maintains backward compatibility with components
- ⚠️ Requires test updates

### Solution 2: Add Testing Examples Documentation ⭐ PRIORITY

**Approach:** Create a new tool specifically for testing examples and include real test patterns

#### Storybook Responsibilities

- ❌ **NEW**: Add "Testing" section to component documentation pages
- ❌ **NEW**: Include testing examples in each component's docs:
  - Basic usage tests
  - User interaction tests (proper `findByRole` queries)
  - Accessibility testing examples
  - Async operation testing
- ❌ **NEW**: Create "Testing Guide" page with:
  - React Testing Library best practices
  - Common testing patterns for IDS components
  - How to test forms, selects, and interactive components

**Example Storybook documentation structure:**

```markdown
## Testing

### Basic Usage

\`\`\`tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IressRichSelect } from '@iress-oss/ids-components';

it('selects an option', async () => {
const combobox = screen.getByRole('combobox');
await userEvent.click(combobox);

const option = await screen.findByRole('option', { name: 'Option 1' });
await userEvent.click(option);

expect(onChange).toHaveBeenCalled();
});
\`\`\`

### Accessibility Testing

\`\`\`tsx
it('supports keyboard navigation', async () => {
await userEvent.keyboard('{ArrowDown}');
const options = await screen.findAllByRole('option');
expect(options[0]).toHaveAttribute('aria-selected', 'true');
});
\`\`\`
```

#### MCP Server Changes

1. **Add new tool `get_testing_examples` in `tools.ts`:**

   ```typescript
   {
     name: 'get_testing_examples',
     description:
       'Get comprehensive testing examples for IDS components including React Testing Library patterns, accessibility testing, and best practices.',
     inputSchema: {
       type: 'object',
       properties: {
         component: {
           type: 'string',
           description: 'Component name to get testing examples for',
         },
         pattern: {
           type: 'string',
           description:
             "Optional: specific testing pattern (e.g., 'accessibility', 'user-interaction', 'async')",
         },
       },
       required: ['component'],
     },
   }
   ```

2. **Create `testingHandlers.ts` with real test pattern extraction:**

   ```typescript
   export function handleGetTestingExamples(args: unknown): ToolResponse {
     const schema = z.object({
       component: z.string(),
       pattern: z.string().optional(),
     });

     const { component, pattern } = schema.parse(args);

     // Map to actual test file in components package
     const testExamples = extractTestPatterns(component, pattern);

     return {
       content: [
         {
           type: 'text',
           text: formatTestingExamples(component, testExamples, pattern),
         },
       ],
     };
   }

   function extractTestPatterns(component: string, pattern?: string) {
     // Extract real patterns from test files:
     // - findByRole patterns
     // - user interaction patterns
     // - accessibility testing
     // - async operations
     // - form integration
   }
   ```

3. **Create curated testing snippets for common components:**

   ```typescript
   const TESTING_PATTERNS = {
     RichSelect: {
       'user-interaction': `
   // Opening the select and choosing an option
   const combobox = screen.getByRole('combobox');
   await userEvent.click(combobox);
   
   const option = await screen.findByRole('option', {
     name: 'Option Label'
   });
   await userEvent.click(option);
   
   expect(onChange).toHaveBeenCalledWith(
     expect.objectContaining({ target: { value: expectedValue } }),
     expectedValue,
   );
       `,
       accessibility: `
   // Test keyboard navigation
   await userEvent.keyboard('{ArrowDown}');
   const options = await screen.findAllByRole('option');
   expect(options[0]).toHaveAttribute('aria-selected', 'true');
       `,
       'async-search': `
   // Testing async search functionality
   const combobox = await screen.findByRole('combobox', {
     name: 'Search',
   });
   
   await userEvent.type(combobox, 'search term');
   const options = await screen.findAllByRole('option');
   expect(options).toHaveLength(expectedLength);
       `,
     },
     Form: {
       validation: `
   // Testing form validation
   const submitButton = screen.getByRole('button', { name: 'Submit' });
   await userEvent.click(submitButton);
   
   const errorMessage = await screen.findByText('This field is required');
   expect(errorMessage).toBeInTheDocument();
       `,
       submission: `
   // Testing form submission
   const input = screen.getByRole('textbox', { name: 'Name' });
   await userEvent.type(input, 'Test Value');
   
   const submitButton = screen.getByRole('button', { name: 'Submit' });
   await userEvent.click(submitButton);
   
   await waitFor(() => {
     expect(onSubmit).toHaveBeenCalledWith(
       expect.objectContaining({ name: 'Test Value' })
     );
   });
       `,
     },
   };
   ```

**Impact:**

- ✅ AI gets proper testing patterns
- ✅ Reduces incorrect test generation (findByText → findByRole)
- ✅ Promotes accessibility-first testing
- ✅ Includes real-world patterns from actual test files

### Solution 3: Multi-Component Search Support ⭐ HIGH PRIORITY

**Approach:** Detect and handle multiple component names in a single query

#### Storybook Responsibilities

- N/A - This is purely an MCP server feature for search optimization

#### MCP Server Changes

1. **Update `handleFindComponent()` to detect multiple components:**

   ```typescript
   export function handleFindComponent(args: unknown) {
     const schema = z.object({
       query: z.string(),
       category: z.enum(['components', 'foundations', 'resources']).optional(),
     });

     const { query, category } = schema.parse(args);

     // Extract potential Iress component names from query
     const iressComponents = extractIressComponents(query);

     if (iressComponents.length > 1) {
       // Multi-component search
       return handleMultiComponentSearch(iressComponents, category);
     }

     // Single component search (existing logic)
     // ...
   }
   ```

2. **Create `handleMultiComponentSearch()` helper:**

   ```typescript
   function handleMultiComponentSearch(
     componentNames: string[],
     category?: string,
   ): ToolResponse {
     const results: Array<{
       component: string;
       file: string | null;
       description: string;
     }> = [];

     for (const componentName of componentNames) {
       const file = mapIressComponentToFile(componentName);

       if (file) {
         const filePath = path.join(DOCS_DIR, file);
         const content = readFileContent(filePath);
         const lines = content.split('\n');
         const description = extractDescription(lines);

         results.push({
           component: componentName,
           file,
           description,
         });
       } else {
         results.push({
           component: componentName,
           file: null,
           description: 'Component not found',
         });
       }
     }

     return {
       content: [
         {
           type: 'text',
           text: formatMultiComponentResults(results),
         },
       ],
     };
   }
   ```

3. **Also support space-separated component names without "Iress" prefix:**

   ```typescript
   function parseMultiComponentQuery(query: string): string[] {
     // First try to extract Iress components
     const iressComponents = extractIressComponents(query);
     if (iressComponents.length > 1) {
       return iressComponents;
     }

     // Try splitting by whitespace for queries like "Form Select Button"
     const potentialComponents = query
       .split(/\s+/)
       .filter((word) => word.length > 2) // Filter out short words
       .filter((word) => /^[A-Z]/.test(word)); // Starts with capital

     if (potentialComponents.length > 1) {
       return potentialComponents.map((c) => `Iress${c}`);
     }

     return [];
   }
   ```

**Impact:**

- ✅ "IressForm IressSelect" returns both components
- ✅ "Form Select" (without prefix) also works
- ✅ Better AI efficiency (one query instead of multiple)
- ✅ Improves developer experience

### Solution 4: Enhanced Documentation Search

**Approach:** Improve search relevance and contextual results

#### Storybook Responsibilities

- N/A - This is purely an MCP server feature for improved search

#### MCP Server Changes

1. **Add search result context enhancement:**

   ```typescript
   function enhanceSearchResults(results: SearchMatch[]): SearchMatch[] {
     return results.map((result) => ({
       ...result,
       // Add surrounding context for better understanding
       extendedContext: getExtendedContext(result.file, result.line, 5),
       // Add component type (component/pattern/foundation)
       type: categorizeFile(result.file),
       // Add related components
       relatedComponents: findRelatedComponents(result.content),
     }));
   }
   ```

2. **Improve `handleSearchIdsDocs()` to group by component:**

   ```typescript
   export function handleSearchIdsDocs(args: unknown): ToolResponse {
     // ... existing search logic ...

     // Group results by component for better readability
     const groupedResults = groupByComponent(results);

     return {
       content: [
         {
           type: 'text',
           text: formatGroupedSearchResults(groupedResults),
         },
       ],
     };
   }
   ```

### Solution 5: Add Component Aliases

**Approach:** Support common naming variations and shortcuts

#### Storybook Responsibilities

- N/A - This is purely an MCP server feature for search flexibility

#### MCP Server Changes

1. **Create alias mapping in `utils.ts`:**

   ```typescript
   const COMPONENT_ALIASES: Record<string, string> = {
     // Pattern aliases
     Form: 'IressForm',
     HookForm: 'IressHookForm',

     // Common shortcuts
     RS: 'IressRichSelect',
     AC: 'IressAutocomplete',

     // Common misspellings
     DateTimePicker: 'IressDatePicker',
     SelectBox: 'IressSelect',
   };

   export function resolveComponentAlias(name: string): string {
     return COMPONENT_ALIASES[name] ?? name;
   }
   ```

2. **Use aliases in search functions:**

   ```typescript
   export function handleFindComponent(args: unknown) {
     const { query } = schema.parse(args);

     // Resolve aliases first
     const resolvedQuery = resolveComponentAlias(query);

     // Continue with search...
   }
   ```

### Solution 6: Component Composition Patterns ⭐ PRIORITY

**Approach:** Provide pre-built UI patterns showing how IDS components work together

**Problem:** AI doesn't understand how to compose components effectively. It knows about individual components but struggles with:

- How to build a complete login form
- How to create a data table with actions
- How to structure a settings page
- What components typically work together

#### Storybook Responsibilities

- ❌ **NEW**: Create "Recipes" or "Patterns" documentation section in Storybook
- ❌ **NEW**: Add composition pattern stories showing complete UI examples:
  - **Login/Authentication Forms**
    - Simple login
    - Login with remember me
    - Login with social providers
  - **Data Tables**
    - Basic table with actions
    - Table with search and filters
    - Table with pagination and sorting
  - **Forms**
    - User registration form
    - Settings/preferences form
    - Multi-step wizard
  - **Search & Filter Interfaces**
    - Simple search
    - Advanced filters with multiple criteria
  - **CRUD Operations**
    - Create/edit modal forms
    - Delete confirmation dialogs

**Example Storybook structure:**

```
Recipes/
  ├── Forms/
  │   ├── Login Form (Simple)
  │   ├── Login Form (With Remember Me)
  │   ├── Registration Form
  │   └── Multi-step Wizard
  ├── Data Display/
  │   ├── User Table with Actions
  │   ├── Table with Search
  │   └── Table with Pagination
  ├── Search & Filter/
  │   ├── Simple Search Bar
  │   └── Advanced Filters
  └── CRUD Patterns/
      ├── Create User Modal
      ├── Edit Form
      └── Delete Confirmation
```

Each recipe should:

- Show **complete, runnable code** (not snippets)
- Include **all necessary imports**
- Demonstrate **best practices**
- Be **copy-paste ready**
- Include error handling and loading states

#### MCP Server Changes

1. **Add new tool `get_composition_patterns` in `tools.ts`:**

   ```typescript
   {
     name: 'get_composition_patterns',
     description:
       'Get common UI composition patterns showing how IDS components work together. Includes complete examples for forms, data tables, wizards, and other common UI patterns.',
     inputSchema: {
       type: 'object',
       properties: {
         pattern: {
           type: 'string',
           description: 'Pattern type (e.g., "login-form", "data-table", "wizard", "settings-page", "search-filter")',
         },
         complexity: {
           type: 'string',
           enum: ['simple', 'medium', 'complex'],
           description: 'Complexity level of the pattern',
           default: 'medium',
         },
       },
       required: ['pattern'],
     },
   }
   ```

2. **Create `compositionHandlers.ts` with curated patterns:**

   ```typescript
   const COMPOSITION_PATTERNS = {
     'login-form': {
       simple: `
   import { IressForm, IressInput, IressButton, IressStack } from '@iress-oss/ids-components';
   
   export const LoginForm = () => {
     return (
       <IressForm pattern="short" onSubmit={(data) => console.log(data)}>
         <IressStack direction="column" spacing="md">
           <IressInput
             name="email"
             label="Email"
             type="email"
             rules={{ required: 'Email is required' }}
           />
           <IressInput
             name="password"
             label="Password"
             type="password"
             rules={{ required: 'Password is required' }}
           />
           <IressButton type="submit" variant="primary">
             Log In
           </IressButton>
         </IressStack>
       </IressForm>
     );
   };
       `,
       medium: `
   import {
     IressForm,
     IressInput,
     IressButton,
     IressStack,
     IressCheckbox,
     IressLink,
   } from '@iress-oss/ids-components';
   
   export const LoginForm = () => {
     return (
       <IressForm
         pattern="short"
         onSubmit={(data) => handleLogin(data)}
         defaultValues={{ rememberMe: false }}
       >
         <IressStack direction="column" spacing="md">
           <IressInput
             name="email"
             label="Email"
             type="email"
             autoComplete="username"
             rules={{
               required: 'Email is required',
               pattern: {
                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
                 message: 'Invalid email address',
               },
             }}
           />
           <IressInput
             name="password"
             label="Password"
             type="password"
             autoComplete="current-password"
             rules={{
               required: 'Password is required',
               minLength: {
                 value: 8,
                 message: 'Password must be at least 8 characters',
               },
             }}
           />
           <IressCheckbox name="rememberMe" label="Remember me" />
           <IressStack direction="row" spacing="sm" justify="space-between">
             <IressButton type="submit" variant="primary">
               Log In
             </IressButton>
             <IressLink href="/forgot-password">Forgot password?</IressLink>
           </IressStack>
         </IressStack>
       </IressForm>
     );
   };
       `,
     },
     'data-table': {
       medium: `
   import {
     IressTable,
     IressButton,
     IressStack,
     IressInput,
     IressIconButton,
   } from '@iress-oss/ids-components';
   import { useState } from 'react';
   
   export const UsersTable = ({ users, onEdit, onDelete }) => {
     const [search, setSearch] = useState('');
     
     const filteredUsers = users.filter(user =>
       user.name.toLowerCase().includes(search.toLowerCase())
     );
     
     return (
       <IressStack direction="column" spacing="md">
         <IressStack direction="row" justify="space-between">
           <IressInput
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             placeholder="Search users..."
             width="300px"
           />
           <IressButton variant="primary" onClick={() => onEdit(null)}>
             Add User
           </IressButton>
         </IressStack>
         
         <IressTable
           data={filteredUsers}
           columns={[
             { header: 'Name', accessor: 'name' },
             { header: 'Email', accessor: 'email' },
             { header: 'Role', accessor: 'role' },
             {
               header: 'Actions',
               accessor: 'id',
               cell: ({ value }) => (
                 <IressStack direction="row" spacing="sm">
                   <IressIconButton
                     icon="edit"
                     onClick={() => onEdit(value)}
                     aria-label="Edit user"
                   />
                   <IressIconButton
                     icon="delete"
                     onClick={() => onDelete(value)}
                     aria-label="Delete user"
                   />
                 </IressStack>
               ),
             },
           ]}
         />
       </IressStack>
     );
   };
       `,
     },
     'search-filter': {
       simple: `
   import {
     IressStack,
     IressInput,
     IressRichSelect,
     IressButton,
   } from '@iress-oss/ids-components';
   
   export const SearchFilters = ({ onSearch, categories }) => {
     const [filters, setFilters] = useState({
       query: '',
       category: null,
     });
     
     return (
       <IressStack direction="row" spacing="md" align="end">
         <IressInput
           label="Search"
           value={filters.query}
           onChange={(e) => setFilters({ ...filters, query: e.target.value })}
           placeholder="Search..."
         />
         <IressRichSelect
           label="Category"
           options={categories}
           value={filters.category}
           onChange={(e, value) => setFilters({ ...filters, category: value })}
           placeholder="All categories"
         />
         <IressButton
           variant="primary"
           onClick={() => onSearch(filters)}
         >
           Search
         </IressButton>
       </IressStack>
     );
   };
       `,
     },
   };
   ```

3. **Add pattern recommendations based on user intent:**

   ```typescript
   export function recommendPatterns(description: string): string[] {
     const patterns = [];
     const lower = description.toLowerCase();

     if (lower.includes('login') || lower.includes('sign in')) {
       patterns.push('login-form');
     }
     if (
       lower.includes('table') ||
       lower.includes('list') ||
       lower.includes('data')
     ) {
       patterns.push('data-table');
     }
     if (lower.includes('search') || lower.includes('filter')) {
       patterns.push('search-filter');
     }
     if (lower.includes('wizard') || lower.includes('step')) {
       patterns.push('wizard');
     }
     if (lower.includes('settings') || lower.includes('preferences')) {
       patterns.push('settings-page');
     }

     return patterns;
   }
   ```

**Impact:**

- ✅ AI understands component composition
- ✅ Reduces iterations from scratch to working UI
- ✅ Promotes IDS best practices
- ✅ Shows proper prop combinations

### Solution 7: Design Tokens Integration ⭐ HIGH PRIORITY

**Approach:** Teach AI when and how to use design tokens

**Problem:** AI often hardcodes values instead of using design tokens, leading to:

- Inconsistent spacing (uses `padding: '16px'` instead of tokens)
- Wrong colors (uses `#000000` instead of semantic tokens)
- Hardcoded font sizes instead of typography tokens

#### Storybook Responsibilities

- ❌ **NEW**: Add "Design Tokens Usage" documentation page
- ❌ **NEW**: Create visual examples showing ✅ correct vs ❌ incorrect usage
- ❌ **NEW**: Document when to use tokens vs hardcoded values
- ❌ **NEW**: Include token categories:
  - **Color tokens** (semantic colors: `background.primary`, `text.primary`, etc.)
  - **Spacing tokens** (margin, padding: `spacing.sm`, `spacing.md`, etc.)
  - **Typography tokens** (font sizes, weights, line heights)
  - **Border tokens** (radius, width)
  - **Shadow tokens**

**Example Storybook content:**

```markdown
## Design Tokens

### Colors

✅ **DO**: Use semantic color tokens
\`\`\`tsx
import { css } from '@iress-oss/ids-components/css';

const styles = css({
backgroundColor: 'background.primary',
color: 'text.primary',
borderColor: 'border.default',
});
\`\`\`

❌ **DON'T**: Hardcode color values
\`\`\`tsx
const badStyles = {
backgroundColor: '#FFFFFF',
color: '#000000',
};
\`\`\`

### Spacing

✅ **DO**: Use spacing tokens
\`\`\`tsx
<IressStack spacing="md" padding="lg">
{/_ Content _/}
</IressStack>
\`\`\`

❌ **DON'T**: Hardcode pixel values
\`\`\`tsx

<div style={{ padding: '16px', margin: '24px' }}>
\`\`\`

### Typography

✅ **DO**: Use IressText with variants
\`\`\`tsx
<IressText variant="heading1">Main Heading</IressText>
<IressText variant="body">Body text</IressText>
\`\`\`

❌ **DON'T**: Hardcode typography
\`\`\`tsx

<h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
\`\`\`
```

#### MCP Server Changes

1. **Add new tool `get_design_tokens_usage` in `tools.ts`:**

   ```typescript
   {
     name: 'get_design_tokens_usage',
     description:
       'Get design token usage examples and guidelines. Shows when to use tokens vs hardcoded values, with practical examples.',
     inputSchema: {
       type: 'object',
       properties: {
         category: {
           type: 'string',
           enum: ['colors', 'spacing', 'typography', 'all'],
           description: 'Token category to get usage examples for',
           default: 'all',
         },
       },
     },
   }
   ```

2. **Enhance `handleGetDesignTokens()` with usage examples:**

   ```typescript
   const TOKEN_USAGE_EXAMPLES = {
     colors: `
   // ✅ CORRECT: Use semantic color tokens
   import { css } from '@iress-oss/ids-components/css';
   
   const styles = css({
     backgroundColor: 'background.primary',
     color: 'text.primary',
     borderColor: 'border.default',
   });
   
   // ❌ INCORRECT: Don't hardcode colors
   const badStyles = css({
     backgroundColor: '#FFFFFF',
     color: '#000000',
   });
   `,
     spacing: `
   // ✅ CORRECT: Use spacing tokens
   import { IressStack } from '@iress-oss/ids-components';
   
   <IressStack spacing="md" padding="lg">
     {/* Content */}
   </IressStack>
   
   // ✅ CORRECT: Use spacing in custom styles
   const styles = css({
     padding: 'spacing.md',
     margin: 'spacing.lg',
   });
   
   // ❌ INCORRECT: Don't hardcode spacing
   <div style={{ padding: '16px', margin: '24px' }}>
   `,
     typography: `
   // ✅ CORRECT: Use IressText with variants
   import { IressText } from '@iress-oss/ids-components';
   
   <IressText variant="heading1">Main Heading</IressText>
   <IressText variant="body">Body text</IressText>
   
   // ❌ INCORRECT: Don't hardcode typography
   <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
   `,
   };
   ```

**Impact:**

- ✅ Consistent design token usage
- ✅ Reduces custom CSS and inline styles
- ✅ Maintains design system consistency
- ✅ Easier theme switching

### Solution 8: Anti-Patterns and Best Practices ⭐ MEDIUM PRIORITY

**Approach:** Document common mistakes and how to avoid them

**Problem:** AI makes the same mistakes repeatedly:

- Nesting forms inside forms
- Missing accessibility labels
- Improper error handling
- Over-complicating simple UIs

#### Storybook Responsibilities

- ❌ **NEW**: Add "Best Practices" documentation page
- ❌ **NEW**: Create "Common Mistakes" section with anti-patterns
- ❌ **NEW**: Include categories:
  - **Form best practices**
  - **Accessibility guidelines**
  - **Performance optimization**
  - **Error handling patterns**
  - **State management**
- ❌ **NEW**: Show side-by-side ✅/❌ examples for each pattern

**Example Storybook content:**

```markdown
## Best Practices

### Forms

#### DO's

- ✅ Use `IressForm` with appropriate pattern (short/long)
- ✅ Always provide `name` attribute for form fields
- ✅ Use `rules` prop for validation
- ✅ Provide clear, accessible labels

#### DON'Ts

- ❌ Don't nest forms inside forms
- ❌ Don't mix controlled/uncontrolled inputs
- ❌ Don't use placeholder as label replacement
- ❌ Don't forget error handling

### Examples

✅ **CORRECT**
\`\`\`tsx
<IressForm pattern="short" onSubmit={handleSubmit}>
<IressInput
name="email"
label="Email Address"
rules={{ required: 'Email is required' }}
/>
</IressForm>
\`\`\`

❌ **INCORRECT**
\`\`\`tsx

<form>
  <IressForm>  {/* Nested forms! */}
    <IressInput placeholder="Email" />  {/* No label! */}
  </IressForm>
</form>
\`\`\`

### Accessibility

#### DO's

- ✅ Use semantic HTML elements
- ✅ Provide aria-label for icon-only buttons
- ✅ Ensure proper heading hierarchy
- ✅ Test with keyboard navigation

#### DON'Ts

- ❌ Don't use div/span for clickable elements
- ❌ Don't rely on color alone
- ❌ Don't remove focus indicators
```

#### MCP Server Changes

1. **Add new tool `get_best_practices` in `tools.ts`:**

   ```typescript
   {
     name: 'get_best_practices',
     description:
       'Get IDS best practices and anti-patterns. Learn what to avoid and recommended approaches for common scenarios.',
     inputSchema: {
       type: 'object',
       properties: {
         topic: {
           type: 'string',
           description: 'Topic (e.g., "forms", "accessibility", "performance", "error-handling")',
         },
       },
       required: ['topic'],
     },
   }
   ```

2. **Create `bestPracticesHandlers.ts` with curated guidance:**

   ```typescript
   const BEST_PRACTICES = {
     forms: {
       dos: [
         'Use IressForm pattern="short" or pattern="long" based on form complexity',
         'Always provide name attribute for form fields',
         'Use rules prop for validation instead of manual state management',
         'Provide clear, accessible labels for all inputs',
         'Use FormField for consistent layout and error display',
       ],
       donts: [
         "Don't nest forms inside forms",
         "Don't use defaultValue with controlled forms",
         "Don't forget to handle form submission errors",
         "Don't use inline validation that triggers on every keystroke",
       ],
       examples: `
   // ✅ CORRECT
   <IressForm pattern="short" onSubmit={handleSubmit}>
     <IressInput
       name="email"
       label="Email Address"
       rules={{ required: 'Email is required' }}
     />
   </IressForm>
   
   // ❌ INCORRECT
   <form>
     <IressForm>  {/* Nested forms */}
       <IressInput defaultValue={value} onChange={...} />  {/* Mixed controlled/uncontrolled */}
     </IressForm>
   </form>
       `,
     },
     accessibility: {
       dos: [
         'Use semantic HTML elements (button, input, etc.)',
         'Provide aria-label for icon-only buttons',
         'Ensure proper heading hierarchy',
         'Use IressLabel for form field labels',
         'Test with keyboard navigation',
       ],
       donts: [
         "Don't use div/span for clickable elements",
         "Don't rely on color alone to convey information",
         "Don't remove focus indicators",
         "Don't use placeholder as a label replacement",
       ],
     },
     performance: {
       dos: [
         'Use React.memo for expensive components',
         'Memoize callbacks with useCallback',
         'Use virtualisation for large lists',
         'Debounce search inputs',
       ],
       donts: [
         "Don't create new objects/arrays in render",
         "Don't use inline function definitions in props",
         "Don't fetch data on every render",
       ],
     },
   };
   ```

**Impact:**

- ✅ AI avoids common mistakes
- ✅ Generates accessible code by default
- ✅ Follows IDS best practices
- ✅ Reduces debugging iterations

### Solution 9: Context-Aware Code Generation ⭐ HIGH PRIORITY

**Approach:** Provide full, runnable examples instead of snippets

**Problem:** AI generates incomplete code:

- Missing imports
- Undefined variables
- No error handling
- No loading states

#### Storybook Responsibilities

- ❌ **NEW**: Ensure all code examples are complete and runnable
- ❌ **NEW**: Include all necessary imports in every example
- ❌ **NEW**: Show error handling in async examples
- ❌ **NEW**: Include loading states in async examples
- ❌ **NEW**: Add "View source" or "Copy code" buttons for complete examples

**Example Storybook story with complete code:**

```tsx
export const AsyncSelectWithErrorHandling: Story = {
  render: () => <AsyncSelectExample />,
  parameters: {
    docs: {
      source: {
        code: `
import { IressRichSelect, IressText } from '@iress-oss/ids-components';
import { useState } from 'react';

export const AsyncSelectExample = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState([]);
  
  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await fetchOptions(query);
      setOptions(results);
    } catch (err) {
      setError('Failed to load options');
    } finally {
      setLoading(false);
    }
  };
  
  if (error) {
    return <IressText color="error">{error}</IressText>;
  }
  
  return (
    <IressRichSelect
      options={options}
      onSearchChange={handleSearch}
      loading={loading}
      placeholder="Search..."
    />
  );
};
        `,
      },
    },
  },
};
```

**Requirements for all Storybook examples:**

1. Include complete imports
2. Show state management (useState, etc.)
3. Include error handling (try/catch)
4. Show loading states for async operations
5. Be copy-paste ready

#### MCP Server Changes

1. **Enhance all example responses to include complete context:**

   ```typescript
   function formatCompleteExample(componentName: string, code: string): string {
     return `
   // Complete, runnable example for ${componentName}
   
   import { ${extractImports(code)} } from '@iress-oss/ids-components';
   import { useState } from 'react';
   
   export const ${componentName}Example = () => {
     ${code}
   };
   
   // Usage in your app:
   // import { ${componentName}Example } from './examples/${componentName}Example';
   // <${componentName}Example />
     `;
   }
   ```

2. **Include common patterns like loading and error states:**

   ```typescript
   const COMPLETE_EXAMPLE_TEMPLATE = `
   import { IressRichSelect, IressText } from '@iress-oss/ids-components';
   import { useState, useEffect } from 'react';
   
   export const AsyncSelectExample = () => {
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
     const [options, setOptions] = useState([]);
     
     const handleSearch = async (query) => {
       setLoading(true);
       setError(null);
       
       try {
         const results = await fetchOptions(query);
         setOptions(results);
       } catch (err) {
         setError('Failed to load options');
       } finally {
         setLoading(false);
       }
     };
     
     if (error) {
       return <IressText color="error">{error}</IressText>;
     }
     
     return (
       <IressRichSelect
         options={options}
         onSearchChange={handleSearch}
         loading={loading}
         placeholder="Search..."
       />
     );
   };
   `;
   ```

**Impact:**

- ✅ AI generates complete, runnable code
- ✅ Includes proper error handling
- ✅ Shows loading states
- ✅ All imports included

### Solution 10: Integration Examples ⭐ MEDIUM PRIORITY

**Approach:** Show how IDS works with popular libraries

**Problem:** AI doesn't know how to integrate IDS with:

- React Hook Form (already used in IressForm)
- TanStack Query
- React Router
- State management libraries

#### Storybook Responsibilities

- ❌ **NEW**: Create "Integrations" documentation section
- ❌ **NEW**: Add integration guides for popular libraries:
  - **React Hook Form** (custom usage beyond IressForm)
  - **TanStack Query** (async data fetching)
  - **React Router** (navigation, protected routes)
  - **Zustand/Redux** (state management)
  - **TypeScript** (type definitions, best practices)
- ❌ **NEW**: Include complete, working examples for each integration
- ❌ **NEW**: Show common patterns and pitfalls

**Example Storybook structure:**

```
Integrations/
  ├── React Hook Form/
  │   ├── Custom Form Controller
  │   ├── Complex Validation
  │   └── Dynamic Form Fields
  ├── TanStack Query/
  │   ├── Async Select Data
  │   ├── Form Submission with Mutation
  │   └── Optimistic Updates
  ├── React Router/
  │   ├── Form with Navigation Guards
  │   └── Protected Form Routes
  └── State Management/
      ├── Zustand Integration
      └── Redux Toolkit Example
```

**Example integration documentation:**

```markdown
## React Hook Form Integration

### Custom Form Controller

\`\`\`tsx
import { useForm, Controller } from 'react-hook-form';
import { IressRichSelect, IressButton } from '@iress-oss/ids-components';

export const CustomFormExample = () => {
const { control, handleSubmit } = useForm();

return (

<form onSubmit={handleSubmit(onSubmit)}>
<Controller
name="category"
control={control}
rules={{ required: 'Category is required' }}
render={({ field, fieldState }) => (
<IressRichSelect
{...field}
options={categories}
error={fieldState.error?.message}
/>
)}
/>
<IressButton type="submit">Submit</IressButton>
</form>
);
};
\`\`\`

### When to Use

- Use custom Controller when you need more control than IressForm provides
- Use for complex validation logic
- Use when integrating with existing React Hook Form setup
```

#### MCP Server Changes

1. **Add new tool `get_integration_examples` in `tools.ts`:**

   ```typescript
   {
     name: 'get_integration_examples',
     description:
       'Get examples of integrating IDS components with popular libraries like React Hook Form, TanStack Query, React Router, etc.',
     inputSchema: {
       type: 'object',
       properties: {
         library: {
           type: 'string',
           enum: ['react-hook-form', 'tanstack-query', 'react-router', 'zustand'],
           description: 'Library to get integration examples for',
         },
       },
       required: ['library'],
     },
   }
   ```

2. **Create integration examples:**

   ```typescript
   const INTEGRATION_EXAMPLES = {
     'react-hook-form': `
   // IDS already uses React Hook Form internally via IressForm
   // For custom integration:
   
   import { useForm, Controller } from 'react-hook-form';
   import { IressRichSelect, IressButton } from '@iress-oss/ids-components';
   
   export const CustomFormExample = () => {
     const { control, handleSubmit } = useForm();
     
     return (
       <form onSubmit={handleSubmit(onSubmit)}>
         <Controller
           name="category"
           control={control}
           rules={{ required: 'Category is required' }}
           render={({ field, fieldState }) => (
             <IressRichSelect
               {...field}
               options={categories}
               error={fieldState.error?.message}
             />
           )}
         />
         <IressButton type="submit">Submit</IressButton>
       </form>
     );
   };
     `,
     'tanstack-query': `
   import { useQuery } from '@tanstack/react-query';
   import { IressRichSelect, IressText } from '@iress-oss/ids-components';
   
   export const QuerySelectExample = () => {
     const { data, isLoading, error } = useQuery({
       queryKey: ['options'],
       queryFn: fetchOptions,
     });
     
     if (error) {
       return <IressText color="error">Failed to load options</IressText>;
     }
     
     return (
       <IressRichSelect
         options={data ?? []}
         loading={isLoading}
         placeholder="Select an option"
       />
     );
   };
     `,
   };
   ```

**Impact:**

- ✅ AI knows how to use IDS with common libraries
- ✅ Follows established patterns
- ✅ Reduces integration friction

## Implementation Priority

1. **✅ Solution 1: Pattern Support** - Critical for IressForm discovery
2. **✅ Solution 6: Component Composition Patterns** - Critical for quality UI generation
3. **✅ Solution 7: Design Tokens Integration** - High priority for consistency
4. **✅ Solution 9: Context-Aware Code Generation** - High priority for complete examples
5. **✅ Solution 3: Multi-Component Search** - High impact on UX
6. **✅ Solution 2: Testing Examples** - Important for test quality
7. **🔄 Solution 8: Anti-Patterns and Best Practices** - Medium priority
8. **🔄 Solution 10: Integration Examples** - Medium priority
9. **🔄 Solution 4: Enhanced Search** - Nice to have
10. **🔄 Solution 5: Aliases** - Nice to have

## Testing Requirements

### For Pattern Support

- [ ] Test IressForm maps to `patterns-form-docs.md`
- [ ] Test IressHookForm works correctly
- [ ] Test fallback from patterns to components works
- [ ] Test component-first priority maintained

### For Multi-Component Search

- [ ] Test "IressForm IressSelect" returns both
- [ ] Test "Form Select Button" works
- [ ] Test single component still works
- [ ] Test error handling for not-found components

### For Testing Examples

- [ ] Test RichSelect returns findByRole patterns
- [ ] Test Form returns validation patterns
- [ ] Test async component testing examples
- [ ] Test accessibility testing examples

### For Component Composition Patterns

- [ ] Test login-form pattern returns complete, runnable code
- [ ] Test data-table pattern includes all necessary imports
- [ ] Test pattern recommendations work for common descriptions
- [ ] Test complexity levels (simple/medium/complex) return appropriate examples

### For Design Tokens Integration

- [ ] Test color token usage examples are correct
- [ ] Test spacing token examples follow IDS patterns
- [ ] Test typography guidance uses IressText variants
- [ ] Test anti-pattern examples show clear warnings

### For Best Practices

- [ ] Test forms best practices include validation examples
- [ ] Test accessibility guidance includes aria-label examples
- [ ] Test performance tips include memoization patterns
- [ ] Test anti-patterns clearly show what not to do

### For Context-Aware Generation

- [ ] Test examples include all necessary imports
- [ ] Test examples include error handling
- [ ] Test examples include loading states
- [ ] Test examples are complete and runnable

### For Integration Examples

- [ ] Test React Hook Form integration is accurate
- [ ] Test TanStack Query patterns follow library best practices
- [ ] Test integration examples include error handling
- [ ] Test integration examples work with IDS components

## Success Metrics

After implementation:

### Search & Discovery

- ✅ IressForm search success rate: 0% → 100%
- ✅ Multi-component queries: 0% → 100%
- ✅ Pattern-based component discovery: 0% → 100%

### Code Quality

- ✅ Correct test patterns in AI responses: ~50% → ~90%
- ✅ Complete, runnable examples (with imports): ~40% → ~95%
- ✅ Design token usage in generated code: ~20% → ~80%
- ✅ Accessible code by default: ~60% → ~90%

### Development Efficiency

- ✅ Iterations needed for working UI: 3-5 → 1-2
- ✅ Time to first working prototype: 30min → 10min
- ✅ AI understanding of component composition: ~40% → ~85%

### Developer Satisfaction

- ✅ Overall MCP search quality rating: 3/5 → 4.5/5
- ✅ "Would recommend to colleague": 60% → 90%
- ✅ Reduction in "AI hallucinations": 30% → 5%

## Migration Notes

- All changes are backward compatible
- Existing tools continue to work
- New tools (`get_testing_examples`) are additive
- Pattern support extends existing logic without breaking it

## Documentation Updates Needed

1. **README Updates:**
   - Add pattern support documentation
   - Add multi-component search examples
   - Document all new tools (testing_examples, composition_patterns, etc.)
   - Add best practices for AI prompting with MCP server

2. **Tool Documentation:**
   - Create usage guide for `get_composition_patterns`
   - Document `get_design_tokens_usage` with examples
   - Add `get_best_practices` reference guide
   - Document `get_testing_examples` patterns
   - Add `get_integration_examples` library matrix

3. **Developer Guides:**
   - "How to generate quality UI with IDS and AI" guide
   - Common AI prompting patterns for IDS development
   - Troubleshooting guide for when AI generates incorrect code
   - Quick reference card for MCP tools

4. **Examples Repository:**
   - Create example prompts that work well
   - Document anti-patterns in prompting
   - Show before/after improvements with new MCP tools

## AI Prompting Best Practices (New Section)

To maximize the effectiveness of the improved MCP server, developers should:

### For UI Generation

**✅ Good Prompts:**

- "Create a login form using IressForm with email and password validation"
- "Build a data table with search and actions using composition_patterns"
- "Show me the best practice for implementing async select with error handling"

**❌ Poor Prompts:**

- "Make a form" (too vague)
- "Create login" (missing context about IDS usage)
- "I need a table" (doesn't specify IDS components)

### For Testing

**✅ Good Prompts:**

- "Write tests for IressRichSelect showing proper findByRole usage"
- "Show me accessibility testing patterns for forms"
- "Generate test for async autocomplete with user interaction"

**❌ Poor Prompts:**

- "Write tests" (no component specified)
- "Test my form" (too generic)

### For Component Discovery

**✅ Good Prompts:**

- "Find components for building a user settings page"
- "What IDS components work together for data entry forms?"
- "Show me patterns for wizards and multi-step forms"

**❌ Poor Prompts:**

- "What components exist?" (too broad)
- "Show me everything" (unfocused)

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- ✅ Solution 1: Pattern Support
- ✅ Solution 3: Multi-Component Search
- ✅ Solution 6: Component Composition Patterns

**Goal:** Enable basic UI generation with patterns

### Phase 2: Quality Improvements (Week 3-4)

- ✅ Solution 2: Testing Examples
- ✅ Solution 7: Design Tokens Integration
- ✅ Solution 9: Context-Aware Code Generation

**Goal:** Improve code quality and completeness

### Phase 3: Advanced Features (Week 5-6)

- 🔄 Solution 8: Anti-Patterns and Best Practices
- 🔄 Solution 10: Integration Examples
- 🔄 Solution 4: Enhanced Search

**Goal:** Advanced scenarios and integrations

### Phase 4: Polish (Week 7)

- 🔄 Solution 5: Aliases
- 🔄 Documentation updates
- 🔄 Developer guides and examples

**Goal:** Documentation and developer experience
