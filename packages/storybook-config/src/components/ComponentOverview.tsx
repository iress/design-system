import { use, type ReactNode } from 'react';
import { type ComponentApiProps } from './ComponentApi';
import { ComponentCanvas, type ComponentCanvasProps } from './ComponentCanvas';
import { ComponentApiExpander } from './ComponentApiExpander';
import { ComponentStatus } from './ComponentStatus';
import { IressStorybookContext } from './IressStorybookContext';
import {
  type StoryAnnotations,
  type ModuleExports,
  type ModuleExport,
} from 'storybook/internal/types';

export interface ComponentOverviewProps {
  /**
   * Props for the API section
   */
  apiProps?: Omit<ComponentApiProps, 'details' | 'of'>;

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
  of: ModuleExport;

  /**
   * The stories module for the component
   */
  meta: ModuleExports;
}

/**
 * Component to display a component overview in Storybook, including description, status, canvas, and API sections.
 * Usually used for the first section of a component's documentation page.
 */
export const ComponentOverview = ({
  apiProps,
  canvasProps,
  description,
  info,
  propsDetails,
  readMore,
  of,
  meta,
}: ComponentOverviewProps) => {
  const { IressStack, IressText, IressExpander, IressPanel } = use(
    IressStorybookContext,
  );

  return (
    <>
      <IressStack gap="spacing.400">
        {description && (
          <>
            <IressText element="h2" id="overview" srOnly>
              Overview
            </IressText>
            <IressText textStyle="typography.body.lg">{description}</IressText>
          </>
        )}

        {info}

        <ComponentStatus of={of as StoryAnnotations} meta={meta} />

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

      <IressPanel bg="transparent" mt="-lg" mb="-xl" mx="-md">
        <ComponentCanvas
          {...canvasProps}
          of={of as StoryAnnotations}
          meta={meta}
        />
      </IressPanel>

      <ComponentApiExpander
        {...apiProps}
        details={
          propsDetails && (
            <IressText color="colour.neutral.70">{propsDetails}</IressText>
          )
        }
        of={of as StoryAnnotations}
      />
    </>
  );
};
