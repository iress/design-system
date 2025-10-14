import { spreadUnlessUndefined } from './spreadUnlessUndefined';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

describe('spreadUnlessUndefined', () => {
  it('should return defaults when overrides is empty', () => {
    const defaults = { name: 'John', age: 30, city: 'New York' };
    const overrides = {};

    const result = spreadUnlessUndefined(defaults, overrides);

    expect(result).toEqual(defaults);
  });

  it('should return defaults when overrides has no properties', () => {
    const defaults = { name: 'John', age: 30, city: 'New York' };
    const overrides: Partial<typeof defaults> = {
      name: undefined,
      age: undefined,
    };

    const result = spreadUnlessUndefined(defaults, overrides);

    expect(result).toEqual(defaults);
  });

  it('should override defined values from overrides', () => {
    const defaults = { name: 'John', age: 30, city: 'New York' };
    const overrides = { name: 'Jane', age: 25 };

    const result = spreadUnlessUndefined(defaults, overrides);

    expect(result).toEqual({
      name: 'Jane',
      age: 25,
      city: 'New York',
    });
  });

  it('should ignore undefined values from overrides', () => {
    const defaults = { name: 'John', age: 30, city: 'New York' };
    const overrides: Partial<typeof defaults> = {
      name: 'Jane',
      age: undefined,
      city: 'London',
    };

    const result = spreadUnlessUndefined(defaults, overrides);

    expect(result).toEqual({
      name: 'Jane',
      age: 30, // Should keep default value, not override with undefined
      city: 'London',
    });
  });

  it('should handle falsy values that are not undefined', () => {
    const defaults = { name: 'John', age: 30, active: true };
    const overrides = { name: '', age: 0, active: false };

    const result = spreadUnlessUndefined(defaults, overrides);

    expect(result).toEqual({
      name: '', // Empty string is not undefined
      age: 0, // 0 is not undefined
      active: false, // false is not undefined
    });
  });

  it('should work with nested objects', () => {
    const defaults = {
      user: { name: 'John', age: 30 },
      settings: { theme: 'dark', notifications: true },
    };
    const overrides: DeepPartial<typeof defaults> = {
      user: { name: 'Jane' },
      settings: { theme: 'light' },
    };

    const result = spreadUnlessUndefined(defaults, overrides as never);

    expect(result).toEqual({
      user: { name: 'Jane' }, // Nested object is completely replaced
      settings: { theme: 'light' }, // Nested object is completely replaced
    });
  });

  it('should work with arrays', () => {
    const defaults = {
      tags: ['react', 'typescript'],
      scores: [85, 90, 78],
    };
    const overrides: Partial<typeof defaults> = {
      tags: ['vue', 'javascript'],
      scores: undefined,
    };

    const result = spreadUnlessUndefined(defaults, overrides);

    expect(result).toEqual({
      tags: ['vue', 'javascript'],
      scores: [85, 90, 78], // Should keep default array, not override with undefined
    });
  });

  it('should work with mixed types', () => {
    const defaults = {
      name: 'John',
      age: 30,
      isActive: true,
      metadata: { id: 1, type: 'user' },
    };
    const overrides: DeepPartial<typeof defaults> = {
      name: undefined,
      age: 25,
      isActive: undefined,
      metadata: { id: 2 },
    };

    const result = spreadUnlessUndefined(defaults, overrides as never);

    expect(result).toEqual({
      name: 'John', // Should keep default, not override with undefined
      age: 25,
      isActive: true, // Should keep default, not override with undefined
      metadata: { id: 2 }, // Nested object is completely replaced
    });
  });

  it('should handle function properties', () => {
    const defaults = {
      handler: () => 'default',
      callback: () => 'default',
    };
    const overrides: Partial<typeof defaults> = {
      handler: () => 'override',
      callback: undefined,
    };

    const result = spreadUnlessUndefined(defaults, overrides);

    expect(result.handler).toBe(overrides.handler);
    expect(result.callback).toBe(defaults.callback); // Should keep default function
  });

  it('should preserve object reference for non-overridden properties', () => {
    const defaults = {
      user: { name: 'John', age: 30 },
      settings: { theme: 'dark' },
    };
    const overrides: Partial<typeof defaults> = {
      user: { name: 'Jane', age: 30 },
    };

    const result = spreadUnlessUndefined(defaults, overrides);

    expect(result.user).toEqual({ name: 'Jane', age: 30 });
    expect(result.settings).toBe(defaults.settings); // Should be same reference
  });

  it('should work with empty defaults and overrides', () => {
    const defaults = {};
    const overrides = {};

    const result = spreadUnlessUndefined(defaults, overrides);

    expect(result).toEqual({});
  });

  it('should work with empty defaults but populated overrides', () => {
    const defaults = {};
    const overrides = { name: 'John', age: 30 };

    const result = spreadUnlessUndefined(defaults, overrides);

    expect(result).toEqual({ name: 'John', age: 30 });
  });

  it('should work with populated defaults but empty overrides', () => {
    const defaults = { name: 'John', age: 30 };
    const overrides = {};

    const result = spreadUnlessUndefined(defaults, overrides);

    expect(result).toEqual({ name: 'John', age: 30 });
  });

  it('should demonstrate that nested undefined values are not filtered', () => {
    const defaults = {
      user: { name: 'John', age: 30 },
      settings: { theme: 'dark', notifications: true },
    };
    const overrides: DeepPartial<typeof defaults> = {
      user: { name: 'Jane', age: undefined },
      settings: { theme: 'light', notifications: undefined },
    };

    const result = spreadUnlessUndefined(defaults, overrides as never);

    expect(result).toEqual({
      user: { name: 'Jane', age: undefined }, // Nested undefined is preserved
      settings: { theme: 'light', notifications: undefined }, // Nested undefined is preserved
    });
  });
});
