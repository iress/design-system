# @iress-oss/ids-theme-preset

Panda CSS preset for the Iress Design System (IDS). Defines the complete IDS design token system — tokens, utilities, recipes, conditions, global CSS, and static CSS.

> **Note:** If you are already using `@iress-oss/ids-components`, you probably don't need this package directly. IDS components ship with all the styling you need out of the box. This preset is intended for writing custom CSS that can't be achieved with IDS component styling props, while still using the Panda CSS methodology and the type-safety of the IDS token system — think of it as a tool for building IDS extensions.

## Installation

```bash
npm install @iress-oss/ids-theme-preset @pandacss/dev
```

## Usage

### Minimal config (recommended for packages that already include IDS)

If your application already imports `@iress-oss/ids-components` and its `style.css`, use `createMinimalConfig` to avoid duplicating CSS that IDS already ships. This disables preflight, global CSS, and static CSS from the preset while keeping all tokens, types, utilities, and recipes available. Panda will still generate CSS for utilities your code actually uses.

```ts
import { defineConfig } from '@pandacss/dev';
import { createMinimalConfig } from '@iress-oss/ids-theme-preset/config';

export default defineConfig({
  include: ['./src/**/*.{ts,tsx}'],
  outdir: './styled-system',
  ...createMinimalConfig(),
});
```

### Full config (for IDS components development)

Use the preset directly when you need the full CSS output, including preflight, global CSS, and all static utility classes. This is how `@iress-oss/ids-components` itself is configured.

```ts
import { defineConfig } from '@pandacss/dev';
import idsPreset from '@iress-oss/ids-theme-preset';

export default defineConfig({
  presets: [idsPreset],
  include: ['./src/**/*.{ts,tsx}'],
  outdir: './styled-system',
});
```

### Vite plugin

Panda CSS `@layer` declarations can get stripped during Vite builds. The `preservePandaLayerDeclaration` plugin reads the layer declaration from your generated `styles.css` and prepends it to all built CSS files.

```ts
import { defineConfig } from 'vite';
import { preservePandaLayerDeclaration } from '@iress-oss/ids-theme-preset/vite';

export default defineConfig({
  plugins: [
    preservePandaLayerDeclaration('./src/styled-system/styles.css'),
  ],
});
```

### Using hooks

> **Note:** You probably don't need the hooks directly if you are using `createMinimalConfig`, which wires them up for you. These are useful when you need more control over the build pipeline.

The package exports build hooks for spacing alias resolution and CSS cleanup:

```ts
import { defineConfig } from '@pandacss/dev';
import idsPreset from '@iress-oss/ids-theme-preset';
import {
  codegenPrepareHook,
  cssgenDoneHook,
  staticCssStripHook,
} from '@iress-oss/ids-theme-preset/hooks';

export default defineConfig({
  presets: [idsPreset],
  include: ['./src/**/*.{ts,tsx}'],
  outdir: './styled-system',
  hooks: {
    'codegen:prepare': ({ artifacts }) => codegenPrepareHook(artifacts),
    'cssgen:done': ({ artifact, content }) => {
      // Chain both cleanup hooks: strip alias classes first, then IDS static CSS.
      const afterAliasStrip = cssgenDoneHook(artifact, content) ?? content;
      return staticCssStripHook(artifact, afterAliasStrip) ?? afterAliasStrip;
    },
  },
});
```

| Hook | Description |
|---|---|
| `codegenPrepareHook` | Injects spacing alias resolution into the Panda CSS runtime so that `gap="sm"` reuses the canonical token class instead of generating a duplicate alias class. |
| `cssgenDoneHook` | Strips leftover spacing alias utility classes and `:root` variable definitions from the final CSS. |
| `staticCssStripHook` | Strips IDS static-CSS utility classes (spacing tokens, textStyle, custom utilities, colour tokens, etc.) from the generated CSS. Used by `createMinimalConfig` to prevent duplicating CSS that is already shipped by `@iress-oss/ids-components` style.css. |

## Exports

| Export path | Description |
|---|---|
| `@iress-oss/ids-theme-preset` | The full Panda CSS preset |
| `@iress-oss/ids-theme-preset/config` | `createMinimalConfig()` — config overrides for packages that already include IDS |
| `@iress-oss/ids-theme-preset/hooks` | Build hooks for spacing alias resolution and CSS cleanup |
| `@iress-oss/ids-theme-preset/vite` | Vite plugin to preserve Panda CSS `@layer` declarations |
| `@iress-oss/ids-theme-preset/constants` | Shared constants (breakpoints, material symbols, etc.) |

## Peer Dependencies

- `@pandacss/dev` >= 1.8.0
- `vite` >= 5.0.0 (optional — only needed if using the Vite plugin)

## License

Apache-2.0
