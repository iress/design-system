import type { Addon_DecoratorFunction } from 'storybook/internal/types';
import { withPreviewSnippet } from './decorators/withPreviewSnippet';

export const decorators: Addon_DecoratorFunction<React.JSX.Element>[] = [
  withPreviewSnippet,
];
