import type { Preview } from '@storybook/react-vite';
import {
  IressStorybook,
  type IressStorybookProps,
} from './components/IressStorybook';
import {
  BREAKPOINT_DETAILS,
  type Breakpoints,
  BREAKPOINTS,
  IressProvider,
} from '@iress-oss/ids-components';
import { lazy, Suspense, useEffect } from 'react';
import { type AddonConfig } from '@iress-oss/ids-storybook-sandbox';
import sandboxHtml from './sandbox.html?raw';
import sandboxTemplate from './sandbox.template.tsx?raw';
import { AutoDocs } from './components/AutoDocs';
import { type RequestSizeEvent, type ParametersConfig } from './types';
import {
  applySourceReplacements,
  type SourceReplacement,
} from './helpers/sourceReplacements';

const IDSStyles = lazy(() => import('./components/IDSStyles'));

const RelaySize = () => {
  const sendSize = () => {
    // eslint-disable-next-line sonarjs/post-message
    window.parent.postMessage(
      {
        type: 'RELAY_SIZE',
        height: document.querySelector('.sb-show-main')?.scrollHeight,
      },
      '*',
    );
  };

  useEffect(() => {
    const relaySize = (event: MessageEvent<RequestSizeEvent>) => {
      if (event.data?.type === 'REQUEST_SIZE') {
        console.log('[Storybook Preview] Received size request from parent');
        sendSize();
      }
    };

    window.addEventListener('message', relaySize);

    setTimeout(() => {
      console.log('[Storybook Preview] Sending initial size');
      sendSize(); // Send initial size on load
    }, 500); // Delay to allow initial render and any async content to load

    return () => {
      window.removeEventListener('message', relaySize);
    };
  }, []);

  return null;
};

export interface PreviewProps {
  /**
   * Default template to use for autodocs generation. 'default' uses the standard Storybook template, while 'component' uses a custom template designed for component documentation with enhanced prop tables and sections for guidelines and testing information.
   * Can be overridden on a per-story basis using the `idsConfig` parameter.
   * Used by the components package to provide a richer documentation experience.
   */
  autodocsTemplate?: 'default' | 'component';

  /**
   * URL or URL resolver for guidelines documentation links in autodocs pages.
   * - `string`: used as-is for all components
   * - `(title: string) => string | undefined`: called with the story title (e.g. "Components/Button")
   */
  guidelinesUrl?: string | ((title: string) => string | undefined);

  /**
   * Additional props to pass to the IressStorybook docs container.
   * Used by the components package to declare the component mapping so that we can view components in-development without needing to publish first.
   */
  docsProps?: Pick<IressStorybookProps, 'componentMapping' | 'noStyles'>;

  /**
   * Configuration for the Storybook Sandbox addon.
   */
  sandboxConfig?: AddonConfig;

  /**
   * A map of component directory names to the version they were last updated in.
   * Generated at build time by `scripts/generate-component-versions.ts`.
   * When provided, the version is displayed on each component's docs page.
   */
  componentVersions?: Record<string, string>;

  /**
   * Replacements applied to auto-generated source code in the docs panel.
   * Useful for fixing non-serializable values (e.g. `document.body` renders as `{}`).
   * Defaults include common patterns like `container: {}` → `container: document.body`.
   */
  sourceReplacements?: SourceReplacement[];
}

/**
 * Function to get the Storybook preview configuration.
 * Used to centralise the configuration for all Storybook instances in multiple repositories.
 */
export const getPreview = ({
  autodocsTemplate = 'default',
  docsProps,
  guidelinesUrl,
  sandboxConfig,
  componentVersions,
  sourceReplacements,
}: PreviewProps): Preview => {
  const Provider = docsProps?.componentMapping?.IressProvider ?? IressProvider;

  return {
    tags: ['autodocs'],
    decorators: [
      (Story, context) => {
        const disableProvider = !!context.parameters?.disableProvider;

        if (disableProvider) {
          return (
            <Suspense>
              {!docsProps?.noStyles && <IDSStyles />}
              <Story />
              <RelaySize />
            </Suspense>
          );
        }

        return (
          <Provider noSubsetting>
            <Suspense>
              {!docsProps?.noStyles && <IDSStyles />}
              <Story />
              <RelaySize />
            </Suspense>
          </Provider>
        );
      },
    ],
    parameters: {
      controls: {
        expanded: true,
        matchers: {
          color: /(background|color|colour)$/i,
          date: /Date$/,
        },
        sort: 'alpha',
      },
      docs: {
        codePanel: true,
        componentVersions,
        container: (containerProps: IressStorybookProps) => (
          <IressStorybook {...containerProps} {...docsProps} />
        ),
        page: AutoDocs,
        source: {
          transform: (code: string) =>
            applySourceReplacements(code, sourceReplacements),
        },
        toc: false,
      },
      idsConfig: {
        autodocsTemplate,
        guidelinesUrl,
      } satisfies ParametersConfig['idsConfig'],
      IDS_Sandbox: {
        additionalTransformers: {
          replaceAliasWithPackageName: (code) =>
            code.replace(/@\/main/gi, '@iress-oss/ids-components'),
        },
        dependencies: {
          '@iress-oss/ids-components': 'latest',
          react: '^19.0.0',
          'react-dom': '^19.0.0',
        },
        html: sandboxHtml,
        storyPackageName: '@iress-oss/ids-components',
        template: sandboxTemplate,
        ...sandboxConfig,
      } satisfies AddonConfig,
      viewport: {
        options: BREAKPOINTS.reduce(
          (accumulator, breakpoint) => {
            const details = BREAKPOINT_DETAILS[breakpoint];

            accumulator[breakpoint] = {
              name: `${breakpoint} (${details.screenWidthRange})`,
              styles: {
                width: `${details.viewportWidth}px`,
                height: '100vh',
              },
            };

            return accumulator;
          },
          {} as Record<
            Breakpoints,
            { name: string; styles: { width: string; height: string } }
          >,
        ),
      },
    },
  };
};
