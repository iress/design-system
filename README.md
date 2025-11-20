# Iress Design System (IDS)

The IDS monorepo contains the React component library and supporting packages for the Iress Design System. blah

## Packages

- `@iress-oss/ids-components` - React components that implement the design system
- `@iress-oss/ids-mcp-server` - Model Context Protocol (MCP) server providing AI assistants with contextual information about IDS components
- `@iress-oss/ids-storybook-config` - Shared Storybook configuration for IDS packages
- `@iress-oss/ids-storybook-okta` - Storybook addon for integrating Okta authentication into Storybook
- `@iress-oss/ids-storybook-sandbox` - Storybook addon for opening code examples in an online sandbox environment
- `@iress-oss/ids-storybook-toggle-stories` - Storybook addon for toggling the visibility of stories in Storybook
- `@iress-oss/ids-storybook-version-badge` - Storybook addon for displaying version badges in Storybook
- `@iress-oss/ids-tokens` - Design tokens for the Iress Design System

## Usage

To use IDS, please refer to the [documentation](https://main--691abcc79dfa560a36d0a74f.chromatic.com).

If you find a bug in any of the Design System packages or would like an enhancement, please reach out to us using the [issues tab](https://github.com/iress/design-system/issues).

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

# Start Storybook for development
yarn dev
```

### Testing

To run tests for all packages:

```bash
yarn test
```

## Contributing

1. Fork the repo
2. Make the changes
3. Run the tests
4. Commit and push your changes
5. Send a pull request

## License

Apache 2.0 License (See the included [LICENSE](/LICENSE) file for more information).
