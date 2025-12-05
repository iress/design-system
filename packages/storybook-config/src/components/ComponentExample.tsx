import { ComponentCanvas, type ComponentCanvasProps } from './ComponentCanvas';
import { type ComponentApiProps } from './ComponentApi';
import { ComponentApiExpander } from './ComponentApiExpander';
import { use } from 'react';
import { IressStorybookContext } from './IressStorybookContext';
import {
  type ModuleExport,
  type StoryAnnotations,
} from 'storybook/internal/types';

export interface ComponentExampleProps extends ComponentCanvasProps {
  /**
   * Whether to show the component API below the canvas.
   * Can be a string to set the heading, or an object of ComponentApiProps for more control.
   * Defaults to true to show the API with default settings.
   */
  api?: Omit<ComponentApiProps, 'of'> | string | boolean;

  /**
   * The story to display in the canvas.
   */
  of: ModuleExport;
}

const API_DEFAULTS: ComponentExampleProps['api'] = {
  headingLevel: 4,
};

/**
 * Component to display a component example in Storybook, including the canvas and optional API section.
 * Used to showcase individual examples of a component with its props.
 */
export const ComponentExample = ({
  api = true,
  of,
  meta,
  ...restProps
}: ComponentExampleProps) => {
  const { IressText, IressPanel } = use(IressStorybookContext);
  let apiProps: ComponentExampleProps['api'] =
    typeof api === 'string'
      ? {
          heading: api,
        }
      : api;

  if (apiProps === true) {
    apiProps = API_DEFAULTS;
  }

  return (
    <>
      <IressPanel bg="transparent" mt="-lg" mb="-spacing.8" mx="-md" pb="none">
        <ComponentCanvas
          {...restProps}
          of={of as StoryAnnotations}
          meta={meta}
        />
      </IressPanel>
      {apiProps && (
        <ComponentApiExpander
          {...API_DEFAULTS}
          {...apiProps}
          details={
            apiProps.details && (
              <IressText color="colour.neutral.70">
                {apiProps.details}
              </IressText>
            )
          }
          of={of as StoryAnnotations}
        />
      )}
    </>
  );
};
