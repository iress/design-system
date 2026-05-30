import {
  Description,
  DocsContext,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { use, useContext } from 'react';
import { IressStorybookContext } from '../IressStorybookContext';
import { ComponentCanvas } from '../ComponentCanvas';

export const DefaultAutoDocs = () => {
  const docsContext = useContext(DocsContext);
  const { IressText } = use(IressStorybookContext);
  const stories = docsContext.componentStories();

  return (
    <>
      <Title />
      <IressText textStyle="typography.heading.5">
        <Subtitle />
      </IressText>
      <Description />
      {stories?.map((story) => (
        <ComponentCanvas of={story.moduleExport as never} withToolbar />
      ))}
    </>
  );
};
