import { createFileSystemCache, defineStoryFactory } from '@fumadocs/story';

export const STORYBOOK_BASE_URL =
  process.env.NEXT_PUBLIC_STORYBOOK_URL ||
  'https://main--691abcc79dfa560a36d0a74f.chromatic.com';

export function getStoryUrl(componentName: string, storyName: string): string {
  const kebab = storyName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return `${STORYBOOK_BASE_URL}/?path=/story/components-${componentName.toLowerCase()}--${kebab}`;
}

export const { defineStory } = defineStoryFactory({
  cache:
    process.env.NODE_ENV === 'production'
      ? createFileSystemCache('.next/fumadocs-story')
      : undefined,
  tsc: {},
});
