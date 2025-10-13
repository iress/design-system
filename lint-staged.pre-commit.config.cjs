const {
  createWorkspaceAwareLintCommand,
} = require('./shared/lint-staged-base.config.cjs');

module.exports = {
  // PRE-COMMIT: Light and fast - only lint and format changed files
  // Focus on immediate code quality without running tests

  // TypeScript and JavaScript files - lint and format only
  '**/*.{ts,tsx,js,jsx,cjs,mjs}': (files) => {
    return [
      ...createWorkspaceAwareLintCommand(files),
      `prettier --write ${files.join(' ')}`,
    ];
  },

  // Configuration and documentation files - format only
  '**/*.{json,yaml,yml,md}': (files) => [`prettier --write ${files.join(' ')}`],

  // MDX files (Storybook stories) - lint and format only
  '**/*.mdx': (files) => {
    return [
      ...createWorkspaceAwareLintCommand(files),
      `prettier --write ${files.join(' ')}`,
    ];
  },

  // Package.json files - format and validate structure
  '**/package.json': (files) => [
    `prettier --write ${files.join(' ')}`,
    // Validate package.json structure
    `node -e "files=['${files.join("','")}'];files.forEach(f=>require(f))"`,
  ],
};
