# Storybook Toggle Stories Addon

This Storybook addon provides a toolbar button to toggle the visibility of stories in Storybook. It can be used to reduce clutter when non-developers or stakeholders are reviewing component documentation.

## Installation

```sh
yarn add --dev @iress-oss/ids-storybook-toggle-stories
```

## Usage

In your Storybook `main.ts` configuration file, add the addon and your OKTA configuration:

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  addons: ['@iress-oss/ids-storybook-toggle-stories'],
};

export default config;
```

## Configuration

The addon works out of the box, but you can disable it based on an environment variable by providing options in your Storybook `.storybook/manager.ts` file:

```ts
import { addons } from 'storybook/manager-api';

addons.setConfig({
  IDS_ToggleStories: {
    disable: () => {
      return process.env.DISABLE_ADDON === 'true';
    },
  },
});
```
