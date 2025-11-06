import { type IressInlineProps } from '@iress-oss/ids-components';
import { use } from 'react';
import { Badge } from 'storybook/internal/components';
import { type StoryModule } from '~/types';
import { IressStorybookContext } from './IressStorybookContext';
import { type StoryObj } from '@storybook/react-vite';

interface ComponentStatusProps extends IressInlineProps {
  /**
   * The stories module for the component
   * Either `stories` or `story` must be provided.
   */
  story?: StoryObj;

  /**
   * The stories module for the component.
   * Either `stories` or `story` must be provided.
   */
  stories?: StoryModule;
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
        {oldComponent.trim() ? (
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
              This component is new, please provide feedback to the IDS team if
              you encounter any issues.
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
          have been marked as beta. Please tell us if there are any issues.
        </IressText>
      </IressStack>
    </>
  );
};

export const ComponentStatus = ({
  story: storyProp,
  stories,
  ...restProps
}: ComponentStatusProps) => {
  const { IressDivider, IressInline } = use(IressStorybookContext);

  if (!storyProp && !stories) {
    throw new Error('ComponentStatus requires either a story or stories prop');
  }

  const story = storyProp ?? stories?.default;
  const storyTags = story!.tags ?? [];
  const betaTag = storyTags.find((tag) => tag.startsWith('beta:'));
  const cautionTag = storyTags.find((tag) => tag.startsWith('caution:'));
  const updatedTag = storyTags.find((tag) => tag === 'updated');

  if (!cautionTag && !betaTag && !updatedTag) {
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
    </>
  );
};
