import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from 'react';
import type { SandboxTransformerMap } from '../types';
import { type Canvas, type SourceProps } from '@storybook/addon-docs/blocks';
import type { StorybookParameters } from 'storybook/internal/types';
import { COMMON_TRANSFORMERS } from '../constants';
import { getSandboxActionItems, transformCode } from '../helpers';
import { useSandboxDocParameters } from './useSandboxDocParameters';

export interface UseSandboxCanvasProps extends CanvasProps {
  /**
   * Additional transformers to apply to the code before rendering in the source code.
   * @example `{ replaceAliasWithPackageName: (code?: string) => code?.replace(/@\/main/gi, '@iress-oss/ids-components') }`
   */
  additionalTransformers?: SandboxTransformerMap;
}

interface ParametersConfig {
  docs?: {
    source?: {
      code?: string;
      transform?: SourceProps['transform'];
    };
  };
}

type CanvasProps = ComponentProps<typeof Canvas>;

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
  const storyOf = of as
    | { parameters?: Record<string, ParametersConfig['docs']> }
    | undefined;
  const docsConfig = storyOf?.parameters?.docs;
  const [docParameters, setDocParameters] = useState<
    StorybookParameters | undefined
  >();
  const renderedCode = useRef<string | null>(
    sourceProp?.code ?? docsConfig?.source?.code ?? null,
  );

  const transformers = useMemo(() => {
    if (additionalTransformers) {
      return {
        ...COMMON_TRANSFORMERS,
        ...additionalTransformers,
      };
    }

    return {};
  }, [additionalTransformers]);

  const source = docsConfig?.source?.code
    ? {
        ...sourceProp,
        code: additionalTransformers
          ? transformCode(docsConfig.source.code, transformers)
          : docsConfig.source.code,
      }
    : sourceProp;

  useSandboxDocParameters((parameters) => {
    setDocParameters(parameters);
  });

  const handleTransform = useCallback<
    Exclude<SourceProps['transform'], undefined>
  >(
    async (code, context) => {
      // Check if there is a transform function in the source prop or in the docs config
      const transformFn =
        source?.transform ??
        (context?.parameters as ParametersConfig)?.docs?.source?.transform;

      const transformed = transformCode(
        (await transformFn?.(code, context)) ?? code,
        transformers,
      );

      renderedCode.current = transformed;

      return transformed;
    },
    [source?.transform, transformers],
  );

  const customActions: UseSandboxCanvasProps['additionalActions'] = [];

  return {
    ...restProps,
    additionalActions: [
      ...additionalActions,
      ...customActions,
      ...getSandboxActionItems(renderedCode, docParameters),
    ],
    of,
    source: {
      ...source,
      transform: handleTransform,
    },
    withToolbar,
  };
};
