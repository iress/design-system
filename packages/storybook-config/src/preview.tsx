import type { Preview } from '@storybook/react-vite';
import {
  IressStorybook,
  type IressStorybookProps,
} from './components/IressStorybook';
import { IressProvider } from '@iress-oss/ids-components';

export interface PreviewProps {
  /**
   * Additional props to pass to the IressStorybook docs container.
   * Used by the components package to declare the component mapping so that we can view components in-development without needing to publish first.
   */
  docsProps?: Pick<IressStorybookProps, 'componentMapping' | 'noStyles'>;
}

/**
 * Function to get the Storybook preview configuration.
 * Used to centralise the configuration for all Storybook instances in multiple repositories.
 */
export const getPreview = ({ docsProps }: PreviewProps): Preview => {
  const Provider = docsProps?.componentMapping?.IressProvider ?? IressProvider;

  return {
    decorators: [
      (Story) => (
        <Provider>
          <Story />
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
    },
  };
};
