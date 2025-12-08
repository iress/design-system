import React, { useState } from 'react';
import { useCallback, useRef, type ComponentProps } from 'react';
import type { Canvas, SourceProps } from '@storybook/addon-docs/blocks';
import { ADDON_ID } from '../constants';
import type {
  AddonConfig,
  ParametersConfig,
  SandboxTransformers,
} from '../types';
import { transformCodeWithParameters } from '../helpers/transformCode';
import type { IFiles } from 'codesandbox-import-utils/lib/api/define';
import OpenInCodeSandboxCustomTemplate from '../components/OpenInCodeSandboxCustom.template?raw';
import OpenInCodeSandboxHTML from '../components/OpenInCodeSandbox.html?raw';
import { getSandboxUrl } from '../helpers/getSandboxUrl';
import { SandboxIcon } from '../components/SandboxIcon';
import { useSandboxDocParameters } from './useSandboxDocParameters';

type CanvasProps = ComponentProps<typeof Canvas>;

export interface UseSandboxCanvasProps extends CanvasProps {
  /**
   * Additional transformers to apply to the code before rendering in the source code.
   * @example `{ replaceAliasWithPackageName: (code?: string) => code?.replace(/@\/main/gi, '@iress-oss/ids-components') }`
   */
  additionalTransformers?: SandboxTransformers;
}

/**
 * This allows you to enable a link to the sandbox using the code from a Storybook Canvas.
 * You can also add additional transformers to modify the code before it is sent to the sandbox.
 * This will return the props needed for the Canvas component.
 */
export const useSandboxCanvasProps = ({
  additionalActions = [],
  additionalTransformers,
  of,
  source: sourceProp,
  withToolbar = true,
  ...restProps
}: UseSandboxCanvasProps): CanvasProps => {
  const storyOf = of as { parameters?: ParametersConfig } | undefined;
  const [parameters, setParameters] = useState<ParametersConfig | undefined>(
    storyOf?.parameters,
  );
  const docsConfig = parameters?.docs;

  // These refs are used to persist values in the additional actions - on click handler
  const addonConfig = useRef<AddonConfig | null>(parameters?.[ADDON_ID]);
  const renderedCode = useRef<string | null>(
    sourceProp?.code ?? docsConfig?.source?.code ?? null,
  );

  useSandboxDocParameters((parameters) => {
    setParameters(parameters);
    addonConfig.current = parameters?.[ADDON_ID] as AddonConfig;
  });

  const getTsxFiles = useCallback(() => {
    // If no custom source code, use the main template
    if (!docsConfig?.source?.code) {
      return {
        'index.tsx': {
          content: renderedCode.current ?? '',
          isBinary: false,
        },
      } as IFiles;
    }

    // If custom source code exists, use the custom template
    return {
      'index.tsx': {
        content: OpenInCodeSandboxCustomTemplate,
        isBinary: false,
      },
      'component.tsx': {
        content: renderedCode.current ?? '',
        isBinary: false,
      },
    };
  }, [docsConfig]);

  // Transform handler
  const handleTransform = useCallback<
    Exclude<SourceProps['transform'], undefined>
  >(
    async (code, transformContext) => {
      const transformFn =
        sourceProp?.transform ?? docsConfig?.source?.transform;
      const transformed = transformCodeWithParameters(
        (await transformFn?.(code, transformContext)) ?? code,
        addonConfig.current ?? undefined,
        docsConfig,
        additionalTransformers,
      );

      renderedCode.current = transformed;
      return transformed;
    },
    [sourceProp?.transform, additionalTransformers, docsConfig, addonConfig],
  );

  return {
    ...restProps,
    additionalActions: [
      ...additionalActions,
      {
        title: (
          <>
            <SandboxIcon />
            Open in CodeSandbox
          </>
        ),
        onClick: () => {
          window.open(
            getSandboxUrl({
              files: {
                ...getTsxFiles(),
                'index.html': {
                  content: addonConfig.current?.html ?? OpenInCodeSandboxHTML,
                  isBinary: false,
                },
                'package.json': {
                  content: JSON.stringify(
                    {
                      dependencies: {
                        react: 'latest',
                        'react-dom': 'latest',
                        ...addonConfig.current?.dependencies,
                      },
                    },
                    null,
                    2,
                  ),
                  isBinary: false,
                },
                ...addonConfig.current?.files,
              },
            }),
            '_blank',
          );
        },
      },
    ],
    of,
    source: {
      ...sourceProp,
      transform: handleTransform,
    },
    withToolbar,
  };
};
