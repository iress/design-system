import { Canvas, useOf } from '@storybook/addon-docs/blocks';
import {
  type UseSandboxCanvasProps,
  useSandboxCanvasProps,
} from '@iress-oss/ids-storybook-sandbox';
import { addons } from 'storybook/internal/preview-api';
import { FORCE_REMOUNT } from 'storybook/internal/core-events';

export interface ComponentCanvasProps
  extends Omit<UseSandboxCanvasProps, 'additionalTransformers'> {
  /**
   * Allow refreshing the canvas.
   * Useful for resetting if the story has side effects.
   */
  refresh?: boolean;
}

/**
 * This is an extended version of the Storybook Canvas component that adds additional functionality
 * such as code transformers and a refresh action.
 */
export const ComponentCanvas = ({
  refresh,
  ...restProps
}: ComponentCanvasProps) => {
  const context = useOf<'story'>(restProps.of);
  const { additionalActions = [], ...canvasProps } = useSandboxCanvasProps({
    ...restProps,
    additionalTransformers: {
      replaceAliasWithPackageName: (code) =>
        code.replace(/@\/main/gi, '@iress-oss/ids-components'),
    },
  });

  if (refresh) {
    additionalActions.push({
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

  return <Canvas additionalActions={additionalActions} {...canvasProps} />;
};
