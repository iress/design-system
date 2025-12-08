import type { Preview } from '@storybook/react-vite';
import {
  IressStorybook,
  type IressStorybookProps,
} from './components/IressStorybook';
import { IressProvider } from '@iress-oss/ids-components';
import { lazy, Suspense } from 'react';
import { type AddonConfig } from '@iress-oss/ids-storybook-sandbox';
import sandboxHtml from './sandbox.html?raw';
import sandboxTemplate from './sandbox.template.tsx?raw';

const IDSStyles = lazy(() => import('./components/IDSStyles'));

export interface PreviewProps {
  /**
   * Additional props to pass to the IressStorybook docs container.
   * Used by the components package to declare the component mapping so that we can view components in-development without needing to publish first.
   */
  docsProps?: Pick<IressStorybookProps, 'componentMapping' | 'noStyles'>;

  /**
   * Configuration for the Storybook Sandbox addon.
   */
  sandboxConfig?: AddonConfig;
}

/**
 * Function to get the Storybook preview configuration.
 * Used to centralise the configuration for all Storybook instances in multiple repositories.
 */
export const getPreview = ({
  docsProps,
  sandboxConfig,
}: PreviewProps): Preview => {
  const Provider = docsProps?.componentMapping?.IressProvider ?? IressProvider;

  return {
    decorators: [
      (Story) => (
        <Provider>
          <Suspense>
            {!docsProps?.noStyles && <IDSStyles />}
            <Story />
          </Suspense>
        </Provider>
      ),
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
        // TODO: Code panel is being used in place of our custom addon. However it is missing a few features related to these PRs:
        // - https://github.com/SchwarzIT/onyx/issues/2379
        // - https://github.com/storybookjs/storybook/pull/30179
        // We also have to come up for a way to open in Sandbox again, which might just be another button
        codePanel: true,
        container: (containerProps: IressStorybookProps) => (
          <IressStorybook {...containerProps} {...docsProps} />
        ),
        toc: {
          title: 'On this page',
          headingSelector: [
            '.sbdocs > h2',
            '.sbdocs > h3',
            'h2[id]:not(.ids-read-more *, .sb-story *)',
            'h3[id]:not(.ids-read-more *, .sb-story *)',
          ].join(', '),
          unsafeTocbotOptions: {
            listClass: `toc-list textStyle_typography.body.sm`,
          },
        },
      },
      IDS_Sandbox: {
        additionalTransformers: {
          replaceAliasWithPackageName: (code) =>
            code.replace(/@\/main/gi, '@iress-oss/ids-components'),
        },
        dependencies: {
          '@iress-oss/ids-components': 'latest',
        },
        html: sandboxHtml,
        storyPackageName: '@iress-oss/ids-components',
        template: sandboxTemplate,
        ...sandboxConfig,
      } satisfies AddonConfig,
    },
  };
};
