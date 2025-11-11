import { type ActionItem } from 'storybook/internal/components';
import { ADDON_ID } from '../constants';
import { getEncodedState } from './addonStateViaUrl';
import {
  addExportsToStorybookGeneratedSnippets,
  getOpenCodeUrl,
  getSandboxActionItems,
} from './getOpenCodeUrl';

describe('addExportsToStorybookGeneratedSnippets', () => {
  it('wraps the code with an export if none exists in snippet', () => {
    const hasExport =
      'export default () => (\n  <IressText>Hello world</IressText>\n);';
    const hasNamedExport =
      'export const App = () => (\n  <IressText>Hello world</IressText>\n);';
    const noExport = '<IressText>Hello world</IressText>';

    expect(addExportsToStorybookGeneratedSnippets(hasExport)).toBe(hasExport);
    expect(addExportsToStorybookGeneratedSnippets(hasNamedExport)).toBe(
      hasNamedExport,
    );
    expect(addExportsToStorybookGeneratedSnippets(noExport)).toBe(hasExport);
  });
});

// TODO: Probably needs end-to-end tests
describe('getOpenCodeUrl', () => {
  const snippet = '<IressText>Hello world</IressText>';
  const snippetWithExport =
    'export default () => (\n  <IressText>Hello world</IressText>\n);';

  it('provides a url that can be opened in sandbox and previewed in sandbox', () => {
    const url = getOpenCodeUrl(snippet, window.location, {
      [ADDON_ID]: {
        openInStoryId: 'path/to/sandbox',
        scopes: ['react-hook-forms'],
      },
    });

    expect(url).toContain(
      `?path=path/to/sandbox&${ADDON_ID}=${encodeURIComponent(getEncodedState({ code: snippetWithExport, scopes: ['react-hook-forms'] }))}`,
    );
  });

  it('throws an error if no sandbox story has been set', () => {
    expect(() => getOpenCodeUrl(snippet)).toThrow(
      `parameters.${ADDON_ID}.openInStoryId needs to be set in your Storybook configuration to allow opening code in the sandbox.`,
    );
  });
});

// TODO: Probably needs end-to-end tests
describe('getSandboxActionItems', () => {
  const snippet = '<IressText>Hello world</IressText>';
  const parameters = {
    [ADDON_ID]: {
      openInStoryId: 'path/to/sandbox',
      scopes: ['react-hook-forms'],
    },
  };
  const originalLocation: Location = window.location;
  const navigate = vi.fn();

  beforeEach(() => {
    delete (window as Partial<Window>).location;
    (window.location as Location) = new URL(
      'http://localhost',
    ) as unknown as Window['location'];
    window.location.assign = navigate;
  });

  afterAll(() => {
    (window.location as Location) = originalLocation;
    navigate.mockRestore();
  });

  it('returns an array with action items that can be used in a Storybook ActionBar', () => {
    const mockPostMessage = vi.fn();

    // Mock window.parent.postMessage
    Object.defineProperty(window, 'parent', {
      value: {
        postMessage: mockPostMessage,
      },
      writable: true,
    });

    const actionItems = getSandboxActionItems(snippet, parameters);

    expect(actionItems).toStrictEqual([
      {
        title: expect.any(Object) as ActionItem['title'],
        className: 'sandbox-open-in-sandbox',
        onClick: expect.any(Function) as ActionItem['onClick'],
      },
    ]);

    // Mock the click event
    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', {
      writable: false,
      value: document.createElement('button'),
    });

    actionItems[0]?.onClick({
      nativeEvent: event,
    } as React.MouseEvent<HTMLButtonElement>);

    expect(mockPostMessage).toHaveBeenCalledWith(
      {
        type: 'OPEN_IN_SANDBOX',
        generateUrl: expect.any(Function),
      },
      '*',
    );
  });

  it('returns empty array if no sandbox story has been set', () => {
    expect(getSandboxActionItems('')).toStrictEqual([]);
  });
});
