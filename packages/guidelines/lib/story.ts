/**
 * Simple component preview utility. Since @fumadocs/story is not available,
 * we render IDS components directly in MDX. For interactive playgrounds,
 * users are directed to Storybook on Chromatic.
 *
 * In the future, this can be replaced with a proper story framework if one
 * becomes available for Fumadocs.
 */
export const STORYBOOK_BASE_URL =
  process.env.NEXT_PUBLIC_STORYBOOK_URL ||
  'https://main--691abcc79dfa560a36d0a74f.chromatic.com';

export function getStoryUrl(componentName: string, storyName: string): string {
  const kebab = storyName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return `${STORYBOOK_BASE_URL}/?path=/story/components-${componentName.toLowerCase()}--${kebab}`;
}
