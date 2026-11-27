import { describe, expect, it } from 'vitest';
import spacing from './spacing';

describe('spacing schema', () => {
  it('derives every multiple from the editable base token (spacing.1)', () => {
    const multiples = [2, 3, 4, 5, 6, 7, 8, 10] as const;

    multiples.forEach((multiple) => {
      expect(spacing[multiple].$value).toBe(
        `calc(${multiple} * {spacing.1 || .25rem})`,
      );
    });
  });
});
