import { dash } from 'radash';

/**
 * This function converts token references to CSS variables, including references with fallbacks.
 * @param value The value to convert (eg. `{typography.heading.1}` or `{typography.heading.1 || 2rem}`)
 * @param prefix The prefix of the CSS variable, defaults to iress
 * @returns The converted value (eg. `var(--<prefix>-typography-heading-1)` or `var(--<prefix>-typography-heading-1, 2rem)`)
 */
export const convertReferencesToVariables = <T>(
  value?: T,
  prefix = 'iress',
) => {
  if (!value) return undefined;

  const stringValue = String(value);
  let updatedValue = stringValue;

  // TODO: Review if there is a syntax for having fallbacks inside references.
  const fallbackMatches = Array.from(
    stringValue.matchAll(/(\{[a-zA-Z0-9_.]+ \|\| [^}]+\})/g),
  );
  updatedValue = fallbackMatches.reduce((newValue, match) => {
    const [reference, ...fallback] = match[1]
      .replace('{', '')
      .replace('}', '')
      .split(' || ');

    return newValue.replace(
      match[0],
      `var(--${prefix}-${dash(reference.replace(/\./g, '-'))}, ${fallback.join(', ')})`,
    );
  }, updatedValue);

  const nonFallbackMatches = Array.from(
    stringValue.matchAll(/(\{[a-zA-Z0-9_.]+\})/g),
  );
  updatedValue = nonFallbackMatches.reduce((newValue, match) => {
    return newValue.replace(
      match[0],
      `var(--${prefix}-${dash(match[1].replace('{', '').replace('}', '').replace(/\./g, '-'))})`,
    );
  }, updatedValue);

  return updatedValue;
};
