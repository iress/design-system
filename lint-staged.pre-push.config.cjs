const fs = require('fs');
const path = require('path');

// Cache for workspace configuration to avoid repeated file reads
let workspaceConfigCache = null;

// Helper function to get workspace configuration
const getWorkspaceConfig = () => {
  if (workspaceConfigCache) return workspaceConfigCache;

  try {
    const rootPackageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const { workspaces } = rootPackageJson;

    if (!workspaces) {
      workspaceConfigCache = {
        patterns: ['packages/*'],
        regexes: [/packages\/([^/]+)\//],
      };
      return workspaceConfigCache;
    }

    const patterns = Array.isArray(workspaces)
      ? workspaces
      : workspaces.packages || [];
    const regexes = patterns.map((pattern) => {
      const regexPattern = pattern
        .replace(/\*/g, '([^/]+)')
        .replace(/\//g, '\\/');
      return new RegExp(`${regexPattern}\\/`);
    });

    workspaceConfigCache = { patterns, regexes };
    return workspaceConfigCache;
  } catch {
    // Fallback configuration
    workspaceConfigCache = {
      patterns: ['packages/*'],
      regexes: [/packages\/([^/]+)\//],
    };
    return workspaceConfigCache;
  }
};

// Helper function to get workspace package name
const getWorkspacePackageName = (workspaceName, patterns) => {
  for (const pattern of patterns) {
    const workspaceDir = pattern.replace('*', workspaceName);
    const packageJsonPath = path.join(workspaceDir, 'package.json');

    try {
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, 'utf8'),
        );
        return packageJson.name;
      }
    } catch {
      continue;
    }
  }
  return null;
};

// Helper function to run ESLint based on workspace location
const createWorkspaceAwareLintCommand = (files) => {
  const { patterns, regexes } = getWorkspaceConfig();
  const workspaceFiles = {};
  const rootFiles = [];

  // Group files by workspace in a single pass
  files.forEach((file) => {
    const matchedRegex = regexes.find((regex) => regex.test(file));

    if (matchedRegex) {
      const workspaceName = file.match(matchedRegex)[1];
      (workspaceFiles[workspaceName] ??= []).push(file);
    } else {
      rootFiles.push(file);
    }
  });

  const commands = [];

  // Generate workspace-specific ESLint commands
  Object.entries(workspaceFiles).forEach(([workspaceName, fileList]) => {
    const packageName = getWorkspacePackageName(workspaceName, patterns);

    if (packageName) {
      commands.push(
        `yarn workspace ${packageName} exec eslint ${fileList.join(' ')} --fix`,
      );
    } else {
      commands.push(`yarn eslint ${fileList.join(' ')} --fix`);
    }
  });

  // Add root ESLint command if needed
  if (rootFiles.length > 0) {
    commands.push(`yarn eslint ${rootFiles.join(' ')} --fix`);
  }

  return commands;
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
    const { patterns, regexes } = getWorkspaceConfig();
    const workspaceFiles = {};

    // Group files by workspace, excluding test files themselves
    const testableFiles = files.filter(
      (file) => !file.includes('.test.') && !file.includes('.spec.'),
    );

    testableFiles.forEach((file) => {
      const matchedRegex = regexes.find((regex) => regex.test(file));
      if (matchedRegex) {
        const workspaceName = file.match(matchedRegex)[1];
        (workspaceFiles[workspaceName] ??= []).push(file);
      }
    });

    // For each affected workspace, check if it has test scripts and run them
    Object.keys(workspaceFiles).forEach((workspaceName) => {
      for (const pattern of patterns) {
        const workspaceDir = pattern.replace('*', workspaceName);
        const packageJsonPath = path.join(workspaceDir, 'package.json');

        try {
          if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(
              fs.readFileSync(packageJsonPath, 'utf8'),
            );

            // Check if the workspace has a test script
            if (packageJson.scripts?.test && packageJson.name) {
              commands.push(`yarn workspace ${packageJson.name} run test`);
            }
            break;
          }
        } catch {
          continue;
        }
      }
    });

    return commands;
  },

  // Configuration and documentation files - format only
  '**/*.{json,yaml,yml,md}': (files) => [`prettier --write ${files.join(' ')}`],

  // MDX files (Storybook stories) - comprehensive checks
  '**/*.mdx': (files) => {
    const commands = [
      ...createWorkspaceAwareLintCommand(files),
      `prettier --write ${files.join(' ')}`,
    ];

    // Run tests for any workspace that contains changed MDX files and has test scripts
    const { patterns, regexes } = getWorkspaceConfig();
    const workspaceFiles = {};

    files.forEach((file) => {
      const matchedRegex = regexes.find((regex) => regex.test(file));
      if (matchedRegex) {
        const workspaceName = file.match(matchedRegex)[1];
        (workspaceFiles[workspaceName] ??= []).push(file);
      }
    });

    Object.keys(workspaceFiles).forEach((workspaceName) => {
      for (const pattern of patterns) {
        const workspaceDir = pattern.replace('*', workspaceName);
        const packageJsonPath = path.join(workspaceDir, 'package.json');

        try {
          if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(
              fs.readFileSync(packageJsonPath, 'utf8'),
            );

            if (packageJson.scripts?.test && packageJson.name) {
              commands.push(`yarn workspace ${packageJson.name} run test`);
            }
            break;
          }
        } catch {
          continue;
        }
      }
    });

    return commands;
  },

  // Package.json files - format, validate, and check dependencies
  '**/package.json': (files) => [
    `prettier --write ${files.join(' ')}`,
    // Validate package.json structure
    `node -e "files=['${files.join("','")}'];files.forEach(f=>require(f))"`,
  ],
};
