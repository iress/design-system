import { describe, it, expect, vi } from 'vitest';
import { transformCode, transformCodeWithParameters } from './transformCode';
import type { AddonConfig, DocsConfig, SandboxTransformers } from '../types';

// Mock the injectImportsIntoTemplate helper
vi.mock('./injectImportsIntoTemplate', () => ({
  injectImportsIntoTemplate: vi.fn(
    (code: string, packageName: string) =>
      `import { Component } from '${packageName}';\n${code}`,
  ),
}));

describe('transformCode', () => {
  it('applies single transformer', () => {
    const code = '  const App = () => <div>Hello</div>;  ';
    const transformers: SandboxTransformers = {
      trim: (code: string) => code.trim(),
    };

    const result = transformCode(code, transformers);

    expect(result).toBe('const App = () => <div>Hello</div>;');
  });

  it('applies multiple transformers in sequence', () => {
    const code = '  const App = () => <div>Hello</div>;  ';
    const transformers: SandboxTransformers = {
      trim: (code: string) => code.trim(),
      addSemicolon: (code: string) => (code.endsWith(';') ? code : `${code};`),
      uppercase: (code: string) => code.toUpperCase(),
    };

    const result = transformCode(code, transformers);

    expect(result).toBe('CONST APP = () => <DIV>HELLO</DIV>;');
  });

  it('handles empty transformers object', () => {
    const code = '  const App = () => <div>Hello</div>;  ';
    const transformers: SandboxTransformers = {};

    const result = transformCode(code, transformers);

    expect(result).toBe('const App = () => <div>Hello</div>;');
  });

  it('handles empty code string', () => {
    const code = '';
    const transformers: SandboxTransformers = {
      addText: (code: string) => `${code}Hello`,
    };

    const result = transformCode(code, transformers);

    expect(result).toBe('Hello');
  });
});

describe('transformCodeWithParameters', () => {
  it('applies common transformers by default', () => {
    const code = `  const App = () => <div>{ '_constructor-name_': 'HTMLBodyElement' }</div>;  `;

    const result = transformCodeWithParameters(code);

    expect(result).toBe(`const App = () => <div>document.body</div>;`);
  });

  it('applies additional transformers from addon config', () => {
    const code = '  const App = () => <div>@/components</div>;  ';
    const addonConfig: AddonConfig = {
      additionalTransformers: {
        replaceAlias: (code: string) =>
          code.replace('@/components', '@iress-oss/ids-components'),
      },
    };

    const result = transformCodeWithParameters(code, addonConfig);

    expect(result).toBe(
      'const App = () => <div>@iress-oss/ids-components</div>;',
    );
  });

  it('applies template when no custom source code', () => {
    const code = 'const App = () => <div>Hello</div>;';
    const addonConfig: AddonConfig = {
      template: 'import React from "react";\n<Story />',
    };

    const result = transformCodeWithParameters(code, addonConfig);

    expect(result).toBe(
      'import React from "react";\nconst App = () => <div>Hello</div>;',
    );
  });

  it('does not apply template when custom source code exists', () => {
    const code = 'const App = () => <div>Hello</div>;';
    const addonConfig: AddonConfig = {
      template: 'import React from "react";\n<Story />',
    };
    const docsConfig: DocsConfig = {
      source: {
        code: 'custom source code',
      },
    };

    const result = transformCodeWithParameters(code, addonConfig, docsConfig);

    expect(result).toBe('const App = () => <div>Hello</div>;');
  });

  it('injects imports when story package name is specified', () => {
    const code = 'const App = () => <div>Hello</div>;';
    const addonConfig: AddonConfig = {
      storyPackageName: '@iress-oss/ids-components',
    };

    const result = transformCodeWithParameters(code, addonConfig);

    expect(result).toBe(
      "import { Component } from '@iress-oss/ids-components';\nconst App = () => <div>Hello</div>;",
    );
  });

  it('handles all parameters together', () => {
    const code = '  const App = () => <div>@/components</div>;  ';
    const addonConfig: AddonConfig = {
      additionalTransformers: {
        replaceAlias: (code: string) =>
          code.replace('@/components', 'real-package'),
      },
      template: 'import React from "react";\n<Story />',
      storyPackageName: '@iress-oss/ids-components',
    };

    const result = transformCodeWithParameters(code, addonConfig);

    expect(result).toBe(
      'import { Component } from \'@iress-oss/ids-components\';\nimport React from "react";\nconst App = () => <div>real-package</div>;',
    );
  });

  it('handles undefined parameters', () => {
    const code = '  const App = () => <div>Hello</div>;  ';

    const result = transformCodeWithParameters(code);

    expect(result).toBe('const App = () => <div>Hello</div>;');
  });
});
