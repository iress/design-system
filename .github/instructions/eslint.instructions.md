To lint all files in a Yarn workspace, use this pattern:

`yarn workspace <workspace-name> run lint`

Examples:

- Lint components package: `yarn workspace @iress-oss/ids-components run lint`
- Lint tokens package: `yarn workspace @iress-oss/ids-tokens run lint`

For specific files:

- Lint specific file in components: `yarn workspace @iress-oss/ids-components exec npx eslint src/components/Button/Button.tsx`

**General pattern for specific files:**
`yarn workspace <workspace-name> exec npx eslint <file-path>`

Available workspace names:

- @iress-oss/ids-components
- @iress-oss/ids-tokens
- @iress-oss/ids-storybook-addon
- @iress-oss/ids-mcp-server

Replace `<workspace-name>` with the target workspace and `<file-path>` with the specific file or pattern to lint.
