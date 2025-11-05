import { type StoryObj } from '@storybook/react';
import { IressText } from '@iress-oss/ids-components';
import { ComponentCanvas, type ComponentCanvasProps } from './ComponentCanvas';
import { type ComponentApiProps } from './ComponentApi';
import { type StoryModule } from '~/types';
import { ComponentApiExpander } from './ComponentApiExpander';

export interface ComponentExampleProps
  extends Omit<ComponentCanvasProps, 'of' | 'story'> {
  api?: Omit<ComponentApiProps, 'story'> | string;
  story: StoryObj;
  storyProps?: ComponentCanvasProps['story'];
  stories: StoryModule;
}

const API_DEFAULTS: ComponentExampleProps['api'] = {
  headingLevel: 4,
};

export const ComponentExample = ({
  api,
  story,
  storyProps,
  stories,
  ...restProps
}: ComponentExampleProps) => {
  const apiProps: ComponentExampleProps['api'] =
    typeof api === 'string'
      ? {
          heading: api,
        }
      : api;

  return (
    <>
      <ComponentCanvas
        {...restProps}
        of={story}
        meta={stories}
        story={storyProps}
      />
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
          story={story}
        />
      )}
    </>
  );
};
