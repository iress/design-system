import {
  DocsContainer,
  type DocsContainerProps,
  Unstyled,
} from '@storybook/addon-docs/blocks';
import { IressText } from '@iress-oss/ids-components';
import { addons } from 'storybook/preview-api';
import { DOCS_RENDERED } from 'storybook/internal/core-events';
import { MDXProvider } from '@mdx-js/react';
import { type ReactNode } from 'react';

export interface IressStorybookProps extends DocsContainerProps {
  /**
   * The children to render within the Storybook Docs Container
   */
  children: ReactNode;
}

// TODO: This is a temporary fix for Panda styles not applying to the Storybook preview, due to the custom Storybook CSS.
// To fix it, we attach the Storybook CSS to the reset layer, so it doesn't override the Panda styles.
// More information: https://github.com/storybookjs/storybook/issues/17533
let layerizeRunning = false;
const layerizeStorybook = (timeout = 500) => {
  if (layerizeRunning) return;
  layerizeRunning = true;

  setTimeout(() => {
    document.querySelectorAll('style').forEach((el) => {
      const elDataset = el.dataset;
      const isStorybookStyleElement =
        'emotion' in elDataset && 's' in elDataset && !el.textContent;

      if (isStorybookStyleElement && el?.sheet?.cssRules.length) {
        let newCSS = `@layer reset {\n`;

        for (const rule of el.sheet.cssRules) {
          if (rule.cssText.includes('font-')) {
            newCSS +=
              rule.cssText.replace(
                / \}/g,
                'font-size: inherit; font-family: inherit; }',
              ) + '\n';
          } else {
            newCSS += rule.cssText + '\n';
          }

          setTimeout(() => {
            const rules = el.sheet?.cssRules ?? [];
            const index = [...rules].indexOf(rule);
            if (index === -1) return;
            el.sheet?.deleteRule(index);
          }, 10);
        }
        newCSS += '}';

        const styleElement = document.createElement('style');
        styleElement.textContent = newCSS;
        document.head.appendChild(styleElement);
      }
    }, timeout);

    layerizeRunning = false;
  });
};

layerizeStorybook();

// Unfortunately relying on typical React lifecycle methods like useEffect is not enough to handle the Storybook DocsContainer re-rendering.
// We need to listen to the DOCS_RENDERED event to know when the DocsContainer has been re-rendered.
addons.getChannel().on(DOCS_RENDERED, () => {
  layerizeStorybook();
});

export const IressStorybook = ({ children, ...props }: IressStorybookProps) => {
  return (
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
          <DocsContainer context={props.context}>{children}</DocsContainer>
        </MDXProvider>
      </IressText>
    </Unstyled>
  );
};
