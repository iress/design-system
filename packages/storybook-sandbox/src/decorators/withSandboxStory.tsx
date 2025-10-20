import { lazy, Suspense } from 'react';
import type {
  PartialStoryFn as StoryFunction,
  StoryContext,
} from 'storybook/internal/types';
import {
  createSandboxIconFontPortal,
  getStateFromUrl,
  getUrlWithState,
  isSandboxStoryFromContext,
} from '../helpers';
import { ADDON_TITLE_SHORT, ADDON_ICON, ADDON_ID } from '../constants';
import { type ReactRenderer } from '@storybook/react';
import { type SandboxPreviewProps } from '../components/SandboxPreview';
import { type AddonConfig } from '../types';

const SandboxPreview = lazy(() => import('../components/SandboxPreview'));

// TODO: Not sure why, but CSS file is not working inside the addon
const SandboxPreviewStyle = () => (
  <style>{`
.sandbox-preview {
  height: 100vh;
  overflow-y: auto;
}

.sandbox-preview__error > * {
  display: none !important;
}

.sandbox-preview__error:has(pre) > * {
  display: flex !important;
}

.sandbox-preview__error pre {
  color: var(--iress-heading-color, inherit);
  margin-top: 0;
  white-space: pre-wrap;
}

.sandbox-edit-preview {
  position: fixed;
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
  top: 0;
  right: 0;
  padding: 0.5em 0.75em;
  border: 0;
  border-bottom-left-radius: 0.5em;
  background-color: #292c2e;
  font-family: Roboto, Helvetica, Aria, sans-serif;
  color: white;
  text-decoration: none;
  font-size: 0.75em;
}

.sandbox-edit-preview span {
  font-size: 1.5em;
}
`}</style>
);

export const withSandboxStory = (
  StoryFn: StoryFunction<ReactRenderer>,
  context: StoryContext<ReactRenderer>,
) => {
  const isSandboxStory = isSandboxStoryFromContext(context);

  if (!isSandboxStory) {
    return StoryFn(context);
  }

  const isPreview = window.parent?.location.href.includes('iframe.html');
  const state = getStateFromUrl();
  const contextArgs = context.args as SandboxPreviewProps;
  const parameters = context.parameters[ADDON_ID] as AddonConfig;
  const props: SandboxPreviewProps = {
    ...{
      ...context.args,
      ...parameters,
      defaultState: {
        ...(contextArgs.defaultState ?? {}),
        ...state,
        code: (state.code || contextArgs.defaultState?.code) ?? '',
      },
    },
  };

  if (isPreview) {
    const editUrl = getUrlWithState(state, (url) => {
      url.pathname = '/';
      url.searchParams.set('path', `/${context.viewMode}/${context.id}`);
      url.searchParams.delete('viewMode');
    });

    return (
      <Suspense fallback={props.loading?.(state) ?? 'Loading...'}>
        <SandboxPreviewStyle />
        <SandboxPreview {...props} />
        <a href={editUrl} className="sandbox-edit-preview">
          <span className="material-symbols-outlined" aria-hidden="true">
            {ADDON_ICON}
          </span>{' '}
          {ADDON_TITLE_SHORT}
        </a>
        {createSandboxIconFontPortal()}
        {StoryFn(context)}
      </Suspense>
    );
  }

  return (
    <Suspense fallback={props.loading?.(state) ?? 'Loading...'}>
      <SandboxPreviewStyle />
      <SandboxPreview {...props} />
      {StoryFn(context)}
    </Suspense>
  );
};
