// @vitest-environment node

import { vi } from 'vitest';
import generateCssVars from './generateCssVars';
import * as fs from 'fs';
import JSON5 from 'json5';
import { log } from './helpers/log';

const schema = {
  colour: {
    primary: {
      fill: 'var(--iress-colour-primary-fill, #000000)',
    },
  },
  elevation: {
    shadow: 'var(--iress-elevation-shadow, 2px 4px 8px 0px #00000040)',
    _shadow: {
      color: 'var(--iress-elevation--shadow-color, #00000040)',
      offsetX: 'var(--iress-elevation--shadow-offset-x, 2px)',
      offsetY: 'var(--iress-elevation--shadow-offset-y, 4px)',
      blur: 'var(--iress-elevation--shadow-blur, 8px)',
      spread: 'var(--iress-elevation--shadow-spread, 0px)',
    },
  },
};

vi.mock('../src/schema/index', () => ({
  designTokens: {
    colour: {
      primary: {
        fill: {
          $description: 'Primary fill colour',
          $type: 'color',
          $value: '#000000',
        },
      },
    },
    elevation: {
      shadow: {
        $description: 'Primary fill colour',
        $type: 'shadow',
        $value: {
          color: '#00000040',
          offsetX: '2px',
          offsetY: '4px',
          blur: '8px',
          spread: '0px',
        },
      },
    },
  },
}));

vi.mock(import('fs'), async (importOriginal) => {
  const mod = await importOriginal();

  return {
    ...mod,
    promises: {
      ...mod.promises,
      writeFile: vi.fn(),
    },
  };
});

describe('generateCssVars', () => {
  it('has the correct name', () => {
    const plugin = generateCssVars();
    expect(plugin.name).toBe('generate-css-vars');
  });

  it('generates the css-vars.ts file correctly on build', async () => {
    const plugin = generateCssVars();

    await plugin.buildStart();

    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      'src/generated/css-vars.ts',
      [
        `export const cssVars = ${JSON5.stringify(schema, null, 2)} as const;`,
        'export default cssVars;',
      ].join('\n'),
    );

    expect(fs.promises.writeFile).toHaveBeenLastCalledWith(
      'build/css-vars.css',
      [
        `:root {`,
        '  --colour-primary-fill: var(--iress-colour-primary-fill, #000000);',
        '  --elevation-shadow: var(--iress-elevation-shadow, 2px 4px 8px 0px #00000040);',
        '  --elevation-_shadow-color: var(--iress-elevation--shadow-color, #00000040);',
        '  --elevation-_shadow-offsetX: var(--iress-elevation--shadow-offset-x, 2px);',
        '  --elevation-_shadow-offsetY: var(--iress-elevation--shadow-offset-y, 4px);',
        '  --elevation-_shadow-blur: var(--iress-elevation--shadow-blur, 8px);',
        '  --elevation-_shadow-spread: var(--iress-elevation--shadow-spread, 0px);',
        '}',
      ].join('\n'),
    );

    expect(log.title).toHaveBeenCalledTimes(1);
    expect(log.message).toHaveBeenCalledTimes(2);
  });
});
