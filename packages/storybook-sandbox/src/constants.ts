import type { SandboxTransformerMap } from './types';

export const ADDON_TITLE = 'Sandbox editor';
export const ADDON_TITLE_SHORT = 'Sandbox';
export const ADDON_ID = 'IDS_Sandbox';
export const ADDON_ICON = 'draw';

export const PANEL_ID = 'IDS_Sandbox';
export const TOOLBAR_ID = 'IDS_Sandbox/toolbar';

export const SANDBOX_DOCS_RENDERED = `${ADDON_ID}:rendered-docs`;
export const SANDBOX_UPDATE_EVENT = `${ADDON_ID}:update`;

export const COMMON_TRANSFORMERS: SandboxTransformerMap = {
  removeWhiteSpaces: (oldCode: string) => oldCode.trim(),
  replaceBodyElement: (oldCode: string) =>
    oldCode
      .replace(
        /{\s+'_constructor-name_': 'HTMLBodyElement',?\s+}/gm,
        'document.body',
      )
      .replace(/\[object HTMLBodyElement\]/g, 'document.body'),
};

export const EDITOR_TRANSFORMERS: SandboxTransformerMap = {
  removeImports: (oldCode: string) =>
    oldCode.replace(/^import (?:{[^}]+}|[a-zA-Z0-9]+) from '[^']+';$/gm, ''),
  removeCssImport: (oldCode: string) =>
    oldCode.replace(/^import '.*\.css';$/gm, ''),
  removeTypeImports: (oldCode: string) =>
    oldCode.replace(
      /^import type (?:{[^}]+}|[a-zA-Z0-9]+) from '[^']+';$/gm,
      '',
    ),
  ...COMMON_TRANSFORMERS,
};

export const PREVIEW_TRANSFORMERS: SandboxTransformerMap = {
  ...COMMON_TRANSFORMERS,
  removeImports: (oldCode) => oldCode.replace(/import[^f]+from[^;]+;?/gs, ''),
  addRenderLine: (oldCode) => {
    if (oldCode.includes('render(') && !oldCode.includes('// render(')) {
      return oldCode.replace('export ', '');
    }

    let componentToExport = /export (?:default|const|function) ([^ ]+)/g.exec(
      oldCode,
    )?.[1];
    componentToExport = oldCode.includes('export default')
      ? 'App'
      : componentToExport;

    if (!componentToExport) {
      throw new Error(
        'No exports found. Please ensure you export one of your components in order to render the code.',
      );
    }

    return `${oldCode
      .replace('export default (', 'const App = (')
      .replace(`export default ${componentToExport};`, '')
      .replace('export default ', 'const App = ')
      .replace('export ', '')}\n\nrender(<${componentToExport} />);`;
  },
};
