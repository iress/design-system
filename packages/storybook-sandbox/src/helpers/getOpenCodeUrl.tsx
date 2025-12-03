import type { Parameters as StorybookParameters } from 'storybook/internal/types';
import { getUrlWithState } from './addonStateViaUrl';
import { ADDON_ID } from '../constants';
import type { ActionItem } from 'storybook/internal/components';
import React from 'react';
import { SandboxLabel } from '../components/SandboxLabel';
import type { AddonConfig, SandboxParentLocation } from '../types';

export const addExportsToStorybookGeneratedSnippets = (code: string) => {
  if (code.includes('export default') || code.includes('export const')) {
    return code;
  }

  return `export default () => (
  ${code.split('\n').join('\n  ')}
);`;
};

export const getOpenCodeUrl = (
  code: string,
  location: SandboxParentLocation = window.location,
  parameters?: StorybookParameters,
) => {
  const addonConfig = parameters?.[ADDON_ID] as AddonConfig;
  const openInStoryId = addonConfig?.openInStoryId;

  if (!openInStoryId) {
    throw new Error(
      `parameters.${ADDON_ID}.openInStoryId needs to be set in your Storybook configuration to allow opening code in the sandbox.`,
    );
  }

  return getUrlWithState(
    {
      code: addExportsToStorybookGeneratedSnippets(code),
      scopes: addonConfig?.scopes,
    },
    location,
    (url) => {
      url.searchParams.set('path', openInStoryId);
    },
  );
};

export const getSandboxActionItems = (
  source: React.MutableRefObject<string | null> | string,
  parameters?: StorybookParameters,
): ActionItem[] => {
  const addonConfig = parameters?.[ADDON_ID] as AddonConfig;

  if (!addonConfig?.openInStoryId) {
    return [];
  }

  return [
    {
      title: <SandboxLabel />,
      className: 'sandbox-open-in-sandbox',
      onClick: () => {
        const code = typeof source === 'string' ? source : source.current;
        // eslint-disable-next-line sonarjs/post-message
        window.parent.postMessage(
          {
            type: 'OPEN_IN_SANDBOX',
            generateUrl: (location: SandboxParentLocation) =>
              getOpenCodeUrl(code ?? '', location, parameters),
          },
          '*',
        );
      },
    },
  ];
};
