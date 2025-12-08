import React, { useCallback, useEffect, useMemo } from 'react';
import { SNIPPET_RENDERED } from 'storybook/internal/docs-tools';
import { PREVIEW_SNIPPET } from '../constants';
import type { Renderer, StoryContext } from 'storybook/internal/types';
import type { SourceProps } from '@storybook/addon-docs/blocks';
import { addons } from 'storybook/preview-api';

export interface PreviewSnippetProps {
  context?: StoryContext<Renderer>;
}

interface SnippetRenderedEvent {
  source?: string;
}

interface ParametersConfig {
  docs?: {
    source?: {
      code?: string;
      transform?: SourceProps['transform'];
    };
  };
}

export const PreviewSnippet = ({ context }: PreviewSnippetProps) => {
  const sourceConfig = useMemo(
    () => (context?.parameters as ParametersConfig)?.docs?.source,
    [context?.parameters],
  );

  const code = useMemo(() => sourceConfig?.code, [sourceConfig?.code]);

  // If code has been set using `parameters.docs.source.code`, emit it as the preview snippet
  if (code) {
    addons.getChannel()?.emit(PREVIEW_SNIPPET, code);
  }

  // Called when the automated snippet is generated
  const handleAutomatedSnippet = useCallback(
    ({ source }: SnippetRenderedEvent) => {
      // If code has been set using `parameters.docs.source.code`, do not emit the automated snippet
      if (code ?? !source) {
        return;
      }

      // If the transform parameter has been set `parameters.docs.source.transform`, emit the transformed snippet
      if (sourceConfig?.transform && context) {
        addons
          .getChannel()
          ?.emit(PREVIEW_SNIPPET, sourceConfig?.transform(source, context));
      } else {
        // otherwise, emit the automated snippet
        addons.getChannel()?.emit(PREVIEW_SNIPPET, source);
      }
    },
    [code, context, sourceConfig],
  );

  useEffect(() => {
    addons.getChannel()?.on(SNIPPET_RENDERED, handleAutomatedSnippet);
    return () =>
      addons.getChannel()?.off(SNIPPET_RENDERED, handleAutomatedSnippet);
  }, [handleAutomatedSnippet]);

  return null;
};
