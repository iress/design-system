import { describe, it, expect } from 'vitest';
import { withCustomSource } from './withCustomSource';

describe('withCustomSource', () => {
  it('returns parameters with custom source code and default language', () => {
    const code = 'const App = () => <div>Hello</div>;';

    const result = withCustomSource(code);

    expect(result).toEqual({
      docs: {
        source: {
          code: 'const App = () => <div>Hello</div>;',
          language: 'tsx',
        },
      },
    });
  });

  it('returns parameters with custom source code and specified language', () => {
    const code = 'console.log("Hello World");';

    const result = withCustomSource(code, 'javascript');

    expect(result).toEqual({
      docs: {
        source: {
          code: 'console.log("Hello World");',
          language: 'javascript',
        },
      },
    });
  });

  it('handles empty code string', () => {
    const result = withCustomSource('');

    expect(result).toEqual({
      docs: {
        source: {
          code: '',
          language: 'tsx',
        },
      },
    });
  });

  it('handles multiline code', () => {
    const code = `import React from 'react';

const Component = () => {
  return (
    <div>
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );
};

export default Component;`;

    const result = withCustomSource(code, 'tsx');

    expect(result).toEqual({
      docs: {
        source: {
          code,
          language: 'tsx',
        },
      },
    });
  });

  it('handles different language types', () => {
    const testCases = [
      { code: '<div>HTML</div>', language: 'html' },
      { code: '.class { color: red; }', language: 'css' },
      { code: 'def hello(): pass', language: 'python' },
      { code: '{ "key": "value" }', language: 'json' },
    ];

    testCases.forEach(({ code, language }) => {
      const result = withCustomSource(code, language);

      expect(result).toEqual({
        docs: {
          source: {
            code,
            language,
          },
        },
      });
    });
  });
});
