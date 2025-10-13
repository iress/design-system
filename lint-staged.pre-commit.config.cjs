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
