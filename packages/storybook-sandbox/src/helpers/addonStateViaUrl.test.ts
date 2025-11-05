import { type API } from 'storybook/internal/manager-api';
import { ADDON_ID } from '../constants';
import {
  getDecodedState,
  getEncodedState,
  getStateFromUrl,
  getUrlWithState,
  removeAddonFromUrl,
} from './addonStateViaUrl';

// Mock window location
const originalLocation: Location = window.location;
const navigate = vi.fn();
const history = vi.fn();

beforeEach(() => {
  delete (window as Partial<Window>).location;
  (window.location as Location) = new URL(
    'http://localhost',
  ) as unknown as Window['location'];
  window.location.assign = navigate;
  window.history.replaceState = history;
});

afterAll(() => {
  (window.location as Location) = originalLocation;
  navigate.mockRestore();
  history.mockRestore();
});

describe('getStateFromUrl', () => {
  const unencodedState = {
    code: 'console.log("Hello world")',
    scopes: ['react-hook-forms'],
  };
  const encodedState = getEncodedState(unencodedState);

  it('returns an empty state by default', () => {
    expect(getStateFromUrl()).toStrictEqual({ code: '' });
  });

  it('returns the state object if in the url', () => {
    window.location.search = `?${ADDON_ID}=${encodedState}`;
    expect(getStateFromUrl()).toStrictEqual(unencodedState);
  });
});

describe('getUrlWithState', () => {
  const unencodedState = {
    code: 'console.log("Hello world")',
    scopes: ['react-hook-forms'],
  };
  const encodedState = getEncodedState(unencodedState);

  it('returns the url with the state appended to it', () => {
    expect(getUrlWithState(unencodedState)).toEqual(
      `http://localhost/?${ADDON_ID}=${encodedState}`,
    );
  });

  it('returns the url with customisations, if setParams is around', () => {
    expect(
      getUrlWithState(unencodedState, (url) => {
        url.searchParams.set('custom', 'value');
      }),
    ).toEqual(`http://localhost/?custom=value&${ADDON_ID}=${encodedState}`);
  });
});

describe('removeAddonFromUrl', () => {
  const unencodedState = {
    code: 'console.log("Hello world")',
    scopes: ['react-hook-forms'],
  };
  const urlWithState = `http://localhost/?custom=value&${ADDON_ID}=${getEncodedState(unencodedState)}`;

  it('removes the url with state from history', () => {
    window.location.href = urlWithState;

    removeAddonFromUrl();

    expect(history).toHaveBeenCalledWith(
      {},
      '',
      'http://localhost/?custom=value',
    );
  });

  it('removes the url with state from Storybook API', () => {
    const setQueryParams = vi.fn();

    removeAddonFromUrl({
      setQueryParams,
    } as unknown as API);

    expect(setQueryParams).toHaveBeenCalledWith({ [ADDON_ID]: '' });
  });
});

describe('getEncodedState', () => {
  it('encodes a state', () => {
    expect(getEncodedState({ code: '' })).toEqual('N4Igxg9gJgpiBcIQF8g');
  });
});

describe('getDecodedState', () => {
  it('decodes a state', () => {
    expect(getDecodedState('N4Igxg9gJgpiBcIQF8g')).toEqual({ code: '' });
  });
});
