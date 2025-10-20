# Storybook Version Badge Addon

This Storybook addon displays the current version of your design system in the Storybook toolbar.

## Installation

```sh
yarn add @iress-oss/ids-storybook-version-badge
```

## Usage

In your Storybook `main.ts` configuration file, add the addon and your OKTA configuration:

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  addons: ['@iress-oss/ids-storybook-version-badge'],
};

export default config;
```

## Configuration

You can customise the addon by providing options in your Storybook `.storybook/manager.ts` file:

```ts
import { addons } from 'storybook/manager-api';
import { version } from '../package.json';

addons.setConfig({
  IDS_VersionBadge: {
    environment: () => {
      if (window.location.host === 'localhost') {
        return 'Local';
      }

      if (window.location.host === 'staging') {
        return 'Staging';
      }

      if (window.location.origin.includes('dev')) {
        return 'Dev';
      }

      if (window.location.origin.includes('chromatic')) {
        return 'Chromatic';
      }

      return '';
    },
    version,
  },
});
```
