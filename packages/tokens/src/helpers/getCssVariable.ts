import { dash } from 'radash';

export const getCssVariable = (
  path: string[],
  fallback?: string | number,
  prefix = 'iress',
) => {
  const variable = `--${prefix}-${dash(path.join('-'))}`;
  const variableFallback = fallback ? `, ${fallback}` : '';
  return `var(${variable}${variableFallback})`;
};
