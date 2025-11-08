# IDS Storybook Config

This package provides a Storybook configuration helpers for enabling common functionality across Storybook instances.

## Getting started

```sh
yarn add @iress-oss/ids-storybook-config --dev
```

## Usage

### Main configuration

In your Storybook `main.ts` file, you can import and use the `getMainConfig` function to set up your Storybook configuration:

```ts
import { getMainConfig } from '@iress-oss/ids-storybook-config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default getMainConfig({
  absolutePath: dirname(dirname(fileURLToPath(import.meta.url))),
});
```

### Manager configuration

In your Storybook `manager.ts` file, you can import and use the `setUpManager` function to set up your Storybook manager configuration:

```ts
import { setUpManager } from '@iress-oss/ids-storybook-config';

export default setUpManager({
  title: 'IDS Tokens',
  version: '1.0.0',
});
```

### Preview configuration

In your Storybook `preview.tsx` file, you can import and use the `getPreview` function to set up your Storybook preview configuration:

```ts
import { getPreview } from '@iress-oss/ids-storybook-config';

export default getPreview({});
```
