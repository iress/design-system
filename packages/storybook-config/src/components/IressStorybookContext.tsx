import {
  IressDivider,
  type IressDividerProps,
  IressExpander,
  type IressExpanderProps,
  IressInline,
  type IressInlineProps,
  IressPanel,
  type IressPanelProps,
  IressProvider,
  type IressProviderProps,
  IressStack,
  type IressStackProps,
  IressTab,
  type IressTabProps,
  IressTabSet,
  type IressTabSetProps,
  IressText,
  type IressTextProps,
  useBreakpoint,
} from '@iress-oss/ids-components';
import { type ComponentType, createContext } from 'react';

export interface IressStorybookComponentMapping {
  IressDivider: ComponentType<IressDividerProps>;
  IressExpander: ComponentType<IressExpanderProps>;
  IressInline: ComponentType<IressInlineProps>;
  IressPanel: ComponentType<IressPanelProps>;
  IressProvider: ComponentType<IressProviderProps>;
  IressStack: ComponentType<IressStackProps>;
  IressTab: ComponentType<IressTabProps>;
  IressTabSet: ComponentType<IressTabSetProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  IressText: ComponentType<IressTextProps<any>>;
  useBreakpoint: typeof useBreakpoint;
}

export const COMPONENT_MAPPING_DEFAULT: IressStorybookComponentMapping = {
  IressDivider: IressDivider,
  IressExpander: IressExpander,
  IressInline: IressInline,
  IressPanel: IressPanel,
  IressProvider: IressProvider,
  IressStack: IressStack,
  IressTab: IressTab,
  IressTabSet: IressTabSet,
  IressText: IressText,
  useBreakpoint: useBreakpoint,
};

export interface IressStorybookContextProps
  extends IressStorybookComponentMapping {
  /**
   * Additional settings to add to the CodeSandbox link.
   *
   * @example
   * ```ts
   * {
   *   dependencies: {
   *     'some-package': '1.0.0',
   *   },
   *   html: '<div id="root"></div>',
   * }
   */
  codeSandbox?: {
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
  };
}

export const CODE_SANDBOX_DEFAULT = {
  codeSandbox: {
    additionalTransformers: {
      replaceAliasWithPackageName: (code: string) =>
        code.replace(/@\/main/gi, '@iress-oss/ids-components'),
    },
    dependencies: {
      '@iress-oss/ids-components': 'latest',
    },
    storyPackageName: '@iress-oss/ids-components',
  },
};

export const IressStorybookContext = createContext<IressStorybookContextProps>({
  ...CODE_SANDBOX_DEFAULT,
  ...COMPONENT_MAPPING_DEFAULT,
});
