import { render, screen, waitFor } from '@testing-library/react';
import { type API, useAddonState } from 'storybook/internal/manager-api';
import { OktaGuard } from './OktaGuard';
import { type AddonConfig } from '../types';
import { getOkta } from '../helpers/oktaRegister';
import { type OktaAuth } from '@okta/okta-auth-js';

// Mock the oktaRegister helper
vi.mock('../helpers/oktaRegister', () => ({
  getOkta: vi.fn(),
}));

// Mock the LoginSplash component
vi.mock('./LoginSplash', () => ({
  LoginSplash: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="login-splash">{children}</div>
  ),
}));

// Mock the useAddonState hook
const mockSetState = vi.fn();

vi.mock('storybook/internal/manager-api', () => ({
  useAddonState: vi.fn(() => [
    { isAuthenticated: false, error: undefined },
    mockSetState,
  ]),
}));

// Mock Storybook theming to avoid matchMedia issues
vi.mock('storybook/internal/theming', () => ({
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
      parseFromUrl: vi.fn(),
    },
    tokenManager: {
      setTokens: vi.fn(),
    },
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
    render(<OktaGuard api={mockApi} config={mockConfig} />);

    expect(screen.getByTestId('login-splash')).toBeInTheDocument();
    expect(screen.getByText('Logging in...')).toBeInTheDocument();
  });

  it('renders LoginSplash with error message when there is an error', async () => {
    // Import and override the mock for this specific test
    const { useAddonState } = await import('storybook/internal/manager-api');
    vi.mocked(useAddonState).mockReturnValue([
      { isAuthenticated: false, error: 'Authentication failed' },
      mockSetState,
    ]);

    render(<OktaGuard api={mockApi} config={mockConfig} />);

    expect(screen.getByTestId('login-splash')).toBeInTheDocument();
    expect(screen.getByText('Authentication failed')).toBeInTheDocument();
  });

  it('renders nothing when authenticated', async () => {
    // Import and override the mock for this specific test
    const { useAddonState } = await import('storybook/internal/manager-api');
    vi.mocked(useAddonState).mockReturnValue([
      { isAuthenticated: true, error: undefined },
      mockSetState,
    ]);

    const { container } = render(
      <OktaGuard api={mockApi} config={mockConfig} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('skips authentication for unprotected paths', async () => {
    vi.mocked(mockApi.getUrlState).mockReturnValue({
      path: '/docs/test--page',
      storyId: 'test--default',
      url: '/docs/test--page',
    });

    render(<OktaGuard api={mockApi} config={mockConfig} />);

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

    vi.mocked(mockApi.getUrlState).mockReturnValue({
      path: '/story/test--default',
      storyId: 'test--default',
      url: '/story/test--default',
    });

    render(<OktaGuard api={mockApi} config={configWithUnprotectedStoryId} />);

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
    });

    const mockGetItem = vi
      .fn()
      .mockReturnValue('http://localhost:6006/original-path');
    const mockRemoveItem = vi.fn();
    window.localStorage.getItem = mockGetItem;
    window.localStorage.removeItem = mockRemoveItem;

    // Mock window.location.href setter
    delete (window as unknown as { location: unknown }).location;
    window.location = { href: '' } as Location;

    vi.mocked(mockApi.getUrlState).mockReturnValue({
      path: '/callback',
      storyId: null,
      url: '/callback',
    });

    render(<OktaGuard api={mockApi} config={mockConfig} />);

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
      storyId: null,
      url: '/callback',
    });

    render(<OktaGuard api={mockApi} config={mockConfig} />);

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
    render(<OktaGuard api={mockApi} config={mockConfig} />);

    await waitFor(() => {
      expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
      expect(mockAuthClient.start).toHaveBeenCalled();
    });
  });

  it('handles unauthenticated state by redirecting to login', async () => {
    const mockSetItem = vi.fn();
    window.localStorage.setItem = mockSetItem;

    render(<OktaGuard api={mockApi} config={mockConfig} />);

    // Simulate the auth state callback being called with unauthenticated state
    const authStateCallback = vi.mocked(
      mockAuthClient.authStateManager.subscribe,
    ).mock.calls[0]?.[0];

    await waitFor(() => {
      authStateCallback({
        isAuthenticated: false,
        error: undefined,
      });
    });

    expect(mockSetItem).toHaveBeenCalledWith(
      'oktaOriginalUri',
      '/story/test--default',
    );
    expect(mockAuthClient.setOriginalUri).toHaveBeenCalledWith(
      '/story/test--default',
    );
    expect(mockAuthClient.signInWithRedirect).toHaveBeenCalled();
  });

  it('handles authenticated state', async () => {
    render(<OktaGuard api={mockApi} config={mockConfig} />);

    // Simulate the auth state callback being called with authenticated state
    const authStateCallback = vi.mocked(
      mockAuthClient.authStateManager.subscribe,
    ).mock.calls[0]?.[0];

    await waitFor(() => {
      authStateCallback({
        isAuthenticated: true,
        error: undefined,
      });
    });

    expect(mockSetState).toHaveBeenCalledWith({
      isAuthenticated: true,
      error: undefined,
    });
  });

  it('handles auth state with error', async () => {
    render(<OktaGuard api={mockApi} config={mockConfig} />);

    // Simulate the auth state callback being called with error
    const authStateCallback = vi.mocked(
      mockAuthClient.authStateManager.subscribe,
    ).mock.calls[0]?.[0];

    await waitFor(() => {
      authStateCallback({
        isAuthenticated: false,
        error: new Error('Auth error'),
      });
    });

    expect(mockSetState).toHaveBeenCalledWith({
      isAuthenticated: false,
      error: 'Error: Auth error',
    });
  });

  it('unsubscribes from auth state changes on unmount', async () => {
    // Use a protected path to ensure authentication flow is triggered
    vi.mocked(mockApi.getUrlState).mockReturnValue({
      path: '/story/protected--page',
      storyId: 'protected--page',
      url: '/story/protected--page',
    });

    // Ensure isLoginRedirect returns false so we go through the normal auth flow
    vi.mocked(mockAuthClient.token.isLoginRedirect).mockReturnValue(false);

    const { unmount } = render(<OktaGuard api={mockApi} config={mockConfig} />);

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
    const { rerender } = render(
      <OktaGuard api={mockApi} config={mockConfig} />,
    );

    // Change the URL state
    vi.mocked(mockApi.getUrlState).mockReturnValue({
      path: '/story/another--story',
      storyId: 'another--story',
      url: '/story/another--story',
    });

    // Trigger a navigation change by calling pushState
    const pushStateEvent = new Event('popstate');
    window.dispatchEvent(pushStateEvent);

    // Re-render to trigger the effect
    rerender(<OktaGuard api={mockApi} config={mockConfig} />);

    await waitFor(() => {
      expect(mockAuthClient.start).toHaveBeenCalled();
    });
  });
});
