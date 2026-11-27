import { type IressInlineProps } from '@iress-oss/ids-components';
import { use } from 'react';
import { Badge } from 'storybook/internal/components';
import { IressStorybookContext } from './IressStorybookContext';
import {
  type StoryAnnotations,
  type ModuleExports,
  type ModuleExport,
} from 'storybook/internal/types';

interface ComponentStatusProps extends IressInlineProps {
  /**
   * The stories module for the component
   * Either `of` or `meta` must be provided.
   */
  of?: ModuleExport;

  /**
   * The stories module for the component.
   * Either `of` or `meta` must be provided.
   */
  meta?: ModuleExports;
}

interface TagProps {
  tag: string;
}

const BetaTag = ({ tag }: TagProps) => {
  const { IressStack, IressText } = use(IressStorybookContext);
  const [, oldComponent] = tag.split(':');

  return (
    <>
      <div>
        <Badge status="positive">Beta</Badge>
      </div>
      <IressStack>
        {oldComponent?.trim() ? (
          <>
            <IressText element="strong">Replaces {oldComponent}</IressText>
            <IressText color="colour.neutral.70">
              This component is in beta and will replace {oldComponent} in the
              next major version.
            </IressText>
          </>
        ) : (
          <>
            <IressText element="strong">New component</IressText>
            <IressText color="colour.neutral.70">
              This component is new, please{' '}
              <a
                href="https://github.com/iress/design-system/issues"
                target="_blank"
              >
                provide feedback
              </a>{' '}
              if you encounter any issues.
            </IressText>
          </>
        )}
      </IressStack>
    </>
  );
};

const CautionTag = ({ tag }: TagProps) => {
  const { IressStack, IressText } = use(IressStorybookContext);
  const [, newComponent] = tag.split(':');

  return (
    <>
      <div>
        <Badge status="warning">Caution</Badge>
      </div>
      <IressStack>
        <IressText element="strong">Use {newComponent} instead</IressText>
        <IressText color="colour.neutral.70">
          The design of this component is changing. Please use the new
          component/props instead.
        </IressText>
      </IressStack>
    </>
  );
};

const UpdatedTag = () => {
  const { IressStack, IressText } = use(IressStorybookContext);

  return (
    <>
      <div>
        <Badge status="neutral">Updated</Badge>
      </div>
      <IressStack>
        <IressText element="strong">Recently updated</IressText>
        <IressText color="colour.neutral.70">
          This component has been recently updated with new props. The props
          have been marked as beta.
          <br />
          <a
            href="https://github.com/iress/design-system/issues"
            target="_blank"
          >
            Please tell us if there are any issues
          </a>
          .
        </IressText>
      </IressStack>
    </>
  );
};

/**
 * Extracts the component directory name from a Storybook meta title.
 * e.g. "Components/Button" → "Button", "Patterns/Form/Rules" → "Form"
 */
function getComponentName(meta?: ModuleExports): string | undefined {
  const title = (meta?.default as { title?: string })?.title;
  if (!title) return undefined;
  const parts = title.split('/');
  const prefixIndex = Math.max(
    parts.indexOf('Components'),
    parts.indexOf('Patterns'),
  );
  if (prefixIndex === -1 || prefixIndex + 1 >= parts.length) return undefined;
  return parts[prefixIndex + 1];
}

const VersionTag = ({ version }: { version: string }) => {
  const { IressText } = use(IressStorybookContext);

  return (
    <IressText color="colour.neutral.70">
      Last updated in <Badge status="neutral">{version}</Badge>
    </IressText>
  );
};

/**
 * Component to display the status of a component in Storybook, such as beta, caution, updated, or last updated version.
 * It extracts status information from the story's tags and displays appropriate badges and messages.
 */
export const ComponentStatus = ({
  of: ofProp,
  meta,
  ...restProps
}: ComponentStatusProps) => {
  const { IressDivider, IressInline, componentVersions } = use(
    IressStorybookContext,
  );

  if (!ofProp && !meta) {
    throw new Error('ComponentStatus requires either a story or stories prop');
  }

  const ofTags = (ofProp as StoryAnnotations)?.tags ?? [];
  const metaTags = (meta?.default as StoryAnnotations)?.tags ?? [];
  const storyTags = [...metaTags, ...ofTags];
  const betaTag = storyTags.find(
    (tag) => tag.startsWith('beta:') || tag === 'beta',
  );
  const cautionTag = storyTags.find((tag) => tag.startsWith('caution:'));
  const updatedTag = storyTags.find((tag) => tag === 'updated');

  const componentName = getComponentName(meta);
  const version = componentName
    ? componentVersions?.[componentName]
    : undefined;
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- intentionally filter empty strings
  const hasStatusTags = betaTag || cautionTag || updatedTag;

  if (!hasStatusTags && !version) {
    return null;
  }

  return (
    <>
      <IressDivider my="md" />
      <IressInline gap="sm" verticalAlign="top" noWrap {...restProps}>
        {betaTag && <BetaTag tag={betaTag} />}
        {cautionTag && <CautionTag tag={cautionTag} />}
        {updatedTag && <UpdatedTag />}
      </IressInline>
      {version && <VersionTag version={version} />}
      <IressDivider my="md" />
    </>
  );
};
