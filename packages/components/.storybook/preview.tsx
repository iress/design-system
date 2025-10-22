import type { Preview } from '@storybook/react-vite';
import {
  DocsContainer,
  type DocsContainerProps,
  Unstyled,
} from '@storybook/addon-docs/blocks';
import { MDXProvider } from '@mdx-js/react';
import { IressProvider, IressText } from '@/main';
import '../src/styled-system/styles.css';

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
      codePanel: true,
      container: (props: DocsContainerProps) => (
        <IressProvider>
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
                <DocsContainer {...props}></DocsContainer>
              </MDXProvider>
            </IressText>
          </Unstyled>
        </IressProvider>
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
