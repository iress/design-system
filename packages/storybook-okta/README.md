# OKTA Authentication for Storybook

This package provides authentication for Storybook using OKTA.

## Installation

```sh
yarn add @iress-oss/ids-storybook-okta
```

## Usage

To use the OKTA authentication in your Storybook, you need to configure it in your `.storybook/manager.ts` file.

### .storybook/manager.ts

```ts
addons.setConfig({
  IDS_OKTA: {
    issuer: 'https://{yourOktaDomain}/oauth2/default',
    clientId: '{yourClientId}',
  },
});
```
