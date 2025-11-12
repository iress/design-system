import { type SandboxTemplate } from '@iress-oss/ids-storybook-sandbox';
import showcaseSnippet from './showcase/snippet.tsx?raw';
import simpleSnippet from './simple/snippet.tsx?raw';

export const TEMPLATES: SandboxTemplate[] = [
  {
    title: 'Showcase',
    description:
      'This showcases the features of the new sandbox, by using IDS components and its new features of course.',
    // thumbnail: iconSandboxShowcase(), // TODO: Not sure why </> JSX is not working here
    state: {
      code: showcaseSnippet,
    },
  },
  {
    title: 'Simple',
    description:
      'A template that just has a panel and some text to begin with.',
    // thumbnail: iconSandboxSimple(), // TODO: Not sure why </> JSX is not working here
    state: {
      code: simpleSnippet,
    },
  },
];
