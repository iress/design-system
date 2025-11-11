import { useCallback, useEffect, useRef } from 'react';
import { useAddonState, type API } from 'storybook/internal/manager-api';
import { getOkta } from '../helpers/oktaRegister';
import { type AuthStateEventHandler } from '@okta/okta-auth-js';
import { ADDON_ID } from '../constants';
import { LoginSplash } from './LoginSplash';
import { useAddonConfigForManager } from '../hooks/useAddonConfig';

interface OktaGuardProps {
  api: API;
}

interface OktaGuardState {
  isAuthenticated: boolean;
  error?: string;
}

export const OktaGuard = ({ api }: OktaGuardProps) => {
  const [state, setState] = useAddonState<OktaGuardState>(ADDON_ID, {
    isAuthenticated: false,
    error: undefined,
  });
  const lastPage = useRef<string | null>(null);
  const config = useAddonConfigForManager();
  const authClient = config ? getOkta(config) : undefined;

  const handle = useCallback(() => {
    if (!config || !authClient) {
      return;
    }

    const urlState = api.getUrlState();
    const path = urlState.path;
    const unprotected = config?.unprotected ?? [];

    if (lastPage.current === path) {
      return; // No navigation detected
    }

    lastPage.current = path;

    if (
      unprotected.includes(path) ||
      (urlState.storyId && unprotected.includes(urlState.storyId))
    ) {
      // If the path is unprotected, we can skip authentication
      setState({
        isAuthenticated: true,
        error: undefined,
      });
      return;
    }

    if (authClient?.token.isLoginRedirect() && path !== '/') {
      const handleLoginCallback = async () => {
        try {
          // Parse the tokens from the URL
          const { tokens } = await authClient.token.parseFromUrl();
          // Set the tokens in the token manager
          authClient.tokenManager.setTokens(tokens);

          api.setQueryParams({
            code: undefined,
            state: undefined,
            session_state: undefined,
            error: undefined,
            error_description: undefined,
          });

          const originalUri = localStorage.getItem('oktaOriginalUri');

          if (originalUri) {
            localStorage.removeItem('oktaOriginalUri');
            // Redirect to the original URI after successful login
            window.location.href = originalUri;
          }
        } catch (error) {
          api.addNotification({
            id: 'okta-login-error',
            content: {
              headline: String(error as Error),
            },
          });
        }
      };
      void handleLoginCallback();
      return;
    }

    const authenticate: AuthStateEventHandler = (authState) => {
      setState({
        isAuthenticated: !!authState.isAuthenticated,
        error: authState.error ? String(authState.error) : undefined,
      });

      if (!authState.isAuthenticated) {
        const originalUri =
          `${window.location.pathname}${window.location.search}` ||
          api.getUrlState().url;
        localStorage.setItem('oktaOriginalUri', originalUri);
        authClient?.setOriginalUri(originalUri);
        void authClient?.signInWithRedirect();
      }
    };

    authClient?.authStateManager.subscribe(authenticate);

    const startAuthentication = async () => {
      await authClient?.start();
    };

    void startAuthentication();

    return () => {
      authClient?.authStateManager.unsubscribe(authenticate);
    };
  }, [api, authClient, config, setState]);

  useEffect(() => {
    // Listen for browser back/forward navigation
    window.addEventListener('popstate', handle);

    // Override pushState and replaceState to catch programmatic navigation
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalPushState = window.history.pushState;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (state, title, url) {
      originalPushState.apply(this, [state, title, url]);
      handle();
    };

    window.history.replaceState = function (state, title, url) {
      originalReplaceState.apply(this, [state, title, url]);
      handle();
    };

    // Initial call and capture cleanup function
    const cleanup = handle();

    return () => {
      window.removeEventListener('popstate', handle);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      // Call the cleanup function if it exists
      if (cleanup) {
        cleanup();
      }
    };
  }, [handle]);

  if (config && !state.isAuthenticated) {
    return <LoginSplash>{state.error ?? 'Logging in...'}</LoginSplash>;
  }

  return null;
};
