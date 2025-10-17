# Storybook Addon OKTA Authentication

Protect your Storybook instance(s) using OKTA

## Installation

```sh
yarn add @iress-oss/ids-storybook-okta
```

## Usage

In your Storybook `main.ts` configuration file, add the addon and your OKTA configuration:

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  addons: {
    name: '@iress-oss/ids-storybook-okta',
    options: {
      issuer: 'https://{yourOktaDomain}/oauth2/default',
      clientId: '{yourClientId}',
    },
  },
};

export default config;
```
