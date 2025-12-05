import {
  getParameters,
  type IFiles,
} from 'codesandbox-import-utils/lib/api/define';

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

export const getSandboxUrl = ({ files }: GetSandboxProps) => {
  const parameters = getParameters({ files });
  return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
};
