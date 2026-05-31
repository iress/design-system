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
import { use, useContext, useState } from 'react';
import { IressStorybookContext } from '../IressStorybookContext';
import { ComponentStatus } from '../ComponentStatus';
import { TestTable } from '../TestTable';
import { IressButton, IressCol, IressRow } from '@iress-oss/ids-components';
import type { ParametersConfig } from '../../types';
import { StoryToc, useHashNavigation, type StoryItem } from '../StoriesWithToc';

const BUILT_IN_TABS = [
  'playground',
  'examples',
  'recipes',
  'references',
  'testing',
  'api',
] as const;
type TabName = string;

const isTabName = (value: string): value is TabName =>
  BUILT_IN_TABS.includes(value as (typeof BUILT_IN_TABS)[number]) ||
  value.length > 0;

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
          <StoryToc stories={stories} hashPrefix={type} />
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

  // Dynamic tabs from `tab:<name>` tags (e.g. tags: ['tab:configuration'])
  const customTabs = (() => {
    const tabs = new Map<string, StoryItem[]>();
    for (const story of restOfStories) {
      const tabTag = story.tags?.find((t: string) => t.startsWith('tab:'));
      if (tabTag) {
        const tabName = tabTag.replace('tab:', '');
        if (!tabs.has(tabName)) tabs.set(tabName, []);
        tabs.get(tabName)!.push(story);
      }
    }
    return tabs;
  })();

  const examples = restOfStories.filter(
    (story) =>
      !recipes.includes(story) &&
      !references.includes(story) &&
      !story.tags?.some((t: string) => t.startsWith('tab:')),
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
  };

  useHashNavigation((hash) => {
    const [tab] = hash.split('_');
    if (isTabName(tab)) setSelectedTab(tab);
  });

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
        {Array.from(customTabs.entries()).map(([tabName, tabStories]) => {
          const tabDescription = config?.tabDescriptions?.[tabName] ?? '';
          return (
            <IressTab
              key={tabName}
              label={tabName.charAt(0).toUpperCase() + tabName.slice(1)}
              value={tabName}
            >
              <StoriesTabContent
                stories={tabStories}
                type={tabName}
                description={tabDescription}
              />
            </IressTab>
          );
        })}
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
