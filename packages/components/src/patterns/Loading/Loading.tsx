import {
  StartUpLoading,
  type StartUpLoadingProps,
} from './components/StartUpLoading';
import {
  DefaultLoading,
  type DefaultLoadingProps,
} from './components/DefaultLoading';
import {
  ValidateLoading,
  type ValidateLoadingProps,
} from './components/ValidateLoading';
import { useShouldRenderLoading } from './hooks/useShouldRenderLoading';
import {
  ComponentLoading,
  type ComponentLoadingProps,
} from './components/ComponentLoading';
import { PageLoading, type PageLoadingProps } from './components/PageLoading';
import { LongLoading, type LongLoadingProps } from './components/LongLoading';

export type IressLoadingProps =
  | StartUpLoadingProps
  | ValidateLoadingProps
  | PageLoadingProps
  | ComponentLoadingProps
  | LongLoadingProps
  | DefaultLoadingProps;

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
export const IressLoading = ({ pattern, ...restProps }: IressLoadingProps) => {
  if (pattern === 'component') {
    return <ComponentLoading {...(restProps as ComponentLoadingProps)} />;
  }

  if (pattern === 'long') {
    return <LongLoading {...(restProps as LongLoadingProps)} />;
  }

  if (pattern === 'page') {
    return <PageLoading {...(restProps as PageLoadingProps)} />;
  }

  if (pattern === 'start-up') {
    return <StartUpLoading {...(restProps as StartUpLoadingProps)} />;
  }

  if (pattern === 'validate') {
    return <ValidateLoading {...(restProps as ValidateLoadingProps)} />;
  }

  return <DefaultLoading {...(restProps as DefaultLoadingProps)} />;
};

/**
 * This hook is used to smooth the loading experience by delaying the loading indicator being removed after the loading of an element finishes.
 *
 * @param isLoaded - A boolean value that determines if the component waiting to be loaded has finished loading.
 * @param delay - Once a component has loaded, how long should the loading indicator be displayed for.
 * @returns A boolean value that determines whether the `IressLoading` component is safe to be removed.
 */
IressLoading.shouldRender = useShouldRenderLoading;
