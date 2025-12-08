import { describe, it, expect } from 'vitest';
import { injectImportsIntoTemplate } from './injectImportsIntoTemplate';

describe('injectImportsIntoTemplate', () => {
  it('adds new import when no existing imports', () => {
    const template = `const App = () => <Button>Click me</Button>;`;

    const result = injectImportsIntoTemplate(template);

    expect(result).toBe(`import { Button } from '@iress-oss/ids-components';
const App = () => <Button>Click me</Button>;`);
  });

  it('updates existing import from same library', () => {
    const template = `import { Input } from '@iress-oss/ids-components';
const App = () => <div><Input /><Button>Click</Button></div>;`;

    const result = injectImportsIntoTemplate(template);

    expect(result)
      .toBe(`import { Input, Button } from '@iress-oss/ids-components';
const App = () => <div><Input /><Button>Click</Button></div>;`);
  });

  it('handles multiple missing components', () => {
    const template = `const App = () => <div><Button>Click</Button><Input /><Panel>Content</Panel></div>;`;

    const result = injectImportsIntoTemplate(template);

    expect(result)
      .toBe(`import { Button, Input, Panel } from '@iress-oss/ids-components';
const App = () => <div><Button>Click</Button><Input /><Panel>Content</Panel></div>;`);
  });

  it('ignores locally defined components', () => {
    const template = `const Button = () => <div>Local</div>;
const App = () => <Button>Click me</Button>;`;

    const result = injectImportsIntoTemplate(template);

    expect(result).toBe(`const Button = () => <div>Local</div>;
const App = () => <Button>Click me</Button>;`);
  });

  it('ignores already imported components', () => {
    const template = `import { Button } from '@iress-oss/ids-components';
const App = () => <Button>Click me</Button>;`;

    const result = injectImportsIntoTemplate(template);

    expect(result).toBe(`import { Button } from '@iress-oss/ids-components';
const App = () => <Button>Click me</Button>;`);
  });

  it('uses custom library name', () => {
    const template = `const App = () => <Button>Click me</Button>;`;

    const result = injectImportsIntoTemplate(template, 'custom-library');

    expect(result).toBe(`import { Button } from 'custom-library';
const App = () => <Button>Click me</Button>;`);
  });

  it('handles function component definitions', () => {
    const template = `function MyButton() { return <div>Local</div>; }
const App = () => <div><MyButton /><Button>Click</Button></div>;`;

    const result = injectImportsIntoTemplate(template);

    expect(result).toBe(`import { Button } from '@iress-oss/ids-components';
function MyButton() { return <div>Local</div>; }
const App = () => <div><MyButton /><Button>Click</Button></div>;`);
  });

  it('handles class component definitions', () => {
    const template = `class MyButton extends React.Component { render() { return <div>Local</div>; } }
const App = () => <div><MyButton /><Button>Click</Button></div>;`;

    const result = injectImportsIntoTemplate(template);

    expect(result).toBe(`import { Button } from '@iress-oss/ids-components';
class MyButton extends React.Component { render() { return <div>Local</div>; } }
const App = () => <div><MyButton /><Button>Click</Button></div>;`);
  });

  it('handles components with props', () => {
    const template = `const App = () => <Button variant="primary" onClick={handleClick}>Click me</Button>;`;

    const result = injectImportsIntoTemplate(template);

    expect(result).toBe(`import { Button } from '@iress-oss/ids-components';
const App = () => <Button variant="primary" onClick={handleClick}>Click me</Button>;`);
  });

  it('handles self-closing components', () => {
    const template = `const App = () => <div><Input /><Divider /></div>;`;

    const result = injectImportsIntoTemplate(template);

    expect(result)
      .toBe(`import { Input, Divider } from '@iress-oss/ids-components';
const App = () => <div><Input /><Divider /></div>;`);
  });

  it('ignores lowercase HTML elements', () => {
    const template = `const App = () => <div><button>HTML button</button><Button>React Button</Button></div>;`;

    const result = injectImportsIntoTemplate(template);

    expect(result).toBe(`import { Button } from '@iress-oss/ids-components';
const App = () => <div><button>HTML button</button><Button>React Button</Button></div>;`);
  });

  it('handles existing imports from different libraries', () => {
    const template = `import { useState } from 'react';
import { format } from 'date-fns';
const App = () => <Button>Click me</Button>;`;

    const result = injectImportsIntoTemplate(template);

    expect(result).toBe(`import { Button } from '@iress-oss/ids-components';
import { useState } from 'react';
import { format } from 'date-fns';
const App = () => <Button>Click me</Button>;`);
  });

  it('handles no missing components', () => {
    const template = `import { Button } from '@iress-oss/ids-components';
const App = () => <div><button>HTML</button><Button>React</Button></div>;`;

    const result = injectImportsIntoTemplate(template);

    expect(result).toBe(`import { Button } from '@iress-oss/ids-components';
const App = () => <div><button>HTML</button><Button>React</Button></div>;`);
  });

  it('handles empty template', () => {
    const template = ``;

    const result = injectImportsIntoTemplate(template);

    expect(result).toBe(``);
  });

  it('handles template with no JSX', () => {
    const template = `const value = 42;
console.log(value);`;

    const result = injectImportsIntoTemplate(template);

    expect(result).toBe(`const value = 42;
console.log(value);`);
  });
});
