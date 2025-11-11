// TODO: Update to use prettier, or change these stories to no longer rely on this helper by:
// 1. Updating stories to use mocks instead of the generated JSX source
// 2. Disabling the entire controls panel for the story (does not seem to be an option in Storybook yet)
import { type SourceProps } from '@storybook/addon-docs/blocks';
import { type Args, type Parameters } from '@storybook/react';
import { stringifyStorybookArgs } from './stringifyStorybookArgs';
import { mergeStorybookConfig } from './mergeStorybookConfig';
import { withJsxTransformer } from './withJsxTransformer';
import { keys, omit } from 'radash';

/**
 * Create a transformed source, when the generated story source is not sufficient.
 *
 * @param transform Transformer for the code, takes the generated snippet as the first argument and the story context as the second argument
 * @param language Language of the code to ensure it is highlighted correctly when shown to the user
 * @returns {Parameters} the parameters with the transformed source added, usually passed to the story
 */
export const withTransformedSource = (
  transform: Exclude<SourceProps['transform'], undefined>,
  language = 'tsx',
): Parameters => ({
  docs: {
    source: {
      language,
      transform,
    },
  },
});

/**
 * Create a transformed source that changes a customisable Storybook source (usually from one of our mocks) to a working Sandbox source (copy and paste code).
 *
 * @param rawSource The raw source code to transform, usually imported as a raw string from a file: import { code } from './file.tsx?raw';
 * @param propsInterface The props interface to search and remove from the code, usually the name of the component props interface (eg. IressAutocompleteProps)
 * @returns {Parameters} the parameters with the transformed source added, usually passed to the story
 */
export const withTransformedRawSource = (
  rawSource: string,
  propsInterface: string,
  omitArgs: string[] = [],
): Parameters => {
  return withTransformedSource((_code, context) => {
    const transformed = rawSource.replace(
      new RegExp(`args: ${propsInterface}`, 'g'),
      '',
    );
    const filteredArgs = omit(context.args as Args, omitArgs);

    if (keys(filteredArgs).length) {
      return transformed.replace(
        /{...args}/g,
        `{...${stringifyStorybookArgs(filteredArgs)}}`,
      );
    }

    return transformed.replace(/{...args}/g, '');
  });
};

/**
 * Create a transformed source that changes a provider and hook to a working Sandbox source (copy and paste code).
 * @param providerCode The provider code to show the user where to wrap the component with the provider (eg. <IressModalProvider><Story /></IressModalProvider>). <Story /> will point to the component wrapping the hook and code.
 * @param hookCode The hook code to show the user where to use the hook (eg. const { show } = useModal();). <Story /> will be replaced with the actual story code.
 * @returns {Parameters} the parameters with the transformed source added, usually passed to the story
 */
export const withTransformedProviderSource = (
  providerCode: string,
  hookCode: string,
): Parameters => {
  return mergeStorybookConfig(
    withTransformedSource(
      (code) => `const Story = () => {
  ${hookCode.replace('<Story />', code)}
};
  
export const App = () => (
  ${providerCode}
);`,
    ),
    withJsxTransformer({
      showFunctions: true,
      useFragmentShortSyntax: true,
    }),
  );
};
