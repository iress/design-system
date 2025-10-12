module.exports = {
  // PRE-PUSH: Comprehensive - lint, format, and test changed files
  // Ensures all changes are thoroughly validated before pushing

  // TypeScript and JavaScript files - comprehensive checks
  '**/*.{ts,tsx,js,jsx,cjs,mjs}': (files) => {
    const commands = [
      // Lint the specific staged files with auto-fix
      `yarn eslint ${files.join(' ')} --fix`,
      // Format the staged files
      `prettier --write ${files.join(' ')}`,
    ];

    // Add targeted testing for files in packages that have tests
    const packagesWithTests = [
      'packages/components',
      'packages/editor',
      'packages/themes',
      'apps/storybook',
    ];
    const testableFiles = files.filter(
      (file) =>
        packagesWithTests.some((pkg) => file.includes(pkg)) &&
        !file.includes('.test.') &&
        !file.includes('.spec.'),
    );

    if (testableFiles.length > 0) {
      // For each package with changed files, run its tests
      const affectedPackages = new Set();

      testableFiles.forEach((file) => {
        if (file.includes('packages/components'))
          affectedPackages.add('components');
        if (file.includes('packages/editor')) affectedPackages.add('editor');
        if (file.includes('packages/themes')) affectedPackages.add('themes');
        if (file.includes('apps/storybook')) affectedPackages.add('storybook');
      });

      // Run tests for each affected package
      affectedPackages.forEach((pkg) => {
        if (pkg === 'components')
          commands.push('yarn workspace @iress-oss/ids-components run test');
        if (pkg === 'editor')
          commands.push('yarn workspace @iress/ids-editor run test');
        if (pkg === 'themes')
          commands.push('yarn workspace @iress/ids-themes run test');
        if (pkg === 'storybook')
          commands.push('yarn workspace @iress/ids-storybook run test');
      });
    }

    return commands;
  },

  // Configuration and documentation files - format only
  '**/*.{json,yaml,yml,md}': (files) => [`prettier --write ${files.join(' ')}`],

  // MDX files (Storybook stories) - comprehensive checks
  '**/*.mdx': (files) => {
    const commands = [
      `yarn eslint ${files.join(' ')} --fix`,
      `prettier --write ${files.join(' ')}`,
    ];

    // If storybook MDX files changed, run storybook tests
    const storybookFiles = files.filter((file) =>
      file.includes('apps/storybook'),
    );
    if (storybookFiles.length > 0) {
      commands.push('yarn workspace @iress/ids-storybook run test');
    }

    return commands;
  },

  // Package.json files - format, validate, and check dependencies
  '**/package.json': (files) => [
    `prettier --write ${files.join(' ')}`,
    // Validate package.json structure
    `node -e "files=['${files.join("','")}'];files.forEach(f=>require(f))"`,
  ],
};
