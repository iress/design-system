import type { Preview } from '@storybook/react-vite';
import { IressProvider, IressText } from '@iress-oss/ids-components';
import '@iress-oss/ids-components/dist/style.css';
import {
  DocsContainer,
  type DocsContainerProps,
  Unstyled,
} from '@storybook/addon-docs/blocks';
import { MDXProvider } from '@mdx-js/react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <IressProvider>
        <Story />
      </IressProvider>
    ),
  ],
  parameters: {
    docs: {
      container: (props: DocsContainerProps) => (
        <Unstyled>
          <IressText>
            <MDXProvider
              components={{
                h1: 'h1',
                h2: 'h2',
                h3: 'h3',
                h4: 'h4',
                h5: 'h5',
                h6: 'h6',
                a: 'a',
              }}
            >
              <DocsContainer {...props} />
            </MDXProvider>
          </IressText>
        </Unstyled>
      ),
      toc: {
        title: 'On this page',
        headingSelector: ['.sbdocs > h2', '.sbdocs > h3'].join(', '),
        unsafeTocbotOptions: {
          listClass: `toc-list textStyle_typography.body.sm`,
        },
      },
    },
  },
};

export default preview;
