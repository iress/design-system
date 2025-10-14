export const spreadUnlessUndefined = <T extends object>(
  defaults: T,
  overrides: Partial<T>,
) => ({
  ...defaults,
  ...Object.fromEntries(
    Object.entries(overrides).filter(([, value]) => value !== undefined),
  ),
});
