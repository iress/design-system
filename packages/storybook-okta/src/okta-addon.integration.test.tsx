import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { type StoryContext } from 'storybook/internal/types';
import { type ReactRenderer } from '@storybook/react';
import { withOKTA } from './decorators/withOKTA';
import { type AddonConfig } from './types';
import { ADDON_ID } from './constants';
import { registerOkta, getOkta } from './helpers/oktaRegister';
import { type OktaAuth } from '@okta/okta-auth-js';

// Mock dependencies
vi.mock('storybook/manager-api', () => ({
  addons: {
    register: vi.fn(),
    add: vi.fn(),
    getConfig: vi.fn(),
  },
}));

vi.mock('./helpers/oktaRegister', () => ({
  registerOkta: vi.fn(),
  getOkta: vi.fn(),
}));

vi.mock('./components/LoginSplash', () => ({
  LoginSplash: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="login-splash">{children ?? 'Logging in...'}</div>
  ),
}));

describe('Okta Addon Integration', () => {
  const mockConfig: AddonConfig = {
    issuer: 'https://test.okta.com',
    clientId: 'test-client-id',
    redirectUri: 'http://localhost:6006',
    unprotected: ['/docs/public--page'],
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

  const mockStoryFn = vi.fn(() => (
    <div data-testid="story-content">Story Content</div>
  ));

  const createMockContext = (
    config?: AddonConfig,
  ): StoryContext<ReactRenderer> => ({
    id: 'test-story--default',
    title: 'Test Story',
    name: 'Default',
    parameters: config ? { [ADDON_ID]: config } : {},
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
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (registerOkta as ReturnType<typeof vi.fn>).mockReturnValue(mockAuthClient);

    // Mock window.location for iframe detection
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

  describe('End-to-end authentication flow', () => {
    it('should render story directly when no config is provided', () => {
      const context = createMockContext();
      const result = withOKTA(mockStoryFn, context);

      expect(mockStoryFn).toHaveBeenCalledWith(context);
      expect(result).toEqual(mockStoryFn(context));
    });

    it('should render story directly when addon is disabled', () => {
      const disabledConfig = { ...mockConfig, disable: true };
      const context = createMockContext(disabledConfig);
      const result = withOKTA(mockStoryFn, context);

      expect(mockStoryFn).toHaveBeenCalledWith(context);
      expect(result).toEqual(mockStoryFn(context));
    });

    it('should render story directly for unprotected routes', () => {
      const context = createMockContext(mockConfig);
      context.id = '/docs/public--page';

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      expect(screen.getByTestId('story-content')).toBeInTheDocument();
      expect(mockStoryFn).toHaveBeenCalledWith(context);
    });

    it('should show login splash initially for protected stories', () => {
      // Mock getOkta to return null so the OktaProvider is rendered
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const context = createMockContext(mockConfig);

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      expect(screen.getByTestId('login-splash')).toBeInTheDocument();
      expect(screen.getByText('Logging in...')).toBeInTheDocument();
    });

    it('should register Okta client and start authentication', async () => {
      // Mock getOkta to return null so registerOkta is called
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const context = createMockContext(mockConfig);

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      await waitFor(() => {
        expect(registerOkta).toHaveBeenCalledWith(mockConfig);
        expect(mockAuthClient.start).toHaveBeenCalled();
        expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
      });
    });

    it('should handle successful authentication and render story', async () => {
      // Mock getOkta to return null so registerOkta is called
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const context = createMockContext(mockConfig);

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      // Wait for subscription
      await waitFor(() => {
        expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
      });

      // Simulate successful authentication
      const authStateCallback = vi.mocked(
        mockAuthClient.authStateManager.subscribe,
      ).mock.calls[0]?.[0];

      await waitFor(() => {
        authStateCallback?.({
          isAuthenticated: true,
          error: undefined,
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId('story-content')).toBeInTheDocument();
      });
    });

    it('should handle authentication failure and redirect to login', async () => {
      const mockSetItem = vi.fn();
      window.localStorage.setItem = mockSetItem;

      // Mock getOkta to return null so registerOkta is called
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const context = createMockContext(mockConfig);

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      // Wait for subscription
      await waitFor(() => {
        expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
      });

      // Simulate authentication failure
      const authStateCallback = vi.mocked(
        mockAuthClient.authStateManager.subscribe,
      ).mock.calls[0]?.[0];

      await waitFor(() => {
        authStateCallback?.({
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

    it('should clean up URL parameters on mount', () => {
      const mockReplaceState = vi.fn();

      // Set window.parent to window itself for isPreview check
      Object.defineProperty(window, 'parent', {
        value: window,
        writable: true,
      });

      // Mock window.location with href for isPreview check and toString for URL cleanup
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:6006/iframe.html?id=test-story--default',
          toString: () =>
            'http://localhost:6006/?path=/story/test-story--default&code=undefined&state=test',
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

      // Mock getOkta to return null so the component renders
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const context = createMockContext(mockConfig);

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      expect(mockReplaceState).toHaveBeenCalledWith(
        {},
        '',
        'http://localhost:6006/?path=%2Fstory%2Ftest-story--default',
      );
    });

    it('should unsubscribe from auth state changes on unmount', async () => {
      // Mock getOkta to return null so registerOkta is called
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const context = createMockContext(mockConfig);

      const { unmount } = render(
        withOKTA(mockStoryFn, context) as React.ReactElement,
      );

      await waitFor(() => {
        expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
      });

      unmount();

      expect(mockAuthClient.authStateManager.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('Configuration handling', () => {
    it('should handle different Okta configurations', async () => {
      const customConfig: AddonConfig = {
        issuer: 'https://custom.okta.com',
        clientId: 'custom-client-id',
        redirectUri: 'http://localhost:3000',
        scopes: ['openid', 'profile', 'email'],
        pkce: true,
        unprotected: ['/docs/custom--page', 'custom-story--default'],
      };

      // Mock getOkta to return null so registerOkta is called
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const context = createMockContext(customConfig);

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      await waitFor(() => {
        expect(registerOkta).toHaveBeenCalledWith(customConfig);
      });
    });

    it('should handle empty unprotected array', () => {
      const configWithEmptyUnprotected = {
        ...mockConfig,
        unprotected: [],
      };

      // Mock getOkta to return null so the component renders
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const context = createMockContext(configWithEmptyUnprotected);

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      expect(screen.getByTestId('login-splash')).toBeInTheDocument();
    });

    it('should handle undefined unprotected array', () => {
      const configWithoutUnprotected = {
        issuer: mockConfig.issuer,
        clientId: mockConfig.clientId,
        redirectUri: mockConfig.redirectUri,
      };

      // Mock getOkta to return null so the component renders
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const context = createMockContext(configWithoutUnprotected);

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      expect(screen.getByTestId('login-splash')).toBeInTheDocument();
    });
  });

  describe('Error handling', () => {
    it('should handle authentication errors gracefully', async () => {
      // Mock getOkta to return null so registerOkta is called
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const context = createMockContext(mockConfig);

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      // Wait for subscription
      await waitFor(() => {
        expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
      });

      // Simulate authentication error
      const authStateCallback = vi.mocked(
        mockAuthClient.authStateManager.subscribe,
      ).mock.calls[0]?.[0];

      await waitFor(() => {
        authStateCallback?.({
          isAuthenticated: false,
          error: new Error('Authentication failed'),
        });
      });

      // Should still attempt to redirect to login
      expect(mockAuthClient.signInWithRedirect).toHaveBeenCalled();
    });

    it('should handle Okta client initialization errors', () => {
      (registerOkta as ReturnType<typeof vi.fn>).mockImplementation(() => {
        throw new Error('Failed to initialize Okta client');
      });
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const context = createMockContext(mockConfig);

      expect(() => {
        render(withOKTA(mockStoryFn, context) as React.ReactElement);
      }).toThrow('Failed to initialize Okta client');
    });
  });
});
