import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

/**
 * Vite plugin that preserves Panda CSS @layer declarations which get
 * stripped during the build process. Reads the layer declaration from
 * the source styles.css and prepends it to all built CSS files.
 *
 * @param stylesPath - Path to the Panda-generated styles.css
 *   (e.g. `'./src/styled-system/styles.css'`). Resolved relative to Vite root.
 */
export function preservePandaLayerDeclaration(stylesPath: string): Plugin {
  let layerDeclaration = '';

  return {
    name: 'ids-preserve-panda-layer',
    apply: 'build',
    buildStart() {
      const resolved = path.isAbsolute(stylesPath)
        ? stylesPath
        : path.resolve(process.cwd(), stylesPath);
      const content = fs.readFileSync(resolved, 'utf-8');
      const match = /^@layer\s{1,10}[^;\n]{1,200};/m.exec(content);
      layerDeclaration = match ? match[0] : '';
    },
    writeBundle({ dir = './dist' }, bundle) {
      for (const fileName of Object.keys(bundle)) {
        if (fileName.endsWith('.css')) {
          const asset = bundle[fileName];
          if ('source' in asset) {
            asset.source = `${layerDeclaration} ${String(asset.source)}`;
            fs.writeFileSync(
              `${dir}/${fileName}`,
              String(asset.source),
              'utf-8',
            );
          }
        }
      }
    },
  };
}
