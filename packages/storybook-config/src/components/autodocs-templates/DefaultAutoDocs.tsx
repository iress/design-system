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
  const { IressTab, IressTabSet, IressText } = use(IressStorybookContext);
  const stories = docsContext.componentStories();

  const migrations = stories.filter((story) =>
    story.tags?.includes('migration'),
  );
  const mainStories = stories.filter(
    (story) => !story.tags?.includes('migration'),
  );
  const hasMigrations = migrations.length > 0;

  useHashNavigation();

  return (
    <>
      <Title />
      <IressText textStyle="typography.heading.5">
        <Subtitle />
      </IressText>
      <Description />
      {hasMigrations ? (
        <IressTabSet panelStyle={{ pt: 'md' }}>
          <IressTab label="Main" value="main">
            <StoriesWithToc stories={mainStories} />
          </IressTab>
          <IressTab label="Migration" value="migration">
            <StoriesWithToc stories={migrations} storyOnly />
          </IressTab>
        </IressTabSet>
      ) : (
        <StoriesWithToc stories={stories} />
      )}
    </>
  );
};
