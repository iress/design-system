# Iress Design System (IDS)

The IDS monorepo contains the React component library and supporting packages for the Iress Design System.

## Packages

- `@iress-oss/ids-components` - React components that implement the design system
- `@iress-oss/ids-storybook-config` - Shared Storybook configuration for IDS packages
- `@iress-oss/ids-storybook-okta` - Storybook addon for integrating Okta authentication into Storybook
- `@iress-oss/ids-storybook-sandbox` - Storybook addon for opening code examples in CodeSandbox
- `@iress-oss/ids-storybook-toggle-stories` - Storybook addon for toggling the visibility of stories in Storybook
- `@iress-oss/ids-storybook-version-badge` - Storybook addon for displaying version badges in Storybook
- `@iress-oss/ids-tokens` - Design tokens for the Iress Design System

## Usage

To use IDS, please refer to the [documentation](https://main--691abcc79dfa560a36d0a74f.chromatic.com).

If your application enforces a Content Security Policy, see the [CSP Guide](https://main--691abcc79dfa560a36d0a74f.chromatic.com?path=/docs/components_get-started-content-security-policy--docs) in the Storybook documentation for required origins.

If you find a bug in any of the Design System packages or would like an enhancement, please reach out to us using the [issues tab](https://github.com/iress/design-system/issues).

## GitHub Copilot Integration

This repository includes specialized GitHub Copilot agents to assist with development tasks:

- **Bug-Fixing Agent**: Systematically fixes bugs from the issue tracker with comprehensive documentation

**Learn more**: See the [Copilot Agent Setup Guide](docs/COPILOT-AGENT-SETUP.md) for detailed instructions on using these agents in VS Code and Slack.

## Development

### Stack

- [React](https://facebook.github.io/react/): A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
- [Yarn Workspaces](https://yarnpkg.com/features/workspaces): A monorepo management tool with dependency hoisting and workspace commands.
- [Vite](https://vitejs.dev/): A build tool that aims to provide a faster and leaner development experience for modern web projects.
- [Vitest](https://vitejs.dev/guide/features.html#testing): A test runner for Vite.
- [Storybook](https://storybook.js.org/): An open-source tool for developing UI components in isolation for React, Vue, and Angular.

### Setup

Ensure you run all the commands in the root folder of this repo.

```bash
# Install Node
# Install Node using nvm: https://github.com/nvm-sh/nvm
nvm use

# Enable corepack to set yarn version 'berry'.
corepack enable

# Setup the yarn version.
yarn set version berry

# Install dependencies
yarn

# Prepare your development environment
# This will install husky git hooks and build all packages
yarn prepare

# Start Storybook for development
yarn dev
```

### Testing

To run tests for all packages:

```bash
yarn test
```

## Agent Skills

This repository provides **agent skills** that give AI coding assistants contextual knowledge about the Iress Design System — no MCP server or runtime dependencies required.

### Available Skills

| Skill               | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| `figma-to-ids`      | Translate Figma design properties into IDS component implementations   |
| `repo-maintenance`  | Guide for maintaining the IDS monorepo (components, tokens, CI, PRs)   |
| `token-usage`       | Guide on correctly using IDS design tokens in React components and CSS |
| `ui-doctor`         | Audit and validate IDS component usage and compliance                  |
| `ui-translation`    | Translate natural language UI descriptions into IDS component code     |
| `version-migration` | Migrate applications between IDS major versions (v4→v5, v5→v6, OUI→v6)|

### Installation

Install skills using the [skills CLI](https://github.com/vercel-labs/skills):

```bash
# Install all IDS skills (interactive — choose your agents)
npx skills add iress/design-system

# Install a specific skill
npx skills add iress/design-system --skill token-usage

# Install to a specific agent (e.g. GitHub Copilot, Claude Code, Cursor)
npx skills add iress/design-system -a github-copilot
npx skills add iress/design-system -a claude-code
npx skills add iress/design-system -a cursor

# List available skills before installing
npx skills add iress/design-system --list
```

Skills are also available directly via the `.agents/skills/` and `packages/components/.ai/` directories in the repository.

## Contributing

1. Fork the repo
2. Make the changes
3. Run the tests
4. Commit and push your changes
5. Send a pull request

## License

Apache 2.0 License (See the included [LICENSE](/LICENSE) file for more information).
