#!/usr/bin/env tsx

import boxen from 'boxen';
import { dedent } from 'ts-dedent';
import { readFile } from 'node:fs/promises';
import { globalPackages as globalManagerPackages } from 'storybook/internal/manager/globals';
import { globalPackages as globalPreviewPackages } from 'storybook/internal/preview/globals';
import chalk from 'chalk';
import { $ } from 'zx';

const files = ['./packages/storybook-okta/package.json'];
const globalPackages: string[] = [
  ...globalManagerPackages,
  ...globalPreviewPackages,
];

let exitCode = 0;

const analyse = async (file: string) => {
  const packageJson = await readFile(file, 'utf8').then(JSON.parse);
  const name = packageJson.name;
  const displayName = packageJson.storybook.displayName;
  let hasErrors = false;

  console.log(`Analysing ${chalk.cyan(name)}...`);

  /**
   * Check that meta data has been updated
   */
  if (name.includes('addon-kit') || displayName.includes('Addon Kit')) {
    const metadataMessage = `Your package name and/or displayName includes default values from the Addon Kit.
The addon gallery filters out all such addons.

Please configure appropriate metadata before publishing your addon. For more info, see:
https://storybook.js.org/docs/react/addons/addon-catalog#addon-metadata`;

    console.error(
      boxen(
        dedent`
      ${chalk.red.bold('Missing metadata')}

      ${chalk.red(metadataMessage)}`,
        { padding: 1, borderColor: 'red' },
      ),
    );

    hasErrors = true;
  }

  /**
   * Check that README has been updated
   */
  const readmeTestStrings =
    '# Storybook Addon Kit|Click the \\*\\*Use this template\\*\\* button to get started.|https://user-images.githubusercontent.com/42671/106809879-35b32000-663a-11eb-9cdc-89f178b5273f.gif';

  if ((await $`cat README.md | grep -E ${readmeTestStrings}`.exitCode) == 0) {
    const readmeMessage = `You are using the default README.md file that comes with the addon kit.
Please update it to provide info on what your addon does and how to use it.`;

    console.error(
      boxen(
        dedent`
        ${chalk.red.bold('README not updated')}

        ${chalk.red(readmeMessage)}
      `,
        { padding: 1, borderColor: 'red' },
      ),
    );

    hasErrors = true;
  }

  /**
   * Check that globalized packages are not incorrectly listed as peer dependencies
   */
  const peerDependencies = Object.keys(packageJson.peerDependencies || {});
  peerDependencies.forEach((dependency) => {
    if (globalPackages.includes(dependency)) {
      const peerDependencyMessage = `You have a peer dependency on ${chalk.bold(dependency)} which is most likely unnecessary
as that is provided by Storybook directly.
Check the "bundling" section in README.md for more information.
If you are absolutely sure you are doing it correct, you should remove this check from scripts/prepublish-checks.js.`;

      console.error(
        boxen(
          dedent`
          ${chalk.red.bold('Unnecessary peer dependency')}

          ${chalk.red(peerDependencyMessage)}
        `,
          { padding: 1, borderColor: 'red' },
        ),
      );

      hasErrors = true;
    }
  });

  if (hasErrors) {
    exitCode = 1;
    console.log(
      chalk.red(`Issues found in ${name}. Please fix before publishing.`),
    );
  } else {
    console.log(chalk.green('No issues found!'));
  }
};

for (const file of files) {
  await analyse(file);
}

process.exit(exitCode);
