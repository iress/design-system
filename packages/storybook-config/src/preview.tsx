import type { Preview } from '@storybook/react-vite';
import {
  IressStorybook,
  type IressStorybookProps,
} from './components/IressStorybook';
import { IressProvider } from '@iress-oss/ids-components';

interface PreviewProps {
  /**
   * Additional props to pass to the IressStorybook docs container.
   * Used by the components package to declare the component mapping.
   */
  docsProps?: Pick<IressStorybookProps, 'componentMapping' | 'noStyles'>;

  /**
   * If true, the IressProvider will not be added around stories.
   * Usually only used for the component library so they can add their own provider that changes at development time.
   */
  noProvider?: boolean;
}

export const getPreview = ({ docsProps, noProvider = false }: PreviewProps) =>
  ({
    decorators: noProvider
      ? []
      : [
          (Story) => (
            <IressProvider>
              <Story />
            </IressProvider>
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
  }) satisfies Preview;
