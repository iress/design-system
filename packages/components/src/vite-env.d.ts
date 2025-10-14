/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {
    // Vitest-specific matchers
    toHaveBeenCalledOnce(): Assertion<T>;
    toBeTypeOf(expected: string): Assertion<T>;
    equals(expected: T): Assertion<T>;
  }

  interface AsymmetricMatchersContaining
    extends TestingLibraryMatchers<any, any> {
    // Vitest-specific matchers
    toHaveBeenCalledOnce(): AsymmetricMatchersContaining;
    toBeTypeOf(expected: string): AsymmetricMatchersContaining;
    equals(expected: any): AsymmetricMatchersContaining;
  }
}

// Override Jest global types if they exist
declare global {
  namespace jest {
    interface Matchers<R, T = {}> extends TestingLibraryMatchers<T, R> {
      toHaveBeenCalledOnce(): R;
      toBeTypeOf(expected: string): R;
      equals(expected: T): R;
    }
  }
}
