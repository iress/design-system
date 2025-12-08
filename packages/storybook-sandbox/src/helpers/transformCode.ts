import type { AddonConfig, DocsConfig, SandboxTransformers } from '../types';
import { COMMON_TRANSFORMERS } from '../constants';
import { injectImportsIntoTemplate } from './injectImportsIntoTemplate';

export const transformCode = (
  code: string,
  transformers: SandboxTransformers,
): string =>
  Object.values(transformers)
    .reduce((newCode, transformer) => transformer(newCode), code)
    .trim();

export const transformCodeWithParameters = (
  code: string,
  addonConfig?: AddonConfig,
  docsConfig?: DocsConfig,
  additionalTransformers?: SandboxTransformers,
) => {
  const transformers = {
    ...COMMON_TRANSFORMERS,
    ...addonConfig?.additionalTransformers,
    ...additionalTransformers,
  };

  let transformed = transformCode(code, transformers);

  // Apply template if no custom source code
  if (!docsConfig?.source?.code && addonConfig?.template) {
    transformed = addonConfig.template.replace('<Story />', transformed);
  }

  // Inject imports if package name is specified
  if (addonConfig?.storyPackageName) {
    transformed = injectImportsIntoTemplate(
      transformed,
      addonConfig.storyPackageName,
    );
  }

  return transformed;
};
