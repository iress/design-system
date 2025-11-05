import { LiveProvider, LivePreview, LiveError } from 'react-live';
import { addons } from 'storybook/preview-api';
import {
  type AddonState,
  type SandboxScope,
  type SandboxStyle,
} from '../types';
import { PREVIEW_TRANSFORMERS, SANDBOX_UPDATE_EVENT } from '../constants';
import { transformCode } from '../helpers';
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type JSX,
  type LazyExoticComponent,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

export interface SandboxPreviewProps {
  defaultState?: AddonState;
  ErrorWrapper?: FC<PropsWithChildren> | keyof JSX.IntrinsicElements;
  loading?: (state: AddonState, styles?: boolean) => ReactNode;
  scope?: {
    default: Promise<SandboxScope>;
    [namespace: string]: Promise<SandboxScope>;
  };
  styles?: Record<string, LazyExoticComponent<SandboxStyle>>;
}

const SandboxPreviewStyles = ({
  allowedNamespaces,
  styles,
}: Pick<SandboxPreviewProps, 'styles'> & { allowedNamespaces: string[] }) => {
  if (!styles) {
    return null;
  }

  const allowedStyles = Object.entries(styles).filter(([namespace]) =>
    allowedNamespaces.includes(namespace),
  );

  return allowedStyles.map(([key, StyleComponent]) => (
    <StyleComponent key={key} />
  ));
};

export const SandboxPreview = ({
  defaultState = { code: '' },
  ErrorWrapper = 'div',
  loading,
  scope,
  styles,
  // eslint-disable-next-line sonarjs/function-return-type -- It returns a ReactNode
}: SandboxPreviewProps) => {
  const [state, setState] = useState<AddonState>(defaultState);
  const [unwrappedScope, setUnwrappedScope] = useState<SandboxScope>();
  const isLoadingScopes = scope && !unwrappedScope;
  const allowedNamespaces = useMemo(
    () => ['default', ...(state.scopes ?? [])],
    [state.scopes],
  );

  // Updates the preview when the sandbox editor has been changed
  const handleSandboxUpdate = useCallback((state: AddonState) => {
    setState(state);
  }, []);

  // Listen for sandbox updates on mount and remove on unmount
  useEffect(() => {
    const lastEvents = addons
      .getChannel()
      ?.last(SANDBOX_UPDATE_EVENT) as AddonState[];
    const currentState = lastEvents?.[0];

    if (currentState) {
      setState(currentState);
    }

    addons.getChannel()?.on(SANDBOX_UPDATE_EVENT, handleSandboxUpdate);
    return () =>
      addons.getChannel()?.off(SANDBOX_UPDATE_EVENT, handleSandboxUpdate);
  }, [handleSandboxUpdate]);

  // Load the scopes files on-demand, based on the state.scopes
  useEffect(() => {
    const loadScopes = async () => {
      if (!scope) {
        return;
      }

      setUnwrappedScope(undefined);

      const wrappedScopes = Object.entries(scope)
        .filter(([namespace]) => allowedNamespaces.includes(namespace))
        .map(([, scope]) => scope);

      const unwrappedScopes = await Promise.all(wrappedScopes);

      setUnwrappedScope(
        unwrappedScopes.reduce(
          (acc, unwrappedScope) => ({
            ...acc,
            ...(unwrappedScope.default ?? {}),
          }),
          {},
        ),
      );
    };

    void loadScopes();
  }, [scope, state.scopes, allowedNamespaces]);

  if (isLoadingScopes) {
    return loading ? loading(state) : 'Loading...';
  }

  return (
    <Suspense fallback={loading ? loading(state, true) : 'Loading...'}>
      <SandboxPreviewStyles
        allowedNamespaces={allowedNamespaces}
        styles={styles}
      />
      <LiveProvider
        code={state.code}
        scope={unwrappedScope}
        noInline
        transformCode={(code) => transformCode(code, PREVIEW_TRANSFORMERS)}
      >
        <div className="sandbox-preview__error" role="alert">
          <LiveError />
        </div>
        <LivePreview className="sandbox-preview" />
      </LiveProvider>
    </Suspense>
  );
};

export default SandboxPreview;
