import { type SandboxTransformerMap } from '../types';

export const transformCode = (
  code: string,
  transformers: SandboxTransformerMap,
): string =>
  Object.values(transformers).reduce(
    (newCode, transformer) => transformer(newCode),
    code,
  );
