import { describe, it, expect } from 'vitest';
import { getSandboxUrl } from './getSandboxUrl';

describe('getSandboxUrl', () => {
  it('generates CodeSandbox URL with single file', () => {
    const files = {
      'index.js': {
        content: 'console.log("Hello World");',
        isBinary: false,
      },
    };

    const url = getSandboxUrl({ files });

    expect(url).toMatch(
      /^https:\/\/codesandbox\.io\/api\/v1\/sandboxes\/define\?parameters=.+/,
    );
    expect(url).toContain(
      'https://codesandbox.io/api/v1/sandboxes/define?parameters=',
    );
  });

  it('generates CodeSandbox URL with multiple files', () => {
    const files = {
      'index.js': {
        content:
          'import React from "react";\nimport ReactDOM from "react-dom";\n\nconst App = () => <h1>Hello, CodeSandbox!</h1>;\n\nReactDOM.render(<App />, document.getElementById("root"));',
        isBinary: false,
      },
      'package.json': {
        content: '{"dependencies": {"react": "latest", "react-dom": "latest"}}',
        isBinary: false,
      },
    };

    const url = getSandboxUrl({ files });

    expect(url).toMatch(
      /^https:\/\/codesandbox\.io\/api\/v1\/sandboxes\/define\?parameters=.+/,
    );
    expect(url).toContain(
      'https://codesandbox.io/api/v1/sandboxes/define?parameters=',
    );
  });

  it('generates different URLs for different file contents', () => {
    const files1 = {
      'index.js': {
        content: 'console.log("First");',
        isBinary: false,
      },
    };

    const files2 = {
      'index.js': {
        content: 'console.log("Second");',
        isBinary: false,
      },
    };

    const url1 = getSandboxUrl({ files: files1 });
    const url2 = getSandboxUrl({ files: files2 });

    expect(url1).not.toBe(url2);
  });

  it('handles binary files', () => {
    const files = {
      'image.png': {
        content: 'binary-data-here',
        isBinary: true,
      },
      'index.js': {
        content: 'console.log("test");',
        isBinary: false,
      },
    };

    const url = getSandboxUrl({ files });

    expect(url).toMatch(
      /^https:\/\/codesandbox\.io\/api\/v1\/sandboxes\/define\?parameters=.+/,
    );
  });

  it('handles empty files object', () => {
    const files = {};

    const url = getSandboxUrl({ files });

    expect(url).toMatch(
      /^https:\/\/codesandbox\.io\/api\/v1\/sandboxes\/define\?parameters=.+/,
    );
  });
});
