# Storybook Sandbox Addon

This Storybook addon provides the ability to open the current story in CodeSandbox.

## Installation

```sh
yarn add --dev @iress-oss/ids-storybook-sandbox
```

## Usage

In your Storybook `main.ts` configuration file, add the addon:

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  addons: ['@iress-oss/ids-storybook-sandbox'],
};

export default config;
```

## Configuration

The addon works out of the box, but you can customise its behavior using parameters in your stories or your main Storybook configuration.

```ts
import type { AddonConfig } from '@iress-oss/ids-storybook-sandbox';

export const Library = {
  args: {
    children: 'This will use the IDS library template and HTML',
  },
  parameters: {
    IDS_Sandbox: {
      dependencies: {
        '@iress-oss/ids-components': 'alpha',
      },
      html: '<div id="root"></div>',
      template: `
import React from 'react';
import ReactDOM from 'react-dom/client';
import { IressProvider } from '@iress-oss/ids-components';
import '@iress-oss/ids-components/dist/style.css';

const App = () => {
  return (
<Story />
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IressProvider>
      <App />
    </IressProvider>
  </React.StrictMode>,
);`,
    } satisfies AddonConfig,
  },
};
```
