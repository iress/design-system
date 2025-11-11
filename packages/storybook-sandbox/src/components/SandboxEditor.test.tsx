// TODO: Probably needs end-to-end testing
import { act, type ComponentProps } from 'react';
import { type API, type ChannelListener } from 'storybook/internal/manager-api';
import { SandboxEditor } from './SandboxEditor';
import { render, screen, waitFor } from '@testing-library/react';
import { ADDON_ID, SANDBOX_UPDATE_EVENT } from '../constants';
import { type AddonConfig, type AddonState } from '../types';
import { getEncodedState, getUrlWithState } from '../helpers';
import userEvent from '@testing-library/user-event';
import { STORY_PREPARED } from 'storybook/internal/core-events';
import { DARK_MODE_EVENT_NAME } from '@vueless/storybook-dark-mode';
import { themes } from 'prism-react-renderer';
import { Button } from 'storybook/internal/components';

// Mocking the Storybook API
const channelOn = vi.fn();
const channelEmit = vi.fn();
const setQueryParams = vi.fn();
const addNotification = vi.fn();
let isSandboxDisabled = false;
const api = {
  addNotification,
  getChannel: () => ({
    on: channelOn,
    off: vi.fn(),
    emit: (...args: never[]) => {
      const event = args[0];

      channelEmit(...args);

      const listeners = (
        channelOn.mock.calls as [string, ChannelListener][]
      ).filter((listener) => listener[0] === event);

      listeners.forEach(([, listener]) => listener(...args.slice(1)));
    },
  }),
  getCurrentStoryData: () => ({
    parameters: {
      docs: {
        source: {
          code: `import { Overridden } from '@/main';`,
        },
      },
      [ADDON_ID]: {
        disable: isSandboxDisabled,
      },
    },
  }),
  setQueryParams,
} as unknown as API;

// We mock the storybook/internal/components package to avoid rendering the actual components,
// as we are not testing the components themselves (and there's some magic going on with their Styled Components)
vi.mock('storybook/internal/components', async (importOriginal) => {
  const { forwardRef } = await import('react');
  return {
    ...(await importOriginal<typeof import('storybook/internal/components')>()),
    Button: (props: ComponentProps<typeof Button>) => (
      <button onClick={props.onClick}>{props.children}</button>
    ),
    IconButton: () => <button>IconButton rendered</button>,
    WithTooltip: () => <div>WithTooltip rendered</div>,
    TooltipLinkList: () => <div>TooltipLinkList rendered</div>,
    AddonPanel: forwardRef<HTMLDivElement, any>((props, ref) => {
      if (props.active === false) {
        return null;
      }
      return (
        <div ref={ref} {...props}>
          {props.children}
        </div>
      );
    }),
  };
});

// We mock the storybook/manager-api package,
// Which relies on Storybook's context and would throw an error in a test environment (and is a pain to mock).
let parameter: AddonConfig | undefined = undefined;
let addonState: AddonState | undefined = undefined;
const updateAddonState = vi.fn();
vi.mock('storybook/manager-api', async (importOriginal) => ({
  ...(await importOriginal<typeof import('storybook/manager-api')>()),
  useParameter: (id: string, initial?: AddonState) => {
    return id === ADDON_ID ? (parameter ?? initial) : undefined;
  },
  useAddonState: (id: string, initial?: AddonState) => {
    return id === ADDON_ID
      ? [addonState ?? initial, updateAddonState]
      : [undefined, updateAddonState];
  },
}));

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

// Mock dialog
beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe('SandboxEditor', () => {
  it('renders default code state if no state in parameters or url', async () => {
    render(<SandboxEditor api={api} />);

    const panel = await screen.findByTestId('panel');
    expect(panel).toBeInTheDocument();

    const code = panel.querySelector('pre');
    expect(code).toBeInTheDocument();
    expect(code).toHaveTextContent('');

    const toolbar = panel.querySelector(`.sandbox-editor__toolbar`);
    expect(toolbar).toBeInTheDocument();
  });

  it('renders code from url', async () => {
    window.location.href = getUrlWithState(
      {
        code: 'export default () => <IressText>Hello world from URL</IressText>;',
      },
      window.location,
    );

    render(<SandboxEditor api={api} />);

    const panel = await screen.findByTestId('panel');
    const code = panel.querySelector('pre');
    expect(code).toHaveTextContent(
      'export default () => <IressText>Hello world from URL</IressText>;',
    );
  });

  it('renders code from parameters', async () => {
    parameter = {
      code: 'export default () => <IressText>Hello world from parameters</IressText>;',
    };

    render(<SandboxEditor api={api} />);

    const panel = await screen.findByTestId('panel');
    const code = panel.querySelector('pre');
    expect(code).toHaveTextContent(
      'export default () => <IressText>Hello world from parameters</IressText>;',
    );

    parameter = undefined;
  });

  it('renders code from addon state', async () => {
    addonState = {
      code: 'export default () => <IressText>Hello world</IressText>;',
    };

    render(<SandboxEditor api={api} />);

    const panel = await screen.findByTestId('panel');
    const code = panel.querySelector('pre');
    expect(code).toHaveTextContent(
      'export default () => <IressText>Hello world</IressText>;',
    );

    addonState = undefined;
  });

  // TODO: JSDom does not seem to support content-editable elements
  it.skip('updates the state of the addon when typing in the editor', async () => {
    render(<SandboxEditor api={api} />);

    const panel = await screen.findByTestId('panel');
    const code = panel.querySelector('pre')!;

    await userEvent.click(code);
    await userEvent.keyboard('abc');
  });

  it('updates the state of the addon when a story is prepared', async () => {
    render(<SandboxEditor api={api} />);

    // Clear mock, cause we want to check this during the event update
    setQueryParams.mockClear();

    const panel = await screen.findByTestId('panel');
    const code = panel.querySelector('pre')!;

    // Does not update if not a sandbox story
    isSandboxDisabled = true;
    act(() => {
      api.getChannel()?.emit(STORY_PREPARED, {
        parameters: {
          [ADDON_ID]: {
            disable: true,
            code: 'console.log("Hello world");',
          },
        },
      });
    });

    expect(code).toHaveTextContent('');
    expect(setQueryParams).not.toHaveBeenCalled();

    // Updates if a sandbox story
    isSandboxDisabled = false;
    act(() => {
      api.getChannel()?.emit(STORY_PREPARED, {
        parameters: {
          [ADDON_ID]: {
            disable: false,
            code: 'console.log("Hello world");',
          },
        },
      });
    });

    const updatedState = {
      code: 'console.log("Hello world");',
    };

    expect(updateAddonState).toHaveBeenLastCalledWith(updatedState);
    await waitFor(() =>
      expect(channelEmit).toHaveBeenLastCalledWith(
        SANDBOX_UPDATE_EVENT,
        updatedState,
      ),
    );
    expect(history).toHaveBeenCalledWith(
      null,
      '',
      getUrlWithState(updatedState),
    );
    expect(setQueryParams).toHaveBeenLastCalledWith({
      [ADDON_ID]: getEncodedState(updatedState),
    });

    // TODO: Since we are mocking the state, we cannot test the actual code change
    // expect(code).toHaveTextContent('console.log("Hello world");');
  });

  it('updates the state when selecting a template', async () => {
    parameter = {
      code: 'export default () => <IressText>Hello world from parameters</IressText>;',
      templates: [
        {
          title: 'Goodbye',
          thumbnail: <>Thumbnail</>,
          state: {
            code: 'export default () => <IressText>Goodbye world</IressText>;',
          },
        },
      ],
    };

    render(<SandboxEditor api={api} />);

    const panel = await screen.findByTestId('panel');
    const code = panel.querySelector('pre');
    expect(code).toHaveTextContent(
      'export default () => <IressText>Hello world from parameters</IressText>;',
    );

    // Get select button (its hidden cause we are cheating by not opening the dialog, mainly cause JS dom does not really work with HTMLDialogElement)
    const selectButton = screen.getByRole('button', {
      name: 'Select',
      hidden: true,
    });
    expect(selectButton).toBeInTheDocument();

    // Select a template
    await userEvent.click(selectButton);

    // Check a notification (toast) was created
    expect(addNotification).toHaveBeenCalledWith({
      id: 'sandbox-template-applied',
      content: {
        headline: `Template "Goodbye" has been applied`,
      },
      duration: 3000,
    });

    // Check the code was updated
    // TODO: Since we are mocking the state, we cannot test the actual code change
    // expect(code).toHaveTextContent(
    //   'export default () => <IressText>Goodbye world</IressText>;',
    // );

    parameter = undefined;
  });

  it('updates the state when selecting a scope', async () => {
    parameter = {
      code: 'export default () => <AgGridReact />;',
      scopes: ['ag-grid'],
    };

    render(<SandboxEditor api={api} />);

    const panel = await screen.findByTestId('panel');
    const code = panel.querySelector('pre');
    expect(code).toHaveTextContent('export default () => <AgGridReact />;');

    // Get ag-grid checkbox (its hidden cause we are cheating by not opening the dialog, mainly cause JS dom does not really work with HTMLDialogElement)
    const agGridScopeCheckbox = screen.getByRole('checkbox', {
      name: 'ag-grid',
      hidden: true,
    });
    expect(agGridScopeCheckbox).toBeInTheDocument();

    // Select ag-grid scope
    await userEvent.click(agGridScopeCheckbox);

    // Change state was called properly
    expect(updateAddonState).toHaveBeenLastCalledWith({
      code: 'export default () => <AgGridReact />;',
      scopes: ['ag-grid'],
    });

    parameter = undefined;
  });

  it('changes the editor to dark mode', async () => {
    render(<SandboxEditor api={api} />);

    act(() => {
      api.getChannel()?.emit(DARK_MODE_EVENT_NAME, true);
    });

    const panel = await screen.findByTestId('panel');
    const code = panel.querySelector('pre')!;

    expect(code).toHaveStyle(
      `background-color: ${themes.nightOwl.plain.backgroundColor}`,
    );
  });

  it('does not render if not active', () => {
    render(<SandboxEditor active={false} api={api} />);
    const panel = screen.queryByTestId('panel');
    expect(panel).not.toBeInTheDocument();
  });
});
