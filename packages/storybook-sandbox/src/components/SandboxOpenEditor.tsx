import { IconButton } from 'storybook/internal/components';
import { MarkupIcon } from '@storybook/icons';
import { PANEL_ID, TOOLBAR_ID } from '../constants';
import { type API, useStorybookState } from 'storybook/manager-api';
import { useMemo } from 'react';

interface SandboxOpenEditorProps {
  api: API;
}

export const SandboxOpenEditor = ({ api }: SandboxOpenEditorProps) => {
  const state = useStorybookState();
  const isPanelEnabled = useMemo(
    () => state.layout.bottomPanelHeight || state.layout.rightPanelWidth,
    [state.layout.bottomPanelHeight, state.layout.rightPanelWidth],
  );

  if (isPanelEnabled) {
    return null;
  }

  return (
    <IconButton
      active
      className="sandbox-open-editor"
      key={TOOLBAR_ID}
      onClick={() => {
        api.togglePanel(true);
        api.setSelectedPanel(PANEL_ID);
      }}
    >
      <MarkupIcon />{' '}
      <span className="sandbox-open-editor__content">Open editor</span>
    </IconButton>
  );
};
