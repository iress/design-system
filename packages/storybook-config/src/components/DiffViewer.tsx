import { use, useState } from 'react';
import ReactDiffViewer, { type ReactDiffViewerProps } from 'react-diff-viewer';
import { IressStorybookContext } from './IressStorybookContext';

type DiffViewerMode = 'diff' | 'old' | 'new';

export interface DiffViewerProps extends ReactDiffViewerProps {
  /**
   * Whether to allow changing between diff, old, and new modes, usually used for more complex diffs.
   */
  allowModeChange?: boolean;
}

/**
 * A component to allow viewing differences between two pieces of code (`oldValue` and `newValue`)
 */
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
  const { IressPanel, IressStack, IressTab, IressTabSet } = use(
    IressStorybookContext,
  );
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
