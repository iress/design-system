# Just another Storybook Sandbox addon

This Storybook addon provides a sandbox environment for testing and experimenting with components in isolation using React Live.

## Installation

```sh
yarn add --dev @iress-oss/ids-storybook-sandbox
```

## Usage

In your Storybook `main.ts` configuration file, add the addon.

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  addons: ['@iress-oss/ids-storybook-sandbox'],
};

export default config;
```

## Configuration

The sandbox is not shown by default. You must create a story that uses the sandbox editor. This allows you to place the sandbox wherever you like in your Storybook.
