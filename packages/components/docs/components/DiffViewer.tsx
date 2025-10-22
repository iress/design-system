import { IressPanel, IressStack, IressTab, IressTabSet } from '@/main';
import { useState } from 'react';
import ReactDiffViewer, { type ReactDiffViewerProps } from 'react-diff-viewer';

type DiffViewerMode = 'diff' | 'old' | 'new';

export interface DiffViewerProps extends ReactDiffViewerProps {
  allowModeChange?: boolean;
}

export const DiffViewer = ({
  allowModeChange,
  disableWordDiff = true,
  extraLinesSurroundingDiff = 5,
  hideLineNumbers = true,
  newValue,
  oldValue,
  splitView = false,
  ...restProps
}: DiffViewerProps) => {
  const [mode, setMode] = useState<DiffViewerMode>('diff');

  return (
    <IressPanel
      className="sbdocs-diff-viewer"
      borderRadius="none"
      layerStyle="elevation.raised"
    >
      <IressStack gap="md">
        {allowModeChange && (
          <IressTabSet
            selected={mode}
            onChange={(e) => {
              setMode(e.value as DiffViewerMode);
            }}
          >
            <IressTab label="Diff" value="diff" />
            <IressTab label="Old" value="old" />
            <IressTab label="New" value="new" />
          </IressTabSet>
        )}

        <ReactDiffViewer
          {...restProps}
          oldValue={mode === 'new' ? newValue : oldValue}
          newValue={mode === 'old' ? oldValue : newValue}
          showDiffOnly={mode === 'diff'}
          splitView={splitView}
          hideLineNumbers={hideLineNumbers}
          disableWordDiff={disableWordDiff}
          extraLinesSurroundingDiff={extraLinesSurroundingDiff}
        />
      </IressStack>
    </IressPanel>
  );
};
