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

```sh
sandbox/
 ├── Sandbox.stories.tsx
 └── scopes/ #  Scope files that provide imports for the sandbox environment
    ├── design-system.ts
    └── react-hook-form.ts
 └── templates/ # Template files that provide boilerplate code for the sandbox environment
    ├── index.ts
    └── simple/
        ├── icon.ts
        └── snippet.tsx
```

Afterwards, you can create a story that uses the sandbox. Below is one that makes use of lazy loading scopes and templates.

```tsx
// sandbox/Sandbox.stories.tsx
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { TEMPLATES } from './templates';
import type {
  SandboxPreviewProps,
  AddonConfig,
} from '@iress-oss/ids-storybook-sandbox';
import { Loader } from 'storybook/internal/components';

const SandboxStub = () => <></>;
const SCOPES = {
  default: import('./scopes/design-system'),
  'react-hook-form': import('./scopes/react-hook-form'),
};

export default {
  title: 'Sandbox',
  component: SandboxStub,
  args: {
    defaultState: {
      code: TEMPLATES[0]?.state.code,
    },
    loading: () => <Loader>Opening Sandbox...</Loader>,
    scope: SCOPES,
  },
  parameters: {
    IDS_Sandbox: {
      code: TEMPLATES[0]?.state.code ?? '',
      disable: false,
      scopes: Object.keys(SCOPES),
      templates: TEMPLATES,
    } satisfies AddonConfig,
    layout: 'fullscreen',
  },
} as Meta<SandboxPreviewProps>;

export const Sandbox: StoryObj<SandboxPreviewProps> = {};
```

And that should be it!
