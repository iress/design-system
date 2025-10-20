import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';
import { type API } from 'storybook/manager-api';
import { ADDON_ID } from '../constants';
import { type AddonState } from '../types';

export const getStateFromUrl = (): AddonState => {
  const searchParams = new URLSearchParams(
    window.parent.location.search.toString(),
  );
  const stateParam = searchParams.get(ADDON_ID) ?? '';
  return getDecodedState(stateParam);
};

export const getUrlWithState = (
  state: AddonState,
  setParams?: (url: URL) => void,
) => {
  const url = new URL(window.parent.location.toString());
  setParams?.(url);
  url.searchParams.set(ADDON_ID, getEncodedState(state));
  return transformUrlForHistory(url);
};

export const removeAddonFromUrl = (api?: API) => {
  api?.setQueryParams({ [ADDON_ID]: '' });

  const url = new URL(window.parent.location.toString());
  url.searchParams.delete(ADDON_ID);

  window.parent.history.replaceState({}, '', transformUrlForHistory(url));
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
