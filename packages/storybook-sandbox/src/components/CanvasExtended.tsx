import { Canvas, useOf, type SourceProps } from '@storybook/addon-docs/blocks';
import {
  type ComponentProps,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { addons } from 'storybook/internal/preview-api';
import { FORCE_REMOUNT } from 'storybook/internal/core-events';
import { COMMON_TRANSFORMERS } from '../constants';
import type { SandboxTransformerMap } from '../types';
import { getSandboxActionItems, transformCode } from 'src/helpers';
import { useSandboxDocParameters } from '../hooks/useSandboxDocParameters';
import type { StorybookParameters } from 'storybook/internal/types';

export interface CanvasExtendedProps extends ComponentProps<typeof Canvas> {
  /**
   * Additional transformers to apply to the code before rendering in the source code.
   */
  additionalTransformers?: SandboxTransformerMap;

  /**
   * Allow refreshing the canvas.
   * Useful for resetting if the story has side effects.
   */
  refresh?: boolean;
}

interface ParametersConfig {
  docs?: {
    source?: {
      code?: string;
      transform?: SourceProps['transform'];
    };
  };
}

/**
 * This is an extended version of the Storybook Canvas component that adds additional functionality
 * such as code transformers and a refresh action.
 */
export const CanvasExtended = ({
  additionalActions = [],
  additionalTransformers,
  of,
  refresh,
  source: sourceProp,
  withToolbar = true,
  ...restProps
}: CanvasExtendedProps) => {
  const docsConfig = of?.parameters?.docs as ParametersConfig['docs'];
  const [docParameters, setDocParameters] = useState<
    StorybookParameters | undefined
  >();
  const renderedCode = useRef<string | null>(
    sourceProp?.code ?? docsConfig?.source?.code ?? null,
  );
  const context = useOf<'story'>(of);

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

  const customActions: CanvasExtendedProps['additionalActions'] = [];

  if (refresh) {
    customActions.push({
      title: 'Refresh',
      onClick: () => {
        if (restProps?.story?.inline === false) {
          const iframes = [
            ...document.querySelectorAll(`[id="iframe--${context.story.id}"]`),
          ] as HTMLIFrameElement[];
          iframes?.forEach((iframe) => {
            iframe?.contentWindow?.location.reload();
          });
        } else {
          addons
            .getChannel()
            .emit(FORCE_REMOUNT, { storyId: context.story.id });
        }
      },
    });
  }

  return (
    <Canvas
      {...restProps}
      additionalActions={[
        ...additionalActions,
        ...customActions,
        ...getSandboxActionItems(renderedCode, docParameters),
      ]}
      of={of}
      source={{
        ...source,
        transform: handleTransform,
      }}
      withToolbar={withToolbar}
    />
  );
};
