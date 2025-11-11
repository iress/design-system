import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';
import { type API } from 'storybook/manager-api';
import { ADDON_ID } from '../constants';
import { type AddonState, type SandboxParentLocation } from '../types';

export const getStateFromUrl = (
  location: SandboxParentLocation = window.location,
): AddonState => {
  if (!location) return { code: '' };
  const searchParams = new URLSearchParams(location.search);
  const stateParam = searchParams.get(ADDON_ID) ?? '';
  return getDecodedState(stateParam);
};

export const getUrlWithState = (
  state: AddonState,
  location: SandboxParentLocation = window.location,
  setParams?: (url: URL) => void,
) => {
  const url = new URL(location.href);
  setParams?.(url);
  url.searchParams.set(ADDON_ID, getEncodedState(state));
  return transformUrlForHistory(url);
};

export const removeAddonFromUrl = (
  location: SandboxParentLocation = window.location,
  api?: API,
) => {
  api?.setQueryParams({ [ADDON_ID]: '' });

  const url = new URL(location.href);
  url.searchParams.delete(ADDON_ID);

  // eslint-disable-next-line sonarjs/post-message
  window.parent.postMessage(
    { type: 'REMOVE_ADDON_STATE', url: transformUrlForHistory(url) },
    '*',
  );
};

export const getEncodedState = (state: AddonState) =>
  compressToEncodedURIComponent(JSON.stringify(state));

export const getDecodedState = (stateParam: string): AddonState =>
  (JSON.parse(decompressFromEncodedURIComponent(stateParam)) as AddonState) ?? {
    code: '',
  };

const transformUrlForHistory = (url: URL) => {
  return url.toString().replace(/%2F/g, '/').replace(/%3A/g, ':');
};
