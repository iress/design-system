import React from 'react';
import { useEffect, useState, type ReactNode } from 'react';
import type {
  PartialStoryFn as StoryFunction,
  StoryContext,
} from 'storybook/internal/types';
import { type ReactRenderer } from '@storybook/react';
import { isProtectedFromContext } from '../helpers/isProtected';
import { type AddonConfig } from '../types';
import { getOkta, registerOkta } from '../helpers/oktaRegister';
import { LoginSplash } from '../components/LoginSplash';
import { type AuthStateEventHandler } from '@okta/okta-auth-js';
import { getAddonConfigForPreview } from '../hooks/useAddonConfig';

interface OktaProviderProps {
  children: ReactNode;
  config: AddonConfig;
}

const OktaProvider = ({ children, config }: OktaProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authClient = getOkta(config) ?? registerOkta(config);

  useEffect(() => {
    // eslint-disable-next-line sonarjs/post-message
    window.parent.postMessage('CLEAR_OKTA_PARAMS', '*');
  }, []);

  useEffect(() => {
    const authenticate: AuthStateEventHandler = (authState) => {
      setIsAuthenticated(!!authState.isAuthenticated);
      const originalUri =
        `${window.location.pathname}${window.location.search}` || '/';

      if (!authState.isAuthenticated) {
        authClient.setOriginalUri(originalUri);
        localStorage.setItem('oktaOriginalUri', originalUri);
        void authClient.signInWithRedirect();
      }
    };

    const startAuthentication = async () => {
      await authClient.start();
    };

    void startAuthentication();

    authClient.authStateManager.subscribe(authenticate);

    return () => {
      authClient.authStateManager.unsubscribe(authenticate);
    };
  }, [authClient]);

  if (!isAuthenticated) {
    return <LoginSplash />;
  }

  return <>{children}</>;
};

export const withOKTA = (
  StoryFn: StoryFunction<ReactRenderer>,
  context: StoryContext<ReactRenderer>,
) => {
  const config = getAddonConfigForPreview();

  if (!config || !isProtectedFromContext(context)) {
    return StoryFn(context);
  }

  const isPreview =
    window?.location.href.includes('iframe.html') && window?.parent === window;

  if (!isPreview) {
    // If not in preview mode, return the story directly as its handled by the manager
    return StoryFn(context);
  }

  const unprotected = config.unprotected ?? [];

  if (unprotected.includes(context.id)) {
    // If the path is unprotected, we can skip authentication
    return StoryFn(context);
  }

  return <OktaProvider config={config}>{StoryFn(context)}</OktaProvider>;
};
