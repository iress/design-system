import { compressToBase64 } from 'lz-string';

export type IFiles = Record<
  string,
  {
    content: string;
    isBinary: boolean;
  }
>;

export interface GetSandboxProps {
  /**
   * The files to include in the sandbox
   *
   * For example:
   * ```ts
   * {
   *   'index.js': {
   *     content: 'import React from "react";\nimport ReactDOM from "react-dom";\n\nconst App = () => <h1>Hello, CodeSandbox!</h1>;\n\nReactDOM.render(<App />, document.getElementById("root"));',
   *     isBinary: false,
   *   },
   *   'package.json': {
   *     content: '{ dependencies: { react: "latest", "react-dom": "latest" } }',
   *     isBinary: false,
   *   },
   * }
   * ```
   */
  files: IFiles;
}

/**
 * Compress sandbox parameters for the CodeSandbox define API.
 * Replaces `codesandbox-import-utils` which is CJS-only and breaks
 * in Vite 8/Rolldown ESM builds.
 */
const getParameters = (parameters: { files: IFiles }) =>
  compressToBase64(JSON.stringify(parameters))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/={1,2}$/, '');

export const getSandboxUrl = ({ files }: GetSandboxProps) => {
  const parameters = getParameters({ files });
  return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
};
