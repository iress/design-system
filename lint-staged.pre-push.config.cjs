const fs = require('fs');
const path = require('path');
const {
  getWorkspaceConfig,
  createWorkspaceAwareLintCommand,
} = require('./shared/lint-staged-base.config.cjs');

/**
 * Creates a command to check coverage for specific files using the standalone script
 * @param {string} workspaceDir - Workspace directory path
 * @param {string[]} changedFiles - Array of changed file paths in the workspace
 * @returns {string} Command to verify coverage threshold
 */
const createCoverageCheckCommand = (workspaceDir, changedFiles) => {
  const filesArg = changedFiles.map((f) => path.basename(f)).join(',');
  return `yarn check-coverage --workspace ${workspaceDir} --files "${filesArg}"`;
};

/**
 * Adds workspace-specific typecheck, test:coverage, and coverage check commands for affected workspaces
 * @param {string[]} files - Array of file paths
 * @param {string[]} commands - Array to append commands to
 * @param {boolean} excludeTestFiles - Whether to exclude test files from analysis
 */
const addWorkspaceCommands = (files, commands, excludeTestFiles = true) => {
  const { patterns, regexes } = getWorkspaceConfig();
  const workspaceFiles = {};

  // Filter test files if requested
  const filesToProcess = excludeTestFiles
    ? files.filter(
        (file) => !file.includes('.test.') && !file.includes('.spec.'),
      )
    : files;

  // Group files by workspace
  filesToProcess.forEach((file) => {
    const matchedRegex = regexes.find((regex) => regex.test(file));
    if (matchedRegex) {
      const workspaceName = file.match(matchedRegex)[1];
      if (!workspaceFiles[workspaceName]) {
        workspaceFiles[workspaceName] = [];
      }
      workspaceFiles[workspaceName].push(file);
    }
  });

  // For each affected workspace, check if it has test and typecheck scripts and run them
  Object.keys(workspaceFiles).forEach((workspaceName) => {
    for (const pattern of patterns) {
      const workspaceDir = pattern.replace('*', workspaceName);
      const packageJsonPath = path.join(workspaceDir, 'package.json');

      try {
        if (fs.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, 'utf8'),
          );

          // Check if the workspace has a typecheck script
          if (packageJson.scripts?.typecheck && packageJson.name) {
            commands.push(`yarn workspace ${packageJson.name} run typecheck`);
          }

          // Check if the workspace has a test:coverage script
          if (packageJson.scripts?.['test:coverage'] && packageJson.name) {
            commands.push(
              `yarn workspace ${packageJson.name} run test:coverage --changed ${filesToProcess.join(' ')}`,
            );

            // Add coverage check for the changed files in this workspace
            const workspaceChangedFiles = workspaceFiles[workspaceName];
            commands.push(
              createCoverageCheckCommand(workspaceDir, workspaceChangedFiles),
            );
          }
          break;
        }
      } catch {
        continue;
      }
    }
  });
};

module.exports = {
  // PRE-PUSH: Comprehensive - lint, format, and test changed files
  // Ensures all changes are thoroughly validated before pushing

  // TypeScript and JavaScript files - comprehensive checks
  '**/*.{ts,tsx,js,jsx,cjs,mjs}': (files) => {
    const commands = [
      // Lint the specific staged files with auto-fix
      ...createWorkspaceAwareLintCommand(files),
      // Format the staged files
      `prettier --write ${files.join(' ')}`,
    ];

    // Add targeted testing for files in workspaces that have test scripts
    // This will also check coverage threshold for changed files
    addWorkspaceCommands(files, commands, true);

    return commands;
  },

  // Configuration and documentation files - format and validate Mermaid diagrams
  '**/*.{json,yaml,yml}': (files) => [`prettier --write ${files.join(' ')}`],

  '**/*.md': (files) => [
    `prettier --write ${files.join(' ')}`,
    `tsx ./scripts/lint-mermaid.ts ${files.join(' ')}`,
  ],

  // MDX files (Storybook stories) - comprehensive checks
  '**/*.mdx': (files) => {
    const commands = [
      ...createWorkspaceAwareLintCommand(files),
      `prettier --write ${files.join(' ')}`,
    ];

    // Run tests for any workspace that contains changed MDX files and has test scripts
    addWorkspaceCommands(files, commands, false);

    return commands;
  },

  // Package.json files - format, validate, and check dependencies
  '**/package.json': (files) => [
    `prettier --write ${files.join(' ')}`,
    // Validate package.json structure
    `node -e "files=['${files.join("','")}'];files.forEach(f=>require(f))"`,
  ],
};
