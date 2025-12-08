import React from 'react';
import type {
  PartialStoryFn as StoryFunction,
  StoryContext,
  Renderer,
} from 'storybook/internal/types';
import { PreviewSnippet } from '../components/PreviewSnippet';

export const withPreviewSnippet = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) => (
  <>
    <PreviewSnippet context={context} />
    {StoryFn(context)}
  </>
);
