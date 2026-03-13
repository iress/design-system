# @iress-oss/ids-theme-preset

Panda CSS preset for the Iress Design System (IDS). Defines the complete IDS design token system — tokens, utilities, recipes, conditions, global CSS, and static CSS.

> **Note:** If you are already using `@iress-oss/ids-components`, you probably don't need this package directly. IDS components ship with all the styling you need out of the box. This preset is intended for writing custom CSS that can't be achieved with IDS component styling props, while still using the Panda CSS methodology and the type-safety of the IDS token system — think of it as a tool for building IDS extensions.

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

### Using hooks

> **Note:** You probably don't need the hooks if you are already using IDS components. These are useful when you are extending IDS with custom Panda CSS styles and need spacing alias resolution or CSS cleanup during the build.

The package exports build hooks for spacing alias resolution and CSS cleanup:

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

## License

Apache-2.0
