import { vi } from 'vitest';
import * as fs from 'fs';
import { createGeneratedDir } from './createGeneratedDir';

let directoryExists = false;
vi.mock(import('fs'), async (importOriginal) => {
  const mod = await importOriginal();

  return {
    ...mod,
    existsSync: vi.fn().mockImplementation(() => directoryExists),
    promises: {
      ...mod.promises,
      mkdir: vi.fn(),
    },
  };
});

afterEach(() => vi.clearAllMocks());

describe('createGeneratedDir', () => {
  it('creates a generated directory in the src folder', async () => {
    directoryExists = false;
    await createGeneratedDir();
    expect(fs.promises.mkdir).toHaveBeenLastCalledWith(
      'src/generated',
      expect.anything(),
    );
  });

  it('does not create directory if it exists', async () => {
    directoryExists = true;
    await createGeneratedDir();
    expect(fs.promises.mkdir).not.toHaveBeenCalled();
  });
});
