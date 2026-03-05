# Running Single Tests with Yarn Workspaces

## 🎯 **Direct Yarn Workspace Commands (Recommended):**

```bash
# Run a specific test file using --testFile flag
yarn workspace @iress-oss/ids-components run test:coverage -- --testFile MyComponent.test.tsx

# Run any project with a specific file
yarn workspace <package-name> run test:coverage -- --testFile <filename>
```

## 🔧 **Additional Test Command Options:**

```bash
# Method 1: Using --testFile flag
yarn workspace @iress-oss/ids-components run test:coverage -- --testFile MyComponent.test.tsx

# Method 2: Using positional argument (regex pattern)
yarn workspace @iress-oss/ids-components run test:coverage -- MyComponent.test.tsx

# Method 3: Using partial filename matching
yarn workspace @iress-oss/ids-components run test:coverage -- MyComponent
```

## 📂 **File Structure Requirements:**

Test files must be in the project's `src/` directory:

- ✅ `packages/components/src/MyComponent.test.tsx`
- ❌ `packages/components/MyComponent.test.tsx` (wrong location)

## 🚀 **Real Examples:**

```bash
# Test our example files
yarn workspace @iress-oss/ids-components run test:coverage -- --testFile test-file-2.test.ts

# Or using the shortcuts
yarn test:components:file test-file-2.test.ts
```

## 💡 **Pro Tips:**

1. **Regex matching**: `yarn workspace @iress-oss/ids-components run test -- Button` will match `Button.test.tsx`, `ButtonGroup.test.tsx`, etc.
2. **Watch mode**: Add `--watch` to any command for continuous testing
3. **UI mode**: Add `--ui` to any command for the Vitest UI
4. **Coverage**: Tests run with coverage by default in this project

## 🔥 **Most Common Usage:**

```bash
# Quick test of a specific component
yarn workspace @iress-oss/ids-components run test:coverage -- --testFile Button.test.tsx

# Watch mode while developing
yarn workspace @iress-oss/ids-components run test:coverage -- --testFile Button.test.tsx --watch

# UI mode for debugging
yarn workspace @iress-oss/ids-components run test:coverage -- --testFile Button.test.tsx --ui
```
