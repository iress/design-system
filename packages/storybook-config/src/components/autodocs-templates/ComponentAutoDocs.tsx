import {
  Title,
  Subtitle,
  Description,
  Controls,
  DocsContext,
  useOf,
  ArgTypes,
  Story,
} from '@storybook/addon-docs/blocks';
import { ComponentCanvas } from '../ComponentCanvas';
import { use, useContext, useEffect, useState } from 'react';
import { IressStorybookContext } from '../IressStorybookContext';
import { ComponentStatus } from '../ComponentStatus';
import { TestTable } from '../TestTable';
import {
  IressButton,
  IressCol,
  IressMenu,
  IressMenuHeading,
  IressMenuItem,
  IressPanel,
  IressRow,
} from '@iress-oss/ids-components';
import type { BroadcastHashEvent, ParametersConfig } from '../../types';
import { cssVars } from '@iress-oss/ids-tokens';

const TAB_NAMES = [
  'playground',
  'examples',
  'recipes',
  'references',
  'testing',
  'api',
] as const;
type TabName = (typeof TAB_NAMES)[number];

const isTabName = (value: string): value is TabName =>
  TAB_NAMES.includes(value as TabName);

const setParentHash = (hash: string) => {
  window.parent.location.hash = hash;
};

const scrollToStory = (storyId: string) => {
  document.getElementById(storyId)?.scrollIntoView({ behavior: 'smooth' });
};

interface StoryItem {
  id: string;
  name: string;
  moduleExport: unknown;
}

/**
 * Inline table of contents for a list of stories within a tab.
 */
const TabToc = ({ stories, type }: { stories: StoryItem[]; type: TabName }) => (
  <nav style={{ position: 'sticky', top: cssVars.spacing[3] }}>
    <IressPanel px="none" py="sm">
      <IressMenuHeading element="h2">Jump to</IressMenuHeading>
      <IressMenu variant="side" width="12/12">
        {stories.map((story) => (
          <IressMenuItem
            key={story.id}
            href={`#${story.id}`}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              scrollToStory(story.id);
              setParentHash(`${type}_${story.id}`);
            }}
          >
            {story.name}
          </IressMenuItem>
        ))}
      </IressMenu>
    </IressPanel>
  </nav>
);

/**
 * Tab content for Examples/Recipes — renders stories in a two-column layout with a sticky TOC.
 */
const StoriesTabContent = ({
  stories,
  type,
  description,
}: {
  stories: StoryItem[];
  type: TabName;
  description: string;
}) => {
  const { IressText } = use(IressStorybookContext);

  return (
    <>
      <IressRow gutter="lg">
        <IressCol>
          <IressText element="p" pt="md">
            {description}
          </IressText>

          {stories.map((story) => (
            <div key={story.id}>
              <h3 id={story.id}>{story.name}</h3>
              <Description of={story.moduleExport as never} />

              {type !== 'references' && (
                <ComponentCanvas of={story.moduleExport as never} />
              )}

              {type === 'references' && (
                <Story of={story.moduleExport as never} />
              )}
            </div>
          ))}
        </IressCol>
        <IressCol span={{ xs: 12, md: 4, lg: 3, xl: 2 }} pt="md">
          <TabToc stories={stories} type={type} />
        </IressCol>
      </IressRow>
    </>
  );
};

export const ComponentAutoDocs = () => {
  const { IressText, IressTabSet, IressTab } = use(IressStorybookContext);
  const [selectedTab, setSelectedTab] = useState<TabName>('playground');
  const docsContext = useContext(DocsContext);
  const resolvedMeta = useOf<'meta'>('meta');

  // componentStories() returns stories in file-definition order
  const stories = docsContext.componentStories();
  const primaryStory = stories[0];
  const restOfStories = stories.slice(1);

  const recipes = restOfStories.filter((story) =>
    story.tags?.includes('recipe'),
  );
  const hasRecipes = recipes.length > 0;

  const references = restOfStories.filter((story) =>
    story.tags?.includes('reference'),
  );
  const hasReferences = references.length > 0;

  const examples = restOfStories.filter(
    (story) => !recipes.includes(story) && !references.includes(story),
  );
  const hasExamples = examples.length > 0;

  const config = resolvedMeta.preparedMeta.parameters
    ?.idsConfig as ParametersConfig['idsConfig'];
  const testMeta = config?.testMeta ?? [];
  const guidelinesUrl =
    typeof config?.guidelinesUrl === 'function'
      ? config.guidelinesUrl(resolvedMeta.preparedMeta.title ?? '')
      : config?.guidelinesUrl;
  const hasTestMeta = testMeta.length > 0;

  const selectTab = (tab: TabName) => {
    setSelectedTab(tab);
    setParentHash(tab);
  };

  useEffect(() => {
    const handleHashMessage = (event: MessageEvent<BroadcastHashEvent>) => {
      if (event.data?.type !== 'UPDATE_HASH' || !event.data.hash) return;

      const [tab, storyId] = event.data.hash.split('_');
      if (isTabName(tab)) setSelectedTab(tab);
      if (storyId) scrollToStory(storyId);
    };

    const initialHash = window.parent.location.hash.substring(1);
    if (initialHash) {
      const [tab, storyId] = initialHash.split('_');
      if (isTabName(tab)) setSelectedTab(tab);
      if (storyId) setTimeout(() => scrollToStory(storyId), 200);
    }

    window.addEventListener('message', handleHashMessage);
    return () => window.removeEventListener('message', handleHashMessage);
  }, []);

  return (
    <>
      <Title />
      <IressText textStyle="typography.heading.5">
        <Subtitle />
      </IressText>
      <Description />
      <ComponentStatus of={resolvedMeta.preparedMeta} />
      <IressTabSet
        selected={selectedTab}
        onChange={(e) => selectTab(e.value as TabName)}
        append={
          guidelinesUrl && (
            <IressButton
              href={guidelinesUrl}
              target="_blank"
              rel="noopener noreferrer"
              mode="muted"
            >
              How to use this component?
            </IressButton>
          )
        }
      >
        {primaryStory && (
          <IressTab label="Playground" value="playground">
            <ComponentCanvas
              of={primaryStory.moduleExport as never}
              withToolbar
            />
            <Controls />
          </IressTab>
        )}
        {hasExamples && (
          <IressTab label="Examples" value="examples">
            <StoriesTabContent
              stories={examples}
              type="examples"
              description="These are basic examples of most common properties used."
            />
          </IressTab>
        )}
        {hasRecipes && (
          <IressTab label="Recipes" value="recipes">
            <StoriesTabContent
              stories={recipes}
              type="recipes"
              description="Recipes are more complex examples showcasing integration between different components and external libraries."
            />
          </IressTab>
        )}
        {hasReferences && (
          <IressTab label="References" value="references">
            <StoriesTabContent
              stories={references}
              type="references"
              description="View the background and rationale for how this component was designed and built, including links to relevant Figma designs, RFC discussions, and PRs."
            />
          </IressTab>
        )}
        {hasTestMeta && (
          <IressTab label="Testing" value="testing">
            <IressText element="p" pt="md">
              This the testing reference for this component. Test IDs are
              provided as data attributes on the DOM elements to facilitate
              testing. Where possible, please use the role.
            </IressText>
            <TestTable items={testMeta} />
          </IressTab>
        )}
        <IressTab label="API (Props)" value="api">
          <ArgTypes />
        </IressTab>
      </IressTabSet>
    </>
  );
};
