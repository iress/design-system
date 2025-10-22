import { useCallback, useEffect, useState } from 'react';
import { AddonPanel } from 'storybook/internal/components';
import { type API, useAddonState, useParameter } from 'storybook/manager-api';
import {
  ADDON_ID,
  EDITOR_TRANSFORMERS,
  SANDBOX_UPDATE_EVENT,
} from '../constants';
import { LiveEditor, LiveProvider } from 'react-live';
import { themes } from 'prism-react-renderer';
import { DARK_MODE_EVENT_NAME } from '@vueless/storybook-dark-mode';
import { type AddonConfig, type AddonState } from '../types';
import {
  createSandboxIconFontPortal,
  isSandboxStory,
  getStateFromUrl,
  getUrlWithState,
  getEncodedState,
  removeAddonFromUrl,
  transformCode,
  isSandboxStoryFromParameters,
} from '../helpers';
import { STORY_PREPARED } from 'storybook/internal/core-events';
import { SandboxShare } from './buttons/SandboxShare';
import { type Parameters } from '@storybook/react';
import { SandboxTemplates } from './buttons/SandboxTemplates';
import { SandboxScopes } from './buttons/SandboxScopes';

interface SandboxEditorProps {
  active?: boolean;
  api: API;
}

interface StoryPreparedEvent {
  parameters: Parameters;
}

// TODO: Not sure why, but CSS file is not working inside the addon
const SandboxManagerStyle = () => (
  <style>{`
.sandbox-editor,
.sandbox-editor > div,
.sandbox-editor > div > div,
.sandbox-editor > div > div > div {
  height: 100%;
  margin: 0;
}

.sandbox-editor__panel {
  display: flex;
}

.sandbox-editor__panel > div:first-child {
  font-family: monospace;
  overflow-y: auto;
  flex: 1;
  scrollbar-color: #029cfd #73828c30;
}

.sandbox-editor__panel pre {
  min-height: 100%;
  counter-reset: token-line;
  white-space: nowrap !important;
  width: fit-content;
  min-width: 100%;
}

.sandbox-editor__panel pre .token-line::before {
  counter-increment: token-line;
  content: counter(token-line);
  display: inline-block;
  width: 30px;
  opacity: 0.5;
}

button.sandbox-open-editor {
  order: 999;
  background-color: #06cfcf21;
  color: #0bafaf;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.sandbox-open-editor__content {
  padding-left: 0.25em;
}

.sandbox-editor__toolbar {
  background-color: #73828c30;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}

.sandbox-editor__toolbar button:not(dialog *) {
  min-width: 32px;
  min-height: 32px;
  padding: 0.5em;
  border-radius: 0;
  margin: 0;
}

.sandbox-editor__toolbar-menu {
  min-width: 180px;
}

.sandbox-open-in-sandbox {
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
  text-decoration: none;
  order: -1;
}

.sandbox-dialog {
  border-radius: 0.5em;
  border: 0;
  box-shadow: 0 0.5em 1em rgb(0 0 0 / 50%);
  padding: 2em;
  max-width: 700px;
}

.sandbox-dialog::backdrop {
  background-color: rgb(0 0 0 / 75%);
}

.sandbox-dialog .close {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  position: absolute;
  top: 1em;
  right: 1em;
}

.sandbox-dialog .close span {
  font-size: 1.75em;
}

.sandbox-templates__items {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
  margin-top: 2em;
}

.sandbox-templates__items li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sandbox-templates__items svg {
  max-width: 150px;
  height: auto;
  margin-bottom: 0.5em;
}

.sandbox-templates__items p {
  margin-top: 0;
}

.sandbox-templates__items button {
  margin-top: auto;
}
`}</style>
);

export const SandboxEditor = ({ active = true, api }: SandboxEditorProps) => {
  const stateFromUrl = getStateFromUrl();
  const config = useParameter<AddonConfig>(ADDON_ID, stateFromUrl);
  const editorTransformers = config.editorTransformers ?? EDITOR_TRANSFORMERS;
  const [state, setState] = useAddonState<AddonState>(ADDON_ID, {
    ...stateFromUrl,
    code: transformCode(config.code, editorTransformers),
  });
  const [theme, setTheme] = useState(themes.github);

  // Update the state and emit the new state to the channel,
  // allowing the preview to update with the new code
  const updateState = useCallback(
    (newState: AddonState) => {
      if (isSandboxStory(api)) {
        setState(newState);
        api.getChannel()?.emit(SANDBOX_UPDATE_EVENT, newState);
        history.replaceState(null, '', getUrlWithState(newState));
        api.setQueryParams({ [ADDON_ID]: getEncodedState(newState) });
      } else {
        removeAddonFromUrl(api);
      }
    },
    [api, setState],
  );

  // Update the theme based on the dark mode event to enable consistency
  const updateTheme = useCallback((dark: boolean) => {
    setTheme(dark ? themes.nightOwl : themes.github);
  }, []);

  // Emit the new code to the channel when the story is prepared,
  // needed sometimes when the parameter hook does not update the code
  const handleStoryPrepared = useCallback(
    ({ parameters }: StoryPreparedEvent) => {
      if (!isSandboxStoryFromParameters(parameters)) {
        return;
      }

      const addonParameters = parameters?.[ADDON_ID] as AddonConfig;
      const code = stateFromUrl.code || addonParameters?.code;

      if (code) {
        updateState({
          ...state,
          code: transformCode(code, editorTransformers),
        });
      }
    },
    [state, stateFromUrl.code, updateState, editorTransformers],
  );

  // Update the theme based on the dark mode event
  // and remove the listener when the component is unmounted
  useEffect(() => {
    api.getChannel()?.on(DARK_MODE_EVENT_NAME, updateTheme);
    return () => api.getChannel()?.off(DARK_MODE_EVENT_NAME, updateTheme);
  }, [api, updateTheme]);

  // Update config when the story is prepared
  // and remove the listener when the component is unmounted
  useEffect(() => {
    api.getChannel()?.on(STORY_PREPARED, handleStoryPrepared);
    return () => api.getChannel()?.off(STORY_PREPARED, handleStoryPrepared);
  }, [api, handleStoryPrepared]);

  return (
    <div className="sandbox-editor">
      <SandboxManagerStyle />
      <AddonPanel active={active}>
        <LiveProvider code={state.code} theme={theme}>
          <div className="sandbox-editor__panel" data-testid="panel">
            <LiveEditor
              language="tsx"
              onChange={(code) => updateState({ ...state, code })}
            />
            <div className="sandbox-editor__toolbar">
              <SandboxShare state={state} />
              <SandboxTemplates
                templates={config.templates}
                onChange={(template) => {
                  updateState({
                    ...template.state,
                    code: transformCode(
                      template.state.code,
                      editorTransformers,
                    ),
                  });
                  api.addNotification({
                    id: 'sandbox-template-applied',
                    content: {
                      headline: `Template "${template.title}" has been applied`,
                    },
                    duration: 3000,
                  });
                }}
              />
              <SandboxScopes
                availableScopes={config.scopes}
                scopes={state.scopes}
                onChange={(scopes) => {
                  updateState({
                    ...state,
                    scopes,
                  });
                }}
              />
            </div>
          </div>
        </LiveProvider>
      </AddonPanel>
      {createSandboxIconFontPortal()}
    </div>
  );
};
