import { render, screen, waitFor } from '@testing-library/react';
import { withOKTA } from './withOKTA';
import { type StoryContext } from 'storybook/internal/types';
import { type ReactRenderer } from '@storybook/react';
import { type AddonConfig } from '../types';
import { getOkta, registerOkta } from '../helpers/oktaRegister';
import { isProtectedFromContext } from '../helpers/isProtected';
import { type OktaAuth } from '@okta/okta-auth-js';

// Mock dependencies
vi.mock('../helpers/oktaRegister', () => ({
  getOkta: vi.fn(),
  registerOkta: vi.fn(),
}));

vi.mock('../helpers/isProtected', () => ({
  isProtectedFromContext: vi.fn(),
}));

vi.mock('../components/LoginSplash', () => ({
  LoginSplash: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="login-splash">{children ?? 'Logging in...'}</div>
  ),
}));

describe('withOKTA', () => {
  const mockStoryFn = vi.fn(() => (
    <div data-testid="story-content">Story Content</div>
  ));

  const mockConfig: AddonConfig = {
    issuer: 'https://test.okta.com',
    clientId: 'test-client-id',
    redirectUri: 'http://localhost:6006',
    unprotected: ['unprotected-story'],
  };

  const mockContext: StoryContext<ReactRenderer> = {
    id: 'test-story--default',
    title: 'Test Story',
    name: 'Default',
    parameters: {
      IDS_OKTA: mockConfig,
    },
    args: {},
    argTypes: {},
    globals: {},
    hooks: {} as StoryContext<ReactRenderer>['hooks'],
    viewMode: 'story',
    loaded: {},
    abortSignal: new AbortController().signal,
    step: vi.fn(),
    canvasElement: document.createElement('div'),
    mount: vi.fn(),
  };

  const mockAuthClient = {
    authStateManager: {
      subscribe: vi.fn(),
      unsubscribe: vi.fn(),
    },
    start: vi.fn(),
    setOriginalUri: vi.fn(),
    signInWithRedirect: vi.fn(),
  } as unknown as OktaAuth;

  beforeEach(() => {
    vi.clearAllMocks();
    (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(mockAuthClient);
    (registerOkta as ReturnType<typeof vi.fn>).mockReturnValue(mockAuthClient);
    (isProtectedFromContext as ReturnType<typeof vi.fn>).mockReturnValue(true);

    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost:6006/iframe.html?id=test-story--default',
        pathname: '/iframe.html',
        search: '?id=test-story--default',
      },
      writable: true,
    });

    // Mock window.parent to be the same as window for preview mode detection
    Object.defineProperty(window, 'parent', {
      value: window,
      writable: true,
    });

    // Mock window.location.toString to return a proper URL string
    Object.defineProperty(window.location, 'toString', {
      value: () => 'http://localhost:6006/?path=/story/test-story--default',
      writable: true,
    });

    // Mock window.history.replaceState for URL cleanup
    Object.defineProperty(window, 'history', {
      value: {
        replaceState: vi.fn(),
      },
      writable: true,
    });

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });

    // Mock matchMedia for Storybook theming
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns story directly when no config is provided', () => {
    const contextWithoutConfig = {
      ...mockContext,
      parameters: {},
    };

    const result = withOKTA(mockStoryFn, contextWithoutConfig);

    // Since the function returns the result of mockStoryFn, we should check that mockStoryFn was called
    expect(mockStoryFn).toHaveBeenCalledWith(contextWithoutConfig);
    // The result should be the JSX element returned by mockStoryFn
    expect(result).toEqual(mockStoryFn(contextWithoutConfig));
  });

  it('returns story directly when not protected', () => {
    (isProtectedFromContext as ReturnType<typeof vi.fn>).mockReturnValue(false);

    const result = withOKTA(mockStoryFn, mockContext);

    expect(mockStoryFn).toHaveBeenCalledWith(mockContext);
    expect(result).toEqual(mockStoryFn(mockContext));
  });

  it('returns story directly when not in preview mode', () => {
    // Mock window to simulate not being in iframe
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost:6006/?path=/story/test-story--default',
        pathname: '/',
        search: '?path=/story/test-story--default',
      },
      writable: true,
    });

    const result = withOKTA(mockStoryFn, mockContext);

    expect(mockStoryFn).toHaveBeenCalledWith(mockContext);
    expect(result).toEqual(mockStoryFn(mockContext));
  });

  it('returns story directly for unprotected story IDs', () => {
    const unprotectedContext = {
      ...mockContext,
      id: 'unprotected-story',
    };

    render(withOKTA(mockStoryFn, unprotectedContext) as React.ReactElement);

    expect(screen.getByTestId('story-content')).toBeInTheDocument();
    expect(mockStoryFn).toHaveBeenCalledWith(unprotectedContext);
  });

  it('wraps story with OktaProvider when in preview mode and protected', () => {
    // Mock the getOkta to return null so registerOkta is called
    vi.mocked(getOkta).mockReturnValue(null);

    render(withOKTA(mockStoryFn, mockContext) as React.ReactElement);

    // Initially should show login splash while authenticating
    expect(screen.getByTestId('login-splash')).toBeInTheDocument();
  });

  it('cleans up URL parameters on mount', () => {
    const mockReplaceState = vi.fn();

    // Set window.parent to window itself for isPreview check
    Object.defineProperty(window, 'parent', {
      value: window,
      writable: true,
    });

    // Mock window.location.href for isPreview check
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost:6006/iframe.html?id=test-story--default',
        toString: () =>
          'http://localhost:6006/?path=/story/test-story--default&code=undefined&state=test&session_state=test&error=test&error_description=test',
      },
      writable: true,
    });

    // Mock window.history.replaceState
    Object.defineProperty(window, 'history', {
      value: {
        replaceState: mockReplaceState,
      },
      writable: true,
    });

    // Mock the getOkta to return null so registerOkta is called and the component renders
    (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

    render(withOKTA(mockStoryFn, mockContext) as React.ReactElement);

    expect(mockReplaceState).toHaveBeenCalledWith(
      {},
      '',
      'http://localhost:6006/?path=%2Fstory%2Ftest-story--default',
    );
  });

  it('does not clean URL parameters when code is not undefined', () => {
    const mockReplaceState = vi.fn();
    Object.defineProperty(window, 'parent', {
      value: {
        location: {
          toString: () =>
            'http://localhost:6006/?path=/story/test-story--default&code=valid-code',
        },
        history: {
          replaceState: mockReplaceState,
        },
      },
      writable: true,
    });

    render(withOKTA(mockStoryFn, mockContext) as React.ReactElement);

    expect(mockReplaceState).not.toHaveBeenCalled();
  });

  it('starts authentication and subscribes to auth state changes', async () => {
    // Mock the getOkta to return null so registerOkta is called
    vi.mocked(getOkta).mockReturnValue(null);

    render(withOKTA(mockStoryFn, mockContext) as React.ReactElement);

    await waitFor(() => {
      expect(mockAuthClient.start).toHaveBeenCalled();
      expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
    });
  });

  it('handles authenticated state and renders story', async () => {
    // Mock the getOkta to return null so registerOkta is called
    vi.mocked(getOkta).mockReturnValue(null);

    render(withOKTA(mockStoryFn, mockContext) as React.ReactElement);

    // Wait for the component to mount and subscribe
    await waitFor(() => {
      expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
    });

    // Simulate authentication success
    const authStateCallback = vi.mocked(
      mockAuthClient.authStateManager.subscribe,
    ).mock.calls[0]?.[0];

    await waitFor(() => {
      authStateCallback({
        isAuthenticated: true,
        error: undefined,
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId('story-content')).toBeInTheDocument();
    });
  });

  it('handles unauthenticated state and redirects to login', async () => {
    const mockSetItem = vi.fn();
    window.localStorage.setItem = mockSetItem;

    // Mock the getOkta to return null so registerOkta is called
    (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

    render(withOKTA(mockStoryFn, mockContext) as React.ReactElement);

    // Wait for the component to mount and subscribe
    await waitFor(() => {
      expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
    });

    // Simulate authentication failure
    const authStateCallback = vi.mocked(
      mockAuthClient.authStateManager.subscribe,
    ).mock.calls[0]?.[0];

    await waitFor(() => {
      authStateCallback({
        isAuthenticated: false,
        error: undefined,
      });
    });

    expect(mockAuthClient.setOriginalUri).toHaveBeenCalled();
    expect(mockSetItem).toHaveBeenCalledWith(
      'oktaOriginalUri',
      expect.any(String),
    );
    expect(mockAuthClient.signInWithRedirect).toHaveBeenCalled();
  });

  it('unsubscribes from auth state changes on unmount', async () => {
    // Mock the getOkta to return null so registerOkta is called
    vi.mocked(getOkta).mockReturnValue(null);

    const { unmount } = render(
      withOKTA(mockStoryFn, mockContext) as React.ReactElement,
    );

    await waitFor(() => {
      expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
    });

    unmount();

    expect(mockAuthClient.authStateManager.unsubscribe).toHaveBeenCalled();
  });

  it('uses getOkta when auth client exists', () => {
    (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(mockAuthClient);
    (registerOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

    render(withOKTA(mockStoryFn, mockContext) as React.ReactElement);

    expect(getOkta).toHaveBeenCalledWith(mockConfig);
    expect(registerOkta).not.toHaveBeenCalled();
  });

  it('uses registerOkta when auth client does not exist', () => {
    (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);
    (registerOkta as ReturnType<typeof vi.fn>).mockReturnValue(mockAuthClient);

    render(withOKTA(mockStoryFn, mockContext) as React.ReactElement);

    expect(getOkta).toHaveBeenCalledWith(mockConfig);
    expect(registerOkta).toHaveBeenCalledWith(mockConfig);
  });
});
