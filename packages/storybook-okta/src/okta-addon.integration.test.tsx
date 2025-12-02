import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { type StoryContext } from 'storybook/internal/types';
import { type ReactRenderer } from '@storybook/react';
import { withOKTA } from './decorators/withOKTA';
import { type AddonConfig } from './types';
import { ADDON_ID } from './constants';
import { registerOkta, getOkta } from './helpers/oktaRegister';
import { getAddonConfigForPreview } from './hooks/useAddonConfig';
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

vi.mock('./hooks/useAddonConfig', () => ({
  getAddonConfigForPreview: vi.fn(),
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
    originalStoryFn: vi.fn(),
    context: {} as StoryContext<ReactRenderer>['context'],
    canvas: {} as StoryContext<ReactRenderer>['canvas'],
    reporting: {} as StoryContext<ReactRenderer>['reporting'],
    moduleExport: {} as never,
    attachedCSFFile: {} as never,
    undecoratedStoryFn: vi.fn(),
    componentId: 'test-story',
    storyExport: {} as never,
    initialArgs: {},
    kind: 'Test Story',
    story: 'Default',
    tags: [],
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (registerOkta as ReturnType<typeof vi.fn>).mockReturnValue(mockAuthClient);
    (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(undefined);
    (getAddonConfigForPreview as ReturnType<typeof vi.fn>).mockReturnValue(
      mockConfig,
    );

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
      (getAddonConfigForPreview as ReturnType<typeof vi.fn>).mockReturnValue(
        undefined,
      );

      const context = createMockContext();
      const result = withOKTA(mockStoryFn, context);

      expect(mockStoryFn).toHaveBeenCalledWith(context);
      expect(result).toEqual(
        <div data-testid="story-content">Story Content</div>,
      );
    });

    it('should render story directly when addon is disabled', () => {
      const disabledConfig = { ...mockConfig, disable: true };
      (getAddonConfigForPreview as ReturnType<typeof vi.fn>).mockReturnValue(
        disabledConfig,
      );

      const context = createMockContext();
      const result = withOKTA(mockStoryFn, context);

      expect(mockStoryFn).toHaveBeenCalledWith(context);
      expect(result).toEqual(
        <div data-testid="story-content">Story Content</div>,
      );
    });

    it('should render story directly for unprotected routes', () => {
      const configWithUnprotected = {
        ...mockConfig,
        unprotected: ['/docs/public--page'],
      };
      (getAddonConfigForPreview as ReturnType<typeof vi.fn>).mockReturnValue(
        configWithUnprotected,
      );

      const context = createMockContext();
      context.id = '/docs/public--page';

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      expect(screen.getByTestId('story-content')).toBeInTheDocument();
      expect(mockStoryFn).toHaveBeenCalledWith(context);
    });

    it('should show login splash initially for protected stories', () => {
      // Mock getOkta to return undefined so the OktaProvider is rendered
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(undefined);

      const context = createMockContext();

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      expect(screen.getByTestId('login-splash')).toBeInTheDocument();
      expect(screen.getByText('Logging in...')).toBeInTheDocument();
    });

    it('should register Okta client and start authentication', async () => {
      // Mock getOkta to return undefined so registerOkta is called
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(undefined);

      const context = createMockContext();

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      await waitFor(() => {
        expect(registerOkta).toHaveBeenCalledWith(mockConfig);
        expect(mockAuthClient.start).toHaveBeenCalled();
        expect(mockAuthClient.authStateManager.subscribe).toHaveBeenCalled();
      });
    });

    it('should handle successful authentication and render story', async () => {
      // Mock getOkta to return undefined so registerOkta is called
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(undefined);

      const context = createMockContext();

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

      // Mock getOkta to return undefined so registerOkta is called
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(undefined);

      const context = createMockContext();

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
      const mockPostMessage = vi.fn();

      // Set window.parent to window itself for isPreview check
      Object.defineProperty(window, 'parent', {
        value: window,
        writable: true,
      });

      // Override postMessage on window.parent
      Object.defineProperty(window.parent, 'postMessage', {
        value: mockPostMessage,
        writable: true,
      });

      // Mock window.location.href for isPreview check
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:6006/iframe.html?id=test-story--default',
          toString: () =>
            'http://localhost:6006/?path=/story/test-story--default&code=undefined&state=test',
        },
        writable: true,
      });

      // Mock getOkta to return undefined so the component renders
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(undefined);

      const context = createMockContext();

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      expect(mockPostMessage).toHaveBeenCalledWith('CLEAR_OKTA_PARAMS', '*');
    });

    it('should unsubscribe from auth state changes on unmount', async () => {
      // Mock getOkta to return undefined so registerOkta is called
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(undefined);

      const context = createMockContext();

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

      // Mock environment config with custom config
      (getAddonConfigForPreview as ReturnType<typeof vi.fn>).mockReturnValue(
        customConfig,
      );
      // Mock getOkta to return undefined so registerOkta is called
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(undefined);

      const context = createMockContext();

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

      // Mock environment config with empty unprotected array
      (getAddonConfigForPreview as ReturnType<typeof vi.fn>).mockReturnValue(
        configWithEmptyUnprotected,
      );
      // Mock getOkta to return undefined so the component renders
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(undefined);

      const context = createMockContext();

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      expect(screen.getByTestId('login-splash')).toBeInTheDocument();
    });

    it('should handle undefined unprotected array', () => {
      const configWithoutUnprotected = {
        issuer: mockConfig.issuer,
        clientId: mockConfig.clientId,
        redirectUri: mockConfig.redirectUri,
      };

      // Mock environment config without unprotected array
      (getAddonConfigForPreview as ReturnType<typeof vi.fn>).mockReturnValue(
        configWithoutUnprotected,
      );
      // Mock getOkta to return undefined so the component renders
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(undefined);

      const context = createMockContext();

      render(withOKTA(mockStoryFn, context) as React.ReactElement);

      expect(screen.getByTestId('login-splash')).toBeInTheDocument();
    });
  });

  describe('Error handling', () => {
    it('should handle authentication errors gracefully', async () => {
      // Mock getOkta to return undefined so registerOkta is called
      (getOkta as ReturnType<typeof vi.fn>).mockReturnValue(undefined);

      const context = createMockContext();

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
  });
});
