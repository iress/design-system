import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { type API, useAddonState } from 'storybook/manager-api';
import { OktaGuard } from './OktaGuard';
import type { AddonConfig } from '../types';
import { getOkta } from '../helpers/oktaRegister';
import { useAddonConfigForManager } from '../hooks/useAddonConfig';
import type { OktaAuth } from '@okta/okta-auth-js';

// Mock the oktaRegister helper
vi.mock('@okta/okta-auth-js', () => {
  // Create a constructor function
  function MockOktaAuth() {
    return {
      token: {
        isLoginRedirect: vi.fn(),
        parseFromUrl: vi.fn().mockResolvedValue({ tokens: {} }),
      },
      tokenManager: {
        setTokens: vi.fn(),
      },
      authStateManager: {
        subscribe: vi.fn(),
        unsubscribe: vi.fn(),
      },
      start: vi.fn().mockResolvedValue(undefined),
      setOriginalUri: vi.fn(),
      signInWithRedirect: vi.fn().mockResolvedValue(undefined),
    };
  }

  return {
    OktaAuth: MockOktaAuth,
    default: MockOktaAuth,
  };
});

vi.mock('../helpers/oktaRegister', () => ({
  getOkta: vi.fn(),
}));

// Mock the useAddonConfigForManager hook
vi.mock('../hooks/useAddonConfig', () => ({
  useAddonConfigForManager: vi.fn(),
}));

// Mock the LoginSplash component
vi.mock('./LoginSplash', () => ({
  LoginSplash: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="login-splash">{children}</div>
  ),
}));

// Mock the useAddonState hook
const mockSetState = vi.fn();
const mockChannel = {
  on: vi.fn(),
  off: vi.fn(),
  emit: vi.fn(),
};

vi.mock('storybook/manager-api', () => ({
  useAddonState: vi.fn(() => [
    { isAuthenticated: false, error: undefined },
    mockSetState,
  ]),
  addons: {
    getChannel: vi.fn(() => mockChannel),
  },
}));

// Mock the config hook
vi.mock('../../hooks/useAddonConfigForManager', () => ({
  useAddonConfigForManager: vi.fn(),
}));

// Mock Storybook theming to avoid matchMedia issues
vi.mock('storybook/theming', () => ({
  themes: {
    light: {},
    dark: {},
  },
  ensure: vi.fn(),
}));

describe('OktaGuard', () => {
  const mockApi = {
    getUrlState: vi.fn(),
    setQueryParams: vi.fn(),
    addNotification: vi.fn(),
  } as unknown as API;

  const mockConfig: AddonConfig = {
    issuer: 'https://test.okta.com',
    clientId: 'test-client-id',
    redirectUri: 'http://localhost:6006',
    unprotected: ['/docs/test--page'],
  };

  const mockAuthClient = {
    token: {
      isLoginRedirect: vi.fn(),
      parseFromUrl: vi.fn().mockResolvedValue({ tokens: {} }),
    },
    tokenManager: {
      setTokens: vi.fn(),
    },
    authStateManager: {
      subscribe: vi.fn(),
      unsubscribe: vi.fn(),
    },
    start: vi.fn().mockResolvedValue(undefined),
    setOriginalUri: vi.fn(),
    signInWithRedirect: vi.fn().mockResolvedValue(undefined),
  } as unknown as OktaAuth;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock useAddonConfigForManager to return the config
    vi.mocked(useAddonConfigForManager).mockReturnValue(mockConfig);

    vi.mocked(getOkta).mockReturnValue(mockAuthClient);

    // Set up the useAddonState mock to return our mockSetState
    vi.mocked(useAddonState).mockReturnValue([
      { isAuthenticated: false, error: undefined },
      mockSetState,
    ]);

    // Set up default mock return values
    vi.mocked(mockAuthClient.token.isLoginRedirect).mockReturnValue(false);

    vi.mocked(mockApi.getUrlState).mockReturnValue({
      path: '/story/test--default',
      storyId: 'test--default',
      url: '/story/test--default',
      queryParams: {},
      hash: '',
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

    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/story/test--default',
        search: '',
        href: 'http://localhost:6006/story/test--default',
      },
      writable: true,
    });

    // Mock history API
    Object.defineProperty(window, 'history', {
      value: {
        pushState: vi.fn(),
        replaceState: vi.fn(),
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

  it('renders LoginSplash when not authenticated', () => {
    render(<OktaGuard api={mockApi} />);

    expect(screen.getByTestId('login-splash')).toBeInTheDocument();
    expect(screen.getByText('Logging in...')).toBeInTheDocument();
  });

  it('renders LoginSplash with error message when there is an error', async () => {
    // Import and override the mock for this specific test
    const { useAddonState } = await import('storybook/manager-api');
    vi.mocked(useAddonState).mockReturnValue([
      { isAuthenticated: false, error: 'Authentication failed' },
      mockSetState,
    ]);

    render(<OktaGuard api={mockApi} />);

    expect(screen.getByTestId('login-splash')).toBeInTheDocument();
    expect(screen.getByText('Authentication failed')).toBeInTheDocument();
  });

  it('renders nothing when authenticated', async () => {
    // Import and override the mock for this specific test
    const { useAddonState } = await import('storybook/manager-api');
    vi.mocked(useAddonState).mockReturnValue([
      { isAuthenticated: true, error: undefined },
      mockSetState,
    ]);

    const { container } = render(<OktaGuard api={mockApi} />);

    expect(container.firstChild).toBeNull();
  });

  it('skips authentication for unprotected paths', async () => {
    vi.mocked(mockApi.getUrlState).mockReturnValue({
      path: '/docs/test--page',
      storyId: 'test--default',
      url: '/docs/test--page',
      queryParams: {},
      hash: '',
    });

    render(<OktaGuard api={mockApi} />);

    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalledWith({
        isAuthenticated: true,
        error: undefined,
      });
    });
  });

  it('skips authentication for unprotected story IDs', async () => {
    const configWithUnprotectedStoryId: AddonConfig = {
      ...mockConfig,
      unprotected: ['test--default'],
    };

    // Mock the config hook to return config with unprotected story IDs for this test
    vi.mocked(useAddonConfigForManager).mockReturnValue(
      configWithUnprotectedStoryId,
    );

    vi.mocked(mockApi.getUrlState).mockReturnValue({
      path: '/story/test--default',
      storyId: 'test--default',
      url: '/story/test--default',
      queryParams: {},
      hash: '',
    });

    render(<OktaGuard api={mockApi} />);

    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalledWith({
        isAuthenticated: true,
        error: undefined,
      });
    });
  });

  it('handles login redirect callback', async () => {
    vi.mocked(mockAuthClient.token.isLoginRedirect).mockReturnValue(true);
    vi.mocked(mockAuthClient.token.parseFromUrl).mockResolvedValue({
      tokens: { accessToken: 'test-token' },
      state: 'test-state',
    } as unknown as Awaited<
      ReturnType<typeof mockAuthClient.token.parseFromUrl>
    >);

    const mockGetItem = vi
      .fn()
      .mockReturnValue('http://localhost:6006/original-path');
    const mockRemoveItem = vi.fn();
    window.localStorage.getItem = mockGetItem;
    window.localStorage.removeItem = mockRemoveItem;

    // Mock window.location.href setter
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });

    vi.mocked(mockApi.getUrlState).mockReturnValue({
      path: '/callback',
      storyId: undefined,
      url: '/callback',
      queryParams: {},
      hash: '',
    });

    render(<OktaGuard api={mockApi} />);

    await waitFor(() => {
      expect(vi.mocked(mockAuthClient.token.parseFromUrl)).toHaveBeenCalled();
      expect(mockAuthClient.tokenManager.setTokens).toHaveBeenCalledWith({
        accessToken: 'test-token',
      });
      expect(mockApi.setQueryParams).toHaveBeenCalledWith({
        code: undefined,
        state: undefined,
        session_state: undefined,
        error: undefined,
        error_description: undefined,
      });
      expect(mockGetItem).toHaveBeenCalledWith('oktaOriginalUri');
      expect(mockRemoveItem).toHaveBeenCalledWith('oktaOriginalUri');
    });
  });

  it('handles login redirect callback error', async () => {
    vi.mocked(mockAuthClient.token.isLoginRedirect).mockReturnValue(true);
    vi.mocked(mockAuthClient.token.parseFromUrl).mockRejectedValue(
      new Error('Parse error'),
    );

    vi.mocked(mockApi.getUrlState).mockReturnValue({
      path: '/callback',
      storyId: undefined,
      url: '/callback',
      queryParams: {},
      hash: '',
    });

    render(<OktaGuard api={mockApi} />);

    await waitFor(() => {
      expect(vi.mocked(mockApi.addNotification)).toHaveBeenCalledWith({
        id: 'okta-login-error',
        content: {
          headline: 'Error: Parse error',
        },
      });
    });
  });

  it('subscribes to auth state changes and starts authentication', async () => {
    render(<OktaGuard api={mockApi} />);

    await waitFor(() => {
      expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
      expect(mockAuthClient.start).toHaveBeenCalled();
    });
  });

  it('handles unauthenticated state by redirecting to login', async () => {
    const mockSetItem = vi.fn();
    window.localStorage.setItem = mockSetItem;

    render(<OktaGuard api={mockApi} />);

    // Wait for the auth client to be initialized and auth state manager to be set up
    await waitFor(() => {
      expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
    });

    // Get the auth state callback after it's been registered
    const authStateCallback = vi.mocked(
      mockAuthClient.authStateManager.subscribe,
    ).mock.calls[0]?.[0];

    // Simulate the auth state callback being called with unauthenticated state
    authStateCallback?.({
      isAuthenticated: false,
      error: undefined,
    });

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalledWith(
        'oktaOriginalUri',
        '/story/test--default',
      );
    });
    expect(mockAuthClient.setOriginalUri).toHaveBeenCalledWith(
      '/story/test--default',
    );
    expect(mockAuthClient.signInWithRedirect).toHaveBeenCalled();
  });

  it('handles authenticated state', async () => {
    render(<OktaGuard api={mockApi} />);

    // Wait for the auth client to be initialized and auth state manager to be set up
    await waitFor(() => {
      expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
    });

    // Get the auth state callback after it's been registered
    const authStateCallback = vi.mocked(
      mockAuthClient.authStateManager.subscribe,
    ).mock.calls[0]?.[0];

    // Simulate the auth state callback being called with authenticated state
    authStateCallback?.({
      isAuthenticated: true,
      error: undefined,
    });

    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalledWith({
        isAuthenticated: true,
        error: undefined,
      });
    });
  });

  it('handles auth state with error', async () => {
    render(<OktaGuard api={mockApi} />);

    // Wait for the auth client to be initialized and auth state manager to be set up
    await waitFor(() => {
      expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
    });

    // Get the auth state callback after it's been registered
    const authStateCallback = vi.mocked(
      mockAuthClient.authStateManager.subscribe,
    ).mock.calls[0]?.[0];

    // Simulate the auth state callback being called with error
    authStateCallback?.({
      isAuthenticated: false,
      error: new Error('Auth error'),
    });

    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalledWith({
        isAuthenticated: false,
        error: 'Error: Auth error',
      });
    });
  });

  it('unsubscribes from auth state changes on unmount', async () => {
    // Use a protected path to ensure authentication flow is triggered
    vi.mocked(mockApi.getUrlState).mockReturnValue({
      path: '/story/protected--page',
      storyId: 'protected--page',
      url: '/story/protected--page',
      queryParams: {},
      hash: '',
    });

    // Ensure isLoginRedirect returns false so we go through the normal auth flow
    vi.mocked(mockAuthClient.token.isLoginRedirect).mockReturnValue(false);

    const { unmount } = render(<OktaGuard api={mockApi} />);

    // Wait for the component to set up the subscription
    await waitFor(() => {
      expect(
        vi.mocked(mockAuthClient.authStateManager.subscribe),
      ).toHaveBeenCalled();
    });

    unmount();

    expect(
      vi.mocked(mockAuthClient.authStateManager.unsubscribe),
    ).toHaveBeenCalled();
  });

  it('handles navigation changes', async () => {
    const { rerender } = render(<OktaGuard api={mockApi} />);

    // Change the URL state
    vi.mocked(mockApi.getUrlState).mockReturnValue({
      path: '/story/another--story',
      storyId: 'another--story',
      url: '/story/another--story',
      queryParams: {},
      hash: '',
    });

    // Trigger a navigation change by calling pushState
    const pushStateEvent = new Event('popstate');
    window.dispatchEvent(pushStateEvent);

    // Re-render to trigger the effect
    rerender(<OktaGuard api={mockApi} />);

    await waitFor(() => {
      expect(mockAuthClient.start).toHaveBeenCalled();
    });
  });
});
