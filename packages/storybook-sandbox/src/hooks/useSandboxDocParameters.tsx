import React from 'react';
import { useCallback, useEffect } from 'react';
import type {
  Parameters as StorybookParameters,
  API_DocsEntry,
} from 'storybook/internal/types';
import { addons } from 'storybook/preview-api';
import { SANDBOX_DOCS_RENDERED } from '../constants';

/**
 * This hook doesn't keep its own state, due to Storybook Addons being tied to the version Storybook Manager uses.
 * Hence we need to pass the state setter to this hook.
 * @param setParameters function that sets the state on the consuming component.
 */
export const useSandboxDocParameters = (
  setParameters: (parameters: StorybookParameters | undefined) => void,
) => {
  const updateParameters = useCallback(
    (entry: API_DocsEntry) => setParameters(entry?.parameters),
    [setParameters],
  );

  useEffect(() => {
    addons.getChannel()?.on(SANDBOX_DOCS_RENDERED, updateParameters);

    const lastEvent = addons
      .getChannel()
      ?.last(SANDBOX_DOCS_RENDERED) as API_DocsEntry[];
    const data = lastEvent?.[0];

    if (data) {
      updateParameters(data);
    }

    return () =>
      addons.getChannel()?.off(SANDBOX_DOCS_RENDERED, updateParameters);
  }, [updateParameters]);
};
