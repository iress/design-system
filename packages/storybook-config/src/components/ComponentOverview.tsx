import {
  IressExpander,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';
import { type ReactNode } from 'react';
import { type StoryObj } from '@storybook/react';
import { type ComponentApiProps } from './ComponentApi';
import { ComponentCanvas, type ComponentCanvasProps } from './ComponentCanvas';
import { type StoryModule } from '~/types';
import { ComponentApiExpander } from './ComponentApiExpander';
import { ComponentStatus } from './ComponentStatus';

export interface ComponentOverviewProps {
  /**
   * Props for the API section
   */
  apiProps?: Omit<ComponentApiProps, 'details' | 'story'>;

  /**
   * Props for the Canvas section
   */
  canvasProps?: ComponentCanvasProps;

  /**
   * Description content, usually a short paragraph about the component
   */
  description?: ReactNode;

  /**
   * Additional info content, usually status or design information
   */
  info?: ReactNode;

  /**
   * Additional details to show above the props table
   */
  propsDetails?: ReactNode;

  /**
   * Additional content to show in a "Read more" expander
   */
  readMore?: ReactNode;

  /**
   * The story to show the Canvas and Props for
   */
  story: StoryObj;

  /**
   * The stories module for the component
   */
  stories: StoryModule;
}

export const ComponentOverview = ({
  apiProps,
  canvasProps,
  description,
  info,
  propsDetails,
  readMore,
  story,
  stories,
}: ComponentOverviewProps) => (
  <>
    <IressStack gap="spacing.400">
      {description && (
        <>
          <h2 id="overview" className="iress-sr-only">
            Overview
          </h2>
          <IressText textStyle="typography.body.lg">{description}</IressText>
        </>
      )}

      {info}

      <ComponentStatus stories={stories} />

      {readMore && (
        <IressExpander
          activator="Read more"
          mode="link"
          mt={description ? 'md' : undefined}
        >
          {readMore}
        </IressExpander>
      )}
    </IressStack>

    <ComponentCanvas {...canvasProps} of={story} meta={stories} />

    <ComponentApiExpander
      {...apiProps}
      details={
        propsDetails && (
          <IressText color="colour.neutral.70">{propsDetails}</IressText>
        )
      }
      story={story}
    />
  </>
);
