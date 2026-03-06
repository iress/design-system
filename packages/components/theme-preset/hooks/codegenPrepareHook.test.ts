import { describe, it, expect } from 'vitest';
import { SPACING_ALIAS_MAP } from './spacingAliasMap';
import { codegenPrepareHook } from './codegenPrepareHook';
import type { Artifact } from '@pandacss/types';

const makeArtifacts = (code: string): Artifact[] => [
  {
    id: 'css-fn',
    files: [{ file: 'css.mjs', code }],
  } as Artifact,
];

describe('codegenPrepareHook', () => {
  it('injects alias resolution around withoutSpace(value)', () => {
    const artifacts = makeArtifacts(
      'return { className: `${propKey}_${withoutSpace(value)}` }',
    );
    const result = codegenPrepareHook(artifacts) as Artifact[];

    const code = result[0].files[0].code!;
    expect(code).toContain('__spacingAliases__');
    expect(code).toContain('__negSpacingAliases__');
    expect(code).toContain('withoutSpace(__resolveAlias__(value))');
    expect(code).not.toContain('withoutSpace(value)');
  });

  it('includes all aliases and their negatives in the injected map', () => {
    const artifacts = makeArtifacts('withoutSpace(value)');
    const result = codegenPrepareHook(artifacts) as Artifact[];
    const code = result[0].files[0].code!;

    // Positive aliases
    for (const [alias, canonical] of Object.entries(SPACING_ALIAS_MAP)) {
      expect(code).toContain(`"${alias}":"${canonical}"`);
    }
    // Negative aliases
    for (const [alias, canonical] of Object.entries(SPACING_ALIAS_MAP)) {
      expect(code).toContain(`"-${alias}":"-${canonical}"`);
    }
  });

  it('returns void when css-fn artifact is missing', () => {
    const result = codegenPrepareHook([
      { id: 'other', files: [] } as unknown as Artifact,
    ]);
    expect(result).toBeUndefined();
  });

  it('returns void when withoutSpace(value) is not found', () => {
    const artifacts = makeArtifacts('someOtherCode()');
    const result = codegenPrepareHook(artifacts);
    expect(result).toBeUndefined();
  });
});
