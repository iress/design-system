import type { IFiles } from 'codesandbox-import-utils/lib/api/define';

import type { SourceProps } from '@storybook/addon-docs/blocks';
import type { ADDON_ID } from './constants';

export type SandboxTransformer = (code: string) => string;

export type SandboxTransformers = Record<string, SandboxTransformer>;

export interface AddonConfig {
  /**
   * Additional code transformers to apply before sending the code to the sandbox.
   *
   * @example
   * ```ts
   * {
   *   replaceAliasWithPackageName: (code) =>
   *     code.replace(/@\/main/gi, '@iress-oss/ids-components'),
   * }
   * ```
   */
  additionalTransformers?: Record<string, (code: string) => string>;

  /**
   * Additional files to include in the CodeSandbox.
   *
   * For example:
   * ```ts
   * {
   *   'package.json': {
   *     content: '{ dependencies: { react: "latest", "react-dom": "latest" } }',
   *     isBinary: false,
   *   },
   * }
   * ```
   */
  files?: IFiles;

  /**
   * The package name of the story being rendered.
   * This is used to automatically add the package as a dependency in the sandbox.
   *
   * @example @iress-oss/ids-components
   */
  storyPackageName?: string;

  /**
   * Additional dependencies to add to the CodeSandbox package.json.
   *
   * @example
   * ```ts
   * {
   *   'some-package': '1.0.0',
   * }
   * ```
   */
  dependencies?: Record<string, string>;

  /**
   * Additional HTML content to include in the CodeSandbox.
   *
   * @example
   * ```html
   * '<div id="root"></div>'
   * `
   */
  html?: string;

  /**
   * A custom template to use to display story code in the sandbox,
   * - <Story /> will be replaced with the story code.
   * - Imports will always be added to the top of the file.
   * - This will only be used if you do not override the story's code directly.
   * - You can completely override this template at the story level.
   *
   * @example
   * ```tsx
   * import React from 'react';
   * import ReactDOM from 'react-dom';
   *
   * ReactDOM.render(
   *   <React.StrictMode>
   *     <Story />
   *   </React.StrictMode>,
   *   document.getElementById('root')
   * );
   * `
   */
  template?: string;
}

export interface DocsConfig {
  source?: {
    code?: string;
    transform?: SourceProps['transform'];
  };
}

export interface ParametersConfig {
  docs?: DocsConfig;
  [ADDON_ID]?: AddonConfig;
}
