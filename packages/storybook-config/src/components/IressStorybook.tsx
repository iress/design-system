import {
  DocsContainer,
  type DocsContainerProps,
  Unstyled,
} from '@storybook/addon-docs/blocks';
import { addons } from 'storybook/preview-api';
import { DOCS_RENDERED } from 'storybook/internal/core-events';
import { MDXProvider } from '@mdx-js/react';
import { lazy, Suspense, type ReactNode } from 'react';
import {
  COMPONENT_MAPPING_DEFAULT,
  type IressStorybookComponentMapping,
  IressStorybookContext,
} from './IressStorybookContext';
import { cssVars } from '@iress-oss/ids-tokens';

const IDSStyles = lazy(() => import('./IDSStyles'));

export interface IressStorybookProps extends DocsContainerProps {
  /**
   * The children to render within the Storybook Docs Container
   */
  children: ReactNode;

  /**
   * Custom component mapping for IDS components.
   * This is used by the components package to provide component implementations that are in development, allowing changes to be reflected in Storybook without needing to restart Storybook.
   */
  componentMapping?: IressStorybookComponentMapping;

  /**
   * If you don't want to load the IDS styles, set this to true.
   * This is used by the components package to avoid loading the styles twice.
   */
  noStyles?: boolean;
}

const IressStorybookStyles = () => (
  <style>{`
    .sbdocs.sbdocs-wrapper {
      /* This fixes issue where the docs pages background overrides the theme background */
      background-color: var(${cssVars.colour.neutral['10']});

      /* Styles the args table to use the text colour from the theme */
      .docblock-argstable-head th {
        color: var(${cssVars.colour.neutral['80']});
      }

      /* Styles the empty args table to use the muted text colour from the theme */
      .docblock-emptyblock {
        color: var(${cssVars.colour.neutral['70']});
      }

      /* Styles the table of contents */
      .toc-wrapper > .toc-list {
        padding-inline-start: 0;
        border-left-color: var(${cssVars.colour.neutral['30']});
      }

      .toc-list-item::before {
        display: none;
      }

      .toc-wrapper .toc-list .toc-list {
        margin-left: 0;
        margin-top: 4px;
        margin-bottom: 4px;
        border-left: none;
        padding-left: 1em;

        > .toc-list-item {
          margin-left: 0;
          padding-left: 0;
          margin-bottom: 0;
        }
      }

      .toc-list-item > a {
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      /** Style the heading anchors */
      .sbdocs-content {
        h1[id],
        h2[id],
        h3[id],
        h4[id],
        h5[id],
        h6[id] {
          position: relative;

          a[href^='#'] {
            margin-left: 0;
            padding: 0.25em;
            position: absolute;
            right: 100%;
            top: 0.35em;
          }

          svg {
            width: calc(${cssVars.typography.base.size} * 1.1);
            height: calc(${cssVars.typography.base.size} * 1.1);
          }
        }
      }
    }

    /* Add border to the code previews, so they look nice on any theme */
    .sbdocs.sbdocs-preview {
      border: 1px solid ${cssVars.colour.neutral['30']};
      background-color: transparent;
    }

    /* Hide the sidebar on certain pages */
    .sbdocs:has(.hide-sidebar) {
      .sbdocs-toc--custom {
        display: none !important;
      }
    }

    .sbdocs.sbdocs-content {
      /** Style buttons inside MDX files, so they don't look weird after prettier **/
      .button p {
        display: inline;
        margin: 0;
      }
    }

    .sbdocs-toc--custom {
      h2 {
        font-size: ${cssVars.typography.base.size};
      }
    }
  `}</style>
);

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

export const IressStorybook = ({
  children,
  componentMapping = COMPONENT_MAPPING_DEFAULT,
  noStyles,
  ...props
}: IressStorybookProps) => {
  const { IressProvider, IressText } = componentMapping;

  return (
    <IressStorybookContext value={componentMapping}>
      <IressStorybookStyles />
      {!noStyles && (
        <Suspense>
          <IDSStyles />
        </Suspense>
      )}
      <Unstyled>
        <IressProvider>
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
        </IressProvider>
      </Unstyled>
    </IressStorybookContext>
  );
};
