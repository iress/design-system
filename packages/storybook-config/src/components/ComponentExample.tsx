import { ComponentCanvas, type ComponentCanvasProps } from './ComponentCanvas';
import { type ComponentApiProps } from './ComponentApi';
import { ComponentApiExpander } from './ComponentApiExpander';
import { use } from 'react';
import { IressStorybookContext } from './IressStorybookContext';
import { type StoryAnnotations } from 'storybook/internal/types';

export interface ComponentExampleProps extends ComponentCanvasProps {
  /**
   * Whether to show the component API below the canvas.
   * Can be a string to set the heading, or an object of ComponentApiProps for more control.
   */
  api?: Omit<ComponentApiProps, 'of'> | string;

  /**
   * The story to display in the canvas.
   */
  of: StoryAnnotations;
}

const API_DEFAULTS: ComponentExampleProps['api'] = {
  headingLevel: 4,
};

/**
 * Component to display a component example in Storybook, including the canvas and optional API section.
 * Used to showcase individual examples of a component with its props.
 */
export const ComponentExample = ({
  api,
  of,
  meta,
  ...restProps
}: ComponentExampleProps) => {
  const { IressText, IressPanel } = use(IressStorybookContext);
  const apiProps: ComponentExampleProps['api'] =
    typeof api === 'string'
      ? {
          heading: api,
        }
      : api;

  return (
    <>
      <IressPanel
        bg="transparent"
        mt="-lg"
        mb="-spacing.900"
        mx="-md"
        pb="none"
      >
        <ComponentCanvas {...restProps} of={of} meta={meta} />
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
          of={of}
        />
      )}
    </>
  );
};
