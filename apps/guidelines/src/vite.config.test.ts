import { describe, expect, it, vi } from 'vitest';

vi.mock('node:child_process', async (importOriginal) => {
  const original = await importOriginal<typeof import('node:child_process')>();
  return {
    ...original,
    execSync: () => 'feat/guidelines\n',
  };
});

describe('Storybook build branch', () => {
  it.each([undefined, 'feat/guidelines'])(
    'uses the same branch slug with VITE_STORYBOOK_BRANCH=%s',
    async (branch) => {
      vi.resetModules();
      vi.stubEnv('VITE_STORYBOOK_BRANCH', branch);

      try {
        const { default: config } = await import('../vite.config');

        expect(config.define?.__STORYBOOK_BRANCH__).toBe(
          JSON.stringify('feat-guidelines'),
        );
      } finally {
        vi.unstubAllEnvs();
      }
    },
  );
});
