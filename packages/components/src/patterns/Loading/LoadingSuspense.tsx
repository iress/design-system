import { type ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { IressLoading } from './Loading';
import {
  uncacheSuspenseResource,
  useSuspenseResource,
} from './hooks/useSuspenseResource';
import { type StartUpLoadingProps } from './components/StartUpLoading';
import { type ValidateLoadingProps } from './components/ValidateLoading';
import { type PageLoadingProps } from './components/PageLoading';
import { type ComponentLoadingProps } from './components/ComponentLoading';
import { type LongLoadingProps } from './components/LongLoading';
import { type DefaultLoadingProps } from './components/DefaultLoading';

export type IressLoadingSuspenseProps = (
  | Omit<StartUpLoadingProps, 'loaded'>
  | ValidateLoadingProps
  | Omit<PageLoadingProps, 'loaded'>
  | Omit<ComponentLoadingProps, 'loaded'>
  | Omit<LongLoadingProps, 'loaded'>
  | DefaultLoadingProps
) & {
  /**
   * The content that will be rendered inside the Suspense boundary.
   * Typically includes lazy-loaded components and components that use the `use` or `IressLoadingSuspense.use` hook.
   */
  children?: ReactNode;

  /**
   * Duration (in milliseconds) to delay unmounting the fallback
   * to allow the fade-out animation to complete.
   * By default it uses the default delay of the pattern.
   */
  delay?: number;

  /**
   * Called once when the loading transition completes and children are shown.
   */
  onLoaded?: () => void;

  /**
   * Duration (in milliseconds) before showing the loading pattern,
   * meaning users will not see the loading indicator if content loads before this time.
   * Defaults to `0` for `component`, `default`, and `long` patterns, and `250` for all other patterns.
   */
  startFrom?: number;
};

const getDelay = (
  pattern: IressLoadingSuspenseProps['pattern'],
  delayProp?: number,
) => {
  if (delayProp != null) return delayProp;
  if (
    pattern === 'component' ||
    pattern === 'default' ||
    pattern === 'validate'
  )
    return 0;
  if (pattern === 'long') return 1300;
  return 500;
};

const getStartFrom = (
  pattern: IressLoadingSuspenseProps['pattern'],
  startFromProp?: number,
) => {
  if (startFromProp != null) return startFromProp;
  if (pattern === 'component' || pattern === 'default' || pattern === 'long')
    return 0;
  return 250;
};

/**
 * A pattern component that has in-built loading states for different contexts, designed to provide a consistent user experience across Iress applications.
 *
 * The `pattern` prop is used to determine the type of loading state to display. The following patterns are available:
 *
 * - `component`: Loading pattern for a component that is expected to take some time to load, but has content around it that can be loaded before it (hence not part of page pattern). It also supports updating the state of the component via a slightly different UI. Examples:
 *   - Charts that can be updated in real-time
 *   - Tables that load many records and may update in real-time
 * - `long`: Loading pattern for a component that is expected to take longer than 10 seconds to load. It displays a checklist of items that are being loaded. Examples:
 *   - Calling multiple slow APIs to load data
 *   - Loading results from AI
 *   - Processing a large amount of data as a queue (eg. bulk uploading or large media file uploads)
 * - `page`: Loading pattern for a page, with out-of-the-box skeleton templates. Examples:
 *   - Dashboard page with multiple filters/panels
 *   - Search page with multiple filters and search results
 *   - Detail page for a record
 *   - Form page
 *   - Article page
 * - `start-up`: Loading pattern when the application is first loaded. Examples:
 *   - Loading an application for the first time
 *   - Switching from a different application to a new application
 *   - Switching from a client's website to an Iress application
 *   - Switching themes
 * - `validate`: Loading pattern when validating user input. Examples:
 *   - Submitting a form
 *   - Saving a record
 *
 * If no `pattern` is provided, it will use the default experience, which only displays a message after a certain amount of time to help stop drop-offs due to uncommon loading times.
 */
export const IressLoadingSuspense = ({
  children,
  delay: delayProp,
  onLoaded,
  pattern,
  startFrom: startFromProp,
  ...restProps
}: IressLoadingSuspenseProps) => {
  const delay = getDelay(pattern, delayProp);
  const startFrom = getStartFrom(pattern, startFromProp);

  const resolved = useRef(false);
  const hasNotifiedLoaded = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const showFallback = IressLoading.shouldRender(loaded, delay, startFrom);
  const showChildren = loaded && !showFallback;

  useEffect(() => {
    if (showChildren && !hasNotifiedLoaded.current) {
      hasNotifiedLoaded.current = true;
      onLoaded?.();
    }
  }, [showChildren, onLoaded]);

  const onResolved = () => {
    if (resolved.current) return;
    resolved.current = true;
    setLoaded(true);
  };

  // Patterns that accept children work differently — the `IressLoading` component is always rendered.
  // Children appear inside `IressLoading` once resolved, while a hidden Suspense boundary
  // detects when the children stop suspending via `OnSuspenseResolved`.
  if (pattern === 'component' || pattern === 'validate') {
    return (
      <>
        <IressLoading
          pattern={pattern}
          loaded={loaded}
          {...(restProps as object)}
        >
          {showChildren && children}
        </IressLoading>
        {!showChildren && (
          <Suspense fallback={null}>
            <OnSuspenseResolved onResolved={onResolved}>
              <div hidden>{children}</div>
            </OnSuspenseResolved>
          </Suspense>
        )}
      </>
    );
  }

  // In most patterns, the `IressLoading` component is conditionally rendered when loading is active.
  // The `children` is directly rendered inside the `Suspense` component, which will handle the loading state.
  return (
    <>
      {showFallback && (
        <IressLoading
          pattern={pattern}
          loaded={loaded}
          {...(restProps as object)}
        />
      )}
      <Suspense fallback={null}>
        {showChildren ? (
          children
        ) : (
          <OnSuspenseResolved onResolved={onResolved}>
            <div hidden>{children}</div>
          </OnSuspenseResolved>
        )}
      </Suspense>
    </>
  );
};
IressLoadingSuspense.displayName = 'IressLoadingSuspense';

/**
 * A polyfill for the `use` hook in React 19. It allows you to suspend a component until the resource (Promise) is resolved.
 * **Note:** For those using React 19, import the `use` hook from React instead of using this polyfill.
 * @see https://react.dev/reference/react/use
 */
IressLoadingSuspense.use = useSuspenseResource;

/**
 * Uncache the resource (Promise) that is being used in the `use` hook.
 * **Note:** For those using React 19, import the `use` hook from React instead of using this method.
 * @see https://react.dev/reference/react/use
 */
IressLoadingSuspense.uncache = uncacheSuspenseResource;

/**
 * Signals when Suspense children have resolved by firing `onResolved` on mount.
 * When children suspend, this component is replaced by the Suspense fallback (null),
 * so the effect only fires once all children have successfully rendered.
 * Children are wrapped in a `hidden` div to prevent visual flicker.
 */
const OnSuspenseResolved = ({
  onResolved,
  children,
}: {
  onResolved: () => void;
  children?: ReactNode;
}) => {
  useEffect(() => {
    onResolved();
  }, [onResolved]);

  return children;
};
