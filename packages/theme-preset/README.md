# @iress-oss/ids-theme-preset

Panda CSS preset for the Iress Design System (IDS). Defines the complete IDS design token system — tokens, utilities, recipes, conditions, global CSS, and static CSS.

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

The package also exports build hooks for spacing alias resolution and CSS cleanup:

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
