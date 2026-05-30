import {
  Description,
  DocsContext,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { use, useContext } from 'react';
import { IressStorybookContext } from '../IressStorybookContext';
import { StoriesWithToc, useHashNavigation } from '../StoriesWithToc';

export const DefaultAutoDocs = () => {
  const docsContext = useContext(DocsContext);
  const { IressText } = use(IressStorybookContext);
  const stories = docsContext.componentStories();

  useHashNavigation();

  return (
    <>
      <Title />
      <IressText textStyle="typography.heading.5">
        <Subtitle />
      </IressText>
      <Description />
      <StoriesWithToc stories={stories} />
    </>
  );
};
