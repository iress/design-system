import type { Addon_DecoratorFunction } from 'storybook/internal/types';
import { withSandboxStory } from './decorators/withSandboxStory';
import { ADDON_ID } from './constants';

export const decorators: Addon_DecoratorFunction<JSX.Element>[] = [
  withSandboxStory,
];

export const parameters = {
  [ADDON_ID]: {
    disable: true,
  },
};
