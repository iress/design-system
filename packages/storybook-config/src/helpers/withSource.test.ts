import { describe, it, expect } from 'vitest';
import {
  withSource,
  withCustomSource,
  withTransformedRawSource,
  transformSource,
  formatWithPrettier,
} from './withSource';

describe('withSource', () => {
  describe('basic usage', () => {
    it('returns parameters with source code when format is false', () => {
      const result = withSource('<IressButton>Click</IressButton>', { format: false });

      expect(result).toEqual({
        docs: { source: { code: '<IressButton>Click</IressButton>', language: 'tsx' } },
      });
    });

    it('accepts a custom language', () => {
      const result = withSource('.class { color: red; }', { language: 'css', format: false });

      expect(result).toEqual({
        docs: { source: { code: '.class { color: red; }', language: 'css' } },
      });
    });
  });

  describe('@/main transformation', () => {
    it('replaces @/main with @iress-oss/ids-components', () => {
      const result = transformSource(`import { IressButton } from '@/main';\n\n<IressButton />`);

      expect(result).toContain("from '@iress-oss/ids-components'");
      expect(result).not.toContain('@/main');
    });

    it('handles multiple @/main imports', () => {
      const result = transformSource(`import { IressButton } from '@/main';\nimport { IressStack } from '@/main';`);

      expect(result).not.toContain('@/main');
      expect(result.match(/@iress-oss\/ids-components/g)).toHaveLength(2);
    });

    it('handles double-quoted imports', () => {
      const result = transformSource(`import { IressButton } from "@/main";`);

      expect(result).toContain("from '@iress-oss/ids-components'");
    });
  });

  describe('replacePropsType option', () => {
    it('removes an interface declaration and type annotation', () => {
      const source = `interface Props {\n  status: string;\n}\n\nexport function Example({ status }: Props) {\n  return <div />;\n}`;

      const result = transformSource(source, { replacePropsType: 'Props' });

      expect(result).not.toContain('interface Props');
      expect(result).not.toContain(': Props');
      expect(result).toContain('{ status }');
    });

    it('removes a type declaration', () => {
      const source = `type CustomProps = {\n  value: string;\n};\n\nexport function Example({ value }: CustomProps) {\n  return <div />;\n}`;

      const result = transformSource(source, { replacePropsType: 'CustomProps' });

      expect(result).not.toContain('type CustomProps');
      expect(result).not.toContain(': CustomProps');
    });
  });

  describe('removeProps option', () => {
    it('removes props from component usage', () => {
      const result = transformSource(`<Foo container={document.body} position="top" />`, { removeProps: ['container'] });

      expect(result).not.toContain('container');
      expect(result).toContain('position="top"');
    });

    it('removes multiple props', () => {
      const result = transformSource(`<Foo a={1} b="2" c />`, { removeProps: ['a', 'b'] });

      expect(result).not.toContain('a=');
      expect(result).not.toContain('b=');
      expect(result).toContain('c');
    });
  });

  describe('stripExportFunction option', () => {
    it('extracts just the return JSX', () => {
      const source = `import { IressAlert, IressStack } from '@/main';

export function AlertStatus() {
  return (
    <IressStack gap="md">
      <IressAlert status="danger">Error</IressAlert>
      <IressAlert status="info">Info</IressAlert>
    </IressStack>
  );
}`;

      const result = transformSource(source, { stripImports: true, stripExportFunction: true });

      expect(result).not.toContain('export function');
      expect(result).not.toContain('return');
      expect(result).toContain('<IressStack gap="md">');
      expect(result).toContain('<IressAlert status="danger">');
    });
  });

  describe('stripImports option', () => {
    it('removes import statements', () => {
      const result = transformSource(`import { X } from 'y';\n\n<X />`, { stripImports: true });

      expect(result).not.toContain('import');
      expect(result).toContain('<X />');
    });

    it('keeps imports by default', () => {
      const result = transformSource(`import { X } from '@/main';\n\n<X />`);

      expect(result).toContain("from '@iress-oss/ids-components'");
    });
  });

  describe('formatting cleanup', () => {
    it('removes excessive blank lines', () => {
      const result = transformSource(`a\n\n\n\nb`);

      expect(result).not.toMatch(/\n{3,}/);
    });

    it('trims whitespace', () => {
      const result = transformSource(`\n\n  code\n\n`);

      expect(result).not.toMatch(/^\s/);
      expect(result).not.toMatch(/\s$/);
    });
  });

  describe('formatWithPrettier', () => {
    it('formats code', async () => {
      const result = await formatWithPrettier(`const x=1;const y={a:"b"};`);

      expect(result).toContain('const x = 1;');
      expect(result).toContain("a: 'b'");
    });

    it('returns original on failure', async () => {
      const input = '<<<invalid>>>';
      const result = await formatWithPrettier(input);

      expect(result).toBe(input);
    });
  });

  describe('format option', () => {
    it('uses async transform when format is true (default)', () => {
      const result = withSource('<X />') as { docs: { source: { transform?: unknown; code?: string } } };

      expect(result.docs.source.transform).toBeDefined();
      expect(result.docs.source.code).toBeDefined(); // code is always set for sandbox addon
    });

    it('returns static code when format is false', () => {
      const result = withSource('<X />', { format: false }) as { docs: { source: { transform?: unknown; code?: string } } };

      expect(result.docs.source.code).toBeDefined();
      expect(result.docs.source.transform).toBeUndefined();
    });
  });

  describe('transform function mode', () => {
    it('accepts a transform function', () => {
      const transform = (code: string) => code.replace(/a/g, 'b');
      const result = withSource(transform);

      expect(result).toEqual({ docs: { source: { transform, language: 'tsx' } } });
    });
  });

  describe('deprecated aliases', () => {
    it('withCustomSource works', () => {
      const result = withCustomSource('const x = 1;', 'js');

      expect(result).toEqual({ docs: { source: { code: 'const x = 1;', language: 'js' } } });
    });

    it('withTransformedRawSource works', () => {
      const source = `interface Props { x: number; }\nexport function C({ x }: Props) { return <F x={x} bad={1} />; }`;
      const result = withTransformedRawSource(source, 'Props', ['bad']);
      const code = (result as { docs: { source: { code: string } } }).docs.source.code;

      expect(code).not.toContain('interface Props');
      expect(code).not.toContain(': Props');
      expect(code).not.toContain('bad');
      expect(code).toContain('x={x}');
    });
  });
});
