# Theme Preset (`@iress-oss/ids-theme-preset`)

A Panda CSS preset that provides the full IDS design token system — tokens, utilities, recipes, conditions, global CSS, and static CSS — with type-safe usage via Panda's `css()` function.

> **Note:** If you are already using `@iress-oss/ids-components`, you probably don't need this package. IDS components ship with all the styling you need. This preset is for custom CSS that can't be achieved with IDS component styling props, while still using the Panda CSS methodology and IDS type-safety — think of it as a tool for building IDS extensions.

## Installation

```bash
npm install @iress-oss/ids-theme-preset @pandacss/dev
```

## Usage

```ts
import { defineConfig } from '@pandacss/dev';
import idsPreset from '@iress-oss/ids-theme-preset';

export default defineConfig({
  presets: [idsPreset],
  include: ['./src/**/*.{ts,tsx}'],
  outdir: './styled-system',
});
```

### Hooks

> **Note:** You probably don't need the hooks if you are already using IDS components. These are useful when extending IDS with custom Panda CSS styles and need spacing alias resolution or CSS cleanup during the build.

```ts
import { defineConfig } from '@pandacss/dev';
import idsPreset from '@iress-oss/ids-theme-preset';
import {
  codegenPrepareHook,
  cssgenDoneHook,
} from '@iress-oss/ids-theme-preset/hooks';

export default defineConfig({
  presets: [idsPreset],
  include: ['./src/**/*.{ts,tsx}'],
  outdir: './styled-system',
  hooks: {
    'codegen:prepare': ({ artifacts }) => codegenPrepareHook(artifacts),
    'cssgen:done': ({ artifact, content }) => cssgenDoneHook(artifact, content),
  },
});
```

## Peer Dependencies

- `@pandacss/dev` >= 1.8.0
