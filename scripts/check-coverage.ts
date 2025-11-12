#!/usr/bin/env tsx

/**
 * Checks test coverage meets the specified threshold
 *
 * Usage:
 *   node scripts/check-coverage.js [options]
 *
 * Options:
 *   --workspace <path>    Path to workspace directory (e.g., packages/components)
 *   --files <files>       Comma-separated list of specific files to check (optional)
 *   --threshold <number>  Coverage threshold percentage (default: 80)
 *   --all                 Check all packages in the monorepo
 */

import path from 'path';
import fs from 'fs';

const args = process.argv.slice(2);
const getArgValue = (flag: string) => {
  const index = args.indexOf(flag);
  return index !== -1 && args[index + 1] ? args[index + 1] : undefined;
};

const workspace = getArgValue('--workspace');
const filesArg = getArgValue('--files');
const threshold = parseInt(getArgValue('--threshold') || '80', 10);
const checkAll = args.includes('--all');

const METRICS = ['lines', 'statements', 'functions', 'branches'];

/**
 * Check coverage for a specific workspace
 */
function checkWorkspaceCoverage(workspaceDir: string, specificFiles?: string) {
  const coverageFile = path.join(
    workspaceDir,
    'coverage',
    'coverage-summary.json',
  );

  if (!fs.existsSync(coverageFile)) {
    console.error(`❌ Coverage report not found: ${coverageFile}`);
    console.error('   Run tests with coverage first: yarn test:coverage');
    return false;
  }

  const coverage = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));
  const workspaceName = path.basename(workspaceDir);

  let filesToCheck;
  if (specificFiles) {
    // Check specific files
    filesToCheck = specificFiles.split(',').map((f) => f.trim());
  } else {
    // Check all files (use total coverage)
    filesToCheck = ['total'];
  }

  const failedFiles: string[] = [];

  filesToCheck.forEach((fileName) => {
    let fileKey;

    if (fileName === 'total') {
      fileKey = 'total';
    } else {
      // Find the file in coverage report (may have different path formats)
      fileKey = Object.keys(coverage).find(
        (key) => key.includes(fileName) && key !== 'total',
      );

      if (!fileKey) {
        console.warn(`⚠️  No coverage data found for: ${fileName}`);
        return;
      }
    }

    const fileCoverage = coverage[fileKey];
    let fileFailed = false;

    console.log(
      `\nChecking coverage for: ${fileName === 'total' ? workspaceName : fileName}`,
    );

    METRICS.forEach((metric) => {
      const pct = fileCoverage[metric].pct;
      const status = pct >= threshold ? '✅' : '❌';
      console.log(`  ${status} ${metric}: ${pct}%`);

      // Only fail if 'lines' coverage is below threshold
      if (metric === 'lines' && pct < threshold) {
        fileFailed = true;
      }
    });

    if (fileFailed) {
      failedFiles.push(fileName === 'total' ? workspaceName : fileName);
    }
  });

  if (failedFiles.length > 0) {
    console.error(
      `\n❌ Files/packages below ${threshold}% coverage threshold:`,
    );
    failedFiles.forEach((file) => console.error(`   - ${file}`));
    return false;
  } else {
    console.log(`\n✅ All checked items meet ${threshold}% coverage threshold`);
    return true;
  }
}

/**
 * Check coverage for all packages
 */
function checkAllPackages() {
  const packagesDir = path.join(process.cwd(), 'packages');

  if (!fs.existsSync(packagesDir)) {
    console.error('❌ packages directory not found');
    return false;
  }

  const packages = fs.readdirSync(packagesDir).filter((item) => {
    const itemPath = path.join(packagesDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  console.log(`Checking coverage for ${packages.length} packages...\n`);

  let allPassed = true;
  const failedPackages: string[] = [];

  packages.forEach((pkg) => {
    const workspaceDir = path.join(packagesDir, pkg);
    const coverageFile = path.join(
      workspaceDir,
      'coverage',
      'coverage-summary.json',
    );

    if (!fs.existsSync(coverageFile)) {
      console.log(`⚠️  Skipping ${pkg} - no coverage report found`);
      return;
    }

    const passed = checkWorkspaceCoverage(workspaceDir);
    if (!passed) {
      allPassed = false;
      failedPackages.push(pkg);
    }
  });

  console.log('\n' + '='.repeat(60));
  if (allPassed) {
    console.log(`✅ All packages meet ${threshold}% coverage threshold`);
    return true;
  } else {
    console.error(`\n❌ Packages that failed coverage threshold:`);
    failedPackages.forEach((pkg) => console.error(`   - ${pkg}`));
    return false;
  }
}

// Main execution
function main() {
  if (!checkAll && !workspace) {
    console.error('Error: Must specify either --all or --workspace <path>');
    console.error('\nUsage:');
    console.error(
      '  Check all packages:     node scripts/check-coverage.js --all',
    );
    console.error(
      '  Check one workspace:    node scripts/check-coverage.js --workspace packages/components',
    );
    console.error(
      '  Check specific files:   node scripts/check-coverage.js --workspace packages/components --files "file1.ts,file2.ts"',
    );
    process.exit(1);
  }

  let success;

  if (checkAll) {
    success = checkAllPackages();
  } else if (workspace) {
    success = checkWorkspaceCoverage(workspace, filesArg);
  }

  process.exit(success ? 0 : 1);
}

main();
