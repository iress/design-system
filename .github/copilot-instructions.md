# GitHub Copilot Instructions for Iress Design System

This repository uses GitHub Copilot with specialized agents and instructions to maintain code quality and consistency.

## Available Instructions

This repository contains domain-specific instructions located in `.github/instructions/`:

- **`bugfixing.instructions.md`** - Comprehensive bug-fixing methodology and best practices
- **`component-creation.instructions.md`** - Guidelines for creating new design system components
- **`file-organization.instructions.md`** - File organization principles for implementation and test files
- **`global.instructions.md`** - General workspace commands, test commands, and linting
- **`pr-review.instructions.md`** - Code review standards and preferences
- **`eslint.instructions.md`** - ESLint usage and file-specific linting patterns

## Specialized Agents

### Bug-Fixing Agent

A specialized agent for fixing bugs from the GitHub issue tracker. This agent:

- Follows the comprehensive methodology in `bugfixing.instructions.md`
- Handles bugs in both 5.x and main branches with cross-branch tracking
- Creates Storybook bug reproduction stories
- Provides multiple solution approaches with trade-offs
- Generates PR-ready documentation
- Integrates with GitHub Issues for automatic context retrieval
- Ensures bugs fixed on one branch are addressed on the other when applicable

**Invocation**: Invoke the bug-fixing agent by mentioning it with an issue number or bug description. Always specify which branch(es) are affected.

**Location**: `.github/agents/bugFixAgent.md`

## Prompts

### Component Meta Agent

A specialized agent for generating component metadata and thumbnails.

**Location**: `.github/prompts/createComponentMeta.md`

## General Copilot Behavior

When assisting with this repository, GitHub Copilot should:

1. **Follow Existing Instructions**: Always reference and follow the domain-specific instructions in `.github/instructions/`
2. **Maintain Consistency**: Follow established patterns and conventions in the codebase
3. **Use Progressive Communication**: Confirm understanding before implementing changes
4. **Prefer Minimal Changes**: Fix issues with targeted, minimal changes rather than over-engineering
5. **Test-Driven**: Run tests after changes and ensure no regressions
6. **Document Changes**: Provide clear explanations of what changed and why

## Repository Context

- **Monorepo Structure**: Uses Yarn workspaces with multiple packages
- **Main Packages**:
  - `@iress-oss/ids-components` - React component library
  - `@iress-oss/ids-tokens` - Design tokens
  - Storybook addons for various integrations

- **Tech Stack**: React, TypeScript, Vite, Vitest, Storybook, Panda CSS
- **Testing**: Use `yarn test:coverage` commands, wait patiently for test startup (can take 30+ seconds)
- **Linting**: Use workspace-specific ESLint commands

## Best Practices

1. **Read Before Editing**: Always read relevant files and context before making changes
2. **Search, Don't Assume**: Use semantic_search and grep_search to locate code
3. **Validate Changes**: Run tests and linting after modifications
4. **Follow Patterns**: Match existing code style and organizational patterns
5. **Reference Instructions**: When working on specific tasks (bugs, components, etc.), read the relevant instruction file first

## Package Dependencies

- `@iress-oss/ids-components` depends on `@iress-oss/ids-tokens`

## Important Notes

- Test files must be in the project's `src/` directory
- Always use workspace-relative paths in file references
- Wait for command completion before analyzing output (especially tests)
- Never create tests for pure interface/type files with no runtime behavior

---

For detailed guidance on specific tasks, refer to the instruction files in `.github/instructions/`.
