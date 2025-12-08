export const ADDON_TITLE = 'Sandbox';
export const ADDON_ICON = 'draw';
export const ADDON_ID = 'IDS_Sandbox';
export const TOOLBAR_ID = 'IDS_Sandbox';

export const PREVIEW_SNIPPET = `${ADDON_ID}:snippet`;
export const SANDBOX_DOCS_RENDERED = `${ADDON_ID}:rendered-docs`;

export const COMMON_TRANSFORMERS: Record<string, (code: string) => string> = {
  removeWhiteSpaces: (oldCode: string) => oldCode.trim(),
  replaceBodyElement: (oldCode: string) =>
    oldCode
      .replace(
        /{\s+'_constructor-name_': 'HTMLBodyElement',?\s+}/gm,
        'document.body',
      )
      .replace(/\[object HTMLBodyElement\]/g, 'document.body'),
};
